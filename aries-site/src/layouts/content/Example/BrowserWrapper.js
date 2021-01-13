import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { screens } from '.';

export const BrowserWrapper = ({ screen, ...rest }) => {
  let width;
  if (screen === screens.laptop) width = '75%';
  else if (screen === screens.desktop) width = '100%';
  else width = 'medium';

  return (
    <Box
      margin={{ bottom: 'medium' }}
      elevation="medium"
      round="xsmall"
      overflow="hidden"
      width={width}
    >
      {screen !== screens.mobile && (
        <Box
          direction="row"
          flex={false}
          gap="xsmall"
          background="background-contrast"
          align="center"
          pad="small"
        >
          <Box round pad="xsmall" background="red" />
          <Box round pad="xsmall" background="yellow" />
          <Box round pad="xsmall" background="green" />
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
};

BrowserWrapper.propTypes = {
  screen: PropTypes.string.isRequired,
};
