// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));

function stripAnsi(value: string): string {
  return value.replace(/\u001B\[[0-9;]*m/g, '');
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
    expect(result.stderr).toContain('\u001B[');
    expect(stripAnsi(result.stderr)).toContain('Error: Unknown option: --unknown');
    expect(result.stdout).toContain('Options:');
    expect(result.stdout).toContain('--framework <target>');
    expect(result.stdout).toContain('--help');
  });

  it('rejects unsupported framework targets with highlighted guidance', () => {
    const result = spawnSync(
      'pnpm',
      ['exec', 'tsx', 'src/cli.ts', '--', 'Create a dashboard', '-f', 'svelte'],
      {
        cwd: packageRoot,
        encoding: 'utf8',
      },
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('\u001B[');
    expect(stripAnsi(result.stderr)).toContain(
      'Error: Unknown framework target: svelte. Expected one of: react, vue, angular, web-components, agnostic',
    );
    expect(result.stdout).toContain('--framework <target>');
  });
});
