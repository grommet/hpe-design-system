import React from 'react';
import { Box } from 'grommet';

export const SidebarHeaderFooterPreview = () => {
  return (
    <Box fill direction="row" gap="xsmall">
      <Box
        basis="20px"
        background={{ color: 'purple', dark: true }}
        round="xsmall"
      />
      <Box fill gap="xsmall">
        <Box height="20px" background="green!" round="xsmall" />
        <Box background="orange" round="xsmall" flex />
        <Box height="20px" background="blue" round="xsmall" />
      </Box>
    </Box>
  );
};
