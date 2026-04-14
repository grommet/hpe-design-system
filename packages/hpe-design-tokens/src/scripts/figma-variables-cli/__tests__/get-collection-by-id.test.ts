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
  buildExpandedCollectionJson: vi.fn(collection => collection),
  buildCollectionLocationRow: vi.fn(),
  printCollectionById: vi.fn(),
  printCollectionLocationResults: vi.fn(),
}));

import { executeGetCollectionById } from '../get-collection-by-id.js';
import { fetchVariablesBySource } from '../fetch.js';
import { resolveFileKeyFromOptions } from '../options.js';
import {
  buildCollectionLocationRow,
  printCollectionById,
  printCollectionLocationResults,
} from '../output.js';

const fetchMock = vi.mocked(fetchVariablesBySource);
const resolveFileKeyMock = vi.mocked(resolveFileKeyFromOptions);
const buildLocationRowMock = vi.mocked(buildCollectionLocationRow);
const printCollectionByIdMock = vi.mocked(printCollectionById);
const printCollectionLocationResultsMock = vi.mocked(
  printCollectionLocationResults,
);

describe('executeGetCollectionById', () => {
  const consoleLogSpy = vi
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws when --collection-id is missing', async () => {
    await expect(
      executeGetCollectionById({} as never, {
        action: 'collection-by-id',
      }),
    ).rejects.toThrow(
      'The --collection-id flag is required for --action=collection-by-id.',
    );
  });

  it('handles single target lookup', async () => {
    const response = makeApiResponse();
    fetchMock.mockResolvedValue(response);
    resolveFileKeyMock.mockReturnValue({
      fileKey: 'semantic-key',
      source: 'semantic (FILE_KEY_SEMANTIC)',
    });

    await executeGetCollectionById({} as never, {
      action: 'collection-by-id',
      role: 'semantic',
      source: 'published',
      collectionId: '9479:10',
      debug: true,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      {} as never,
      'semantic-key',
      'published',
    );
    expect(printCollectionByIdMock).toHaveBeenCalledWith(response, '9479:10', {
      debug: true,
    });
  });

  it('searches across file keys with explicit source', async () => {
    const response = makeApiResponse();
    fetchMock.mockResolvedValue(response);
    buildLocationRowMock.mockImplementation((_, __, location) => ({
      id: '9479:10',
      name: 'color',
      key: 'collection-key-1',
      role: location.role,
      file: location.source,
      sourceType: location.sourceType,
      remote: false,
      variableCount: 1,
      modes: 'light',
      subscribedId: '',
      updatedAt: '',
    }));

    await executeGetCollectionById({} as never, {
      action: 'collection-by-id',
      collectionId: '9479:10',
      source: 'local',
      fileKeys: ['k1', 'k2'],
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(buildLocationRowMock).toHaveBeenCalledTimes(2);
    expect(printCollectionLocationResultsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ file: 'list:1', sourceType: 'local' }),
        expect.objectContaining({ file: 'list:2', sourceType: 'local' }),
      ]),
      '9479:10',
    );
  });

  it('prints json payload for single target lookup', async () => {
    const response = makeApiResponse();
    fetchMock.mockResolvedValue(response);
    resolveFileKeyMock.mockReturnValue({
      fileKey: 'semantic-key',
      source: 'semantic (FILE_KEY_SEMANTIC)',
    });
    buildLocationRowMock.mockReturnValue({
      id: '9479:10',
      name: 'color',
      key: 'collection-key-1',
      role: 'semantic',
      file: 'semantic (FILE_KEY_SEMANTIC)',
      sourceType: 'published',
      remote: false,
      variableCount: 1,
      modes: 'light',
      subscribedId: '',
      updatedAt: '',
    });

    await executeGetCollectionById({} as never, {
      action: 'collection-by-id',
      role: 'semantic',
      source: 'published',
      collectionId: '9479:10',
      format: 'json',
    });

    const payload = JSON.parse(
      vi.mocked(consoleLogSpy).mock.calls[0][0] as string,
    );

    expect(payload).toMatchObject({
      collectionId: '9479:10',
      sourceType: 'published',
      found: true,
      fileKey: 'semantic-key',
      fileUrl: 'https://www.figma.com/design/semantic-key',
      collection: expect.objectContaining({ id: '9479:10' }),
    });
    expect(printCollectionByIdMock).not.toHaveBeenCalled();
  });

  it('prints json payload for multi-target lookup', async () => {
    const response = makeApiResponse();
    fetchMock.mockResolvedValue(response);
    buildLocationRowMock.mockImplementation((_, __, location) => ({
      id: '9479:10',
      name: 'color',
      key: 'collection-key-1',
      role: location.role,
      file: location.source,
      sourceType: location.sourceType,
      remote: false,
      variableCount: 1,
      modes: 'light',
      subscribedId: '',
      updatedAt: '',
    }));

    await executeGetCollectionById({} as never, {
      action: 'collection-by-id',
      collectionId: '9479:10',
      fileKeys: ['k1', 'k2'],
      format: 'json',
    });

    const payload = JSON.parse(
      vi.mocked(consoleLogSpy).mock.calls[0][0] as string,
    );

    expect(payload).toMatchObject({
      collectionId: '9479:10',
      foundCount: 4,
      targetsCount: 2,
      collections: expect.arrayContaining([
        expect.objectContaining({
          fileKey: expect.any(String),
          fileUrl: expect.stringMatching(
            /^https:\/\/www\.figma\.com\/design\/.+$/,
          ),
          collection: expect.objectContaining({ id: '9479:10' }),
        }),
      ]),
    });
    expect(printCollectionLocationResultsMock).not.toHaveBeenCalled();
  });
});
