import React from 'react';
import { Box } from 'grommet';
import { Alarm } from '@hpe-design/icons-grommet';

export const IconSizeExample = () => (
  <Box direction="row-responsive" gap="medium">
    <Alarm size="xxlarge" />
    <Alarm size="xlarge" />
    <Alarm size="large" />
    <Alarm size="medium" />
    <Alarm size="small" />
    <Alarm size="xsmall" />
  </Box>
);
