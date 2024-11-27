import { fileHeader } from 'style-dictionary/utils';
import {
  TransformedToken,
  FormatFn,
  FormatFnArguments,
} from 'style-dictionary/types';

export const flattenJson = (tokens: TransformedToken[]) =>
  Object.fromEntries(tokens.map(token => [token.name, token]));

export const jsonFlat: FormatFn = async ({
  dictionary,
  file,
}: FormatFnArguments) => {
  const output = `${await fileHeader({ file })}export default ${JSON.stringify(
    flattenJson(dictionary.allTokens),
    null,
    2,
  )}\n`;

  return output;
};
