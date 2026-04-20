// @ts-check
// ⚠️  AUTO-GENERATED — do not edit by hand.
// Re-run: node src/data/playground/scripts/generate-schemas.mjs \
//   Anchor
/** @typedef {import('../schema').PropDescriptor} PropDescriptor */

import {
  booleanProp,
  stringProp,
  unionProp,
  PropTypes,
} from '../schema';

// Derived from grommet AnchorProps (index.d.ts).
// Use the conf object in components/Anchor.js to
// enable/disable individual props for the Playground.

/** @type {PropDescriptor[]} */
export const anchorSchema = [
  stringProp('a11yTitle'),
  stringProp('alignSelf'),
  stringProp('color'),
  booleanProp('disabled'),
  stringProp('gap'),
  stringProp('gridArea'),
  stringProp('href'),
  stringProp('icon'),
  stringProp('label'),
  stringProp('margin'),
  booleanProp('reverse'),
  stringProp('size'),
  unionProp('weight', [
    { type: PropTypes.ENUM, options: ['normal', 'bold'] },
    { type: PropTypes.STRING },
    { type: PropTypes.NUMBER },
  ]),
];
