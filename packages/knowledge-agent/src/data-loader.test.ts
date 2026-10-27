// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadComponents, loadPatterns } from './data-loader';
import type {
  ComponentDefinitionSource,
  ComponentExampleSource,
  PatternDefinitionSource,
} from './types';

const { files } = vi.hoisted(() => ({ files: new Map<string, string>() }));

vi.mock('node:fs', () => ({
  existsSync: (fileName: string) => files.has(fileName),
  readdirSync: (directory: string) =>
    [...files.keys()]
      .filter(fileName => path.dirname(fileName) === directory)
      .map(fileName => path.basename(fileName)),
  readFileSync: (fileName: string) => {
    if (!files.has(fileName)) throw new Error(`Unexpected read: ${fileName}`);
    return files.get(fileName);
  },
}));

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const snippetPath = 'knowledge/core/data/examples/fixture.tsx';
const snippet = '<Button label="Save" />';

function addComponent(examples: ComponentExampleSource[]) {
  const component: ComponentDefinitionSource = {
    id: 'button',
    name: 'Button',
    description: 'An action',
    importPath: 'grommet',
    props: [],
    usage: { whenToUse: [], whenToAvoid: [] },
    examples,
  };
  files.set(
    path.join(repoRoot, 'knowledge/core/data/components/button.yaml'),
    JSON.stringify(component),
  );
}

function addPattern(
  examples?: ComponentExampleSource[],
  overrides: Partial<PatternDefinitionSource> = {},
) {
  const pattern: PatternDefinitionSource = {
    id: 'shell',
    name: 'Shell',
    description: 'Application structure',
    problem: 'Need structure',
    solution: 'Compose components',
    relatedComponents: [],
    examples,
    ...overrides,
  };
  files.set(
    path.join(repoRoot, 'knowledge/core/data/patterns/shell.json'),
    JSON.stringify(pattern),
  );
}

describe('knowledge data loader', () => {
  beforeEach(() => {
    files.clear();
    files.set(path.join(repoRoot, 'knowledge/core/data/components'), '');
    files.set(path.join(repoRoot, 'knowledge/core/data/patterns'), '');
    files.set(path.join(repoRoot, snippetPath), snippet);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe.each([
    { name: 'components', add: addComponent, load: loadComponents },
    { name: 'patterns', add: addPattern, load: loadPatterns },
  ])('$name', ({ add, load }) => {
    it('resolves example files before returning resolved definitions', () => {
      add([{ description: 'File-backed', codeFile: snippetPath }]);
      expect(load()[0].examples?.[0]).toEqual({
        description: 'File-backed',
        codeFile: snippetPath,
        code: snippet,
      });
    });

    it('preserves inline-only examples', () => {
      const example = { description: 'Inline', code: snippet };
      add([example]);
      expect(load()[0].examples).toEqual([example]);
    });

    it.each(['<Box />', ''])(
      'prefers explicit inline code %j over a file',
      code => {
        const example = { description: 'Both', code, codeFile: snippetPath };
        files.delete(path.join(repoRoot, snippetPath));
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        add([example]);
        expect(load()[0].examples?.[0]).toEqual(example);
        expect(warn).not.toHaveBeenCalled();
      },
    );

    it('warns and returns placeholder code for a missing file', () => {
      files.delete(path.join(repoRoot, snippetPath));
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      add([{ description: 'Missing', codeFile: snippetPath }]);
      expect(load()[0].examples?.[0].code).toBe(
        `// File not found: ${snippetPath}`,
      );
      expect(warn).toHaveBeenCalledWith(expect.stringContaining(snippetPath));
    });
  });

  it('keeps pattern examples optional and resolves its template', () => {
    addPattern(undefined, { templateCodeFile: snippetPath });
    expect(loadPatterns()[0].examples).toBeUndefined();
    expect(loadPatterns()[0].templateCode).toBe(snippet);
  });

  it('preserves an inline pattern template when a file is also specified', () => {
    addPattern([], { templateCodeFile: snippetPath, templateCode: '<Grid />' });
    expect(loadPatterns()[0].templateCode).toBe('<Grid />');
  });
});
