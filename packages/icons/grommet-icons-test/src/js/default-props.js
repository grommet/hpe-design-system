import { deepMerge } from './utils';
import { base } from './themes';

export const defaultProps = {
  theme: base,
};

export const extendDefaultTheme = (theme) => {
  defaultProps.theme = deepMerge(base, theme);
};
