import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

const elevations = {
  elevation: 'medium',
  'elevation-strong': 'large',
  'elevation-weak': 'small',
};

export function ElevationExample({ color, hex }) {
  const textSize = 'small';

  return (
    <Box
      margin={{ horizontal: 'small' }}
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
}

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
