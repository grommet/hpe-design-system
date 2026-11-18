// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { digestContent } from './knowledge';
import {
  checkKnowledgeChangeset,
  compareKnowledgeArtifacts,
  namesKnowledgePackage,
} from '../../../scripts/validate-knowledge-changeset';

const directories: string[] = [];
const changeset =
  "---\n'@hpe-design/knowledge-agent': patch\n---\nFix guidance.\n";
const packagePath = 'packages/knowledge-agent';
const gitTestTimeout = 20_000;
function temporary() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'knowledge-guard-test-'));
  directories.push(root);
  return root;
}
function write(root: string, file: string, content: string) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}
function repository() {
  const root = temporary();
  const git = (...args: string[]) =>
    execFileSync('git', args, {
      cwd: root,
      encoding: 'utf8',
    }).trim();
  git('init', '--quiet');
  git('config', 'user.name', 'Test');
  git('config', 'user.email', 'test@example.invalid');
  write(
    root,
    `${packagePath}/package.json`,
    JSON.stringify({
      name: '@hpe-design/knowledge-agent',
      version: '0.1.0',
      private: true,
    }),
  );
  write(root, '.changeset/existing.md', changeset);
  git('add', '.');
  git('commit', '--quiet', '-m', 'base');
  const base = git('rev-parse', 'HEAD');
  return {
    root,
    base,
    commit() {
      git('add', '-A');
      git('commit', '--quiet', '-m', 'change');
      return git('rev-parse', 'HEAD');
    },
  };
}
afterEach(async () => {
  await Promise.all(
    directories
      .splice(0)
      .map(root => fs.promises.rm(root, { recursive: true, force: true })),
  );
});

