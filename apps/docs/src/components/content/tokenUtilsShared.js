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

/**
 * Generic function to structure tokens from a source into a nested object
 * @param {Object} structuredTokens - The target structured tokens object
 * @param {Object} options - Configuration options
 * @param {string} options.rootKey 
 * - The root key to nest tokens under (e.g., 'css', 'figma')
 * @param {Function} [options.transformTokenName] 
 * - Function to transform token names
 * @param {Function} [options.transformTokenData] 
 * - Function to transform token data
 */
const addStructuredTokens = (
  structuredTokens,
  { rootKey, transformTokenName, transformTokenData },
) => {
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

      // Transform token name if a transformer is provided
      const transformedTokenName = transformTokenName
        ? transformTokenName(token)
        : token;

      // Transform token data if a transformer is provided
      const transformedTokenData = transformTokenData
        ? transformTokenData(token, currentToken)
        : currentToken;

      const nextTokens = structuredTokens;

      // Navigate/create the nested structure
      if (rootKey && !(rootKey in nextTokens)) nextTokens[rootKey] = {};
      const targetLevel = rootKey ? nextTokens[rootKey] : nextTokens;

      if (!(level in targetLevel)) targetLevel[level] = {};
      if (!(category in targetLevel[level])) targetLevel[level][category] = {};
      if (!(transformedTokenName in targetLevel[level][category]))
        targetLevel[level][category][transformedTokenName] = {};
      if (!('modes' in targetLevel[level][category][transformedTokenName]))
        targetLevel[level][category][transformedTokenName].modes = {};

      targetLevel[level][category][transformedTokenName].modes[normalizedMode] =
        transformedTokenData;
    });
  });
};

export {
  modeToCollection,
  semanticModes,
  getCollectionFromMode,
  addStructuredTokens,
};
