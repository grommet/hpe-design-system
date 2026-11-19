// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import { formatContext, searchKnowledge } from './context-generator';
import { loadSourceKnowledge } from './source-knowledge';
import type { FrameworkTarget } from './types';
import type { RuleDetail } from './rules';

const search = (query: string, framework: FrameworkTarget = 'react') =>
  searchKnowledge(loadSourceKnowledge(), 'source', query, framework);
const generateSystemPrompt = (
  query: string,
  framework: FrameworkTarget = 'react',
  ruleDetail: RuleDetail | 'none' = 'checklist',
) => formatContext(search(query, framework), ruleDetail);

describe('knowledge-agent context generator', () => {
  it('surfaces a login form pattern for authentication queries', () => {
    const prompt = generateSystemPrompt('Build a login form');

    expect(prompt).toContain('Login Form');
    expect(prompt).toMatch(/login-form|Login Form/i);
    expect(prompt).toContain('### Foundation Rules');
    expect(prompt).toContain('color-names-its-target');
    expect(prompt).not.toContain('### Foundational Rules');
    expect(prompt).not.toContain('### Glossary');
  });

  it('can omit foundation rules from the prompt', () => {
    const prompt = generateSystemPrompt('Build a login form', 'react', 'none');

    expect(prompt).not.toContain('### Foundation Rules');
  });

  it('renders foundation rules after components and patterns', () => {
    const prompt = generateSystemPrompt('Build a login form');
    const rulesIndex = prompt.indexOf('### Foundation Rules');

    expect(prompt.indexOf('### Available Components')).toBeGreaterThan(-1);
    expect(prompt.indexOf('### Recommended Patterns')).toBeGreaterThan(-1);
    expect(rulesIndex).toBeGreaterThan(
      prompt.indexOf('### Available Components'),
    );
    expect(rulesIndex).toBeGreaterThan(
      prompt.indexOf('### Recommended Patterns'),
    );
  });

  it('exposes foundation and glossary data in structured results', () => {
    const result = search('Build a login form');
    expect(
      result.foundations.flatMap(foundation =>
        foundation.rules.map(rule => rule.id),
      ),
    ).toContain('color-names-its-target');
    expect(result.glossary.map(term => term.id)).toContain('color-target');
    expect(result.sources).toContainEqual({
      type: 'foundation',
      id: 'knowledge:foundation/color',
    });
    expect(result.sources).toContainEqual({
      type: 'glossary',
      id: 'knowledge:glossary/color-target',
    });
    expect(formatContext(result, 'full')).toContain('****Rationale:****');
  });

  it('includes relevant instructions for layout queries', () => {
    const prompt = generateSystemPrompt('Create an app shell with navigation');

    expect(prompt).toContain('Implementation Guidelines');
    expect(prompt).toMatch(/layout|navigation|app shell/i);
  });

  it('marks non-react targets as conceptual-only guidance', () => {
    const prompt = generateSystemPrompt('Build a login form', 'vue');
    expect(prompt).not.toContain('\u001B[');
    expect(prompt).toContain('Requested framework: vue');
    expect(prompt).toContain('conceptual guidance');
    expect(prompt).toContain('not yet fully validated for this target');
    expect(prompt).not.toContain('Import: grommet');
    expect(prompt).not.toContain('```tsx');
  });

  it('returns structured definitions, provenance and content identity', () => {
    const result = search('Build a login form');
    expect(result.status).toBe('matched');
    expect(result.patterns.map(pattern => pattern.id)).toContain('login-form');
    expect(
      result.patterns.find(pattern => pattern.id === 'login-form')
        ?.templateCode,
    ).toContain('FormField');
    expect(result.sources).toContainEqual({
      type: 'pattern',
      id: 'knowledge:pattern/login-form',
    });
    expect(result.knowledge.mode).toBe('source');
    expect(result.knowledge.contentDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(result.knowledge.sourceRevision).toMatch(/^[a-f0-9]{40}$/);
  });

  it.each(['qzxjkvxyz', '!!!'])(
    'distinguishes no matches for %s from errors',
    query => {
      const result = search(query);
      expect(result.status).toBe('no-match');
      expect(result.components).toEqual([]);
      expect(result.patterns).toEqual([]);
      expect(formatContext(result)).toContain('No Direct Matches Found');
    },
  );

  it.each(['', '  \n '])('rejects empty query %j', query => {
    expect(() => search(query)).toThrow('non-empty string');
  });

  it('returns conceptual diagnostics separately from styling', () => {
    const result = search('Build a login form', 'angular');
    expect(result.frameworkStatus).toBe('conceptual');
    expect(result.diagnostics[0].code).toBe('conceptual-framework');
    expect(result.diagnostics[0].message).toContain('not yet fully validated');
  });
});
