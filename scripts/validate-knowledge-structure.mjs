// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';
import { validateFoundationReferences } from './knowledge-references.mjs';

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

const foundationsDir = path.join(repoRoot, 'knowledge', 'core', 'data', 'foundations');
const componentsDir = path.join(repoRoot, 'knowledge', 'core', 'data', 'components');
const patternsDir = path.join(repoRoot, 'knowledge', 'core', 'data', 'patterns');
const glossaryPath = path.join(repoRoot, 'knowledge', 'core', 'data', 'glossary.yaml');

// Mirrors the knowledge agent's loader so references resolve to loaded ids.
const loadDataFiles = (dir) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((file) => /\.(json|ya?ml)$/.test(file))
        .sort()
        .map((file) => {
          const source = fs.readFileSync(path.join(dir, file), 'utf8');
          return { file, data: file.endsWith('.json') ? JSON.parse(source) : yaml.parse(source) };
        })
    : [];

const glossaryTerms = fs.existsSync(glossaryPath)
  ? yaml.parse(fs.readFileSync(glossaryPath, 'utf8'))
  : [];
const glossaryIds = new Set(glossaryTerms.map((term) => term.id));

glossaryTerms.forEach((term) => {
  (term.confusedWith ?? []).forEach((confusedId) => {
    if (!glossaryIds.has(confusedId)) {
      violations.push(
        `knowledge/core/data/glossary.yaml: term "${term.id}" has confusedWith reference to unknown term "${confusedId}"`,
      );
    }
  });
});

const foundationsByFile = loadDataFiles(foundationsDir).map(({ file, data }) => ({
  file,
  foundation: data,
}));
const componentIds = new Set(loadDataFiles(componentsDir).map(({ data }) => data?.id));
const patternIds = new Set(loadDataFiles(patternsDir).map(({ data }) => data?.id));

violations.push(
  ...validateFoundationReferences(foundationsByFile, {
    glossary: glossaryIds,
    component: componentIds,
    pattern: patternIds,
  }),
);

if (violations.length > 0) {
  console.error('Knowledge structure validation failed:');
  violations.forEach((violation) => {
    console.error(`  - ${violation}`);
  });
  process.exit(1);
}

console.log('OK knowledge structure');