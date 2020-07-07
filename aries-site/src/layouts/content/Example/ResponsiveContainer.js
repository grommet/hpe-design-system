import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { screens } from '.';

export const ResponsiveContainer = ({ screen, ...rest }) => {
  // if screen size is mobile (responsive breakpoint), set responsive
  // breakpoint to small. otherwise, behave as desktop.
  const size = screen === screens.mobile ? 'small' : 'large';
  return (
    <Box
      height={size === 'small' ? { max: 'large' } : '100%'}
      {...rest}
      width={size === 'small' ? 'medium' : '100%'}
    />
  );
};

ResponsiveContainer.propTypes = {
  screen: PropTypes.string.isRequired,
};
