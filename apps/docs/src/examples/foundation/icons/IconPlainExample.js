import React from 'react';
import { Box } from 'grommet';
import { Achievement, Aid, Alarm, Element } from '@hpe-design/icons-grommet';

export const IconPlainExample = () => (
  <Box direction="row-responsive" gap="medium">
    <Achievement color="icon-weak" size="xxlarge" />
    <Aid color="icon-default" size="xxlarge" />
    <Alarm color="icon-strong" size="xxlarge" />
    <Element color="plain" size="xxlarge" />
  </Box>
);
