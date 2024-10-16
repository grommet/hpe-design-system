import StyleDictionary from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format.js';

export const cssBreakpoints = ({
  dictionary,
  file,
  options,
}: FormatterArguments) => {
  const { outputReferences, mediaQuery } = options;
  let output = `:root {\n${StyleDictionary.formatHelpers.formattedVariables({
    format: 'css',
    dictionary,
    outputReferences,
  })}\n}`;
  if (mediaQuery) output = `@media (${mediaQuery}) {\n${output}\n}\n`;

  return `${StyleDictionary.formatHelpers.fileHeader({
    file,
  })}${output}`;
};
