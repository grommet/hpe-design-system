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
    <StatusCritical color="status-critical" size="xxlarge" />
    <StatusWarning color="status-warning" size="xxlarge" />
    <StatusGood color="status-ok" size="xxlarge" />
    <StatusInfo color="status-info" size="xxlarge" />
    <StatusUnknown color="status-unknown" size="xxlarge" />
    <StatusDisabled color="status-disabled" size="xxlarge" />
  </Box>
);
