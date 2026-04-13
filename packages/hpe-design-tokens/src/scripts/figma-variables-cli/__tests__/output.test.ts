import { beforeEach, describe, expect, it, vi } from 'vitest';

import { makeApiResponse } from './fixtures.js';
import {
  buildCollectionLocationRow,
  buildVariableRows,
  printCollectionById,
  printCollectionLocationResults,
  printVariableById,
} from '../output.js';

describe('figma-variables-cli output helpers', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('buildVariableRows returns filtered rows', () => {
    const response = makeApiResponse();

    const rows = buildVariableRows(response, {
      collectionFilter: 'color',
      modeFilter: 'light',
      rowLimit: 10,
    });

    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe('9479:64');
    expect(rows[0].collection).toBe('color');
  });

  it('printVariableById resolves prefixed composite id', () => {
    const response = makeApiResponse();
    const tableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});

    printVariableById(
      response,
      'VariableID:6c80915d0d2283e2a2c35eb8e3ecd669fe98ea94/9479:64',
    );

    expect(tableSpy).toHaveBeenCalledTimes(1);
    const firstArg = tableSpy.mock.calls[0][0] as Array<{ id: string }>;
    expect(firstArg[0].id).toBe('9479:64');
  });

  it('buildCollectionLocationRow returns row for matching collection id', () => {
    const response = makeApiResponse();

    const row = buildCollectionLocationRow(response, '9479:10', {
      role: 'semantic',
      source: 'semantic (FILE_KEY_SEMANTIC)',
      sourceType: 'local',
    });

    expect(row).toBeDefined();
    expect(row?.id).toBe('9479:10');
    expect(row?.role).toBe('semantic');
  });

  it('printCollectionById reports not found', () => {
    const response = makeApiResponse();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    printCollectionById(response, 'does-not-exist');

    expect(logSpy).toHaveBeenCalledWith(
      'No collection found for id: does-not-exist',
    );
  });

  it('printCollectionLocationResults prints found count', () => {
    const tableSpy = vi.spyOn(console, 'table').mockImplementation(() => {});
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    printCollectionLocationResults(
      [
        {
          id: '9479:10',
          name: 'color',
          key: 'collection-key-1',
          role: 'semantic',
          file: 'list:1',
          sourceType: 'local',
          remote: false,
          variableCount: 1,
          modes: 'light',
          subscribedId: '',
          updatedAt: '',
        },
      ],
      '9479:10',
    );

    expect(tableSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Found 1 matching location(s).');
  });
});
