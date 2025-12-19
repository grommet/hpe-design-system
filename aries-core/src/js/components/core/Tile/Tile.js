import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box, Header, Heading } from 'grommet';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

export const Tile = forwardRef(({ children, heading, pad, ...rest }, ref) => {
  const tilePad =
    pad === true ? { horizontal: 'small', top: 'small', bottom: 'small' } : pad;

  return (
    <Box round="medium" overflow="hidden" ref={ref} {...rest}>
      {heading && (
        <Header pad={tilePad}>
          <Heading level={2} size="xsmall" margin="none">
            {heading}
          </Heading>
        </Header>
      )}
      <Box flex pad={tilePad} fill>
        {children}
      </Box>
    </Box>
  );
});

Tile.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', ...PAD_SIZES]),
    PropTypes.shape({
      bottom: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      horizontal: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
};

Tile.defaultProps = {
  children: undefined,
  heading: undefined,
  pad: undefined,
};
