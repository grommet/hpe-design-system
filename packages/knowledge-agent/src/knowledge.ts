// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createHash } from 'node:crypto';
import type {
  ComponentDefinition,
  FrameworkTarget,
  PatternDefinition,
} from './types.js';

export interface Instruction {
  id: string;
  name: string;
  keywords: string[];
  content: string;
}

export interface KnowledgeContent {
  components: ComponentDefinition[];
  patterns: PatternDefinition[];
  instructions: Instruction[];
}

export interface KnowledgeSnapshot {
  schemaVersion: 1;
  packageVersion: string;
  sourceRevision: string;
  dirty: boolean;
  contentDigest: string;
  content: KnowledgeContent;
}

export interface QueryResult {
  schemaVersion: 1;
  packageVersion: string;
  knowledge: {
    version: string;
    schemaVersion: 1;
    contentDigest: string;
    sourceRevision: string;
    dirty: boolean;
    mode: 'source' | 'bundled';
  };
  query: string;
  framework: FrameworkTarget;
  frameworkStatus: 'react-grommet' | 'conceptual';
  status: 'matched' | 'no-match';
  components: ComponentDefinition[];
  patterns: PatternDefinition[];
  instructions: Instruction[];
  sources: { id: string; type: 'component' | 'pattern' | 'instruction' }[];
  diagnostics: { code: 'conceptual-framework'; message: string }[];
}

export function digestContent(content: KnowledgeContent): string {
  return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}
