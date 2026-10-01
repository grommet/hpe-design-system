// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const assert = require('node:assert/strict');

const {
  resolvedValueMarkdown,
  tokenDocumentationMarkdown,
} = require('./hover');

test('adds an inline swatch for hexadecimal colors', () => {
  const markdown = resolvedValueMarkdown('#606a70');

  assert.match(markdown, /Resolved value: \*\*#606a70\*\*/);
  assert.match(markdown, /!\[Color swatch\]\(data:image\/svg\+xml/);
});

test('adds an inline swatch for rgba colors', () => {
  assert.match(
    resolvedValueMarkdown('rgba(0, 0, 0, 0.24)'),
    /!\[Color swatch\]/,
  );
});

test('keeps non-color values text-only', () => {
  assert.equal(resolvedValueMarkdown('24px'), 'Resolved value: **24px**');
});

test('uses the same color preview in token documentation', () => {
  assert.match(
    tokenDocumentationMarkdown('hpe.color.icon.weak', '#606a70'),
    /!\[Color swatch\]/,
  );
});
