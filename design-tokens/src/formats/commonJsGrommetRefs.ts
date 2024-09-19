import StyleDictionary from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format.js';
import { getGrommetValue } from './utils/getGrommetValue.js';
import { jsonToNestedValue } from './utils/jsonToNestedValue.js';
import { access } from '../utils.js';

const { fileHeader } = StyleDictionary.formatHelpers;

export const commonJsGrommetRefs = ({
  dictionary,
  file,
  platform = {},
}: FormatterArguments) => {
  const { prefix } = platform;
  let tokens = dictionary.tokens;

  dictionary.allTokens.forEach((token: any) => {
    const value = getGrommetValue(token, dictionary);
    const originalToken = access(token.path.join('.'), tokens);
    originalToken.value = value;
  });

  tokens = prefix ? { [prefix]: tokens } : tokens;
  const output = `${fileHeader({ file })}module.exports = ${JSON.stringify(
    jsonToNestedValue(tokens),
    null,
    2,
  )}\n`;

  return output;
};
