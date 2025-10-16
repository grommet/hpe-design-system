import React from 'react';
import { Box } from 'grommet';
// TODO replace with DS icon package when available
import { Hpe, Hpi } from 'grommet-icons';

export const IconPlainExample = () => (
  <Box direction="row-responsive" gap="medium">
    <Hpe color="plain" size="large" />
    <Hpi color="plain" size="large" />
  </Box>
);
