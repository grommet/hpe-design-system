import { ThemeType } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

export const sentenceCase = (str: string | number) => {
  let adjustedStr = str;
  if (typeof adjustedStr === 'number') adjustedStr = adjustedStr.toString();
  adjustedStr = adjustedStr.toLowerCase();
  return adjustedStr.charAt(0).toUpperCase() + adjustedStr.slice(1);
};

export const tshirtContextValue = {
  global: {
    size: (hpe as ThemeType)?.global?.size,
    edgeSize: (hpe as ThemeType)?.global?.edgeSize,
  },
};
