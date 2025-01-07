import {
  PlatformConfig,
  Transform,
  TransformedToken,
} from 'style-dictionary/types';

export const nameCSS: Transform = {
  name: 'name/css',
  type: 'name',
  transform: (token: TransformedToken, config: PlatformConfig) => {
    const { prefix } = config;
    return `${prefix}-${token.path.join('-')}`;
  },
};
