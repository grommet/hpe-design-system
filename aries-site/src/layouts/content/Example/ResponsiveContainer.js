import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { screens } from '.';

export const ResponsiveContainer = forwardRef(
  ({ background, screen, ...rest }, ref) => {
    // if screen size is mobile (responsive breakpoint), set responsive
    // breakpoint to small. otherwise, behave as desktop.
    const size = screen === screens.mobile ? 'small' : 'large';
    return (
      <Box
        background={background}
        align="center"
        pad={screen === screens.mobile ? 'small' : undefined}
        fill
      >
        <Box
          height={['xsmall', 'small'].includes(size) ? 'large' : '100%'}
          {...rest}
          ref={ref}
          width={['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
        />
      </Box>
    );
  },
);

ResponsiveContainer.propTypes = {
  background: PropTypes.string,
  screen: PropTypes.string.isRequired,
};
