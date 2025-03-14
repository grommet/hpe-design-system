import {
  PlatformConfig,
  Transform,
  TransformedToken,
} from 'style-dictionary/types';
import { excludedNameParts } from '../utils.js';

const SPECIAL_CHARACTERS = new RegExp('[!]', 'g');

export const nameCSS: Transform = {
  name: 'name/css',
  type: 'name',
  transform: (token: TransformedToken, config: PlatformConfig) => {
    const { prefix } = config;
    return `${prefix}-${token.path
      .filter(part => !excludedNameParts.includes(part))
      .join('-')
      .replaceAll(SPECIAL_CHARACTERS, '')}`;
  },
};
