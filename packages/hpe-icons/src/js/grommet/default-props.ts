import { deepMerge } from './utils';
import { base } from './themes';

export const defaultProps = {
  theme: base,
};

interface Theme {
  [key: string]: unknown;
}

export const extendDefaultTheme = (theme: Theme): void => {
  defaultProps.theme = deepMerge(base, theme);
};
