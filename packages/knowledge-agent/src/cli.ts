// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { generateSystemPrompt } from './context-generator.js';
import { loadFoundations, loadGlossary } from './data-loader.js';
import { findRule, renderRule, type RuleDetail } from './rules.js';
import type { FrameworkTarget } from './types.js';

const color = {
  bold: '\u001B[1m',
  cyan: '\u001B[36m',
  red: '\u001B[31m',
  reset: '\u001B[0m',
};

const allowedFrameworks: FrameworkTarget[] = [
  'react',
  'vue',
  'angular',
  'web-components',
  'agnostic',
];

function highlight(value: string): string {
  return `${color.cyan}${value}${color.reset}`;
}

function printParseError(message: string): void {
  console.error(`${color.red}${color.bold}Error:${color.reset} ${message}`);
}

function printUsage(): void {
  console.log(`
HPE Design System Context Generator

Usage:
  hpe-design-agent "Build a login form"
  hpe-design-agent "Create a dashboard" --framework react

Arguments:
  query                The user query describing what to build (required)

Options:
  --framework <target> Target framework: react, vue, angular,
  web-components, agnostic (default: react)
  --rules <checklist|full|none>
                        detail for the Foundation Rules section
                        (default: checklist)
  --rule <id>           print that one rule in full and exit 0
  --help                Show this help message
`);
}

function parseArgs(args: string[]): {
  query: string | null;
  framework: FrameworkTarget;
  ruleDetail: RuleDetail | 'none';
  ruleId: string | null;
  help: boolean;
} {
  const positional: string[] = [];
  let framework: FrameworkTarget = 'react';
  let ruleDetail: RuleDetail | 'none' = 'checklist';
  let ruleId: string | null = null;
  let help = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      help = true;
    } else if (arg === '--framework' || arg === '-f') {
      const next = args[i + 1];

      if (!next || next.startsWith('-')) {
        printParseError(`Missing value for ${highlight(arg)}`);
        printUsage();
        process.exit(1);
      }

      if (!allowedFrameworks.includes(next as FrameworkTarget)) {
        const expectedFrameworks = allowedFrameworks.map(highlight).join(', ');

        printParseError(
          `Unknown framework target: ${highlight(
            next,
          )}. Expected one of: ${expectedFrameworks}`,
        );
        printUsage();
        process.exit(1);
      }

      framework = next as FrameworkTarget;
      i += 1;
    } else if (arg === '--rules') {
      const next = args[i + 1];
      const allowedDetails = ['checklist', 'full', 'none'];

      if (!next || next.startsWith('-')) {
        printParseError(`Missing value for ${highlight(arg)}`);
        printUsage();
        process.exit(1);
      }

      if (!allowedDetails.includes(next)) {
        const expectedDetails = allowedDetails.map(highlight).join(', ');
        printParseError(
          `Unknown rules detail: ${highlight(
            next,
          )}. Expected one of: ${expectedDetails}`,
        );
        printUsage();
        process.exit(1);
      }

      ruleDetail = next as RuleDetail | 'none';
      i += 1;
    } else if (arg === '--rule') {
      const next = args[i + 1];

      if (!next || next.startsWith('-')) {
        printParseError(`Missing value for ${highlight(arg)}`);
        printUsage();
        process.exit(1);
      }

      ruleId = next;
      i += 1;
    } else if (arg === '--') {
      // Ignore argument separators passed through by package managers.
    } else if (arg.startsWith('-')) {
      printParseError(`Unknown option: ${highlight(arg)}`);
      printUsage();
      process.exit(1);
    } else {
      positional.push(arg);
    }
  }

  return {
    query: positional.length ? positional.join(' ') : null,
    framework,
    ruleDetail,
    ruleId,
    help,
  };
}

const { query, framework, ruleDetail, ruleId, help } = parseArgs(
  process.argv.slice(2),
);

if (help) {
  printUsage();
  process.exit(0);
}

if (ruleId) {
  const foundations = loadFoundations();
  const match = findRule(foundations, ruleId);

  if (!match) {
    const validIds = foundations.flatMap(foundation =>
      foundation.rules.map(rule => rule.id),
    );
    printParseError(
      `Unknown rule id: ${highlight(ruleId)}. Valid ids: ${validIds.join(', ')}`,
    );
    process.exit(1);
  }

  console.log(renderRule(match.foundation, match.rule, loadGlossary()));
  process.exit(0);
}

if (!query) {
  printUsage();
  process.exit(1);
}

console.log(generateSystemPrompt(query, framework, ruleDetail));
