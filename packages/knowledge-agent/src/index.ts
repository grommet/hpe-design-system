// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { loadBundledKnowledge } from './bundled-knowledge.js';
import { getCapability, listCapabilities } from './capabilities.js';
import { loadBundledCapabilityCatalog } from './bundled-capabilities.js';
import { formatContext, searchKnowledge } from './context-generator.js';
import type { FrameworkTarget } from './types.js';
import type { RuleDetail } from './rules.js';

export type * from './types.js';
export type { QueryResult } from './knowledge.js';
export type { RuleDetail } from './rules.js';
export type {
  CapabilityBundle,
  CapabilityCatalog,
  CapabilityDescriptor,
  CapabilityDocumentation,
  CapabilityInstallAsset,
  CapabilityStage,
} from './capabilities.js';
export { getCapability, listCapabilities, loadBundledCapabilityCatalog };

export function searchDesignSystem(
  query: string,
  framework: FrameworkTarget = 'react',
) {
  return searchKnowledge(loadBundledKnowledge(), 'bundled', query, framework);
}

export function generateSystemPrompt(
  query: string,
  framework: FrameworkTarget = 'react',
  ruleDetail: RuleDetail | 'none' = 'checklist',
): string {
  return formatContext(searchDesignSystem(query, framework), ruleDetail);
}
