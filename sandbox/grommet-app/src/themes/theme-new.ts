import { hpe as hpeV5 } from 'grommet-theme-hpe-v5';
import { hpe as hpeV6 } from 'grommet-theme-hpe-v6';
import { hpe as hpeV8 } from 'grommet-theme-hpe';
import { buildThemePreview } from '@shared/hooks';

export const themes = {
  v5: hpeV5,
  v6: hpeV6,
  v8: hpeV8,
};

export const getQaTheme = () => buildThemePreview().theme;
