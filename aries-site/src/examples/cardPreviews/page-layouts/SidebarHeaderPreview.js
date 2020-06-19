import React from 'react';
import { Box } from 'grommet';

export const SidebarHeaderPreview = () => {
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
      </Box>
    </Box>
  );
};
