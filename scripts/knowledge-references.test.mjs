// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateFoundationReferences } from './knowledge-references.mjs';

const knownIds = {
  glossary: new Set(['surface']),
  component: new Set(['card']),
  pattern: new Set(['application-shell']),
};

const foundation = (file, rules) => ({ file, foundation: { rules } });
const rule = (id, relatedTo) => ({ id, relatedTo });
const layoutAViolation = (reference, problem) =>
  'knowledge/core/data/foundations/layout.yaml: rule "layout-a" has ' +
  `relatedTo reference ${JSON.stringify(reference)} ${problem}`;

describe('validateFoundationReferences', () => {
  it('accepts valid internal and external references', () => {
    const violations = validateFoundationReferences(
      [
        foundation('layout.yaml', [
          rule('layout-a', [
            { kind: 'glossary', id: 'surface' },
            { kind: 'component', id: 'card' },
            { kind: 'pattern', id: 'application-shell' },
            {
              kind: 'external',
              label: 'Reference',
              url: 'https://example.com',
            },
          ]),
        ]),
      ],
      knownIds,
    );

    assert.deepEqual(violations, []);
  });

  it('resolves rule references across files and forward in a file', () => {
    const violations = validateFoundationReferences(
      [
        foundation('color.yaml', [
          rule('color-a', [{ kind: 'rule', id: 'spacing-b' }]),
        ]),
        foundation('spacing.yaml', [
          rule('spacing-a', [{ kind: 'rule', id: 'spacing-b' }]),
          rule('spacing-b', [{ kind: 'rule', id: 'color-a' }]),
        ]),
      ],
      knownIds,
    );

    assert.deepEqual(violations, []);
  });

  it('reports duplicate rule ids within one file', () => {
    const violations = validateFoundationReferences(
      [foundation('layout.yaml', [rule('layout-a'), rule('layout-a')])],
      knownIds,
    );

    assert.equal(violations.length, 1);
    assert.match(
      violations[0],
      /layout\.yaml: duplicate rule id "layout-a" \(first defined in .*layout\.yaml\)/,
    );
  });

  it('reports duplicate rule ids across files', () => {
    const violations = validateFoundationReferences(
      [
        foundation('color.yaml', [rule('shared-id')]),
        foundation('spacing.yaml', [rule('shared-id')]),
      ],
      knownIds,
    );

    assert.equal(violations.length, 1);
    assert.match(
      violations[0],
      /spacing\.yaml: duplicate rule id "shared-id" \(first defined in .*color\.yaml\)/,
    );
  });

  it('reports unresolved ids for every internal kind', () => {
    const kinds = ['glossary', 'rule', 'component', 'pattern'];
    const violations = validateFoundationReferences(
      [
        foundation('layout.yaml', [
          rule(
            'layout-a',
            kinds.map(kind => ({ kind, id: `missing-${kind}` })),
          ),
        ]),
      ],
      knownIds,
    );

    assert.deepEqual(
      violations,
      kinds.map(kind =>
        layoutAViolation(
          { kind, id: `missing-${kind}` },
          `to unknown ${kind} id`,
        ),
      ),
    );
  });

  it('reports internal references without an id', () => {
    const violations = validateFoundationReferences(
      [
        foundation('layout.yaml', [
          rule('layout-a', [{ kind: 'component', label: 'Card' }]),
        ]),
      ],
      knownIds,
    );

    assert.deepEqual(violations, [
      layoutAViolation({ kind: 'component', label: 'Card' }, 'without an id'),
    ]);
  });

  it('reports malformed external references', () => {
    const violations = validateFoundationReferences(
      [
        foundation('layout.yaml', [
          rule('layout-a', [
            { kind: 'external', id: 'https://example.com' },
            { kind: 'external', label: 'Docs', url: '' },
          ]),
        ]),
      ],
      knownIds,
    );

    assert.deepEqual(violations, [
      layoutAViolation(
        { kind: 'external', id: 'https://example.com' },
        'without a label',
      ),
      layoutAViolation(
        { kind: 'external', id: 'https://example.com' },
        'without a url',
      ),
      layoutAViolation(
        { kind: 'external', label: 'Docs', url: '' },
        'without a url',
      ),
    ]);
  });

  it('reports unknown kinds and non-object references', () => {
    const violations = validateFoundationReferences(
      [
        foundation('layout.yaml', [
          rule('layout-a', [{ kind: 'token', id: 'spacing-medium' }, 'card']),
        ]),
      ],
      knownIds,
    );

    assert.deepEqual(violations, [
      layoutAViolation(
        { kind: 'token', id: 'spacing-medium' },
        'with unknown kind; expected one of ' +
          'glossary, rule, component, pattern, external',
      ),
      layoutAViolation('card', 'that is not an object'),
    ]);
  });
});
