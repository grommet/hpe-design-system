import { themes } from '../theme';

export const useThemes = url =>
  Object.keys(themes)
    .map(theme => {
      if (theme === 'next') {
        return url.includes('hpe-theme-preview') ? theme : undefined;
      } else return theme;
    })
    .filter(theme => theme);
