import React from 'react';
import { Box } from 'grommet';

export const HeaderOnlyPreview = () => {
  return (
    <Box fill gap="xsmall">
      <Box height="20px" background="green!" round="xsmall" />
      <Box background="orange" round="xsmall" flex />
    </Box>
  );
};
