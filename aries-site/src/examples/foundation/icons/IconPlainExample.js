import React from 'react';
import { Box } from 'grommet';
// TODO replace with DS icon package when available
import { Hpe, HpeLabs } from 'grommet-icons';
import {
  Achievement,
  Aid,
  Alarm,
} from '@hpe-design/icons-grommet';

export const IconPlainExample = () => (
  <Box direction="row-responsive" gap="medium">
    <Achievement color="icon-weak" size="xxlarge" />
    <Aid color="icon-default" size="xxlarge" />
    <Alarm color="icon-strong" size="xxlarge" />
    <Hpe color="plain" size="xxlarge" />
    <HpeLabs color="plain" size="xxlarge" />
  </Box>
);
