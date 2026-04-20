import { addStructuredTokens } from './tokenUtilsShared';

const getCssTokenType = (token, value) => {
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value !== 'string') return 'string';

  if (/\.color\.|-color-/.test(token) || value.includes('--hpe-color-'))
    return 'color';

  return 'string';
};

const toCssTokenName = tokenName => `--${tokenName.replaceAll('.', '-')}`;

const addCssTokens = structuredTokens => {
  addStructuredTokens(structuredTokens, {
    rootKey: 'css',
    transformTokenName: toCssTokenName,
    transformTokenData: (token, currentToken) => ({
      ...currentToken,
      $name: toCssTokenName(currentToken.$name || token),
      $type: getCssTokenType(token, currentToken.$value),
    }),
  });
};

export { addCssTokens };