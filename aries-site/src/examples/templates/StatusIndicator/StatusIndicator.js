import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import {
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';

const STATUS_MAP = {
  OK: { label: 'Okay', icon: <StatusGood />, color: 'status-ok' },
  Warning: {
    label: 'Warning',
    icon: <StatusWarning />,
    color: 'status-warning',
  },
  Critical: {
    label: 'Critical',
    icon: <StatusCritical />,
    color: 'status-critical',
  },
  Unknown: {
    label: 'Unknown',
    icon: <StatusUnknown />,
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
