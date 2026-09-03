// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptFilePath = fileURLToPath(import.meta.url);
const scriptDirPath = path.dirname(scriptFilePath);
const repoRoot = path.resolve(scriptDirPath, '..');

const readIfExists = (relativePath) => {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) return null;
  return fs.readFileSync(absolutePath, 'utf8');
};

const requiredPaths = [
  'knowledge/code-connect/package.json',
  'knowledge/code-connect/src',
  'knowledge/core/instructions/code-connect/guidelines.instructions.md',
  'knowledge/core/instructions/code-connect/file-structure.instructions.md',
  'knowledge/core/instructions/code-connect/component-guidelines.instructions.md',
  'knowledge/core/instructions/code-connect/figma-mcp.instructions.md',
  'knowledge/core/prompts/code-connect-component.prompt.md',
];

const staleReferenceChecks = [
  {
    path: '.github/instructions/code-connect/code-connect-guidelines.instructions.md',
    patterns: [/packages\/code-connect/, /get_context_for_code_connect/],
  },
  {
    path: '.github/instructions/code-connect/code-connect-file-structure.instructions.md',
    patterns: [/packages\/code-connect/, /get_context_for_code_connect/],
  },
  {
    path: '.github/instructions/code-connect/code-connect-component-guidelines.instructions.md',
    patterns: [/packages\/code-connect/, /get_context_for_code_connect/],
  },
  {
    path: '.github/instructions/code-connect/code-connect-figma-mcp.instructions.md',
    patterns: [/packages\/code-connect/, /get_context_for_code_connect/],
  },
  {
    path: '.github/prompts/code-connect-component.prompt.md',
    patterns: [
      /packages\/code-connect/,
      /\.github\/instructions\/code-connect/,
      /get_context_for_code_connect/,
    ],
  },
];

const thinPromptChecks = [
  {
    path: '.github/prompts/code-connect-component.prompt.md',
    requiredReference: 'knowledge/core/prompts/code-connect-component.prompt.md',
    forbiddenHeadings: ['## Workflow', '## Authoring Rules', '## Example Function Constraints'],
  },
  {
    path: '.github/instructions/code-connect/code-connect-guidelines.instructions.md',
    requiredReference: 'knowledge/core/instructions/code-connect/guidelines.instructions.md',
    forbiddenHeadings: ['## Overview', '## Finding the Correct Node ID'],
  },
  {
    path: '.github/instructions/code-connect/code-connect-file-structure.instructions.md',
    requiredReference: 'knowledge/core/instructions/code-connect/file-structure.instructions.md',
    forbiddenHeadings: ['## File Naming', '## File Location', '## Syncing to Figma'],
  },
  {
    path: '.github/instructions/code-connect/code-connect-component-guidelines.instructions.md',
    requiredReference:
      'knowledge/core/instructions/code-connect/component-guidelines.instructions.md',
    forbiddenHeadings: ['## Planning Inputs', '## Required Imports', '## Property Mapping'],
  },
  {
    path: '.github/instructions/code-connect/code-connect-figma-mcp.instructions.md',
    requiredReference: 'knowledge/core/instructions/code-connect/figma-mcp.instructions.md',
    forbiddenHeadings: ['## Implementation Rules'],
  },
];

const violations = [];

requiredPaths.forEach((relativePath) => {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    violations.push(`${relativePath}: required knowledge path is missing`);
  }
});

staleReferenceChecks.forEach((check) => {
  const source = readIfExists(check.path);
  if (source === null) {
    violations.push(`${check.path}: expected Copilot entrypoint file is missing`);
    return;
  }
  check.patterns.forEach((pattern) => {
    const match = source.match(pattern);
    if (match) {
      violations.push(
        `${check.path}: stale reference "${match[0]}" should point to knowledge/code-connect or knowledge/core`,
      );
    }
  });
});

thinPromptChecks.forEach((check) => {
  const source = readIfExists(check.path);
  if (source === null) return;

  const authoritativeInstruction = `Read and follow \`${check.requiredReference}\``;
  if (!source.includes(authoritativeInstruction)) {
    violations.push(
      `${check.path}: Copilot entrypoint must instruct agents to read and follow ${check.requiredReference}`,
    );
  }

  check.forbiddenHeadings.forEach((heading) => {
    if (source.includes(heading)) {
      violations.push(
        `${check.path}: duplicate workflow heading "${heading}" belongs in ${check.requiredReference}`,
      );
    }
  });
});

if (violations.length > 0) {
  console.error('Knowledge structure validation failed:');
  violations.forEach((violation) => {
    console.error(`  - ${violation}`);
  });
  process.exit(1);
}

console.log('OK knowledge structure');