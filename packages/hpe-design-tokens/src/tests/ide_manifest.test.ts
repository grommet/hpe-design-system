// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import { ideManifest } from '../formats/ideManifest.js';

describe('ideManifest', () => {
  it('emits resolved values and CSS variable names', async () => {
    const output = await ideManifest({
      dictionary: {
        allTokens: [
          {
            name: 'hpe.spacing.5xsmall',
            $value: '3px',
            $type: 'number',
            $description: 'Compact spacing value',
            original: { $value: '{static.spacing.5xsmall}' },
          },
        ],
      },
    });

    expect(JSON.parse(output)).toEqual({
      schemaVersion: 1,
      tokens: {
        'hpe.spacing.5xsmall': {
          value: '3px',
          type: 'number',
          cssVariable: '--hpe-spacing-5xsmall',
          description: 'Compact spacing value',
          source: '{static.spacing.5xsmall}',
        },
      },
    });
  });
});
