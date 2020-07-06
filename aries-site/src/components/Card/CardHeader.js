import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Header } from 'grommet';
import { defaultProps } from 'grommet/utils';

export const CardHeader = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Header {...theme.card.header} {...rest} />;
};
