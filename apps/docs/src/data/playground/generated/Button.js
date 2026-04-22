// @ts-check
// ⚠️  AUTO-GENERATED — do not edit by hand.
// Re-run: node src/data/playground/scripts/generate-schemas.mjs \
//   Button
/** @typedef {import('../schema').PropDescriptor} PropDescriptor */

import {
  booleanProp,
  enumProp,
  stringProp,
  unionProp,
  PropTypes,
} from '../schema';

// Derived from grommet ButtonProps (index.d.ts).
// Use the conf object in components/Button.js to
// enable/disable individual props for the Playground.

/** @type {PropDescriptor[]} */
export const buttonSchema = [
  stringProp('a11yTitle'),
  booleanProp('active'),
  stringProp('alignSelf'),
  unionProp('badge', [
    { type: PropTypes.BOOLEAN },
    { type: PropTypes.NUMBER },
    { type: PropTypes.STRING },
  ]),
  booleanProp('busy'),
  stringProp('color'),
  booleanProp('disabled'),
  unionProp('fill', [
    { type: PropTypes.BOOLEAN },
    { type: PropTypes.ENUM, options: ['horizontal', 'vertical'] },
  ]),
  unionProp('focusIndicator', [
    { type: PropTypes.BOOLEAN },
    { type: PropTypes.ENUM, options: ['inset'] },
  ]),
  stringProp('gap'),
  stringProp('gridArea'),
  unionProp('hoverIndicator', [
    { type: PropTypes.BOOLEAN },
    { type: PropTypes.STRING },
  ]),
  stringProp('href'),
  stringProp('icon'),
  enumProp('justify', [
    'around',
    'between',
    'center',
    'end',
    'evenly',
    'start',
    'stretch',
  ]),
  stringProp('kind'),
  stringProp('label'),
  stringProp('margin'),
  stringProp('pad'),
  booleanProp('plain'),
  booleanProp('primary'),
  booleanProp('reverse'),
  booleanProp('secondary'),
  stringProp('size'),
  booleanProp('success'),
  stringProp('target'),
  stringProp('tip'),
  enumProp('type', ['button', 'reset', 'submit']),
];
