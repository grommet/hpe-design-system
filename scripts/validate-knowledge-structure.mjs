// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';

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
const glossaryPath = path.join(repoRoot, 'knowledge', 'core', 'data', 'glossary.yaml');

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

const foundationFiles = fs.existsSync(foundationsDir)
  ? fs.readdirSync(foundationsDir).filter((file) => file.endsWith('.yaml'))
  : [];
const foundationsByFile = foundationFiles.map((file) => ({
  file,
  foundation: yaml.parse(fs.readFileSync(path.join(foundationsDir, file), 'utf8')),
}));

const ruleIds = new Set();
foundationsByFile.forEach(({ foundation }) => {
  (foundation.rules ?? []).forEach((rule) => ruleIds.add(rule.id));
});

foundationsByFile.forEach(({ file, foundation }) => {
  const seenInFile = new Set();
  (foundation.rules ?? []).forEach((rule) => {
    if (seenInFile.has(rule.id)) {
      violations.push(`knowledge/core/data/foundations/${file}: duplicate rule id "${rule.id}"`);
    }
    seenInFile.add(rule.id);

    (rule.relatedTo ?? []).forEach((ref) => {
      if (ref.kind === 'glossary' && !glossaryIds.has(ref.id)) {
        violations.push(
          `knowledge/core/data/foundations/${file}: rule "${rule.id}" has relatedTo reference to unknown glossary term "${ref.id}"`,
        );
      }
      if (ref.kind === 'rule' && !ruleIds.has(ref.id)) {
        violations.push(
          `knowledge/core/data/foundations/${file}: rule "${rule.id}" has relatedTo reference to unknown rule "${ref.id}"`,
        );
      }
    });
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