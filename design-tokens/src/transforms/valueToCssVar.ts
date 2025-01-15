import { Transform, TransformedToken } from 'style-dictionary/types';
import { excludedNameParts } from '../utils.js';

/**
 * Transforms a token value from a raw value to a CSS variable. e.g. var(--hpe-color-background-back).
 */
export const valueToCssVar: Transform = {
  name: 'js/value-to-css-var',
  type: 'value',
  transitive: true,
  transform: (token: TransformedToken) => {
    return `var(--${token.name
      .split('.')
      .filter(part => !excludedNameParts.includes(part))
      .join('-')})`;
  },
};
