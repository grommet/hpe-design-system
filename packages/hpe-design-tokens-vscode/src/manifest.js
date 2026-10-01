// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const IDE_MANIFEST_SCHEMA_VERSION = 1;

const getDimensionShard = (manifest, mode) => {
  if (manifest?.schemaVersion !== IDE_MANIFEST_SCHEMA_VERSION) return undefined;

  const dimensions = manifest.collections?.dimension;
  if (!dimensions || typeof dimensions !== 'object') return undefined;

  return dimensions[mode] || dimensions.default;
};

const getColorShard = (manifest, mode) => {
  if (manifest?.schemaVersion !== IDE_MANIFEST_SCHEMA_VERSION) return undefined;

  const colors = manifest.collections?.color;
  if (!colors || typeof colors !== 'object') return undefined;

  return colors[`default.${mode}`] || colors['default.light'];
};

const getTokens = shard => {
  if (shard?.schemaVersion !== IDE_MANIFEST_SCHEMA_VERSION) return undefined;
  if (!shard.tokens || typeof shard.tokens !== 'object') return undefined;

  return shard.tokens;
};

module.exports = { getColorShard, getDimensionShard, getTokens };