describe('knowledge-agent Changeset guard', () => {
  it('requires package frontmatter and a nonempty summary', () => {
    expect(namesKnowledgePackage(changeset)).toBe(true);
    expect(
      namesKnowledgePackage(
        '---\nother-package: patch\n---\n@hpe-design/knowledge-agent: patch\n',
      ),
    ).toBe(false);
    expect(
      namesKnowledgePackage(
        "---\n'@hpe-design/knowledge-agent': patch\n---\n   ",
      ),
    ).toBe(false);
  });

  it.each([
    'knowledge/core/data/components/button.yaml',
    'knowledge/core/data/patterns/login-form.yaml',
    'knowledge/core/data/types.ts',
    'knowledge/core/data/foundations/color.yaml',
    'knowledge/core/data/glossary.yaml',
    'knowledge/core/instructions/standards/grommet-layouts.instructions.md',
  ])('does not accept an unchanged Changeset for %s', file => {
    const repo = repository();
    write(repo.root, file, 'updated content');
    repo.commit();
    expect(() => checkKnowledgeChangeset(repo)).toThrow('Add a new or updated');
    write(repo.root, '.changeset/new.md', changeset);
    repo.commit();
    expect(checkKnowledgeChangeset(repo)).toContain('Changed Changeset');
  }, gitTestTimeout);

  it('skips tests and non-bundled documentation', () => {
    const repo = repository();
    write(repo.root, `${packagePath}/src/example.test.ts`, 'test');
    write(repo.root, `${packagePath}/README.md`, 'docs');
    write(
      repo.root,
      'knowledge/core/instructions/standards/agents.instructions.md',
      'docs',
    );
    repo.commit();
    expect(checkKnowledgeChangeset(repo)).toContain('No published');
  }, gitTestTimeout);

  it('allows consuming Changesets only for a version/changelog update', () => {
    const repo = repository();
    write(
      repo.root,
      `${packagePath}/package.json`,
      JSON.stringify({
        name: '@hpe-design/knowledge-agent',
        version: '0.1.1',
        private: true,
      }),
    );
    write(repo.root, `${packagePath}/CHANGELOG.md`, '## 0.1.1\nFix guidance.');
    fs.rmSync(path.join(repo.root, '.changeset/existing.md'));
    repo.commit();
    expect(checkKnowledgeChangeset(repo)).toContain('consumes');
    write(repo.root, 'knowledge/core/data/components/button.yaml', 'new data');
    repo.commit();
    expect(() => checkKnowledgeChangeset(repo)).toThrow('Add a new or updated');
  }, gitTestTimeout);

  it('normalizes provenance but detects changed published content', () => {
    const left = temporary();
    const right = temporary();
    const snapshot = (revision: string, label = 'Related') => {
      const content = {
        components: [],
        patterns: [],
        foundations: [],
        glossary: [],
        instructions: [
          {
            id: 'layout',
            name: 'layout',
            keywords: [],
            content: `[${label}](https://github.com/grommet/hpe-design-system/blob/${revision}/related.md)`,
          },
        ],
      };
      return JSON.stringify({
        schemaVersion: 1,
        packageVersion: '0.1.0',
        sourceRevision: revision,
        dirty: revision === 'left',
        contentDigest: digestContent(content),
        content,
      });
    };
    [left, right].forEach(root =>
      write(root, 'package.json', '{"name":"test"}'),
    );
    write(left, 'dist/knowledge.json', snapshot('left'));
    write(right, 'dist/knowledge.json', snapshot('right'));
    expect(compareKnowledgeArtifacts(left, right)).toEqual([]);
    write(right, 'dist/runtime.js', 'export const changed = true;');
    expect(compareKnowledgeArtifacts(left, right)).toEqual(['dist/runtime.js']);
    write(right, 'dist/knowledge.json', snapshot('right', 'Updated'));
    expect(compareKnowledgeArtifacts(left, right)).toContain(
      'dist/knowledge.json',
    );
    const invalid = JSON.parse(snapshot('right'));
    invalid.contentDigest = 'invalid';
    write(right, 'dist/knowledge.json', JSON.stringify(invalid));
    expect(() => compareKnowledgeArtifacts(left, right)).toThrow('digest');
  });

  it('checks isolated builds for root graph and runtime changes', () => {
    const repo = repository();
    const rootManifest = {
      name: 'guard-fixture',
      private: true,
      packageManager: 'pnpm@10.30.3',
    };
    const manifest = {
      name: '@hpe-design/knowledge-agent',
      version: '0.1.0',
      private: true,
      scripts: { build: 'node build.cjs' },
    };
    write(repo.root, 'package.json', JSON.stringify(rootManifest));
    write(repo.root, 'pnpm-workspace.yaml', "packages:\n  - 'packages/*'\n");
    write(
      repo.root,
      'pnpm-lock.yaml',
      `
lockfileVersion: '9.0'
settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false
importers:
  .: {}
  packages/knowledge-agent: {}
`,
    );
    write(repo.root, `${packagePath}/package.json`, JSON.stringify(manifest));
    write(
      repo.root,
      `${packagePath}/src/runtime.ts`,
      'export const value = 1;',
    );
    write(
      repo.root,
      `${packagePath}/build.cjs`,
      `
const fs = require('node:fs');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const revision = cp.execFileSync('git', ['rev-parse', 'HEAD'])
  .toString().trim();
const content = {
  components: [], patterns: [], instructions: [],
  foundations: [], glossary: [],
};
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/knowledge.json', JSON.stringify({
  schemaVersion: 1, packageVersion: '0.1.0', sourceRevision: revision,
  dirty: false,
  contentDigest: crypto.createHash('sha256')
    .update(JSON.stringify(content)).digest('hex'),
  content,
}));
fs.copyFileSync('src/runtime.ts', 'dist/runtime.js');
`,
    );
    repo.base = repo.commit();
    write(
      repo.root,
      'package.json',
      JSON.stringify({
        ...rootManifest,
        description: 'Unrelated root metadata change',
      }),
    );
    repo.commit();
    expect(checkKnowledgeChangeset(repo)).toContain('output is unchanged');
    write(
      repo.root,
      `${packagePath}/src/runtime.ts`,
      'export const value = 2;',
    );
    repo.commit();
    expect(() => checkKnowledgeChangeset(repo)).toThrow('dist/runtime.js');
    write(
      repo.root,
      `${packagePath}/package.json`,
      JSON.stringify({
        ...manifest,
        scripts: { build: 'node missing-build.cjs' },
      }),
    );
    repo.commit();
    expect(() => checkKnowledgeChangeset(repo)).toThrow(
      'Knowledge build failed',
    );
  }, 60_000);
});
