// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { formatContext, searchKnowledge } from './context-generator.js';
import type { KnowledgeSnapshot } from './knowledge.js';
import {
  findRule,
  renderChecklist,
  renderRule,
  type RuleDetail,
} from './rules.js';
import type { FrameworkTarget } from './types.js';

const allowedFrameworks: FrameworkTarget[] = [
  'react',
  'vue',
  'angular',
  'web-components',
  'agnostic',
];

function usage(): void {
  console.log(`
HPE Design System Context Generator

Usage:
  hpe-design-agent "Build a login form"
  hpe-design-agent "Create a dashboard" --framework react --json

Options:
  --framework <target>  react, vue, angular, web-components, agnostic
  --json                Structured results (no terminal styling)
  --rules <checklist|full|none>
                        Foundation Rules detail in text (default: checklist)
  --rule <id>           Print one rule in full, without requiring a query
  --checklist           Print all foundation rules, without requiring a query
  --help                Show this help message
`);
}

export function runCli(
  load: () => KnowledgeSnapshot,
  mode: 'source' | 'bundled',
): void {
  try {
    const args = process.argv.slice(2);
    const positional: string[] = [];
    let framework: FrameworkTarget = 'react';
    let json = false;
    let help = false;
    let ruleDetail: RuleDetail | 'none' = 'checklist';
    let ruleId: string | undefined;
    let checklist = false;
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      if (arg === '--help' || arg === '-h') help = true;
      else if (arg === '--json') json = true;
      else if (arg === '--checklist') checklist = true;
      else if (arg === '--framework' || arg === '-f') {
        i += 1;
        const next = args[i];
        if (!next || next.startsWith('-')) {
          throw new TypeError(`Missing value for ${arg}`);
        }
        const target = allowedFrameworks.find(value => value === next);
        if (!target) {
          const expected = allowedFrameworks.join(', ');
          throw new TypeError(
            `Unknown framework target: ${next}. Expected one of: ${expected}`,
          );
        }
        framework = target;
      } else if (arg === '--rules' || arg === '--rule') {
        i += 1;
        const next = args[i];
        if (!next || next.startsWith('-')) {
          throw new TypeError(`Missing value for ${arg}`);
        }
        if (arg === '--rule') ruleId = next;
        else {
          const details = ['checklist', 'full', 'none'] as const;
          const detail = details.find(value => value === next);
          if (!detail) {
            const expected = details.join(', ');
            throw new TypeError(
              `Unknown rules detail: ${next}. Expected one of: ${expected}`,
            );
          }
          ruleDetail = detail;
        }
      } else if (arg === '--') {
        // Package managers may forward their argument separator.
      } else if (arg.startsWith('-')) {
        throw new TypeError(`Unknown option: ${arg}`);
      } else positional.push(arg);
    }
    if (help) {
      usage();
      return;
    }
    if (checklist && ruleId) {
      throw new TypeError('--checklist and --rule cannot be used together');
    }
    if (checklist || ruleId) {
      if (json) {
        throw new TypeError('--json cannot be used with --rule or --checklist');
      }
      const { foundations, glossary } = load().content;
      if (checklist) {
        console.log(`### Foundation Rules\n\n${renderChecklist(foundations)}`);
      } else if (ruleId) {
        const match = findRule(foundations, ruleId);
        if (!match) {
          const validIds = foundations.flatMap(foundation =>
            foundation.rules.map(rule => rule.id),
          );
          throw new TypeError(
            `Unknown rule id: ${ruleId}. Valid ids: ${validIds.join(', ')}`,
          );
        }
        console.log(renderRule(match.foundation, match.rule, glossary));
      }
      return;
    }
    const query = positional.join(' ');
    if (!query.trim()) throw new TypeError('Query must be a non-empty string.');
    const result = searchKnowledge(load(), mode, query, framework);
    console.log(
      json ? JSON.stringify(result) : formatContext(result, ruleDetail),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    if (error instanceof TypeError && !process.argv.includes('--json')) usage();
    process.exitCode = 1;
  }
}
