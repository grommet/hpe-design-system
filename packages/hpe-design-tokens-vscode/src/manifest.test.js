// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const assert = require('node:assert/strict');

const { getColorShard, getDimensionShard, getTokens } = require('./manifest');

const manifest = {
  schemaVersion: 1,
  collections: {
    color: {
      'default.dark': './color.dark.json',
      'default.light': './color.light.json',
    },
    dimension: {
      default: './dimension.default.json',
      small: './dimension.small.json',
    },
  },
};

test('selects a requested dimension mode', () => {
  assert.equal(getDimensionShard(manifest, 'small'), './dimension.small.json');
});

test('falls back to the default dimension mode', () => {
  assert.equal(
    getDimensionShard(manifest, 'large'),
    './dimension.default.json',
  );
});

test('selects a requested color mode', () => {
  assert.equal(getColorShard(manifest, 'dark'), './color.dark.json');
});

test('falls back to the light color mode', () => {
  assert.equal(getColorShard(manifest, 'highContrast'), './color.light.json');
});

test('accepts a valid token shard', () => {
  const tokens = getTokens({
    schemaVersion: 1,
    tokens: { 'hpe.spacing.5xsmall': { value: '3px' } },
  });

  assert.equal(tokens['hpe.spacing.5xsmall'].value, '3px');
});

test('rejects unknown manifest schemas', () => {
  assert.equal(getDimensionShard({ schemaVersion: 2 }, 'default'), undefined);
  assert.equal(getColorShard({ schemaVersion: 2 }, 'light'), undefined);
  assert.equal(getTokens({ schemaVersion: 2, tokens: {} }), undefined);
});
