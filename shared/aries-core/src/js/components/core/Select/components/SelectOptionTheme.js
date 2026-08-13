import React from 'react';
import { ThemeContext } from 'grommet';

const transparentDisabledOptionTheme = {
  button: {
    disabled: {
      option: {
        background: 'transparent',
        pad: 'none',
      },
    },
  },
};

const SelectOptionThemeScope = ({ children }) => (
  <ThemeContext.Extend value={transparentDisabledOptionTheme}>
    {children}
  </ThemeContext.Extend>
);

export { transparentDisabledOptionTheme, SelectOptionThemeScope };
