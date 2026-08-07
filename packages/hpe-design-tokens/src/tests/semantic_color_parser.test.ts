import fs from 'fs';
import { describe, expect, it } from 'vitest';

import {
  exportSemanticColorMetadataModuleFromTokenTree,
  parseSemanticColorTokenMetadataFromTokenTree,
  parseSemanticColorTokenMetadataMap,
  parseSemanticColorTokenMetadata,
  serializeSemanticColorMetadataModule,
} from '../semantic_color_parser.js';

import {
  SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY,
  type SemanticColorTokenMetadataMap,
  SEMANTIC_COLOR_ROLES_BY_TARGET,
  SEMANTIC_COLOR_SCALES,
  SEMANTIC_COLOR_STATES,
  SEMANTIC_COLOR_TARGETS,
} from '../semantic_color_core.js';

const semanticColorMetadataExamples = {
  'hpe.color.background.primary.strong': {
    type: 'color',
    target: 'background',
    role: {
      family: null,
      name: 'primary',
    },
    scale: 'strong',
    state: 'REST',
  },
  'hpe.color.transparent': {
    type: 'color',
    target: 'transparent',
    role: null,
    scale: null,
    state: null,
  },
} satisfies SemanticColorTokenMetadataMap;

describe('semantic_color_parser', () => {
  it('matches current semantic color target inventory', () => {
    const source = JSON.parse(
      fs.readFileSync('./tokens/semantic/color.dark.json', 'utf8'),
    ) as { color: Record<string, unknown> };

    const targetKeys = Object.keys(source.color).sort();
    expect(targetKeys).toEqual([...SEMANTIC_COLOR_TARGETS].sort());
  });

  it('contains canonical scale and state vocabularies', () => {
    expect(SEMANTIC_COLOR_SCALES).toEqual([
      'xweak',
      'weak',
      'default',
      'strong',
      'xstrong',
    ]);
    expect(SEMANTIC_COLOR_STATES).toEqual(['REST', 'hover', 'focus', 'active']);
  });

  it('covers all role families currently in color.dark.json', () => {
    const source = JSON.parse(
      fs.readFileSync('./tokens/semantic/color.dark.json', 'utf8'),
    ) as { color: Record<string, unknown> };

    Object.entries(source.color).forEach(([target, roleTree]) => {
      if (!roleTree || typeof roleTree !== 'object') {
        return;
      }

      const roleKeys = Object.keys(roleTree).filter(k => !k.startsWith('$'));
      const nonRoleSegments = new Set(['DEFAULT', 'strong', 'weak']);
      const canonical =
        SEMANTIC_COLOR_ROLES_BY_TARGET[
          target as keyof typeof SEMANTIC_COLOR_ROLES_BY_TARGET
        ];

      expect(new Set(roleKeys).size).toBe(roleKeys.length);
      roleKeys.forEach(role => {
        if (target === 'transparent') {
          return;
        }

        if (nonRoleSegments.has(role)) {
          return;
        }

        expect(canonical).toContain(role);
      });
    });
  });

  it('keeps known multi-slot role names explicit', () => {
    expect(
      SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY.background.selected,
    ).toEqual([
      'primary',
    ]);
    expect(
      SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY.dataVis
        .categorical,
    ).toEqual([
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
    ]);
  });

  it('supports the semantic color metadata type shape', () => {
    expect(
      semanticColorMetadataExamples['hpe.color.background.primary.strong'].role
        ?.family,
    ).toBeNull();
    expect(
      semanticColorMetadataExamples['hpe.color.background.primary.strong'].role
        ?.name,
    ).toBe('primary');
    expect(semanticColorMetadataExamples['hpe.color.transparent'].role).toBe(
      null,
    );
  });

  it('parses standard semantic color token paths', () => {
    const result = parseSemanticColorTokenMetadata(
      'hpe.color.background.primary.strong.hover',
    );

    expect(result).toEqual({
      ok: true,
      metadata: {
        type: 'color',
        target: 'background',
        role: {
          family: null,
          name: 'primary',
        },
        scale: 'strong',
        state: 'hover',
      },
    });
  });

  it('parses single-slot semantic role with name', () => {
    const result = parseSemanticColorTokenMetadata(
      'hpe.color.background.disabled.DEFAULT.REST',
    );

    expect(result).toEqual({
      ok: true,
      metadata: {
        type: 'color',
        target: 'background',
        role: {
          family: null,
          name: 'disabled',
        },
        scale: 'default',
        state: 'REST',
      },
    });
  });

  it('parses selected and accent role variants', () => {
    const selected = parseSemanticColorTokenMetadata(
      'color/background/selected/primary/DEFAULT/REST',
    );
    const accent = parseSemanticColorTokenMetadata(
      'hpe.color.background.accent.purple.strong.REST',
    );

    expect(selected).toEqual({
      ok: true,
      metadata: {
        type: 'color',
        target: 'background',
        role: {
          family: 'selected',
          name: 'primary',
        },
        scale: 'default',
        state: 'REST',
      },
    });

    expect(accent).toEqual({
      ok: true,
      metadata: {
        type: 'color',
        target: 'background',
        role: {
          family: 'accent',
          name: 'purple',
        },
        scale: 'strong',
        state: 'REST',
      },
    });
  });

  it('parses transparent token with null role and null slots', () => {
    const result = parseSemanticColorTokenMetadata('hpe.color.transparent');

    expect(result).toEqual({
      ok: true,
      metadata: {
        type: 'color',
        target: 'transparent',
        role: null,
        scale: null,
        state: null,
      },
    });
  });

  it('returns structured errors for invalid target and role variant', () => {
    const badTarget = parseSemanticColorTokenMetadata(
      'hpe.color.surface.primary.strong.REST',
    );
    const badVariant = parseSemanticColorTokenMetadata(
      'hpe.color.background.selected.secondary.DEFAULT.REST',
    );

    expect(badTarget).toMatchObject({
      ok: false,
      code: 'TARGET_NOT_CANONICAL',
    });
    expect(badVariant).toMatchObject({
      ok: false,
      code: 'ROLE_NOT_CANONICAL',
    });
  });

  it('parses compact Figma-style semantic color names', () => {
    const back = parseSemanticColorTokenMetadata('color/background/back');
    const contrastHover = parseSemanticColorTokenMetadata(
      'color/background/contrast-hover',
    );
    const primaryStrong = parseSemanticColorTokenMetadata(
      'color/background/primary-strong',
    );
    const primaryStrongHover = parseSemanticColorTokenMetadata(
      'color/background/primary-strong-hover',
    );
    const accentWeak = parseSemanticColorTokenMetadata(
      'color/background/accent/purple-weak',
    );
    const accentWeakActive = parseSemanticColorTokenMetadata(
      'color/background/accent/purple-weak-active',
    );
    const categorical40 = parseSemanticColorTokenMetadata(
      'color/dataVis/categorical-40',
    );

    expect(back).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: null,
          name: 'back',
        },
      },
    });

    expect(contrastHover).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: null,
          name: 'contrast',
        },
        state: 'hover',
      },
    });

    expect(primaryStrong).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: null,
          name: 'primary',
        },
        scale: 'strong',
      },
    });

    expect(primaryStrongHover).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: null,
          name: 'primary',
        },
        scale: 'strong',
        state: 'hover',
      },
    });

    expect(accentWeak).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: 'accent',
          name: 'purple',
        },
        scale: 'weak',
      },
    });

    expect(accentWeakActive).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: 'accent',
          name: 'purple',
        },
        scale: 'weak',
        state: 'active',
      },
    });

    expect(categorical40).toMatchObject({
      ok: true,
      metadata: {
        role: {
          family: 'categorical',
          name: '40',
        },
      },
    });
  });

  it('parses metadata maps and collects canonical errors', () => {
    const result = parseSemanticColorTokenMetadataMap([
      'hpe.color.transparent',
      'hpe.color.background.primary.strong.REST',
      'hpe.color.background.selected.secondary.DEFAULT.REST',
      'hpe.spacing.medium',
    ]);

    expect(Object.keys(result.metadataMap).sort()).toEqual([
      'hpe.color.background.primary.strong.REST',
      'hpe.color.transparent',
    ]);

    expect(Object.keys(result.errors)).toEqual([
      'hpe.color.background.selected.secondary.DEFAULT.REST',
    ]);

    expect(
      result.errors['hpe.color.background.selected.secondary.DEFAULT.REST'],
    ).toMatchObject({
      ok: false,
      code: 'ROLE_NOT_CANONICAL',
    });
    expect(Object.keys(result.exceptions)).toEqual(['hpe.color.transparent']);
  });

  it('soft-reports non-canonical role payloads as exceptions', () => {
    const result = parseSemanticColorTokenMetadataMap(
      ['hpe.color.background.selected.secondary.DEFAULT.REST'],
      { softExceptionOnNonCanonicalRole: true },
    );

    expect(result.errors).toEqual({});
    expect(result.metadataMap).toMatchObject({
      'hpe.color.background.selected.secondary.DEFAULT.REST': {
        role: {
          family: 'selected',
          name: 'secondary',
        },
      },
    });
    expect(
      result.exceptions['hpe.color.background.selected.secondary.DEFAULT.REST'],
    ).toMatchObject({
      code: 'NON_CANONICAL_ROLE_EXCEPTION',
    });
  });

  it('optionally reports non-color tokens in map parsing', () => {
    const result = parseSemanticColorTokenMetadataMap(
      {
        'hpe.color.transparent': {},
        'hpe.spacing.medium': {},
      },
      { skipNonColorTokens: false },
    );

    expect(Object.keys(result.metadataMap)).toEqual(['hpe.color.transparent']);
    expect(result.errors['hpe.spacing.medium']).toMatchObject({
      ok: false,
      code: 'NOT_A_COLOR_TOKEN',
    });
    expect(result.exceptions['hpe.color.transparent']).toMatchObject({
      code: 'NO_ROLE_EXCEPTION',
    });
  });

  it('parses semantic color metadata directly from nested token tree', () => {
    const source = JSON.parse(
      fs.readFileSync('./tokens/semantic/color.dark.json', 'utf8'),
    ) as Record<string, unknown>;

    const result = parseSemanticColorTokenMetadataFromTokenTree(source);

    expect(result.errors).toEqual({});
    expect(result.metadataMap['color/background/default/REST']).toEqual({
      type: 'color',
      target: 'background',
      role: {
        family: null,
        name: 'default',
      },
      scale: null,
      state: 'REST',
    });
    expect(result.metadataMap['color/transparent']).toEqual({
      type: 'color',
      target: 'transparent',
      role: null,
      scale: null,
      state: null,
    });
    expect(result.exceptions['color/transparent']).toMatchObject({
      code: 'NO_ROLE_EXCEPTION',
    });
  });

  it('serializes parsed metadata as an ESM module', () => {
    const parsed = parseSemanticColorTokenMetadataMap([
      'color/background/default/REST',
      'color/transparent',
    ]);

    const moduleCode = serializeSemanticColorMetadataModule(parsed, {
      exportName: 'semanticColorMeta',
      includeErrors: true,
      includeExceptions: true,
    });

    expect(moduleCode).toContain('export const semanticColorMeta =');
    expect(moduleCode).toContain('export const semanticColorMetaErrors =');
    expect(moduleCode).toContain('export const semanticColorMetaExceptions =');
    expect(moduleCode).toContain('export default semanticColorMeta;');
  });

  it('exports metadata directly from token tree', () => {
    const tree = {
      color: {
        background: {
          default: {
            REST: {
              $type: 'color',
              $value: '#ffffff',
            },
          },
        },
      },
    };

    const moduleCode = exportSemanticColorMetadataModuleFromTokenTree(tree);

    expect(moduleCode).toContain('export const semanticColorMetadata =');
    expect(moduleCode).toContain('color/background/default/REST');
  });

  it('throws in strict export mode when parse errors are present', () => {
    const tree = {
      color: {
        background: {
          selected: {
            secondary: {
              DEFAULT: {
                REST: {
                  $type: 'color',
                  $value: '#ffffff',
                },
              },
            },
          },
        },
      },
    };

    expect(() =>
      exportSemanticColorMetadataModuleFromTokenTree(tree, {
        failOnErrors: true,
      }),
    ).toThrow('Semantic color metadata export failed');
  });

  it('supports strict export mode with soft role exceptions', () => {
    const tree = {
      color: {
        background: {
          selected: {
            secondary: {
              DEFAULT: {
                REST: {
                  $type: 'color',
                  $value: '#ffffff',
                },
              },
            },
          },
        },
      },
    };

    expect(() =>
      exportSemanticColorMetadataModuleFromTokenTree(tree, {
        failOnErrors: true,
        softExceptionOnNonCanonicalRole: true,
      }),
    ).not.toThrow();
  });
});
