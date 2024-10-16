import StyleDictionary from 'style-dictionary';
import { FormatterArguments } from 'style-dictionary/types/Format.js';

export const cssColorModes = ({
  dictionary,
  file,
  options,
}: FormatterArguments) => {
  const { outputReferences, theme, mode } = options;
  const darkTokens = StyleDictionary.formatHelpers.formattedVariables({
    format: 'css',
    dictionary,
    outputReferences,
  });
  const dataTheme = theme ? `[data-theme=${theme}]` : '';
  // TO DO "mode" is fairly coupled with concept of "dark" right now
  // just confirm this would be able to expand to concepts like "high-contrast"
  const dataMode = mode ? `[data-mode=${mode}]` : '';
  return `${StyleDictionary.formatHelpers.fileHeader({
    file,
  })}:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n
${
  dataMode
    ? `@media (prefers-color-scheme: dark) {\n:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n}\n`
    : ''
}
    `;
};
