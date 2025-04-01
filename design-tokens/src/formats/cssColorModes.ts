import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { formattedVariables, fileHeader } from 'style-dictionary/utils';

export const cssColorModes: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  const { outputReferences, theme, mode: modeArg } = options;
  const tokens = formattedVariables({
    format: 'css',
    dictionary,
    outputReferences,
    usesDtcg: true,
  });

  // TO DO should default mode be light or "auto" (light aligns with grommet-theme-hpe)
  const defaultMode = 'light';
  const mode: 'light' | 'dark' | 'auto' = modeArg || defaultMode;
  const defaultThemeAndMode = !theme && mode === 'light';
  const dataMode = `[data-mode=${mode}]`;
  const dataTheme = theme ? `[data-theme=${theme}]` : '';

  // in future if we supported different themes and modes, the structure should look like
  // [data-theme="theme-name"][data-mode="mode-name"]
  const selector = `${dataTheme}${dataMode}`;
  const autoModeSelector = `${dataTheme}[data-mode=auto]`;

  /*
   * Scenario 1: OS prefers light, no mode set -> light
   *   root: ✅
   *   scoped: ✅
   * Scenario 2: OS prefers light, mode set to dark -> dark
   *   root: ✅
   *   scoped: ✅
   * Scenario 3: OS prefers light, mode set to light -> light
   *   root: ✅
   *   scoped: ✅
   * Scenario 4: OS prefers light, mode set to auto -> light
   *   root: ✅
   *   scoped: ✅
   * Scenario 5: OS prefers dark, no mode set -> light (this assumes default mode is light)
   *   root: ✅
   *   scoped: ✅
   * Scenario 6: OS prefers dark, mode set to light -> light
   *   root: ✅
   *   scoped: ✅
   * Scenario 7: OS prefers dark, mode set to dark -> dark
   *   root: ✅
   *   scoped: ✅
   * Scenario 8: OS prefers dark, mode set to auto -> dark
   *   root: ✅
   *   scoped: ✅
   **/

  return `${await fileHeader({
    file,
    // only apply to root if it's the default theme and mode
  })}${defaultThemeAndMode ? ':root, ' : ''}${
    mode === defaultMode ? `${autoModeSelector}, ` : ''
  }${selector} {\n${tokens}\n}\n
${
  mode === 'dark'
    ? `@media (prefers-color-scheme: dark) {\n${autoModeSelector}, ${selector} {\n${tokens}\n}\n}\n`
    : ''
}
    `;
};
