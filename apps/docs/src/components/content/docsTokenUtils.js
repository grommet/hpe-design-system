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

  if (!(level in nextTokens)) nextTokens[level] = {};
  if (!(category in nextTokens[level])) nextTokens[level][category] = {};
  if (!(token in nextTokens[level][category]))
    nextTokens[level][category][token] = {};
  if (!('modes' in nextTokens[level][category][token]))
    nextTokens[level][category][token].modes = {};

  nextTokens[level][category][token].modes[mode] = tokenData;
};

const addDocsTokens = structuredTokens => {
  Object.keys(tokens).forEach(mode => {
    // primitives, component, light, dark, etc.
    Object.keys(tokens[mode]).forEach(token => {
      const currentToken = tokens[mode][token];

      const parts = token.split('.');
      const category = parts[1];
      const level = getCollectionFromMode(mode);

      const normalizedMode =
          level === 'semantic' &&
          mode !== 'global' &&
          mode !== 'dimension'
          ? mode
          : 'default';

      addStructuredToken({
        structuredTokens,
        level,
        category,
        token,
        mode: normalizedMode,
        tokenData: currentToken,
      });
    });
  });
};

export { addDocsTokens };