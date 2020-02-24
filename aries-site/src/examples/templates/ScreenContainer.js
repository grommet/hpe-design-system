import React from 'react';
import PropTypes from 'prop-types';
import { Box, Layer, ResponsiveContext } from 'grommet';
import { SidebarExample } from '.';

export const ScreenContainer = ({ mobile, ...rest }) => (
  <ResponsiveContext.Provider value={mobile && 'small'}>
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          background="background-back"
          width={size === 'small' ? { max: 'large' } : '100%'}
          height={size === 'small' ? { max: 'large' } : { max: 'large' }}
        >
          <Box direction="row" overflow="auto" fill>
            {size !== 'small' && <SidebarExample />}
            <Box
              pad={{ horizontal: 'medium', bottom: 'medium' }}
              flex
              {...rest}
            />
          </Box>
          {size === 'small' && (
            <Layer
              animate={false}
              fill="horizontal"
              modal={false}
              position="bottom"
            >
              <SidebarExample
                direction="row"
                fill="horizontal"
                mobile={mobile}
              />
            </Layer>
          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </ResponsiveContext.Provider>
);

ScreenContainer.propTypes = {
  mobile: PropTypes.bool,
};
