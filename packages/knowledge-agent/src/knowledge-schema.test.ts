// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import {
  createKnowledgeValidators,
  validateKnowledgeDirectory,
  validateKnowledgeSource,
} from '../../../scripts/validate-knowledge-schema';
import type { KnowledgeValidators } from '../../../scripts/validate-knowledge-schema';
import type {
  ComponentDefinitionSource,
  PatternDefinitionSource,
} from './types';

const component: ComponentDefinitionSource = {
  id: 'button',
  name: 'Button',
  description: 'An action',
  importPath: 'grommet',
  props: [],
  usage: { whenToUse: [], whenToAvoid: [] },
  examples: [],
};
const pattern: PatternDefinitionSource = {
  id: 'shell',
  name: 'Shell',
  description: 'Application structure',
  problem: 'Need structure',
  solution: 'Compose components',
  relatedComponents: [],
};

describe('knowledge source schemas', () => {
  let validators: KnowledgeValidators;
  const directories: string[] = [];

  beforeAll(() => {
    validators = createKnowledgeValidators();
  }, 30_000);

  afterEach(() => {
    directories.splice(0).forEach(directory => {
      fs.rmSync(directory, { recursive: true, force: true });
    });
  });

  const validate = (
    data: unknown,
    category: 'components' | 'patterns' = 'components',
  ) =>
    validateKnowledgeSource(
      JSON.stringify(data),
      'fixture.json',
      category,
      validators,
    );

  it.each([
    { description: 'Inline', code: '<Button />' },
    { description: 'File-backed', codeFile: 'example.tsx' },
    { description: 'Both', code: '<Button />', codeFile: 'example.tsx' },
  ])('accepts authored examples: $description', example => {
    expect(validate({ ...component, examples: [example] })).toEqual([]);
    expect(validate({ ...pattern, examples: [example] }, 'patterns')).toEqual(
      [],
    );
  });

  it('rejects examples with neither code nor codeFile', () => {
    expect(
      validate({ ...component, examples: [{ description: 'Missing' }] }).join(
        '\n',
      ),
    ).toContain('fixture.json:/examples/0:');
  });

  it('accepts WCAG notes only as an optional array of strings', () => {
    const wcag = (fields: Record<string, unknown>) => ({
      ...component,
      accessibility: {
        wcag: [
          {
            criterion: '1.3.1 Info and Relationships',
            status: 'conditional',
            ...fields,
          },
        ],
      },
    });
    for (const fields of [
      {},
      { notes: [] },
      { notes: ['One'] },
      { notes: ['One', 'Two'] },
    ]) {
      expect(validate(wcag(fields))).toEqual([]);
    }
    expect(validate(wcag({ note: 'Legacy' })).join('\n')).toContain('(note)');
    expect(validate(wcag({ notes: 'Scalar' })).join('\n')).toContain(
      '/accessibility/wcag/0/notes:',
    );
    expect(validate(wcag({ notes: [42] })).join('\n')).toContain(
      '/accessibility/wcag/0/notes/0:',
    );
  });

  it('preserves free-form availability and both animation representations', () => {
    for (const animation of [
      ['expand'],
      { references: ['motion.duration.short'] },
    ]) {
      expect(
        validate({
          ...component,
          anatomy: [
            {
              label: 'label',
              region: 'root',
              purpose: 'Identify',
              availability: 'when open',
            },
          ],
          behaviors: { animation },
        }),
      ).toEqual([]);
    }
  });

  it('accepts optional templates and open graph prop dictionaries without mutating input', () => {
    const data = {
      ...pattern,
      graph: {
        rootId: 'root',
        nodes: [
          {
            id: 'root',
            componentId: 'grid',
            children: [],
            props: { stepOptions: [10, 20], areas: { small: [['main']] } },
          },
        ],
      },
    };
    const before = JSON.stringify(data);
    expect(validators.patterns(data)).toBe(true);
    expect(JSON.stringify(data)).toBe(before);
    expect(
      validate({ ...pattern, templateCodeFile: 'template.tsx' }, 'patterns'),
    ).toEqual([]);
    expect(
      validate({ ...pattern, templateCode: '<Grid />' }, 'patterns'),
    ).toEqual([]);
  });

  it('rejects wrong primitive types, unknown fields, and invalid bindings', () => {
    const errors = validate({ ...component, id: 7, typo: true }).join('\n');
    expect(errors).toContain('fixture.json:/id:');
    expect(errors).toContain('(typo)');
    expect(
      validate({ ...component, behaviors: { interactveStates: [] } }).join(
        '\n',
      ),
    ).toContain('(interactveStates)');
    expect(
      validate(
        {
          ...pattern,
          graph: {
            rootId: 'root',
            nodes: [
              {
                id: 'root',
                componentId: 'box',
                children: [],
                props: {},
                binding: 'sometimes',
              },
            ],
          },
        },
        'patterns',
      ).join('\n'),
    ).toContain('/graph/nodes/0/binding:');
  });

  it('reports missing fields and parse failures with their filenames', () => {
    expect(validate({}).join('\n')).toContain('(id)');
    expect(
      validateKnowledgeSource(
        'id: [',
        'broken.yaml',
        'components',
        validators,
      )[0],
    ).toContain('broken.yaml:/: Parse/validation error:');
    expect(
      validateKnowledgeSource('{', 'broken.json', 'patterns', validators)[0],
    ).toContain('broken.json:/: Parse/validation error:');
  });

  it('validates YAML as well as JSON', () => {
    expect(
      validateKnowledgeSource(
        [
          'id: shell',
          'name: Shell',
          'description: Structure',
          'problem: Structure',
          'solution: Compose',
          'relatedComponents: []',
        ].join('\n'),
        'shell.yml',
        'patterns',
        validators,
      ),
    ).toEqual([]);
  });

  it('reports multiple bad files, ignores non-inputs, and rejects missing or empty collections', () => {
    const directory = fs.mkdtempSync(
      path.join(os.tmpdir(), 'knowledge-schema-'),
    );
    directories.push(directory);
    expect(
      validateKnowledgeDirectory(directory, validators).errors,
    ).toHaveLength(2);
    fs.mkdirSync(path.join(directory, 'components'));
    fs.mkdirSync(path.join(directory, 'patterns'));
    expect(
      validateKnowledgeDirectory(directory, validators).errors,
    ).toHaveLength(2);
    fs.writeFileSync(path.join(directory, 'components/broken.yaml'), 'id: [');
    fs.writeFileSync(path.join(directory, 'patterns/broken.json'), '{');
    fs.writeFileSync(
      path.join(directory, 'patterns/ignored.tsx'),
      'not knowledge',
    );
    fs.writeFileSync(
      path.join(directory, 'COMPONENT_EXAMPLE.yaml'),
      'not knowledge',
    );
    const result = validateKnowledgeDirectory(directory, validators);
    expect(result.filesChecked).toBe(2);
    expect(result.errors).toHaveLength(2);
    expect(result.errors.join('\n')).toContain('components/broken.yaml');
    expect(result.errors.join('\n')).toContain('patterns/broken.json');
  });

  it('accepts all current loader-consumed content', () => {
    const result = validateKnowledgeDirectory(undefined, validators);
    expect(result.errors).toEqual([]);
    expect(result.filesChecked).toBeGreaterThan(0);
  });
});
