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
          style={{ position: 'relative' }}
          width={size === 'small' ? { max: 'large' } : undefined}
          height={size === 'small' ? { max: 'large' } : undefined}
          fill={size !== 'small'}
        >
          <Box direction="row" overflow="auto">
            {size !== 'small' && <SidebarExample mobile={mobile} />}
            <Box
              pad={{ horizontal: 'medium', bottom: 'medium' }}
              flex
              {...rest}
            />
          </Box>
          {size === 'small' && (
            <SidebarExample
              direction="row"
              fill="horizontal"
              mobile={mobile}
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
