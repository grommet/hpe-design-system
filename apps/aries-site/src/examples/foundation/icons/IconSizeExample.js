import React from 'react';
import { Box } from 'grommet';
import { Alarm } from '@hpe-design/icons-grommet';

export const IconSizeExample = () => (
  <Box direction="row-responsive" gap="medium">
    <Alarm size="xxlarge" color="icon-strong" />
    <Alarm size="xlarge" color="icon-strong" />
    <Alarm size="large" color="icon-strong" />
    <Alarm size="medium" color="icon-strong" />
    <Alarm size="small" color="icon-strong" />
    <Alarm size="xsmall" color="icon-strong" />
  </Box>
);
