import React from 'react';
import PropTypes from 'prop-types';

import {
  StatusGood,
  StatusWarning,
  StatusCritical,
  StatusUnknown,
  Info,
} from '@hpe-design/icons-grommet';

import { Box } from 'grommet';

export const StatusIndicatorPreview = () => (
  <Box align="center" justify="center" fill background="background-back">
    <Box direction="row" gap="xsmall">
      <StatusGood color="status-ok" />
      <StatusWarning color="status-warning" />
      <StatusCritical color="status-critical" />
      <StatusUnknown color="status-unknown" />
    </Box>
  </Box>
);

export const StatusBox = ({ toast }) => (
  <Box direction="row" gap="xlarge" pad={{ bottom: 'medium' }}>
    <Box align="center">
      <StatusGood color="icon-ok" />
      Normal
    </Box>
    <Box align="center">
      <StatusWarning color="icon-warning" />
      Warning
    </Box>
    {!toast && (
      <Box align="center">
        <StatusCritical color="icon-critical" />
        Critical
      </Box>
    )}
    <Box align="center">
      <StatusUnknown color="icon-unknown" />
      Unknown
    </Box>
    <Box align="center">
      <Info color="icon-info" />
      Info
    </Box>
  </Box>
);

StatusBox.propTypes = {
  toast: PropTypes.bool,
};
