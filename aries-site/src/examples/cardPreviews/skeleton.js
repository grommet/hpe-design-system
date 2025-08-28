import React from 'react';
import { Box, Skeleton } from 'grommet';

export const SkeletonPreview = () => (
  <Box gap='xsmall'>
    <Skeleton width="medium" height='5xsmall' round="xsmall" />
    <Skeleton width="medium" height='5xsmall' round="xsmall" />
    <Skeleton width='xsmall' height='5xsmall' round="xsmall" />
  </Box>
);
