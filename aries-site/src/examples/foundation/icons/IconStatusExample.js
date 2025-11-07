import React from 'react';
import { Box } from 'grommet';
import {
  StatusCritical,
  StatusDisabled,
  StatusGood,
  StatusInfo,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';

export const IconStatusExample = () => (
  <Box direction="row-responsive" gap="medium">
    <StatusCritical color="icon-critical" size="xxlarge" />
    <StatusWarning color="icon-warning" size="xxlarge" />
    <StatusGood color="icon-ok" size="xxlarge" />
    <StatusInfo color="icon-info" size="xxlarge" />
    <StatusUnknown color="icon-unknown" size="xxlarge" />
  </Box>
);
