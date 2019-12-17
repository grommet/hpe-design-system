import React from 'react';
import PropTypes from 'prop-types';
import { Anchor as GrommetAnchor, Box, Text } from 'grommet';

export const Anchor = ({ label, size, weight, ...rest }) => {
  return (
    <Box border={{ color: 'text', side: 'bottom' }} alignSelf="start">
      <GrommetAnchor
        label={
          <Text weight={weight} size={size}>
            {label}
          </Text>
        }
        {...rest}
      />
    </Box>
  );
};

Anchor.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.oneOfType([
    PropTypes.oneOf(['normal', 'bold']),
    PropTypes.number,
  ]),
};

Anchor.defaultProps = {
  label: undefined,
  size: 'large',
  weight: 400,
};
