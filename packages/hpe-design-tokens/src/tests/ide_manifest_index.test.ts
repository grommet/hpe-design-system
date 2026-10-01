// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('IDE manifest index', () => {
  it('indexes the generated dimension and color shards', async () => {
    const manifest = JSON.parse(
      await readFile(
        new URL('../../dist/ide/manifest.json', import.meta.url),
        'utf8',
      ),
    );

    expect(manifest).toMatchObject({
      schemaVersion: 1,
      collections: {
        color: {
          'default.dark': './color.dark.json',
          'default.light': './color.light.json',
        },
        dimension: {
          default: './dimension.default.json',
          small: './dimension.small.json',
        },
      },
    });
  });
});
