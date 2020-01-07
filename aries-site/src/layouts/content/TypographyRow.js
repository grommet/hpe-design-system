import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const TypographyRow = ({ typographySpec }) => {
  const { name, primary, weight, value } = typographySpec;
  const textSize = 'small';

  return (
    <Box
      direction="row"
      background={primary ? 'background-front' : 'background-contrast'}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      justify="between"
    >
      <Text size={textSize} weight={weight} color="text">
        {name}
      </Text>
      <Text size={textSize} color="text">
        {weight || value}
      </Text>
    </Box>
  );
};

TypographyRow.propTypes = {
  typographySpec: PropTypes.shape({
    name: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    weight: PropTypes.number,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
