// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import type { CapabilityCatalog } from './capabilities';
import {
  installDesignSystemAgent,
  uninstallDesignSystemAgent,
} from './agent-installer';

const workspaces: string[] = [];

afterEach(() => {
  workspaces.splice(0).forEach(workspace => {
    fs.rmSync(workspace, { recursive: true, force: true });
  });
});

function createWorkspace(): string {
  const workspace = fs.mkdtempSync(
    path.join(os.tmpdir(), 'hpe-design-system-agent-'),
  );
  workspaces.push(workspace);
  return workspace;
}

function catalog(): CapabilityCatalog {
  return {
    schemaVersion: 1,
    frontdoorAgent: {
      path: 'design-system-agent.agent.md',
      content: 'frontdoor',
    },
    capabilities: [
      {
        id: 'alignment-audit',
        version: '1.0.0',
        summary: 'Audit consumer projects.',
        stages: [],
        agentIds: ['hpe-design-system-alignment-audit-evaluator'],
        documentation: [{ path: 'README.md', content: 'docs' }],
        assets: [
          {
            path: 'hpe-design-system-alignment-audit-evaluator.agent.md',
            content: 'evaluator',
          },
        ],
      },
    ],
  };
}

describe('Design System Agent installer', () => {
  it('previews without creating workspace files', () => {
    const workspace = createWorkspace();
    const files = installDesignSystemAgent(catalog(), {
      workspace,
      dryRun: true,
    });

    expect(files).toHaveLength(2);
    expect(fs.existsSync(path.join(workspace, '.github'))).toBe(false);
  });

  it('refuses collisions unless overwrite is explicit', () => {
    const workspace = createWorkspace();
    const agents = path.join(workspace, '.github/agents');
    fs.mkdirSync(agents, { recursive: true });
    const frontdoor = path.join(agents, 'design-system-agent.agent.md');
    fs.writeFileSync(frontdoor, 'user-owned content');

    expect(() => installDesignSystemAgent(catalog(), { workspace })).toThrow(
      '--overwrite',
    );
    expect(fs.readFileSync(frontdoor, 'utf8')).toBe('user-owned content');
    expect(
      fs.existsSync(
        path.join(
          agents,
          'hpe-design-system-alignment-audit-evaluator.agent.md',
        ),
      ),
    ).toBe(false);
  });

  it('uninstalls only files recorded as package-owned', () => {
    const workspace = createWorkspace();
    const installed = installDesignSystemAgent(catalog(), { workspace });
    const agents = path.dirname(installed[0]);
    const unrelated = path.join(agents, 'other.agent.md');
    fs.writeFileSync(unrelated, 'leave me');

    const removed = uninstallDesignSystemAgent(workspace);

    expect(removed).toHaveLength(3);
    expect(fs.existsSync(unrelated)).toBe(true);
    expect(fs.readFileSync(unrelated, 'utf8')).toBe('leave me');
    installed.forEach(file => expect(fs.existsSync(file)).toBe(false));
    expect(
      fs.existsSync(path.join(agents, '.hpe-design-system-agent.json')),
    ).toBe(false);
  });

  it('rejects catalog paths that are not plain agent filenames', () => {
    const workspace = createWorkspace();
    const unsafe = catalog();
    unsafe.frontdoorAgent.path = '../outside.agent.md';

    expect(() => installDesignSystemAgent(unsafe, { workspace })).toThrow(
      'unsafe or duplicate agent paths',
    );
    expect(fs.existsSync(path.join(workspace, '.github'))).toBe(false);
  });
});
