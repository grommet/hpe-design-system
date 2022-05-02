import React from 'react';
import { Box } from 'grommet';
import { Alarm } from 'grommet-icons';

export function IconSizeExample() {
  return <Box direction="row-responsive" gap="medium">
      <Alarm size="xlarge" />
      <Alarm size="large" />
      <Alarm size="medium" />
    </Box>;
}
