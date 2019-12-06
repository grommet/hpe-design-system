import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const ColorRow = ({ colorSpec }) => {
  const { value, name, hex } = colorSpec;

  return (
    <Box
      direction="row"
      background={value}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      justify="between"
    >
      <Text weight={500}>{name}</Text>
      <Text>{hex}</Text>
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
