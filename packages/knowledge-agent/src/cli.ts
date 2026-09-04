// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { generateSystemPrompt } from './context-generator.js';
import type { FrameworkTarget } from './types.js';

function printUsage(): void {
  console.log(`
HPE Design System Context Generator

Usage:
  hpe-design-agent "Build a login form"
  hpe-design-agent "Create a dashboard" --framework react

Arguments:
  query                The user query describing what to build (required)

Options:
  --framework <target> Target framework: react, vue, angular, web-components, agnostic (default: react)
  --help                Show this help message
`);
}

function parseArgs(args: string[]): {
  query: string | null;
  framework: FrameworkTarget;
  help: boolean;
} {
  let query: string | null = null;
  let framework: FrameworkTarget = 'react';
  let help = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') help = true;
    else if (arg === '--framework' || arg === '-f') {
      const next = args[i + 1];
      if (next) framework = next as FrameworkTarget;
      i += 1;
    } else if (!arg.startsWith('-')) {
      query = arg;
    }
  }

  return { query, framework, help };
}

const { query, framework, help } = parseArgs(process.argv.slice(2));

if (help || !query) {
  printUsage();
  process.exit(help ? 0 : 1);
}

console.log(generateSystemPrompt(query, framework));
