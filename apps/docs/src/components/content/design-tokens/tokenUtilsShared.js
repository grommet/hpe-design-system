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

const getTargetLevel = (structuredTokens, rootKey) => {
  if (!rootKey) return structuredTokens;

  if (!(rootKey in structuredTokens)) {
    Object.assign(structuredTokens, { [rootKey]: {} });
  }

  return structuredTokens[rootKey];
};

/**
 * Generic function to structure tokens from a source into a nested object
 * @param {Object} structuredTokens - The target structured tokens object
 * @param {Object} options - Configuration options
 * @param {(string | undefined)} [options.rootKey]
 * - The root key to nest tokens under (e.g., 'css', 'figma'). If
 *   `undefined`, tokens are added directly to `structuredTokens` with no root.
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
      const category = token.split('.')[1];
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

      // Navigate/create the nested structure
      const targetLevel = getTargetLevel(structuredTokens, rootKey);

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
