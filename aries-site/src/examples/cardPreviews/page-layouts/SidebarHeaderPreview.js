import React from 'react';
import { Box, defaultProps } from 'grommet';

export const SidebarHeaderPreview = () => {
  return (
    <Box fill direction="row">
      <Box
        basis={defaultProps.theme.global.edgeSize.medium}
        // remove dashed border in prod, for demo purposes only
        border={{ color: 'border', style: 'dashed' }}
      />
      <Box fill>
        <Box
          height={defaultProps.theme.global.edgeSize.medium}
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
        />
        <Box
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
          flex
        />
      </Box>
    </Box>
  );
};
