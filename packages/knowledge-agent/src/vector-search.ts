// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  ComponentDefinition,
  DesignSystemSchema,
  PatternDefinition,
} from './types.js';

export type SearchEntityType = 'component' | 'pattern';

export interface SearchEntity {
  id: string;
  type: SearchEntityType;
  name: string;
  text: string;
}

export interface SearchResult {
  entity: SearchEntity;
  score: number;
}

type SparseVector = Map<string, number>;

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'in',
  'into',
  'is',
  'it',
  'of',
  'on',
  'or',
  'that',
  'the',
  'this',
  'to',
  'use',
  'using',
  'with',
]);

const QUERY_EXPANSIONS: Record<string, string[]> = {
  account: ['user', 'identity', 'profile'],
  accounts: ['users', 'identities', 'profiles'],
  filtered: ['filter', 'filtering', 'data', 'table'],
  filters: ['filter', 'filtering', 'data', 'table'],
  directory: ['table', 'list', 'collection'],
  event: ['activity', 'status', 'audit'],
  events: ['activities', 'statuses', 'audit'],
  preference: ['setting', 'form'],
  preferences: ['settings', 'form'],
  roster: ['users', 'table', 'list'],
};

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function tokenize(value: string): string[] {
  return normalizeSearchText(value)
    .split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function expandQueryTokens(tokens: string[]): string[] {
  return tokens.flatMap((token) => [token, ...(QUERY_EXPANSIONS[token] ?? [])]);
}

function toVector(tokens: string[]): SparseVector {
  const vector: SparseVector = new Map();
  tokens.forEach((token) => {
    vector.set(token, (vector.get(token) ?? 0) + 1);
  });
  return vector;
}

function cosineSimilarity(a: SparseVector, b: SparseVector): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  a.forEach((value, key) => {
    dot += value * (b.get(key) ?? 0);
    normA += value * value;
  });

  b.forEach((value) => {
    normB += value * value;
  });

  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function componentText(component: ComponentDefinition): string {
  return [
    component.name,
    component.id,
    component.description,
    ...(component.usage?.whenToUse ?? []),
    ...(component.usage?.whenToAvoid ?? []),
    ...(component.variants ?? []).flatMap((variant) => [
      variant.name,
      variant.description,
      variant.when,
    ]),
    ...(component.examples ?? []).map((example) => example.description),
    ...(component.anatomy ?? []).flatMap((part) => [
      part.label,
      part.region,
      part.purpose,
      part.notes ?? '',
    ]),
  ].join(' ');
}

function patternText(pattern: PatternDefinition): string {
  const graphText = pattern.graph
    ? pattern.graph.nodes
        .flatMap((node) => [
          node.id,
          node.componentId,
          node.role ?? '',
          node.notes ?? '',
          ...Object.values(node.props).map(String),
        ])
        .join(' ')
    : '';

  return [
    pattern.name,
    pattern.id,
    ...(pattern.aliases ?? []),
    pattern.description,
    pattern.problem,
    pattern.solution,
    ...(pattern.usage?.whenToUse ?? []),
    ...(pattern.usage?.whenToAvoid ?? []),
    ...(pattern.relatedComponents ?? []),
    ...(pattern.relatedPatterns ?? []),
    ...(pattern.examples ?? []).map((example) => example.description),
    graphText,
  ].join(' ');
}

export function buildSearchEntities(ds: DesignSystemSchema): SearchEntity[] {
  return [
    ...ds.components.map((component) => ({
      id: component.id,
      type: 'component' as const,
      name: component.name,
      text: componentText(component),
    })),
    ...ds.patterns.map((pattern) => ({
      id: pattern.id,
      type: 'pattern' as const,
      name: pattern.name,
      text: patternText(pattern),
    })),
  ];
}

export function querySearchEntities(
  entities: SearchEntity[],
  query: string,
  options: { topK?: number; minScore?: number } = {},
): SearchResult[] {
  const topK = options.topK ?? 6;
  const minScore = options.minScore ?? 0.08;
  const queryVector = toVector(expandQueryTokens(tokenize(query)));

  return entities
    .map((entity) => ({
      entity,
      score: cosineSimilarity(queryVector, toVector(tokenize(entity.text))),
    }))
    .filter((result) => result.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
