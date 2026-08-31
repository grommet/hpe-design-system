// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import { generateSystemPrompt } from './context-generator';

describe('design-system-agent context generator', () => {
  it('surfaces a login form pattern for authentication queries', () => {
    const prompt = generateSystemPrompt('Build a login form');

    expect(prompt).toContain('Login Form');
    expect(prompt).toMatch(/login-form|Login Form/i);
  });

  it('includes relevant instructions for layout queries', () => {
    const prompt = generateSystemPrompt('Create an app shell with navigation');

    expect(prompt).toContain('Implementation Guidelines');
    expect(prompt).toMatch(/layout|navigation|app shell/i);
  });
});
