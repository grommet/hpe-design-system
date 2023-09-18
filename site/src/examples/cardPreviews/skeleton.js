import React from 'react';
import { Box, Skeleton } from 'grommet';

export const SkeletonPreview = () => (
  <Box gap="small">
    <Skeleton width="medium" height="xxsmall" round="xsmall" />
    <Skeleton width="medium" height="xxsmall" round="xsmall" />
    <Skeleton width="small" height="xxsmall" round="xsmall" />
  </Box>
);
