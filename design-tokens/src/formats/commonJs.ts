import { fileHeader, minifyDictionary } from 'style-dictionary/utils';
import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { jsonToNestedValue } from './utils/jsonToNestedValue.js';

export const commonJs: FormatFn = async ({
  dictionary,
  file,
  platform = {},
}: FormatFnArguments) => {
  const { prefix } = platform;
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;

  const output = `${await fileHeader({
    file,
  })}module.exports = ${JSON.stringify(
    jsonToNestedValue(minifyDictionary(tokens, true)), // build in minify
    null,
    2,
  )}\n`;
  // TO DO return prettified
  return output;
};
