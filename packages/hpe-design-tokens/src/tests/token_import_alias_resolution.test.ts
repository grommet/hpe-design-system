import { describe, expect, it } from 'vitest';

import {
  AliasResolutionError,
  generatePostVariablesPayload,
} from '../token_import.js';

const emptyLocalVariables = {
  status: 200,
  error: false,
  meta: {
    variableCollections: {},
    variables: {},
  },
};

describe('generatePostVariablesPayload alias resolution', () => {
  it('uses alias lookup ids when provided', () => {
    const payload = generatePostVariablesPayload(
      {
        'semantic.default.json': {
          'color/background/brand': {
            $type: 'color',
            $value: '{color.background.brand}',
          },
        },
      },
      emptyLocalVariables as any,
      {
        aliasLookup: {
          'color/background/brand': 'VariableID:test:1',
        },
      },
    );

    expect(payload.variableModeValues?.[0]).toEqual({
      variableId: 'color/background/brand',
      modeId: 'default',
      value: {
        type: 'VARIABLE_ALIAS',
        id: 'VariableID:test:1',
      },
    });
  });

  it('reports ALIAS_NOT_FOUND when lookup is provided and target cannot be resolved', () => {
    const aliasErrors: AliasResolutionError[] = [];

    // color/background/brand references a primitive token that is not present in
    // localVariables, not in aliasLookup, and not being created in this payload.
    // This simulates a genuine cross-stage missing reference (e.g., primitives
    // have not been synced yet), which should always be flagged as ALIAS_NOT_FOUND.
    generatePostVariablesPayload(
      {
        'semantic.default.json': {
          'color/background/brand': {
            $type: 'color',
            $value: '{primitive.blue.400}',
          },
        },
      },
      emptyLocalVariables as any,
      {
        aliasLookup: {},
        stage: 'semantic',
        environment: 'test',
        onAliasResolutionError: err => aliasErrors.push(err),
      },
    );

    expect(aliasErrors).toHaveLength(1);
    expect(aliasErrors[0]).toMatchObject({
      code: 'ALIAS_NOT_FOUND',
      stage: 'semantic',
      environment: 'test',
      sourceFile: 'semantic.default.json',
      tokenPath: 'color/background/brand',
    });
  });

  it('does not report ALIAS_NOT_FOUND for intra-payload references', () => {
    // Token A references token B, both being created in the same payload.
    // Even though B is not in localVariables or aliasLookup, it will be
    // created in the same POST request, so no error should be emitted.
    const aliasErrors: AliasResolutionError[] = [];

    generatePostVariablesPayload(
      {
        'semantic.default.json': {
          'color/background/brand-weak': {
            $type: 'color',
            $value: '{color.background.brand}',
          },
          'color/background/brand': {
            $type: 'color',
            $value: '#0e5e6f',
          },
        },
      },
      emptyLocalVariables as any,
      {
        aliasLookup: {},
        stage: 'semantic',
        environment: 'test',
        onAliasResolutionError: err => aliasErrors.push(err),
      },
    );

    expect(aliasErrors).toHaveLength(0);
  });
});
