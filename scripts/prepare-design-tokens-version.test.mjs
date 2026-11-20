// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(root, 'scripts/prepare-design-tokens-version.mjs');
const originalConfig =
  '{ "changelog": "@changesets/cli/changelog", "ignore": [] }\n';

function createFixture() {
  const dir = mkdtempSync(path.join(tmpdir(), 'tokens-version-'));
  const write = (file, content) => {
    const target = path.join(dir, file);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
  };
  const writePackage = (directory, manifest) =>
    write(`${directory}/package.json`, JSON.stringify(manifest, null, 2));

  writePackage('.', { name: 'fixture', private: true });
  write('pnpm-workspace.yaml', 'packages:\n  - packages/*\n');
  write('.changeset/config.json', originalConfig);
  writePackage('packages/tokens', {
    name: 'hpe-design-tokens',
    version: '2.4.0',
  });
  writePackage('packages/hooks', {
    name: '@shared/hooks',
    version: '1.0.0',
    private: true,
  });
  writePackage('packages/aries-core', {
    name: '@shared/aries-core',
    version: '1.0.0',
    dependencies: { '@shared/hooks': 'workspace:*' },
  });
  writePackage('packages/knowledge-agent', {
    name: '@hpe-design/knowledge-agent',
    version: '0.1.0',
  });
  write(
    '.changeset/tokens.md',
    "---\n'hpe-design-tokens': minor\n---\n\nAdd tokens.\n",
  );
  write(
    '.changeset/knowledge.md',
    "---\n'@hpe-design/knowledge-agent': minor\n---\n\nAdd knowledge.\n",
  );
  symlinkSync(
    path.join(root, 'node_modules'),
    path.join(dir, 'node_modules'),
    'dir',
  );
  return { dir, write };
}

describe('prepare design tokens version', () => {
  it('versions only tokens and restores the configuration', () => {
    const { dir } = createFixture();
    try {
      const result = spawnSync(process.execPath, [script], {
        cwd: dir,
        encoding: 'utf8',
      });
      assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
      const tokenPackage = JSON.parse(
        readFileSync(path.join(dir, 'packages/tokens/package.json')),
      );
      const knowledgePackage = JSON.parse(
        readFileSync(path.join(dir, 'packages/knowledge-agent/package.json')),
      );
      assert.equal(tokenPackage.version, '2.5.0');
      assert.equal(knowledgePackage.version, '0.1.0');
      assert.match(
        readFileSync(path.join(dir, 'packages/tokens/CHANGELOG.md'), 'utf8'),
        /## 2\.5\.0/,
      );
      assert.equal(existsSync(path.join(dir, '.changeset/tokens.md')), false);
      assert.equal(existsSync(path.join(dir, '.changeset/knowledge.md')), true);
      assert.equal(
        readFileSync(path.join(dir, '.changeset/config.json'), 'utf8'),
        originalConfig,
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('restores the configuration when Changesets fails', () => {
    const { dir, write } = createFixture();
    try {
      write(
        '.changeset/tokens.md',
        "---\n'hpe-design-tokens': invalid\n---\n\nInvalid.\n",
      );
      const result = spawnSync(process.execPath, [script], {
        cwd: dir,
        encoding: 'utf8',
      });
      assert.notEqual(result.status, 0);
      assert.match(`${result.stdout}\n${result.stderr}`, /invalid/i);
      assert.equal(
        readFileSync(path.join(dir, '.changeset/config.json'), 'utf8'),
        originalConfig,
      );
      assert.equal(existsSync(path.join(dir, '.changeset/tokens.md')), true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
