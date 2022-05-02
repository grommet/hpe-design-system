import React from 'react';
import { Box } from 'grommet';
import { Hpe, Aruba, Hpi } from 'grommet-icons';

export function IconPlainExample() {
  return <Box direction="row-responsive" gap="medium">
      <Hpe color="plain" size="large" />
      <Hpi color="plain" size="large" />
      <Aruba color="plain" size="large" />
    </Box>;
}
