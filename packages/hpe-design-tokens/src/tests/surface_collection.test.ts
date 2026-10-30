// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/**
 * Surface collection validation (grommet/hpe-design-system#6071, Phase 2C).
 *
 * Exercises the real token files end to end: the colour files carrying the
 * color.surface.* reference tier, the Surface collection files
 * (surface.default.json / surface.toned.json), the Style Dictionary outputs,
 * the Figma variables payload and the Figma -> tokens export round trip.
 *
 * The "guardrails" block is the decision-17 prototype: alias-direction lint
 * and the frozen-token check on the legacy surface tokens.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'fs';
import type { TransformedToken } from 'style-dictionary/types';
import { HPEStyleDictionary } from '../HPEStyleDictionary.js';
import {
  ApiGetLocalVariablesResponse,
  ApiPostVariablesPayload,
  Variable,
  VariableCollection,
} from '../figma_api.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';
import { getThemeAndMode } from '../utils.js';

const TOKENS_DIR = 'tokens';
const SEMANTIC_DIR = `${TOKENS_DIR}/semantic`;
const PRIMITIVES = `${TOKENS_DIR}/primitive/primitives.default.json`;
const COLOR_FILES = [
  `${SEMANTIC_DIR}/color.light.json`,
  `${SEMANTIC_DIR}/color.dark.json`,
];
const SURFACE_FILES = fs
  .readdirSync(SEMANTIC_DIR)
  .filter(file => file.startsWith('surface.'))
  .map(file => `${SEMANTIC_DIR}/${file}`)
  .sort();
const BUILD_DIR = './src/tests/build/surface/';
const PREFIX = 'hpe';

type FigmaExtensions = {
  'com.figma': {
    hiddenFromPublishing: boolean;
    scopes: string[];
    codeSyntax: Record<string, string>;
  };
};
type Leaf = {
  $value: string;
  $description?: string;
  $extensions: FigmaExtensions;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tree = Record<string, any>;

const readJson = (file: string): Tree =>
  JSON.parse(fs.readFileSync(file, 'utf8'));

// Built ESM modules are `export default { ... }`; parse the object literal.
const readEsmDefault = (file: string): Tree =>
  JSON.parse(
    fs.readFileSync(file, 'utf8').replace(/^[\s\S]*?export default /, ''),
  );

const leaf = (tree: Tree, path: string): Leaf =>
  path.split('.').reduce((node, segment) => node[segment], tree);

const refPath = (value: string) => value.replace(/[{}]/g, '');

// Resolve a token value through semantic aliases down to a primitive hex.
const resolve = (value: string, semantic: Tree, primitives: Tree): string => {
  if (!/^\{.*\}$/.test(value)) return value;
  const path = refPath(value);
  if (path.startsWith('base.')) return leaf(primitives, path).$value;
  return resolve(leaf(semantic, path).$value, semantic, primitives);
};

const CONSUMER_TOKENS = {
  base: 'color.background.surface.base.DEFAULT.REST',
  'tone.1': 'color.background.surface.tone.1.DEFAULT.REST',
  'tone.2': 'color.background.surface.tone.2.DEFAULT.REST',
  floating: 'color.background.surface.floating.DEFAULT.REST',
} as const;

const PRIMITIVE_HEX = {
  'white.100': '#ffffff',
  'grey.50': '#f7f7f7',
  'grey.1000': '#292d3a',
  'grey.1200': '#22252e',
  'grey.1300': '#1d1f27',
} as const;

// Expected resolution for every surface mode x colour mode (decisions 2b,
// 3, 11b). `toned` is the value swap from #6020 "Why the Pair Is Invertible"
// expressed on the three-step tier: base and tone.1 exchange steps, tone.2
// and floating follow the grey step (30). In light that is the documented
// grey page / white containers / grey nested; in dark it is a reordering to
// two values (page 1000, containers 1300) — the recorded Part 3 answer.
const EXPECTED = {
  default: {
    light: {
      base: 'white.100',
      'tone.1': 'grey.50',
      'tone.2': 'white.100',
      floating: 'white.100',
    },
    dark: {
      base: 'grey.1300',
      'tone.1': 'grey.1000',
      'tone.2': 'grey.1200',
      floating: 'grey.1200',
    },
  },
  toned: {
    light: {
      base: 'grey.50',
      'tone.1': 'white.100',
      'tone.2': 'grey.50',
      floating: 'grey.50',
    },
    dark: {
      base: 'grey.1000',
      'tone.1': 'grey.1300',
      'tone.2': 'grey.1000',
      floating: 'grey.1000',
    },
  },
} as const;

describe('surface collection: token files', () => {
  const primitives = readJson(PRIMITIVES);

  it('ships two surface modes as files of the Surface collection', () => {
    expect(SURFACE_FILES).toEqual([
      `${SEMANTIC_DIR}/surface.default.json`,
      `${SEMANTIC_DIR}/surface.toned.json`,
    ]);
  });

  it('resolves every surface x colour mode to the specified primitive', () => {
    SURFACE_FILES.forEach(surfaceFile => {
      const [, surfaceMode] = getThemeAndMode(surfaceFile) as [
        string,
        'default' | 'toned',
      ];
      const surface = readJson(surfaceFile);
      COLOR_FILES.forEach(colorFile => {
        const [, colorMode] = getThemeAndMode(colorFile) as [
          string,
          'light' | 'dark',
        ];
        const semantic = { ...readJson(colorFile), ...surface };
        // merge color.background.surface into the colour tree for resolution
        semantic.color = {
          ...readJson(colorFile).color,
          background: {
            ...readJson(colorFile).color.background,
            surface: surface.color.background.surface,
          },
        };
        Object.entries(CONSUMER_TOKENS).forEach(([role, path]) => {
          const expectedPrimitive =
            EXPECTED[surfaceMode][colorMode][
              role as keyof typeof CONSUMER_TOKENS
            ];
          const value = resolve(
            leaf(surface, path).$value,
            semantic,
            primitives,
          );
          expect(value, `${surfaceMode}.${colorMode}.${role}`).toBe(
            PRIMITIVE_HEX[expectedPrimitive],
          );
        });
      });
    });
  });

  it('uses one alias per consumer token, valid in both colour modes', () => {
    SURFACE_FILES.forEach(surfaceFile => {
      const surface = readJson(surfaceFile);
      Object.values(CONSUMER_TOKENS).forEach(path => {
        const { $value } = leaf(surface, path);
        expect($value).toMatch(/^\{color\.surface\.\d0\.DEFAULT\.REST\}$/);
      });
    });
  });

  it('shares the floating alias with tone.2 in every mode (dec. 26)', () => {
    SURFACE_FILES.forEach(surfaceFile => {
      const surface = readJson(surfaceFile);
      expect(leaf(surface, CONSUMER_TOKENS.floating).$value).toBe(
        leaf(surface, CONSUMER_TOKENS['tone.2']).$value,
      );
    });
  });

  it('keeps the reference tier at the three specified steps (#6073)', () => {
    COLOR_FILES.forEach(colorFile => {
      expect(Object.keys(readJson(colorFile).color.surface)).toEqual([
        '10',
        '20',
        '30',
      ]);
    });
  });

  it('hides the reference tier, exposes the consumer tier (dec. 2b)', () => {
    COLOR_FILES.forEach(colorFile => {
      const color = readJson(colorFile);
      Object.keys(color.color.surface).forEach(step => {
        const token = leaf(color, `color.surface.${step}.DEFAULT.REST`);
        expect(token.$extensions['com.figma'].hiddenFromPublishing).toBe(true);
        expect(token.$description).toMatch(/^\[INTERNAL\]/);
      });
    });
    SURFACE_FILES.forEach(surfaceFile => {
      const surface = readJson(surfaceFile);
      Object.values(CONSUMER_TOKENS).forEach(path => {
        const token = leaf(surface, path);
        expect(token.$extensions['com.figma'].hiddenFromPublishing).toBe(false);
        expect(token.$extensions['com.figma'].scopes).toEqual([
          'FRAME_FILL',
          'SHAPE_FILL',
        ]);
      });
    });
  });
});

describe('surface collection: guardrails (decision 17 prototype)', () => {
  it('alias-direction lint: surface files alias color.surface.* only', () => {
    const collectValues = (node: Tree, acc: string[] = []): string[] => {
      if (node && typeof node === 'object') {
        if ('$value' in node) acc.push(node.$value);
        else Object.values(node).forEach(child => collectValues(child, acc));
      }
      return acc;
    };
    SURFACE_FILES.forEach(surfaceFile => {
      collectValues(readJson(surfaceFile)).forEach(value => {
        expect(value, `${surfaceFile}: ${value}`).toMatch(
          /^\{color\.surface\./,
        );
      });
    });
  });

  it('reference tier never aliases a consumer or legacy token', () => {
    COLOR_FILES.forEach(colorFile => {
      const color = readJson(colorFile);
      Object.keys(color.color.surface).forEach(step => {
        expect(
          leaf(color, `color.surface.${step}.DEFAULT.REST`).$value,
        ).toMatch(/^\{base\.color\./);
      });
    });
  });

  it('frozen-token check: legacy surface tokens unchanged (4a, 25)', () => {
    const frozen = {
      light: {
        'color.background.back.DEFAULT.REST': '{base.color.grey.50}',
        'color.background.front.DEFAULT.REST': '{base.color.white.100}',
        'color.background.floating.DEFAULT.REST': '{base.color.white.100}',
        'color.background.default.REST': '{base.color.white.100}',
      },
      dark: {
        'color.background.back.DEFAULT.REST': '{base.color.grey.1300}',
        'color.background.front.DEFAULT.REST': '{base.color.grey.1000}',
        'color.background.floating.DEFAULT.REST': '{base.color.grey.1200}',
        'color.background.default.REST': '{base.color.grey.1300}',
      },
    } as const;
    COLOR_FILES.forEach(colorFile => {
      const [, mode] = getThemeAndMode(colorFile) as [string, 'light' | 'dark'];
      const color = readJson(colorFile);
      Object.entries(frozen[mode]).forEach(([path, value]) => {
        expect(leaf(color, path).$value, `${mode} ${path}`).toBe(value);
      });
    });
  });
});

describe('surface collection: build outputs', () => {
  beforeAll(async () => {
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
    await SURFACE_FILES.reduce(async (previousBuild, file) => {
      await previousBuild;
      const [, mode] = getThemeAndMode(file);
      const filter = (token: TransformedToken) => token.filePath === file;
      const dictionary = await HPEStyleDictionary.extend({
        source: [PRIMITIVES, `${SEMANTIC_DIR}/color.light.json`, file],
        platforms: {
          grommet: {
            transformGroup: 'js/w3c',
            buildPath: `${BUILD_DIR}grommet/`,
            prefix: PREFIX,
            files: [
              {
                destination: `surface.${mode}.js`,
                format: 'esmGrommetRefs',
                filter,
              },
            ],
          },
          js: {
            transformGroup: 'js/css',
            buildPath: `${BUILD_DIR}esm/`,
            prefix: PREFIX,
            files: [
              { destination: 'surface.js', format: 'javascript/esm', filter },
            ],
          },
          css: {
            transformGroup: 'css/w3c',
            buildPath: `${BUILD_DIR}css/`,
            prefix: PREFIX,
            files: [
              {
                destination: `surface.${mode}.css`,
                format: 'css/variables-collection-modes',
                options: {
                  outputReferences: true,
                  attribute: 'data-surface',
                  mode,
                  defaultMode: 'default',
                },
                filter,
              },
            ],
          },
        },
      });
      await dictionary.buildAllPlatforms();
    }, Promise.resolve());
  });

  it('emits mode-agnostic CSS references scoped by [data-surface]', () => {
    const defaultCss = fs.readFileSync(
      `${BUILD_DIR}css/surface.default.css`,
      'utf8',
    );
    expect(defaultCss).toContain(':root, [data-surface=default] {');
    expect(defaultCss).toContain(
      '--hpe-color-background-surface-base: var(--hpe-color-surface-10);',
    );
    expect(defaultCss).toContain(
      '--hpe-color-background-surface-tone-1: var(--hpe-color-surface-30);',
    );
    expect(defaultCss).toContain(
      '--hpe-color-background-surface-tone-2: var(--hpe-color-surface-20);',
    );
    expect(defaultCss).toContain(
      '--hpe-color-background-surface-floating: var(--hpe-color-surface-20);',
    );
    // the reference tier itself is not re-emitted by the surface file
    expect(defaultCss).not.toMatch(/^\s*--hpe-color-surface-\d0:/m);

    const tonedCss = fs.readFileSync(
      `${BUILD_DIR}css/surface.toned.css`,
      'utf8',
    );
    expect(tonedCss).toContain('[data-surface=toned] {');
    expect(tonedCss).not.toContain(':root');
    expect(tonedCss).toContain(
      '--hpe-color-background-surface-base: var(--hpe-color-surface-30);',
    );
    expect(tonedCss).toContain(
      '--hpe-color-background-surface-tone-1: var(--hpe-color-surface-10);',
    );
    expect(tonedCss).toContain(
      '--hpe-color-background-surface-tone-2: var(--hpe-color-surface-30);',
    );
    expect(tonedCss).toContain(
      '--hpe-color-background-surface-floating: var(--hpe-color-surface-30);',
    );
  });

  it('emits Grommet colour refs into the surface-NN reference tier', () => {
    const def = readEsmDefault(`${BUILD_DIR}grommet/surface.default.js`);
    expect(def.hpe.color.background).toEqual({
      'surface-base': 'surface-10',
      'surface-floating': 'surface-20',
      'surface-tone-1': 'surface-30',
      'surface-tone-2': 'surface-20',
    });
    const toned = readEsmDefault(`${BUILD_DIR}grommet/surface.toned.js`);
    expect(toned.hpe.color.background).toEqual({
      'surface-base': 'surface-30',
      'surface-floating': 'surface-30',
      'surface-tone-1': 'surface-10',
      'surface-tone-2': 'surface-30',
    });
  });

  it('emits one ESM module of names shared by every surface mode', () => {
    const esm = readEsmDefault(`${BUILD_DIR}esm/surface.js`);
    expect(esm.hpe.color.background).toEqual({
      'surface-base': 'var(--hpe-color-background-surface-base)',
      'surface-floating': 'var(--hpe-color-background-surface-floating)',
      'surface-tone-1': 'var(--hpe-color-background-surface-tone-1)',
      'surface-tone-2': 'var(--hpe-color-background-surface-tone-2)',
    });
  });
});

describe('surface collection: Figma variables payload and round trip', () => {
  const emptyFile: ApiGetLocalVariablesResponse = {
    status: 200,
    error: false,
    meta: { variableCollections: {}, variables: {} },
  };

  let payload: ApiPostVariablesPayload;

  beforeAll(() => {
    // Primitives are included so the simulated Figma file can resolve the
    // reference tier's aliases on export; in production they live in the
    // primitive file and are reached through published variables.
    payload = generatePostVariablesPayload(
      readJsonFiles([PRIMITIVES, ...COLOR_FILES, ...SURFACE_FILES]),
      emptyFile,
    );
  });

  it('creates a Surface collection with default and toned modes', () => {
    const collections = payload.variableCollections!.map(c => ({
      id: c.id,
      initialModeId: c.initialModeId,
    }));
    expect(collections).toEqual([
      { id: 'primitives', initialModeId: 'default' },
      { id: 'color', initialModeId: 'light' },
      { id: 'surface', initialModeId: 'default' },
    ]);
    const surfaceModes = payload.variableModes!.filter(
      m => m.variableCollectionId === 'surface',
    );
    expect(surfaceModes.map(m => `${m.action}:${m.name}`)).toEqual([
      'UPDATE:default',
      'CREATE:toned',
    ]);
  });

  it('creates hidden refs in Color and visible consumers in Surface', () => {
    const refs = payload.variables!.filter(v =>
      v.name?.startsWith('color/surface/'),
    );
    expect(refs.map(v => v.name)).toEqual([
      'color/surface/10',
      'color/surface/20',
      'color/surface/30',
    ]);
    refs.forEach(v => {
      expect(v.variableCollectionId).toBe('color');
      expect(v.hiddenFromPublishing).toBe(true);
    });

    const consumers = payload.variables!.filter(
      v => v.variableCollectionId === 'surface',
    );
    expect(consumers.map(v => v.name)).toEqual([
      'color/background/surface-base',
      'color/background/surface-floating',
      'color/background/surface-tone-1',
      'color/background/surface-tone-2',
    ]);
    consumers.forEach(v => {
      expect(v.hiddenFromPublishing).toBe(false);
      expect(v.scopes).toEqual(['FRAME_FILL', 'SHAPE_FILL']);
    });
  });

  it('aliases each Surface variable to one Color ref per surface mode', () => {
    const aliasFor = (variableId: string, modeId: string) => {
      const entry = payload.variableModeValues!.find(
        v => v.variableId === variableId && v.modeId === modeId,
      )!;
      return (entry.value as { id: string }).id;
    };
    expect(aliasFor('color/background/surface-base', 'default')).toBe(
      'color/surface/10',
    );
    expect(aliasFor('color/background/surface-tone-1', 'default')).toBe(
      'color/surface/30',
    );
    expect(aliasFor('color/background/surface-tone-2', 'default')).toBe(
      'color/surface/20',
    );
    expect(aliasFor('color/background/surface-floating', 'default')).toBe(
      'color/surface/20',
    );
    expect(aliasFor('color/background/surface-base', 'toned')).toBe(
      'color/surface/30',
    );
    expect(aliasFor('color/background/surface-tone-1', 'toned')).toBe(
      'color/surface/10',
    );
    expect(aliasFor('color/background/surface-tone-2', 'toned')).toBe(
      'color/surface/30',
    );
    expect(aliasFor('color/background/surface-floating', 'toned')).toBe(
      'color/surface/30',
    );
  });

  it('round-trips Figma -> tokens without exceptionColors (2b(iii))', () => {
    // Materialise the payload as if Figma had accepted it, then export.
    const collections: Record<string, VariableCollection> = {};
    payload.variableCollections!.forEach(c => {
      collections[c.id!] = {
        id: c.id!,
        name: c.name!,
        modes: payload
          .variableModes!.filter(m => m.variableCollectionId === c.id)
          .map(m => ({ modeId: m.id!, name: m.name! })),
        defaultModeId: c.initialModeId!,
        remote: false,
        hiddenFromPublishing: false,
      };
    });
    const variables: Record<string, Variable> = {};
    payload.variables!.forEach(v => {
      variables[v.id!] = {
        id: v.id!,
        name: v.name!,
        key: v.id!,
        variableCollectionId: v.variableCollectionId!,
        resolvedType: v.resolvedType!,
        valuesByMode: {},
        remote: false,
        description: v.description || '',
        hiddenFromPublishing: v.hiddenFromPublishing || false,
        scopes: v.scopes || [],
        codeSyntax: v.codeSyntax || {},
      };
    });
    payload.variableModeValues!.forEach(({ variableId, modeId, value }) => {
      if (variables[variableId])
        variables[variableId].valuesByMode[modeId] = value;
    });

    const exported = tokenFilesFromLocalVariables({
      status: 200,
      error: false,
      meta: { variableCollections: collections, variables },
    });

    expect(Object.keys(exported).sort()).toEqual([
      'color.dark.json',
      'color.light.json',
      'primitives.default.json',
      'surface.default.json',
      'surface.toned.json',
    ]);

    SURFACE_FILES.forEach(surfaceFile => {
      const source = readJson(surfaceFile);
      const roundTripped = exported[surfaceFile.split('/').pop()!] as Tree;
      Object.values(CONSUMER_TOKENS).forEach(path => {
        const sourceLeaf = leaf(source, path);
        const exportedLeaf = leaf(roundTripped, path);
        expect(exportedLeaf, `${surfaceFile} ${path}`).toBeDefined();
        expect(exportedLeaf.$value).toBe(sourceLeaf.$value);
        expect(exportedLeaf.$description).toBe(sourceLeaf.$description);
        expect(exportedLeaf.$extensions['com.figma'].scopes).toEqual(
          sourceLeaf.$extensions['com.figma'].scopes,
        );
      });
    });

    COLOR_FILES.forEach(colorFile => {
      const source = readJson(colorFile);
      const roundTripped = exported[colorFile.split('/').pop()!] as Tree;
      Object.keys(source.color.surface).forEach(step => {
        const path = `color.surface.${step}.DEFAULT.REST`;
        expect(leaf(roundTripped, path).$value).toBe(leaf(source, path).$value);
        expect(
          leaf(roundTripped, path).$extensions['com.figma']
            .hiddenFromPublishing,
        ).toBe(true);
      });
    });
  });
});
