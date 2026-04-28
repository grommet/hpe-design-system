import { describe, expect, it } from 'vitest';

import {
  buildAliasLookup,
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

  it('builds alias lookup from local variables', () => {
    const localVariables = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {},
        variables: {
          v1: {
            id: 'v1',
            name: 'color/background/brand',
            key: 'k1',
            variableCollectionId: 'c1',
            resolvedType: 'COLOR',
            valuesByMode: {},
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const { aliasLookup, errors } = buildAliasLookup(localVariables as any, {
      stage: 'primitive',
      environment: 'test',
    });

    expect(aliasLookup).toEqual({
      'color/background/brand': 'v1',
    });
    expect(errors).toEqual([]);
  });

  it('returns ALIAS_COLLISION errors for duplicate variable names', () => {
    const localVariables = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {},
        variables: {
          v1: {
            id: 'v1',
            name: 'color/background/brand',
            key: 'k1',
            variableCollectionId: 'c1',
            resolvedType: 'COLOR',
            valuesByMode: {},
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          v2: {
            id: 'v2',
            name: 'color/background/brand',
            key: 'k2',
            variableCollectionId: 'c2',
            resolvedType: 'COLOR',
            valuesByMode: {},
            remote: true,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const { aliasLookup, errors } = buildAliasLookup(localVariables as any, {
      stage: 'semantic',
      environment: 'test',
    });

    expect(aliasLookup['color/background/brand']).toBe('v1');
    expect(errors).toHaveLength(1);
    expect(errors[0].code).toBe('ALIAS_COLLISION');
  });
});
