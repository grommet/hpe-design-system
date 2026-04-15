// eslint-disable-next-line import/no-unresolved
import * as tokens from 'hpe-design-tokens/docs';

const modeToCollection = {
  primitives: 'primitives',
  components: 'component',
};

const semanticModes = new Set([
  'global',
  'dimension',
  'light',
  'dark',
  'small',
]);

const getCollectionFromMode = mode => {
  if (modeToCollection[mode]) return modeToCollection[mode];
  if (semanticModes.has(mode)) return 'semantic';
  return mode;
};

const addStructuredToken = ({
  structuredTokens,
  level,
  category,
  token,
  mode,
  tokenData,
}) => {
  const nextTokens = structuredTokens;

  if (!('css' in nextTokens)) nextTokens.css = {};
  if (!(level in nextTokens.css)) nextTokens.css[level] = {};
  if (!(category in nextTokens.css[level]))
    nextTokens.css[level][category] = {};
  if (!(token in nextTokens.css[level][category]))
    nextTokens.css[level][category][token] = {};
  if (!('modes' in nextTokens.css[level][category][token]))
    nextTokens.css[level][category][token].modes = {};

  nextTokens.css[level][category][token].modes[mode] = tokenData;
};

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
  Object.keys(tokens).forEach(mode => {
    Object.keys(tokens[mode]).forEach(token => {
      const currentToken = tokens[mode][token];
      const parts = token.split('.');
      const category = parts[1];
      const level = getCollectionFromMode(mode);
      const normalizedMode =
        level === 'semantic' && mode !== 'global' && mode !== 'dimension'
          ? mode
          : 'default';

      addStructuredToken({
        structuredTokens,
        level,
        category,
        token: toCssTokenName(token),
        mode: normalizedMode,
        tokenData: {
          ...currentToken,
          $name: toCssTokenName(currentToken.$name || token),
          $type: getCssTokenType(token, currentToken.$value),
        },
      });
    });
  });
};

export { addCssTokens };