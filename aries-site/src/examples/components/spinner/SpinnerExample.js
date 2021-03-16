import React from 'react';
import { Box, Spinner } from 'grommet';

export const SpinnerExample = () => (
  <Box align="center" direction="row" gap="small" pad="small">
    <Spinner
      border={[
        { side: 'all', color: 'background-contrast', size: 'medium' },
        { side: 'right', color: 'brand', size: 'medium' },
        { side: 'top', color: 'brand', size: 'medium' },
        { side: 'left', color: 'brand', size: 'medium' },
      ]}
      message="Loading"
    />
  </Box>
);
