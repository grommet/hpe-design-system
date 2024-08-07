import StyleDictionary from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format.js';
import { jsonToNestedValue } from './utils/jsonToNestedValue.js';
const { fileHeader } = StyleDictionary.formatHelpers;

export const commonJs = ({
  dictionary,
  file,
  platform = {},
}: FormatterArguments) => {
  const { prefix } = platform;
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;
  //
  const output = `${fileHeader({ file })}module.exports = ${JSON.stringify(
    jsonToNestedValue(tokens),
    null,
    2,
  )}\n`;
  // TO DO return prettified
  return output;
};
