// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const ansiPattern = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g');

function stripAnsi(value: string): string {
  return value.replace(ansiPattern, '');
}

describe('knowledge-agent CLI', () => {
  it('rejects unsupported options with usage help', () => {
    const result = spawnSync(
      'pnpm',
      ['exec', 'tsx', 'src/cli.ts', '--', 'Create a dashboard', '--unknown'],
      {
        cwd: packageRoot,
        encoding: 'utf8',
      },
    );

    expect(result.status).toBe(1);
    expect(result.stderr).not.toContain('\u001B[');
    expect(stripAnsi(result.stderr)).toContain(
      'Error: Unknown option: --unknown',
    );
    expect(result.stdout).toContain('Options:');
    expect(result.stdout).toContain('--framework <target>');
    expect(result.stdout).toContain('--help');
  });

  it('rejects unsupported framework targets with guidance', () => {
    const result = spawnSync(
      'pnpm',
      ['exec', 'tsx', 'src/cli.ts', '--', 'Create a dashboard', '-f', 'svelte'],
      {
        cwd: packageRoot,
        encoding: 'utf8',
      },
    );

    expect(result.status).toBe(1);
    expect(result.stderr).not.toContain('\u001B[');
    const expectedMessage = [
      'Error: Unknown framework target: svelte.',
      'Expected one of: react, vue, angular, web-components, agnostic',
    ].join(' ');

    expect(stripAnsi(result.stderr)).toContain(expectedMessage);
    expect(result.stdout).toContain('--framework <target>');
  });

  it('emits parseable JSON for source-mode queries', () => {
    const result = spawnSync(
      process.execPath,
      ['--import', 'tsx', 'src/cli.ts', 'Build a login form', '--json'],
      { cwd: packageRoot, encoding: 'utf8' },
    );
    expect(result.status).toBe(0);
    const output = JSON.parse(result.stdout);
    expect(output.knowledge.mode).toBe('source');
    expect(
      output.patterns.map((pattern: { id: string }) => pattern.id),
    ).toContain('login-form');
    expect(result.stdout).not.toContain('\u001B[');
    expect(result.stdout).not.toContain(packageRoot);
  });

  it('rejects whitespace-only queries without JSON stdout', () => {
    const result = spawnSync(
      process.execPath,
      ['--import', 'tsx', 'src/cli.ts', '  ', '--json'],
      { cwd: packageRoot, encoding: 'utf8' },
    );
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('non-empty string');
    expect(result.stdout).toBe('');
  });
});
