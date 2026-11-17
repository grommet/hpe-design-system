// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import { loadFoundations, loadGlossary } from './data-loader';
import { findRule, renderChecklist, renderRule } from './rules';

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

describe('foundation rule projections', () => {
  const foundations = loadFoundations();
  const glossary = loadGlossary();

  it('renders every rule as a lean checklist without rationale or URLs', () => {
    const checklist = renderChecklist(foundations);

    foundations.forEach(foundation => {
      foundation.rules.forEach(rule => {
        expect(checklist).toContain(`[${rule.id}]`);
        expect(checklist).toContain(collapseWhitespace(rule.statement));
        expect(checklist).not.toContain(collapseWhitespace(rule.rationale));
      });
    });
    expect(checklist).not.toContain('http');
  });

  it('renders a rule with rationale, links, and referenced terms', () => {
    const match = findRule(foundations, 'color-names-its-target');
    expect(match).toBeDefined();

    const rendered = renderRule(match!.foundation, match!.rule, glossary);
    expect(rendered).toContain(collapseWhitespace(match!.rule.rationale));
    expect(rendered).toMatch(/\[[^\]]+\]\(https?:\/\/[^)]+\)/);
    expect(rendered).toContain(
      'The part of the UI a color token is applied to',
    );
  });

  it('returns undefined for an unknown rule id', () => {
    expect(findRule(foundations, 'does-not-exist')).toBeUndefined();
  });
});
