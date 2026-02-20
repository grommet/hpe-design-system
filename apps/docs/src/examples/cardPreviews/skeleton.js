import React from 'react';
import { Box, Skeleton } from 'grommet';

/* eslint-disable max-len */
export const SkeletonPreview = () => (
  <Box gap="xsmall">
    <Skeleton width="auto" height="5xsmall" round="xsmall" background="background-front" />
    <Skeleton width="small" height="5xsmall" round="xsmall" background="background-front" />
    <Skeleton width="xsmall" height="5xsmall" round="xsmall" background="background-front" />
  </Box>
);
/* eslint-enable max-len */
