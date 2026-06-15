import { addStructuredTokens } from './tokenUtilsShared';

const toFigmaTokenName = tokenName => tokenName.replaceAll('.', '/');

const addFigmaTokens = structuredTokens => {
  addStructuredTokens(structuredTokens, {
    rootKey: 'figma',
    transformTokenName: toFigmaTokenName,
    transformTokenData: (token, currentToken) => ({
      ...currentToken,
      $name: toFigmaTokenName(currentToken.$name || token),
    }),
  });
};

export { addFigmaTokens };
