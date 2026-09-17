// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';

import { ApiGetLocalVariablesResponse } from '../figma_api.js';
import { readJsoncFile } from '../jsonc.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';
import {
  FlattenedTokensByFile,
  generatePostVariablesPayload,
} from '../token_import.js';

const fixtureBase = './src/tests/fixtures/semantic-color-parity';

describe('semantic color payload golden parity', () => {
  it('matches golden export token output', () => {
    const exportInput = readJsoncFile<ApiGetLocalVariablesResponse>(
      `${fixtureBase}/export-input.jsonc`,
    );
    const expected = readJsoncFile<Record<string, unknown>>(
      `${fixtureBase}/export-output.golden.json`,
    );

    const actual = tokenFilesFromLocalVariables(exportInput);
    expect(actual).toEqual(expected);

    // Non-canonical incoming accent names should still normalize predictably.
    const semanticDark = actual['semantic.dark.json'] as
      | {
          color?: {
            background?: {
              accent?: Record<
                string,
                {
                  DEFAULT?: {
                    REST?: {
                      $description?: string;
                    };
                  };
                }
              >;
            };
          };
        }
      | undefined;
    const purpleCustom =
      semanticDark?.color?.background?.accent?.['purple-custom']?.DEFAULT?.REST;
    expect(purpleCustom).toBeDefined();
    expect(purpleCustom?.$description).toBe(
      'Accent purple custom non-canonical',
    );
  });

  it('matches golden import payload output', () => {
    const importInput = readJsoncFile<{
      tokensByFile: FlattenedTokensByFile;
      localVariables: ApiGetLocalVariablesResponse;
    }>(`${fixtureBase}/import-input.jsonc`);
    const expected = readJsoncFile<Record<string, unknown>>(
      `${fixtureBase}/import-output.golden.json`,
    );

    const actual = generatePostVariablesPayload(
      importInput.tokensByFile,
      importInput.localVariables,
    );

    expect(actual).toEqual(expected);

    // Non-color token handling should remain untouched by semantic color logic.
    expect(actual.variables?.some(v => v.name === 'spacing/medium')).toBe(true);

    // Cross-target alias mapping should stay canonical in generated IDs.
    expect(
      actual.variableModeValues?.some(
        value =>
          typeof value.value === 'object' &&
          value.value !== null &&
          'type' in value.value &&
          value.value.type === 'VARIABLE_ALIAS' &&
          value.value.id === 'color/text/default',
      ),
    ).toBe(true);

    // Non-canonical accent aliases should still resolve to canonical target
    // IDs.
    expect(
      actual.variableModeValues?.some(
        value =>
          value.variableId === 'color/background/accent/purple-custom' &&
          typeof value.value === 'object' &&
          value.value !== null &&
          'type' in value.value &&
          value.value.type === 'VARIABLE_ALIAS' &&
          value.value.id === 'color/background/accent/purple-strong',
      ),
    ).toBe(true);
  });
});
