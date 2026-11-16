// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { formatContext } from './context-generator.js';
import type { QueryResult } from './knowledge.js';
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
  --help                Show this help message
`);
}

export function runCli(
  search: (query: string, framework: FrameworkTarget) => QueryResult,
): void {
  try {
    const args = process.argv.slice(2);
    const positional: string[] = [];
    let framework: FrameworkTarget = 'react';
    let json = false;
    let help = false;
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      if (arg === '--help' || arg === '-h') help = true;
      else if (arg === '--json') json = true;
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
    const query = positional.join(' ');
    if (!query.trim()) throw new TypeError('Query must be a non-empty string.');
    const result = search(query, framework);
    console.log(json ? JSON.stringify(result) : formatContext(result));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    if (error instanceof TypeError && !process.argv.includes('--json')) usage();
    process.exitCode = 1;
  }
}
