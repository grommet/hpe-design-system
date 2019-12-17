import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const ColorRow = ({ colorSpec }) => {
  const { value, name, hex } = colorSpec;
  const textSize = 'small';

  return (
    <Box
      direction="row"
      background={value}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      justify="between"
    >
      <Text size={textSize} weight={500}>
        {name}
      </Text>
      <Text size={textSize}>{hex}</Text>
    </Box>
  );
};

ColorRow.propTypes = {
  colorSpec: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
  }).isRequired,
};
