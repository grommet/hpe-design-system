// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const colorValuePattern = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\([^)]*\))$/i;

const colorSwatchMarkdown = value => {
  if (typeof value !== 'string' || !colorValuePattern.test(value)) return '';

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">` +
    `<rect x=".5" y=".5" width="13" height="13" rx="2" ` +
    `fill="${value}" stroke="currentColor"/></svg>`;
  const uri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return ` ![Color swatch](${uri} "${value}")`;
};

const resolvedValueMarkdown = value =>
  `Resolved value: **${value}**${colorSwatchMarkdown(value)}`;

const tokenDocumentationMarkdown = (name, value) =>
  `**HPE Design Token**\n\n\`${name}\`\n\n${resolvedValueMarkdown(value)}`;

module.exports = { resolvedValueMarkdown, tokenDocumentationMarkdown };
