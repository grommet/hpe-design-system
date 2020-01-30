import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const TypographyRow = ({ index, typographySpec }) => {
  const { name, primary, weight, value } = typographySpec;
  const textSize = 'small';
  const background =
    (index && index % 2 === 1) || (!index && primary)
      ? 'background-front'
      : 'background-contrast';

  return (
    <Box
      direction="row"
      background={background}
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
  index: PropTypes.number,
  typographySpec: PropTypes.shape({
    name: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    weight: PropTypes.number,
    value: PropTypes.string,
  }).isRequired,
};

TypographyRow.defaultProps = {
  index: undefined,
};
