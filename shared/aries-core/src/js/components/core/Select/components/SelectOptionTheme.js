// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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

const SelectOptionThemeScope = ({ children, ...rest }) => (
  <ThemeContext.Extend value={transparentDisabledOptionTheme} {...rest}>
    {children}
  </ThemeContext.Extend>
);

export { transparentDisabledOptionTheme, SelectOptionThemeScope };
