import { describe, expect, it } from 'vitest';

import {
  countsFromPostPayload,
  emptyCounts,
  hasMutations,
} from '../sync_events.js';

describe('sync_events', () => {
  it('returns empty counts by default', () => {
    expect(emptyCounts()).toEqual({
      variableCollections: { create: 0, update: 0, delete: 0 },
      variables: { create: 0, update: 0, delete: 0 },
      variableModeValues: { update: 0 },
    });
  });

  it('summarizes post payload counts by action', () => {
    const counts = countsFromPostPayload({
      variableCollections: [
        { action: 'CREATE', id: 'a' },
        { action: 'UPDATE', id: 'b' },
      ],
      variables: [
        { action: 'UPDATE', id: 'v1' },
        { action: 'DELETE', id: 'v2' },
      ],
      variableModeValues: [
        { variableId: 'x', modeId: 'm', value: 1 },
        { variableId: 'y', modeId: 'm', value: 2 },
      ],
    });

    expect(counts).toEqual({
      variableCollections: { create: 1, update: 1, delete: 0 },
      variables: { create: 0, update: 1, delete: 1 },
      variableModeValues: { update: 2 },
    });
  });

  it('detects whether stage has mutations', () => {
    expect(hasMutations(emptyCounts())).toBe(false);
    expect(
      hasMutations({
        variableCollections: { create: 0, update: 0, delete: 0 },
        variables: { create: 1, update: 0, delete: 0 },
        variableModeValues: { update: 0 },
      }),
    ).toBe(true);
  });
});
