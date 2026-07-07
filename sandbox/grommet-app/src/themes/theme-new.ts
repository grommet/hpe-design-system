import { hpe as hpeV8 } from 'grommet-theme-hpe';
import * as sharedHooks from '@shared/hooks';

const { buildThemePreview } = sharedHooks;

const { theme: themePreview } = buildThemePreview();

export const themes = {
  v8: hpeV8,
  qa: themePreview,
};
