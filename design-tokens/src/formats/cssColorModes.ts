import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { formattedVariables, fileHeader } from 'style-dictionary/utils';

export const cssColorModes: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  const { outputReferences, theme, mode } = options;
  const darkTokens = formattedVariables({
    format: 'css',
    dictionary,
    outputReferences,
    usesDtcg: true,
  });
  const dataTheme = theme ? `[data-theme=${theme}]` : '';
  // TO DO "mode" is fairly coupled with concept of "dark" right now
  // just confirm this would be able to expand to concepts like "high-contrast"
  const dataMode = mode ? `[data-mode=${mode}]` : '';
  return `${await fileHeader({
    file,
  })}:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n
${
  dataMode
    ? `@media (prefers-color-scheme: dark) {\n:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n}\n`
    : ''
}
    `;
};
