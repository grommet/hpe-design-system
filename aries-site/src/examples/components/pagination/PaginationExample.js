import React from 'react';
import { Pagination, Box } from 'grommet';

export const PaginationExample = () => (
  <Box border="top" pad={{ vertical: '3xsmall' }} justify="between">
    <Pagination fill stepOptions summary numberItems={200} />
  </Box>
);
