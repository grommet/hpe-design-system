import { addStructuredTokens } from './tokenUtilsShared';

const toFigmaTokenName = tokenName => tokenName.replaceAll('.', '/');

const addFigmaTokens = structuredTokens => {
  addStructuredTokens(structuredTokens, {
    rootKey: 'figma',
    transformTokenName: toFigmaTokenName,
    transformTokenData: (token, currentToken) => ({
      ...currentToken,
      $name: currentToken.$name
        ? toFigmaTokenName(currentToken.$name)
        : toFigmaTokenName(token),
    }),
  });
};

export { addFigmaTokens };
