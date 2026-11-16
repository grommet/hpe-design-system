// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadComponents, loadPatterns } from './data-loader.js';
import { digestContent } from './knowledge.js';
import type { KnowledgeSnapshot } from './knowledge.js';

export const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));

const instructionKeywords: Record<string, string[]> = {
  'coding-guidelines.instructions.md': [
    'grommet',
    'component',
    'token',
    'design system',
    'accessibility',
    'button',
    'layout',
    'theme',
  ],
  'grommet-layouts.instructions.md': [
    'layout',
    'page',
    'shell',
    'app',
    'navigation',
    'header',
    'sidebar',
    'grid',
    'structure',
  ],
  'grommet-responsive.instructions.md': [
    'responsive',
    'mobile',
    'breakpoint',
    'screen size',
    'tablet',
    'desktop',
  ],
  'grommet-data.instructions.md': [
    'data',
    'table',
    'list',
    'datatable',
    'filter',
    'sort',
    'pagination',
  ],
};

function readInstructions(sourceRevision: string) {
  const directory = 'knowledge/core/instructions/standards';
  return Object.entries(instructionKeywords)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, keywords]) => {
      const sourcePath = `${directory}/${name}`;
      const content = fs
        .readFileSync(path.join(repoRoot, sourcePath), 'utf8')
        .replace(/\]\(([^)]+)\)/g, (match: string, target: string) => {
          if (/^(?:[a-z]+:|#)/i.test(target)) return match;
          const [relative, fragment] = target.split('#');
          const resolved = path.posix.normalize(`${directory}/${relative}`);
          if (!fs.existsSync(path.join(repoRoot, resolved))) {
            throw new Error(
              `Broken instruction reference: ${sourcePath}: ${target}`,
            );
          }
          const url = `https://github.com/grommet/hpe-design-system/blob/${sourceRevision}/${resolved}`;
          return `](${url}${fragment ? `#${fragment}` : ''})`;
        });
      return {
        id: `knowledge:instruction/${name.replace('.instructions.md', '')}`,
        name,
        keywords,
        content,
      };
    });
}

export function loadSourceKnowledge(
  options: { strict?: boolean } = {},
): KnowledgeSnapshot {
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' }).trim();
  const sourceRevision = git('rev-parse', 'HEAD');
  const dirty = git('status', '--porcelain', '--untracked-files=normal') !== '';
  const manifest: { version: string } = JSON.parse(
    fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
  );
  const content = {
    components: loadComponents(options),
    patterns: loadPatterns(options),
    instructions: readInstructions(sourceRevision),
  };
  return {
    schemaVersion: 1,
    packageVersion: manifest.version,
    sourceRevision,
    dirty,
    contentDigest: digestContent(content),
    content,
  };
}
