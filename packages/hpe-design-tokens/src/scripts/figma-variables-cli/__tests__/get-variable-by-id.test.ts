import { beforeEach, describe, expect, it, vi } from 'vitest';

import { makeApiResponse } from './fixtures.js';

vi.mock('../fetch.js', () => ({
  fetchVariablesBySource: vi.fn(),
}));

vi.mock('../options.js', () => ({
  resolveFileKeyFromOptions: vi.fn(),
}));

vi.mock('../env.js', () => ({
  getConfiguredRoleFileSelections: vi.fn(),
}));

vi.mock('../output.js', () => ({
  buildVariableLocationRow: vi.fn(),
  printVariableById: vi.fn(),
  printVariableLocationResults: vi.fn(),
}));

import { executeGetVariableById } from '../get-variable-by-id.js';
import { fetchVariablesBySource } from '../fetch.js';
import { resolveFileKeyFromOptions } from '../options.js';
import {
  buildVariableLocationRow,
  printVariableById,
  printVariableLocationResults,
} from '../output.js';

const fetchMock = vi.mocked(fetchVariablesBySource);
const resolveFileKeyMock = vi.mocked(resolveFileKeyFromOptions);
const buildLocationRowMock = vi.mocked(buildVariableLocationRow);
const printVariableByIdMock = vi.mocked(printVariableById);
const printVariableLocationResultsMock = vi.mocked(
  printVariableLocationResults,
);

describe('executeGetVariableById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws when --variable-id is missing', async () => {
    await expect(
      executeGetVariableById({} as never, {
        action: 'variable-by-id',
      }),
    ).rejects.toThrow(
      'The --variable-id flag is required for --action=variable-by-id.',
    );
  });

  it('handles single target lookup with normalized variable id', async () => {
    const response = makeApiResponse();
    fetchMock.mockResolvedValue(response);
    resolveFileKeyMock.mockReturnValue({
      fileKey: 'semantic-key',
      source: 'semantic (FILE_KEY_SEMANTIC)',
    });

    await executeGetVariableById({} as never, {
      action: 'variable-by-id',
      role: 'semantic',
      source: 'local',
      variableId: 'VariableID:9479:64',
      debug: true,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      {} as never,
      'semantic-key',
      'local',
    );
    expect(printVariableByIdMock).toHaveBeenCalledWith(response, '9479:64', {
      debug: true,
    });
  });

  it('searches across file keys and both sources by default', async () => {
    const response = makeApiResponse();
    fetchMock.mockResolvedValue(response);
    buildLocationRowMock.mockImplementation((_, __, location) => {
      if (location.sourceType === 'local') {
        return {
          id: '9479:64',
          name: 'color.text.default',
          role: location.role,
          file: location.source,
          sourceType: location.sourceType,
          collection: 'color',
          collectionId: '9479:10',
          resolvedType: 'COLOR',
          remote: false,
          previewMode: 'light',
          previewValue: 'rgba(0.000, 0.000, 0.000, 1.000)',
        };
      }

      return undefined;
    });

    await executeGetVariableById({} as never, {
      action: 'variable-by-id',
      variableId: '9479:64',
      fileKeys: ['k1', 'k2'],
    });

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(buildLocationRowMock).toHaveBeenCalledTimes(4);
    expect(printVariableLocationResultsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ file: 'list:1', sourceType: 'local' }),
        expect.objectContaining({ file: 'list:2', sourceType: 'local' }),
      ]),
      '9479:64',
    );
  });
});
