import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';
import {
  StatusCritical,
  StatusWarning,
  StatusGood,
  CircleInformation,
} from 'grommet-icons';
import { useContext } from 'react';
import { SkeletonContext } from '../SkeletonContext';

const statuses = {
  critical: {
    background: 'background-status-critical',
    icon: <StatusCritical color="foreground-status-critical" height="medium" />,
    label: 'Critical',
  },
  warning: {
    background: 'background-status-warning',
    icon: <StatusWarning color="foreground-status-warning" height="medium" />,
    label: 'Warning',
  },
  ok: {
    background: 'background-status-ok',
    icon: <StatusGood color="foreground-status-ok" height="medium" />,
    label: 'Ok',
  },
  info: {
    background: 'background-status-info',
    icon: <CircleInformation color="foreground-status-info" height="medium" />,
    label: 'Information',
  },
};

export const NotificationMetric = ({ status, value }) => {
  const { icon, label, background } = statuses[status] || {};
  const skeleton = useContext(SkeletonContext);
  return (
    <Box
      background={background}
      direction="row"
      gap={{ column: 'small', row: 'xsmall' }}
      align="start"
      pad={{ vertical: 'small', horizontal: 'medium' }}
      round="small"
      wrap
      skeleton={skeleton ? { depth: 2 } : undefined}
    >
      {!skeleton && icon}
      <Text>
        <Text weight={500} color="text-strong">
          {value}
        </Text>{' '}
        {label}
      </Text>
    </Box>
  );
};

NotificationMetric.propTypes = {
  status: PropTypes.string,
  value: PropTypes.number,
};
