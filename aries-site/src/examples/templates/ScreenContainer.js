import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import { SidebarExample } from '.';

export const ScreenContainer = ({ mobile, ...rest }) => (
  <ResponsiveContext.Provider value={mobile && 'small'}>
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          background="background-back"
          width={size === 'small' ? { max: 'large' } : '100%'}
          height={{ max: 'large' }}
          style={{ position: 'relative' }}
        >
          <Box direction="row" fill>
            {size !== 'small' && <SidebarExample />}
            <Box
              overflow="auto"
              pad={{ horizontal: 'medium', bottom: 'medium' }}
              flex
              {...rest}
            />
          </Box>
          {size === 'small' && (
            <SidebarExample
              style={{ position: 'absolute', bottom: 0, left: 0 }}
            />
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </ResponsiveContext.Provider>
);

ScreenContainer.propTypes = {
  mobile: PropTypes.bool,
};
