import React from 'react';
import PropTypes from 'prop-types';

import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { StatusWarningSmall } from 'grommet-icons/icons/StatusWarningSmall';
import { StatusCriticalSmall } from 'grommet-icons/icons/StatusCriticalSmall';
import { StatusUnknownSmall } from 'grommet-icons/icons/StatusUnknownSmall';

import { Box } from 'grommet';

export const StatusIndicatorPreview = () => (
  <Box align="center" justify="center" fill background="background-back">
    <Box direction="row" gap="small">
      <StatusGoodSmall color="status-ok" />
      <StatusWarningSmall color="status-warning" />
      <StatusCriticalSmall color="status-critical" />
      <StatusUnknownSmall color="status-unknown" />
    </Box>
  </Box>
);

export const StatusBox = ({ toast }) => (
  <Box direction="row" gap="large" pad={{ bottom: 'medium' }}>
    <Box align="center">
      <StatusGoodSmall color="status-ok" />
      Normal
    </Box>
    <Box align="center">
      <StatusWarningSmall color="status-warning" />
      Warning
    </Box>
    {!toast && (
      <Box align="center">
        <StatusCriticalSmall color="status-critical" />
        Critical
      </Box>
    )}
    <Box align="center">
      <StatusUnknownSmall color="status-unknown" />
      Unknown
    </Box>
  </Box>
);

StatusBox.propTypes = {
  toast: PropTypes.bool,
};
