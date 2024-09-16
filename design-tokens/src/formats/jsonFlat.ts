import StyleDictionary from 'style-dictionary';
import type { Formatter, TransformedToken } from 'style-dictionary';
const { fileHeader } = StyleDictionary.formatHelpers;

export const flattenJson = (tokens: TransformedToken[]) =>
  Object.fromEntries(tokens.map(token => [token.name, token]));

export const jsonFlat: Formatter = ({ dictionary, file }) => {
  const output = `${fileHeader({ file })}export default ${JSON.stringify(
    flattenJson(dictionary.allTokens),
    null,
    2,
  )}\n`;

  return output;
};
