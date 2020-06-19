import React from 'react';
import { Box } from 'grommet';

export const HeaderFooterPreview = () => {
  return (
    <Box gap="xsmall" fill>
      <Box height="20px" background="green!" round="xsmall" />
      <Box background="orange" round="xsmall" flex />
      <Box height="20px" background="blue" round="xsmall" />
    </Box>
  );
};
