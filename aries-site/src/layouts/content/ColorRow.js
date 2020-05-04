import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const ColorRow = ({ colorSpec, textColor }) => {
  const { value, name, hex } = colorSpec;
  const textSize = 'small';

  return (
    <Box
      direction="row"
      border={
        colorSpec.type === 'border'
          ? { color: value, size: 'medium' }
          : undefined
      }
      background={colorSpec.type === 'border' ? 'background-back' : value}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      justify="between"
    >
      <Text color={textColor} size={textSize} weight="bold">
        {name}
      </Text>
      <Text color={textColor} size={textSize}>
        {hex}
      </Text>
    </Box>
  );
};

ColorRow.propTypes = {
  colorSpec: PropTypes.shape({
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['background', 'border']),
  }).isRequired,
  textColor: PropTypes.string,
};

ColorRow.defaultProps = {
  textColor: 'text-strong',
};
