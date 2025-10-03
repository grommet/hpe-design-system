import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusWarningSmall,
} from 'grommet-icons';

const STATUS_MAP = {
  OK: { label: 'Okay', icon: <StatusGoodSmall />, color: 'status-ok' },
  Warning: {
    label: 'Warning',
    icon: <StatusWarningSmall />,
    color: 'status-warning',
  },
  Critical: {
    label: 'Critical',
    icon: <StatusCriticalSmall />,
    color: 'status-critical',
  },
  Unknown: {
    label: 'Unknown',
    icon: <StatusUnknownSmall />,
    color: 'status-unknown',
  },
};

export const StatusIndicator = ({ status }) => {
  const { label, icon, color } = STATUS_MAP[status];

  const statusIcon = React.cloneElement(icon, { color, size: 'xsmall' });

  return (
    <Box direction="row" align="center" gap="5xsmall">
      {statusIcon}
      <Text>{label}</Text>
    </Box>
  );
};

StatusIndicator.propTypes = {
  status: PropTypes.oneOf(['OK', 'Warning', 'Critical', 'Unknown']).isRequired,
};
