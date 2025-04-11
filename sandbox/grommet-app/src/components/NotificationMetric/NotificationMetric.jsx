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
    background: 'background-critical',
    icon: <StatusCritical color="icon-critical" height="medium" />,
    label: 'Critical',
  },
  warning: {
    background: 'background-warning',
    icon: <StatusWarning color="icon-warning" height="medium" />,
    label: 'Warning',
  },
  ok: {
    background: 'background-ok',
    icon: <StatusGood color="icon-ok" height="medium" />,
    label: 'Ok',
  },
  info: {
    background: 'background-info',
    icon: <CircleInformation color="icon-info" height="medium" />,
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
      gap={{ column: 'xsmall', row: '3xsmall' }}
      align="start"
      pad={{ vertical: 'xsmall', horizontal: 'medium' }}
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
