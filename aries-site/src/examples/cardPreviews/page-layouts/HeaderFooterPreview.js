import React from 'react';
import { Box, defaultProps } from 'grommet';

export const HeaderFooterPreview = () => {
  return (
    <Box gap="xsmall" fill>
      <Box
        height={defaultProps.theme.global.edgeSize.medium}
        background="green!"
        round="xsmall"
      />
      <Box background="orange" round="xsmall" flex />
      <Box
        height={defaultProps.theme.global.edgeSize.medium}
        background={{ color: { light: 'blue', dark: 'blue!' } }}
        round="xsmall"
      />
    </Box>
  );
};
