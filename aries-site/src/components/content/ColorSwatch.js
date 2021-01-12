import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box } from 'grommet';

export const ColorSwatch = ({ background }) => {
  const theme = useContext(ThemeContext);

  let backgroundColor;
  if (background.sidebar && theme.dark) backgroundColor = 'blue';
  else backgroundColor = background;

  return (
    <Box
      background={backgroundColor}
      border
      round="xsmall"
      height="20px"
      width="20px"
      style={{ display: 'inline-block' }}
    />
  );
};

ColorSwatch.propTypes = {
  background: PropTypes.shape({
    sidebar: PropTypes.bool,
  }).isRequired,
};
