import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box } from 'grommet';
import { defaultProps } from 'grommet/utils';

export const Card = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Box overflow="hidden" {...theme.card.container} {...rest} />;
};
