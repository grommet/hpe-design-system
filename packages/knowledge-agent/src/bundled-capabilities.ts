// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import type {
  CapabilityBundle,
  CapabilityCatalog,
  CapabilityInstallAsset,
} from './capabilities.js';

const catalogPath = fileURLToPath(
  new URL('../../../capabilities.json', import.meta.url),
);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isAsset(value: unknown): value is CapabilityInstallAsset {
  return (
    isRecord(value) &&
    typeof value.path === 'string' &&
    typeof value.content === 'string'
  );
}

function isCapability(value: unknown): value is CapabilityBundle {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.version === 'string' &&
    typeof value.summary === 'string' &&
    Array.isArray(value.stages) &&
    value.stages.every(
      stage =>
        isRecord(stage) &&
        typeof stage.id === 'string' &&
        typeof stage.description === 'string',
    ) &&
    Array.isArray(value.agentIds) &&
    value.agentIds.every(agentId => typeof agentId === 'string') &&
    Array.isArray(value.documentation) &&
    value.documentation.every(isAsset) &&
    Array.isArray(value.assets) &&
    value.assets.every(isAsset)
  );
}

export function loadBundledCapabilityCatalog(): CapabilityCatalog {
  const source = fs.readFileSync(catalogPath, 'utf8');
  const catalog: unknown = JSON.parse(source);
  if (
    !isRecord(catalog) ||
    catalog.schemaVersion !== 1 ||
    !isAsset(catalog.frontdoorAgent) ||
    !Array.isArray(catalog.capabilities) ||
    !catalog.capabilities.every(isCapability)
  ) {
    throw new Error('Invalid bundled capability catalog.');
  }
  return {
    schemaVersion: 1,
    frontdoorAgent: catalog.frontdoorAgent,
    capabilities: catalog.capabilities,
  };
}
