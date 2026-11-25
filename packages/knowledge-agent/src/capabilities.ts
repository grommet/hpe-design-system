// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export interface CapabilityStage {
  id: string;
  description: string;
}

export interface CapabilityDescriptor {
  id: string;
  version: string;
  summary: string;
  stages: CapabilityStage[];
  agentIds: string[];
}

export interface CapabilityInstallAsset {
  path: string;
  content: string;
}

export type CapabilityDocumentation = CapabilityInstallAsset;

export interface CapabilityBundle extends CapabilityDescriptor {
  documentation: CapabilityDocumentation[];
  assets: CapabilityInstallAsset[];
}

export interface CapabilityCatalog {
  schemaVersion: 1;
  frontdoorAgent: CapabilityInstallAsset;
  capabilities: CapabilityBundle[];
}

export function listCapabilities(
  catalog: CapabilityCatalog,
): CapabilityDescriptor[] {
  return catalog.capabilities.map(
    ({ id, version, summary, stages, agentIds }) => ({
      id,
      version,
      summary,
      stages,
      agentIds,
    }),
  );
}

export function getCapability(
  catalog: CapabilityCatalog,
  id: string,
): CapabilityBundle | undefined {
  return catalog.capabilities.find(capability => capability.id === id);
}
