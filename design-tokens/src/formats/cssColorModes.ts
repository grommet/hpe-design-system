import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';
import { formatCssVariables } from './utils/formatCssVariables.js';

export const cssColorModes: FormatFn = async ({
  dictionary,
  file,
  options,
  platform,
}: FormatFnArguments) => {
  const { theme, mode } = options;

  const tokens = formatCssVariables({ dictionary, file, options, platform });
  const dataTheme = theme ? `[data-theme=${theme}]` : '';
  // TO DO "mode" is fairly coupled with concept of "dark" right now
  // just confirm this would be able to expand to concepts like "high-contrast"
  const dataMode = mode ? `[data-mode=${mode}]` : '';
  return `${await fileHeader({
    file,
  })}:root${dataTheme}${dataMode} {\n${tokens}\n}\n
${
  dataMode
    ? `@media (prefers-color-scheme: dark) {\n:root${dataTheme}${dataMode} {\n${tokens}\n}\n}\n`
    : ''
}
    `;
};
