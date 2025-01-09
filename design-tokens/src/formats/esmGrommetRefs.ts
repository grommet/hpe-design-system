import { fileHeader, minifyDictionary } from 'style-dictionary/utils';
import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { getGrommetValue } from './utils/getGrommetValue.js';
import { jsonToNestedValue } from './utils/jsonToNestedValue.js';
import { access } from '../utils.js';

export const esmGrommetRefs: FormatFn = async ({
  dictionary,
  file,
  platform = {},
}: FormatFnArguments) => {
  const { prefix } = platform;
  let tokens = dictionary.tokens;
  dictionary.allTokens.forEach((token: any) => {
    if (token.$type === 'gradient') console.log(token);
    const value = getGrommetValue(token, dictionary);
    const originalToken = access(token.path.join('.'), tokens);
    originalToken.$value = value;
  });

  tokens = prefix ? { [prefix]: tokens } : tokens;
  const output = `${await fileHeader({ file })}export default ${JSON.stringify(
    jsonToNestedValue(minifyDictionary(tokens, true)), // build in minify
    null,
    2,
  )}\n`;

  return output;
};
