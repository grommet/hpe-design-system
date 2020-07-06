import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from 'grommet';
import { defaultProps } from 'grommet/utils';

export const CardBody = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Box flex {...theme.card.body} {...rest} />;
};
