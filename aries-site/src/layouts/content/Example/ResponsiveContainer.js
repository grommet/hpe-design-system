import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { screens } from '.';

export const ResponsiveContainer = ({ background, screen, ...rest }) => {
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
        height={size === 'small' ? { max: 'large' } : '100%'}
        {...rest}
        width={size === 'small' ? 'medium' : '100%'}
      />
    </Box>
  );
};

ResponsiveContainer.propTypes = {
  background: PropTypes.string,
  screen: PropTypes.string.isRequired,
};
