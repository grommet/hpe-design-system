// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const assert = require('node:assert/strict');

const { createTokenIndex, findTokenAtPosition } = require('./resolver');

const tokenIndex = createTokenIndex([
  {
    'hpe.spacing.medium': { $value: '24px' },
    'hpe.spacing.6xsmall': { $value: '1px' },
    'hpe.borderRadius.medium': { $value: '4px' },
  },
]);

test('resolves a nested Grommet pad t-shirt size', () => {
  const line = "<ButtonGroup pad={{ top: 'medium' }}>";
  const match = findTokenAtPosition(
    line,
    line.indexOf('medium') + 2,
    tokenIndex,
  );

  assert.deepEqual(match, {
    name: 'hpe.spacing.medium',
    token: { $value: '24px' },
    start: line.indexOf('medium'),
    end: line.indexOf('medium') + 'medium'.length,
  });
});

test('resolves the largest shipped small spacing size', () => {
  const line = '<Box gap="6xsmall" />';
  const match = findTokenAtPosition(
    line,
    line.indexOf('6xsmall') + 2,
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.6xsmall');
  assert.equal(match.token.$value, '1px');
});

test('resolves an HPE CSS variable', () => {
  const line = 'gap: var(--hpe-spacing-medium);';
  const variable = '--hpe-spacing-medium';
  const match = findTokenAtPosition(
    line,
    line.indexOf(variable) + 8,
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.medium');
  assert.equal(match.token.$value, '24px');
});

test('does not guess a token for unrelated strings', () => {
  assert.equal(findTokenAtPosition('label="medium"', 8, tokenIndex), undefined);
});
