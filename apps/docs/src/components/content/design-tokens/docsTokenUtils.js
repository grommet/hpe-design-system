import { addStructuredTokens } from './tokenUtilsShared';

const addDocsTokens = structuredTokens => {
  addStructuredTokens(structuredTokens, {
    rootKey: undefined, // No root key for docs tokens
  });
};

export { addDocsTokens };
