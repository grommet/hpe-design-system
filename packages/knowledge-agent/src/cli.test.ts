// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const ansiPattern = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g');

function runCli(...args: string[]) {
  const result = spawnSync(
    process.execPath,
    ['--import', 'tsx', 'src/cli.ts', ...args],
    { cwd: packageRoot, encoding: 'utf8' },
  );
  if (result.error) throw result.error;
  return result;
}

function stripAnsi(value: string): string {
  return value.replace(ansiPattern, '');
}

describe('knowledge-agent CLI', () => {
  it('rejects unsupported options with usage help', () => {
    const result = runCli('Create a dashboard', '--unknown');

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
    const result = runCli('Create a dashboard', '-f', 'svelte');

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
    const result = runCli('Build a login form', '--json');
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
    const result = runCli('  ', '--json');
    expect(result.status).toBe(1);
    expect(result.stderr).toContain('non-empty string');
    expect(result.stdout).toBe('');
  });

  it('rejects unsupported rules detail values', () => {
    const result = runCli('Create a dashboard', '--rules', 'bogus');

    expect(result.status).toBe(1);
    expect(stripAnsi(result.stderr)).toContain(
      'Expected one of: checklist, full, none',
    );
  });

  it('rejects unknown rule ids and lists valid ids', () => {
    const result = runCli('--rule', 'nope');

    expect(result.status).toBe(1);
    expect(stripAnsi(result.stderr)).toContain('Valid ids:');
    expect(result.stderr).toContain('color-names-its-target');
  });

  it.each([
    { label: 'without a query', queryArgs: [] },
    {
      label: 'with a query',
      queryArgs: [
        'device fleet page with summary cards and a filterable table',
      ],
    },
  ])('prints the foundation checklist $label', ({ queryArgs }) => {
    const result = runCli(...queryArgs, '--checklist');

    expect(result.status).toBe(0);
    expect(result.stdout).toMatch(/^### Foundation Rules\n\n/);
    expect(result.stdout.match(/^### Foundation Rules$/gm)).toHaveLength(1);
    expect(result.stdout).toContain('### Color');
    expect(result.stdout).toContain('- [color-names-its-target]');
    expect(result.stdout).not.toContain('http');
    expect(result.stdout).not.toContain('Rationale:');
  });

  it('rejects using checklist and rule together', () => {
    const result = runCli('--checklist', '--rule', 'color-names-its-target');

    expect(result.status).toBe(1);
    expect(stripAnsi(result.stderr)).toContain(
      '--checklist and --rule cannot be used together',
    );
  });

  it('prints a rule with glossary context without requiring a query', () => {
    const result = runCli('--rule', 'color-names-its-target');
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('****Rationale:****');
    expect(result.stdout).toContain('The part of the UI a color token');
    expect(result.stdout).not.toContain('\u001B[');
  });

  it('prints component checklists and full rules without changing foundation commands', () => {
    const checklist = runCli('--checklist', '--component', 'select');
    expect(checklist.status).toBe(0);
    expect(checklist.stdout).toContain('[select-explain-validation-errors]');
    expect(checklist.stdout).not.toContain(
      'Styling draws attention to an error',
    );
    const detail = runCli('--rule', 'select-explain-validation-errors');
    expect(detail.status).toBe(0);
    expect(detail.stdout).toContain('Styling draws attention to an error');
    const empty = runCli('--checklist', '--component', 'menu');
    expect(empty.status).toBe(0);
    expect(empty.stdout).toContain('No component rules defined.');
  });

  it('rejects invalid component checklist requests', () => {
    expect(runCli('--component', 'menu').stderr).toContain(
      '--component requires --checklist',
    );
    expect(runCli('--checklist', '--component', 'missing').stderr).toContain(
      'Unknown component id: missing',
    );
    const json = runCli('--checklist', '--component', 'menu', '--json');
    expect(json.status).toBe(1);
    expect(json.stdout).toBe('');
  });

  it.each(['--rule', '--rules', '--component'])(
    'rejects a missing %s value',
    flag => {
      const result = runCli(flag);
      expect(result.status).toBe(1);
      expect(result.stderr).toContain(`Missing value for ${flag}`);
    },
  );

  it('keeps stdout empty for incompatible JSON rule commands', () => {
    const result = runCli('--checklist', '--json');
    expect(result.status).toBe(1);
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain('--json cannot be used');
  });
});
