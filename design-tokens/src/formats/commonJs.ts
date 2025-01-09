import { fileHeader } from 'style-dictionary/utils';
import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { jsonToNestedValue } from './utils/jsonToNestedValue.js';
import { deepMerge } from '../utils.js';

export const commonJs: FormatFn = async ({
  dictionary,
  file,
  platform = {},
}: FormatFnArguments) => {
  const { prefix } = platform;
  const tokens = prefix ? { [prefix]: dictionary.tokens } : dictionary.tokens;

  const colors = {};
  let formatted = jsonToNestedValue(tokens, colors);
  if (typeof formatted === 'object') {
    // remove color object which might still contain DEFAULT and REST
    // so it can be overridden
    delete formatted.hpe.color;
    formatted = deepMerge(formatted, { hpe: colors });
  }
  const output = `${await fileHeader({
    file,
  })}module.exports = ${JSON.stringify(formatted, null, 2)}\n`;
  // TO DO return prettified
  return output;
};
