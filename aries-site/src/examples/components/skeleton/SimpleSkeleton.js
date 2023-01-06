import React from 'react';
import { Box, Text, Skeleton } from 'grommet';

export const SkeletonExample = () => (
  <Box gap="small">
    <Text>Skeleton</Text>
    <Skeleton />
    <Skeleton height="small" />
  </Box>
);
