// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createHash } from 'node:crypto';
import type {
  ComponentDefinition,
  FoundationDefinition,
  FrameworkTarget,
  GlossaryTerm,
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
  foundations: FoundationDefinition[];
  glossary: GlossaryTerm[];
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
  foundations: FoundationDefinition[];
  glossary: GlossaryTerm[];
  sources: {
    id: string;
    type: 'component' | 'pattern' | 'instruction' | 'foundation' | 'glossary';
  }[];
  diagnostics: { code: 'conceptual-framework'; message: string }[];
}

export function digestContent(content: KnowledgeContent): string {
  return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}
