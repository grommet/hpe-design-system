import fs from 'fs';

import { describe, expect, it } from 'vitest';

import { ApiGetLocalVariablesResponse } from '../figma_api.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';
import {
  FlattenedTokensByFile,
  generatePostVariablesPayload,
} from '../token_import.js';

const fixtureBase = './src/tests/fixtures/semantic-color-parity';

function readJson<T>(path: string): T {
  return JSON.parse(fs.readFileSync(path, 'utf8')) as T;
}

describe('semantic color payload golden parity', () => {
  it('matches golden export token output', () => {
    const exportInput = readJson<ApiGetLocalVariablesResponse>(
      `${fixtureBase}/export-input.json`,
    );
    const expected = readJson<Record<string, unknown>>(
      `${fixtureBase}/export-output.golden.json`,
    );

    const actual = tokenFilesFromLocalVariables(exportInput);
    expect(actual).toEqual(expected);
  });

  it('matches golden import payload output', () => {
    const importInput = readJson<{
      tokensByFile: FlattenedTokensByFile;
      localVariables: ApiGetLocalVariablesResponse;
    }>(`${fixtureBase}/import-input.json`);
    const expected = readJson<Record<string, unknown>>(
      `${fixtureBase}/import-output.golden.json`,
    );

    const actual = generatePostVariablesPayload(
      importInput.tokensByFile,
      importInput.localVariables,
    );

    expect(actual).toEqual(expected);
  });
});
