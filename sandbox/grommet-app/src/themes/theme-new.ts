import { hpe as hpeV8 } from 'grommet-theme-hpe';
import { buildThemePreview } from '@shared/hooks/useThemePreview';

const { theme: themePreview } = buildThemePreview();

export const themes = {
  v8: hpeV8,
  qa: themePreview,
};
