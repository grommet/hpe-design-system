import { hpe as hpeV8 } from 'grommet-theme-hpe';
import * as themePreviewHooks from '@shared/hooks/useThemePreview';

const { buildThemePreview } = themePreviewHooks;

const { theme: themePreview } = buildThemePreview();

export const themes = {
  v8: hpeV8,
  qa: themePreview,
};
