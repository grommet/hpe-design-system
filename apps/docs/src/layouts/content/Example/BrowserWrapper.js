import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { screens } from '.';

export const BrowserWrapper = forwardRef(
  ({ screen, width: widthProp, ...rest }, ref) => {
    let width;
    if (widthProp) width = widthProp;
    else if (screen === screens.laptop) width = '75%';
    else if (screen === screens.desktop) width = '100%';
    else width = 'medium';

    return (
      <Box
        elevation="medium"
        round="xsmall"
        overflow="hidden"
        width={width}
        ref={ref}
      >
        {screen !== screens.mobile && (
          <Box
            direction="row"
            flex={false}
            gap="3xsmall"
            /* This Box represents a header of a browser application window. 
            The selected background color provides better contrast between the 
            header and the examples being showcased. */
            background={{ color: 'border-weak' }}
            align="center"
            pad="xsmall"
          >
            {/* TODO consider revisiting these colors when
       we have more tokens available */}
            <Box round pad="3xsmall" background="foreground-critical" />
            <Box round pad="3xsmall" background="foreground-warning" />
            <Box round pad="3xsmall" background="foreground-primary" />
          </Box>
        )}
        <Box
          height="100%"
          {...rest}
          // allow BrowserWrapper width to override width from rest
          width={screen === screens.desktop ? '75%' : '100%'}
          margin="auto"
          fill={screen === screens.mobile}
          overflow="auto"
        />
      </Box>
    );
  },
);

BrowserWrapper.propTypes = {
  screen: PropTypes.string.isRequired,
  width: PropTypes.string,
};
