import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

const elevations = {
  medium: 'medium',
  large: 'large',
  small: 'small',
};

export const ElevationExample = ({ color, hex }) => {
  const textSize = 'small';

  return (
    <Box
      margin={{ horizontal: 'xsmall' }}
      elevation={elevations[color]}
      pad="medium"
    >
      <Text color={color} weight={600} size={textSize}>
        {color}
      </Text>
      <Text color={color} size={textSize}>
        {hex}
      </Text>
    </Box>
  );
};

ElevationExample.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  hex: PropTypes.string,
};
