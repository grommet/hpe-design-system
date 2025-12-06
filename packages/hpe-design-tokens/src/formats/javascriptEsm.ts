import { fileHeader, minifyDictionary } from 'style-dictionary/utils';
import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { jsonToNestedValue } from './utils/jsonToNestedValue.js';

export const javascriptEsm: FormatFn = async ({
  dictionary,
  file,
  platform = {},
}: FormatFnArguments) => {
  const { prefix } = platform;
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;
  //
  const output =
    (await fileHeader({ file })) +
    `export default ${JSON.stringify(
      jsonToNestedValue(minifyDictionary(tokens, true)), // Build in minified
      null,
      2,
    )}\n`;
  // TO DO return prettified
  return output;
};
