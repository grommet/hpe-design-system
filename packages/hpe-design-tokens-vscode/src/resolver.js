// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const T_SHIRT_SIZES = new Set([
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xsmall',
  '3xlarge',
  '4xsmall',
  '4xlarge',
  '5xsmall',
  '5xlarge',
  '6xsmall',
]);

const PROP_CATEGORIES = {
  gap: 'spacing',
  margin: 'spacing',
  pad: 'spacing',
  round: 'borderRadius',
  borderWidth: 'borderWidth',
};

const cssVariableName = tokenName =>
  `--${tokenName
    .replace(/^hpe\./, 'hpe-')
    .replace(/\./g, '-')
    .replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;

const createTokenIndex = collections => {
  const byName = new Map();
  const byCssVariable = new Map();

  collections.forEach(collection => {
    Object.entries(collection).forEach(([name, token]) => {
      byName.set(name, token);
      byCssVariable.set(cssVariableName(name), { name, token });
    });
  });

  return { byCssVariable, byName };
};

const propBeforeValue = text => {
  const match = text.match(/\b([A-Za-z][\w-]*)\s*=\s*(?:["']|\{\{?[^}]*)?$/);
  return match?.[1];
};

const findTokenAtPosition = (line, character, tokenIndex) => {
  const wordMatch = /(?:--[\w-]+|[\w-]+)/g;
  let match;

  while ((match = wordMatch.exec(line))) {
    const start = match.index;
    const end = start + match[0].length;
    if (character < start || character > end) continue;

    if (match[0].startsWith('--')) {
      const entry = tokenIndex.byCssVariable.get(match[0]);
      return entry && { ...entry, start, end };
    }

    if (!T_SHIRT_SIZES.has(match[0])) return undefined;
    const category = PROP_CATEGORIES[propBeforeValue(line.slice(0, start))];
    if (!category) return undefined;
    const name = `hpe.${category}.${match[0]}`;
    const token = tokenIndex.byName.get(name);
    return token && { name, token, start, end };
  }

  return undefined;
};

module.exports = { createTokenIndex, findTokenAtPosition };
