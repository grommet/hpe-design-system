// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as loader from './data-loader';
import { loadSourceKnowledge } from './source-knowledge';

describe('live-source knowledge', () => {
  afterEach(() => vi.restoreAllMocks());

  it('reloads unbuilt edits and identifies changed content', () => {
    const first = loadSourceKnowledge();
    const changed = first.content.components.map(component => ({
      ...component,
      description: `${component.description} Updated authoring text.`,
    }));
    vi.spyOn(loader, 'loadComponents').mockReturnValue(changed);
    const second = loadSourceKnowledge();
    expect(second.content.components).toEqual(changed);
    expect(second.contentDigest).not.toBe(first.contentDigest);
  });

  it('includes portable standards with addressable references', () => {
    const snapshot = loadSourceKnowledge();
    const names = snapshot.content.instructions.map(
      instruction => instruction.name,
    );
    expect(names).toEqual([
      'coding-guidelines.instructions.md',
      'grommet-data.instructions.md',
      'grommet-layouts.instructions.md',
      'grommet-responsive.instructions.md',
    ]);
    snapshot.content.instructions.forEach(instruction => {
      expect(instruction.content).not.toMatch(
        /\]\((?:\.{1,2}\/|[a-z-]+\.instructions)/,
      );
    });
    expect(snapshot.content.instructions[0].content).toContain(
      'use that result rather than recursively querying',
    );
  });
});
