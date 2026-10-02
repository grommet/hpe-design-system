// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { FoundationDefinition, GlossaryTerm, Rule } from './types.js';

export type RuleDetail = 'checklist' | 'full';

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function findRule(
  foundations: FoundationDefinition[],
  ruleId: string,
): { foundation: FoundationDefinition; rule: Rule } | undefined {
  for (const foundation of foundations) {
    const rule = foundation.rules.find(candidate => candidate.id === ruleId);
    if (rule) return { foundation, rule };
  }
  return undefined;
}

export function renderChecklist(foundations: FoundationDefinition[]): string {
  const sections = foundations.map(foundation => {
    const rules = foundation.rules.map(rule => {
      const related = (rule.relatedTo ?? [])
        .filter(reference => reference.kind !== 'external' && reference.id)
        .map(reference => `${reference.kind}:${reference.id}`)
        .join(',');
      const suffix = related ? ` (see: ${related})` : '';
      return `- [${rule.id}] ${collapseWhitespace(rule.statement)}${suffix}`;
    });
    return [`### ${foundation.name}`, ...rules].join('\n');
  });

  return [
    ...sections,
    'Rationale and examples are available per rule id: run with --rule <id>.',
  ].join('\n\n');
}

export function renderRule(
  foundation: FoundationDefinition,
  rule: Rule,
  glossary: GlossaryTerm[],
): string {
  const lines = [
    `#### ${rule.id} (${foundation.name})`,
    '',
    '****Statement:****',
    collapseWhitespace(rule.statement),
    '',
    '****Rationale:****',
    collapseWhitespace(rule.rationale),
  ];

  if (rule.example) {
    lines.push(
      '',
      rule.example.description,
      '',
      '```jsx',
      rule.example.code,
      '```',
    );
  }

  const related = rule.relatedTo ?? [];
  if (related.length > 0) {
    lines.push('', 'Related:');
    related.forEach(reference => {
      if (reference.kind === 'external' && reference.url) {
        lines.push(`- [${reference.label ?? reference.url}](${reference.url})`);
      } else if (reference.id) {
        lines.push(`- ${reference.kind}: ${reference.id}`);
      }
    });
  }

  const glossaryTerms = related
    .filter(reference => reference.kind === 'glossary' && reference.id)
    .map(reference => glossary.find(term => term.id === reference.id))
    .filter((term): term is GlossaryTerm => Boolean(term));
  if (glossaryTerms.length > 0) {
    lines.push('', 'Terms:');
    glossaryTerms.forEach(term => {
      lines.push(`- ${term.term}: ${collapseWhitespace(term.definition)}`);
    });
  }

  return lines.join('\n');
}

export function renderRules(
  foundations: FoundationDefinition[],
  detail: RuleDetail,
  glossary: GlossaryTerm[],
): string {
  if (detail === 'checklist') return renderChecklist(foundations);

  return foundations
    .flatMap(foundation =>
      foundation.rules.map(rule => renderRule(foundation, rule, glossary)),
    )
    .join('\n\n');
}
