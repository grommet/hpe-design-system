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
  // default mode is light
  const dataMode = `[data-mode=${mode || 'light'}]`;
  return `${await fileHeader({
    file,
    // if no mode specified, apply default mode (light) to root
  })}:root${dataTheme}${mode ? dataMode : ''}, ${dataMode} {\n${darkTokens}\n}\n
${
  mode === 'dark'
    ? `@media (prefers-color-scheme: dark) {\n:root${dataTheme}${dataMode}, ${dataMode} {\n${darkTokens}\n}\n}\n`
    : ''
}
    `;
};
