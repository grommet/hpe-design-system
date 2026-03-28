import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Anchor as GrommetAnchor, Box, Text } from 'grommet';

export const Anchor = forwardRef(({ label, size, weight, ...rest }, ref) => (
    // Bottom border allows for anchor underline without having
    // the underline intercept with descenders (portion of text
    // that extends below baseline)
    <Box border={{ color: 'text', side: 'bottom' }} alignSelf="start" ref={ref}>
      <GrommetAnchor
        label={
          <Text weight={weight} size={size}>
            {label}
          </Text>
        }
        {...rest}
      />
    </Box>
  ));

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
  size: 'medium',
  weight: 400,
};
