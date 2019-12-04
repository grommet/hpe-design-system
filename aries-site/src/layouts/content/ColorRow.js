import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const ColorRow = ({ colorSpec }) => {
  const { value, name, hex, rgb, hsl } = colorSpec;

  return (
    <Box
      direction="row"
      align="center"
      gap="large"
      pad={{ bottom: 'small', top: 'xsmall' }}
    >
      <Box direction="row" align="center" gap="medium" width="small">
        <Box
          background={value}
          round="large"
          height="xxsmall"
          width="xxsmall"
        />
        <Text color="text-strong" weight={500}>
          {name}
        </Text>
      </Box>
      <Text color="text-weak" weight={400}>
        {hex}
      </Text>
      <Text color="text-weak" weight={400}>
        {rgb}
      </Text>
      <Text color="text-weak" weight={400}>
        {hsl}
      </Text>
    </Box>
  );
};

ColorRow.propTypes = {
  colorSpec: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
    rgb: PropTypes.string.isRequired,
    hsl: PropTypes.string.isRequired,
  }).isRequired,
};
