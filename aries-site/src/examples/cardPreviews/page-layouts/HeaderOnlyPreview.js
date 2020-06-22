import React from 'react';
import { Box, defaultProps } from 'grommet';

export const HeaderOnlyPreview = () => {
  return (
    <Box fill gap="xsmall">
      <Box
        height={defaultProps.theme.global.edgeSize.medium}
        background="green!"
        round="xsmall"
      />
      <Box background="orange" round="xsmall" flex />
    </Box>
  );
};
