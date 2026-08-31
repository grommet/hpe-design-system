// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { generateSystemPrompt } from './context-generator.js';

const args = process.argv.slice(2);
const frameworkIndex = args.indexOf('--framework');
const framework = frameworkIndex >= 0 ? (args[frameworkIndex + 1] ?? 'react') : 'react';
const queryArg = args.find((arg) => !arg.startsWith('-')) ?? null;

if (!queryArg) {
  console.log(`
HPE Design System Context Generator

Usage:
  hpe-design-system-agent "Build a login form"
  hpe-design-system-agent "Create a dashboard" --framework react
`);
  process.exit(1);
}

console.log(generateSystemPrompt(queryArg, framework as any));
