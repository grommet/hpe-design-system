import React from 'react';
import { Box } from 'grommet';

export const StickyHeaderPreview = () => {
  return (
    <Box fill direction="row" gap="xsmall">
      <Box
        basis="20px"
        background={{ color: 'purple', dark: true }}
        round="xsmall"
      />
      <Box fill>
        <Box
          height="20px"
          background="green!"
          round={{ corner: 'top', size: 'xsmall' }}
        />
        <Box gap="xsmall" fill>
          <Box
            background="orange"
            round={{ corner: 'bottom', size: 'xsmall' }}
            flex
          />
          <Box height="20px" background="blue" round="xsmall" />
        </Box>
      </Box>
    </Box>
  );
};
