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
      as="span"
      background={backgroundColor}
      border
      round="xsmall"
      height="20px"
      width="20px"
      style={{ display: 'inline-block', verticalAlign: 'text-top' }}
    />
  );
};

ColorSwatch.propTypes = {
  background: PropTypes.oneOfType([
    PropTypes.shape({
      sidebar: PropTypes.bool,
    }),
    PropTypes.string,
  ]).isRequired,
};
