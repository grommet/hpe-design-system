import React from 'react';
import { Box, Spinner } from 'grommet';

export const SpinnerExample = () => (
  <Box align="center" direction="row" gap="small" pad="small">
    <Spinner message="Loading" />
  </Box>
);
