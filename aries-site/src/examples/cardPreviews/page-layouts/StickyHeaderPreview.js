import React from 'react';
import { Box, defaultProps } from 'grommet';

export const StickyHeaderPreview = () => {
  return (
    <Box fill direction="row">
      <Box
        basis={defaultProps.theme.global.edgeSize.medium}
        // remove in prod, for demo purposes only
        border={{ color: 'border', style: 'dashed' }}
      />
      <Box fill>
        <Box
          height={defaultProps.theme.global.edgeSize.medium}
          // remove in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
        />
        <Box fill>
          <Box
            // remove in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
            flex
          />
          <Box
            height={defaultProps.theme.global.edgeSize.medium}
            // remove in prod, for demo purposes only
            border={{ color: 'border', style: 'dashed' }}
          />
        </Box>
      </Box>
    </Box>
  );
};
