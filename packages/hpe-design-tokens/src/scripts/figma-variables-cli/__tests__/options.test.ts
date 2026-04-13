import { describe, expect, it } from 'vitest';

import { getCliOptionErrors, parseCliOptions } from '../options.js';

describe('parseCliOptions', () => {
  it('parses collection-by-id flags', () => {
    const options = parseCliOptions([
      '--action=collection-by-id',
      '--source=published',
      '--role=semantic',
      '--collection-id=9479:10',
      '--debug',
    ]);

    expect(options).toMatchObject({
      action: 'collection-by-id',
      source: 'published',
      role: 'semantic',
      collectionId: '9479:10',
      debug: true,
    });
  });

  it('parses variable-by-id and list flags', () => {
    const options = parseCliOptions([
      '--action=variable-by-id',
      '--variable-id=VariableID:9479:64',
      '--file-keys=k1, k2,k3',
      '--max-rows=25',
      '--debug=yes',
    ]);

    expect(options).toMatchObject({
      action: 'variable-by-id',
      variableId: 'VariableID:9479:64',
      fileKeys: ['k1', 'k2', 'k3'],
      maxRows: 25,
      debug: true,
    });
  });

  it('parses help short flag and ignores invalid action', () => {
    const options = parseCliOptions(['-h', '--action=invalid-action']);

    expect(options.help).toBe(true);
    expect(options.action).toBeUndefined();
  });

  it('ignores non-positive max-rows', () => {
    const options = parseCliOptions(['--max-rows=0']);

    expect(options.maxRows).toBeUndefined();
  });

  it('tracks unknown and malformed flags', () => {
    const options = parseCliOptions([
      '--bogus=abc',
      '--mode',
      '--action=unknown',
    ]);

    expect(options.unknownFlags).toEqual([
      '--bogus=abc',
      '--mode',
      '--action=unknown',
    ]);
  });

  it('parses format and automation flags', () => {
    const options = parseCliOptions([
      '--action=variables',
      '--format=json',
      '--strict-flags',
      '--non-interactive=true',
    ]);

    expect(options).toMatchObject({
      action: 'variables',
      format: 'json',
      strictFlags: true,
      nonInteractive: true,
    });
  });

  it('reports strict flag errors for unknown flags', () => {
    const options = parseCliOptions(['--strict-flags', '--bogus=abc']);

    expect(getCliOptionErrors(options)).toEqual([
      'Unknown or malformed flag(s): --bogus=abc. Remove them or disable --strict-flags.',
    ]);
  });
});
