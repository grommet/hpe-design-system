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

  if (!('figma' in nextTokens)) nextTokens.figma = {};
  if (!(level in nextTokens.figma)) nextTokens.figma[level] = {};
  if (!(category in nextTokens.figma[level]))
    nextTokens.figma[level][category] = {};
  if (!(token in nextTokens.figma[level][category]))
    nextTokens.figma[level][category][token] = {};
  if (!('modes' in nextTokens.figma[level][category][token]))
    nextTokens.figma[level][category][token].modes = {};

  nextTokens.figma[level][category][token].modes[mode] = tokenData;
};

const toFigmaTokenName = tokenName => tokenName.replaceAll('.', '/');

const addFigmaTokens = structuredTokens => {
  Object.keys(tokens).forEach(mode => {
    Object.keys(tokens[mode]).forEach(token => {
      const currentToken = tokens[mode][token];
      const figmaToken = toFigmaTokenName(token);

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
        token: figmaToken,
        mode: normalizedMode,
        tokenData: {
          ...currentToken,
          $name: currentToken.$name
            ? toFigmaTokenName(currentToken.$name)
            : figmaToken,
        },
      });
    });
  });
};

export { addFigmaTokens };