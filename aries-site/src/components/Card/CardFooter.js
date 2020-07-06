import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Footer } from 'grommet';
import { defaultProps } from 'grommet/utils';

// Needs to have a CardBody or a flex container when Card uses a fixed height.
export const CardFooter = ({ ...rest }) => {
  const theme = useContext(ThemeContext) || defaultProps.theme;
  return <Footer {...theme.card.footer} {...rest} />;
};
