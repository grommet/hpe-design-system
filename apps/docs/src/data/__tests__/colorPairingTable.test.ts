// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from 'fs';
import path from 'path';

const pagePath = path.resolve(
  __dirname,
  '../../pages/foundation/color-pairing.mdx',
);

// Returns the table row (as text) for the given background token value.
const getRowFor = (source: string, backgroundValue: string) =>
  source
    .split('\n')
    .find(line => line.includes(`datum={{value: '${backgroundValue}'}}`));

describe('color pairing table', () => {
  const source = readFileSync(pagePath, 'utf8');

  it('pairs background-ok with onOk text colors', () => {
    const row = getRowFor(source, 'background-ok');
    expect(row).toBeDefined();
    expect(row).toContain('color="text-onOk"');
    expect(row).toContain('color.text.onOk, color.text.onOk.strong');
    expect(row).not.toContain('onWarning');
  });

  it('previews background-selected-primary-strong with onSelectedPrimaryStrong', () => {
    const row = getRowFor(source, 'background-selected-primary-strong');
    expect(row).toBeDefined();
    expect(row).toContain('color="text-onSelectedPrimaryStrong"');
    expect(row).not.toContain('color="text-onPrimaryStrong"');
  });
});
