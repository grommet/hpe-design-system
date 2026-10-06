// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import { generateSystemPrompt } from './context-generator';

const ansiPattern = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g');

function stripAnsi(value: string): string {
  return value.replace(ansiPattern, '');
}

describe('knowledge-agent context generator', () => {
  it('surfaces a login form pattern for authentication queries', () => {
    const prompt = generateSystemPrompt('Build a login form');

    expect(prompt).toContain('Login Form');
    expect(prompt).toMatch(/login-form|Login Form/i);
    expect(prompt).toContain('### Foundation Rules');
    expect(prompt).toContain('color-names-its-target');
    expect(prompt).not.toContain('### Foundational Rules');
    expect(prompt).not.toContain('### Glossary');
  });

  it('can omit foundation rules from the prompt', () => {
    const prompt = generateSystemPrompt('Build a login form', 'react', 'none');

    expect(prompt).not.toContain('### Foundation Rules');
  });

  it('includes relevant instructions for layout queries', () => {
    const prompt = generateSystemPrompt('Create an app shell with navigation');

    expect(prompt).toContain('Implementation Guidelines');
    expect(prompt).toMatch(/layout|navigation|app shell/i);
  });

  it('marks non-react targets as conceptual-only guidance', () => {
    const prompt = generateSystemPrompt('Build a login form', 'vue');
    const plainPrompt = stripAnsi(prompt);

    expect(prompt).toContain('\u001B[');
    expect(plainPrompt).toContain('Requested framework: vue');
    expect(plainPrompt).toContain('conceptual guidance');
    expect(plainPrompt).toContain('not yet fully validated for this target');
    expect(prompt).not.toContain('Import: grommet');
    expect(prompt).not.toContain('```tsx');
  });
});
