import { describe, expect, it } from 'vitest';

import { ApiGetLocalVariablesResponse } from '../figma_api.js';
import {
  buildStagePlanReport,
  parsePlanStageFilterValue,
} from '../sync_plan_report.js';

describe('sync_plan_report', () => {
  it('parses optional plan stage filter values', () => {
    expect(parsePlanStageFilterValue(undefined)).toBeNull();
    expect(parsePlanStageFilterValue('semantic')).toEqual(['semantic']);
    expect(parsePlanStageFilterValue('semantic,component')).toEqual([
      'semantic',
      'component',
    ]);
    expect(parsePlanStageFilterValue('semantic, semantic')).toEqual([
      'semantic',
    ]);
  });

  it('rejects invalid plan stage filter values', () => {
    expect(() => parsePlanStageFilterValue('')).toThrow(
      'Invalid --plan-stage value',
    );
    expect(() => parsePlanStageFilterValue('foo')).toThrow(
      'Invalid --plan-stage value',
    );
  });

  it('builds readable plan entries from payload and local variables', () => {
    const localVariables = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          color: {
            id: 'color',
            key: 'collection-key',
            name: 'color',
            modes: [{ modeId: 'dark', name: 'dark' }],
            defaultModeId: 'dark',
            remote: false,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          brand: {
            id: 'brand',
            name: 'color/background/brand',
            key: 'var-key',
            variableCollectionId: 'color',
            resolvedType: 'COLOR',
            valuesByMode: {
              dark: { r: 0, g: 0, b: 0, a: 1 },
            },
            remote: false,
            description: 'before',
            hiddenFromPublishing: false,
            scopes: ['ALL_FILLS'],
            codeSyntax: {},
          },
        },
      },
    };

    const report = buildStagePlanReport(
      'semantic',
      {
        variables: [
          {
            action: 'UPDATE',
            id: 'brand',
            description: 'after',
          },
        ],
        variableModeValues: [
          {
            variableId: 'brand',
            modeId: 'dark',
            value: { r: 1, g: 1, b: 1, a: 1 },
          },
        ],
      },
      localVariables as ApiGetLocalVariablesResponse,
    );

    expect(report.stage).toBe('semantic');
    expect(report.counts.variables.update).toBe(1);
    expect(report.counts.variableModeValues.update).toBe(1);
    expect(report.variables).toEqual([
      {
        action: 'UPDATE',
        id: 'brand',
        name: 'color/background/brand',
        collectionId: 'color',
        collectionName: 'color',
        before: {
          id: 'brand',
          name: 'color/background/brand',
          variableCollectionId: 'color',
          resolvedType: 'COLOR',
          description: 'before',
          hiddenFromPublishing: false,
          scopes: ['ALL_FILLS'],
          codeSyntax: {},
        },
        changes: {
          description: 'after',
        },
      },
    ]);
    expect(report.variableModeValues).toEqual([
      {
        variableId: 'brand',
        variableName: 'color/background/brand',
        modeId: 'dark',
        modeName: 'color.dark',
        before: { r: 0, g: 0, b: 0, a: 1 },
        after: { r: 1, g: 1, b: 1, a: 1 },
      },
    ]);
  });
});
