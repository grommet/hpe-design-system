import { Box, Text } from 'grommet';
import {
  StatusCritical,
  StatusWarning,
  StatusGood,
  CircleInformation,
} from 'grommet-icons';

const statuses = {
  critical: {
    background: 'background-status-critical',
    icon: <StatusCritical color="status-critical" height="medium" />,
    label: 'Critical',
  },
  warning: {
    background: 'background-status-warning',
    icon: <StatusWarning color="status-warning" height="medium" />,
    label: 'Warning',
  },
  ok: {
    background: 'background-status-ok',
    icon: <StatusGood color="status-ok" height="medium" />,
    label: 'Ok',
  },
  info: {
    background: 'background-status-info',
    icon: <CircleInformation color="blue" height="medium" />,
    label: 'Information',
  },
};

export const NotificationMetric = ({ status, value }) => {
  const { icon, label, background } = statuses[status] || {};

  return (
    <Box
      background={background}
      direction="row"
      gap="small"
      align="center"
      pad={{ vertical: 'small', horizontal: 'medium' }}
      round="small"
    >
      {icon}
      <Text>
        <Text weight={500} color="text-strong">
          {value}
        </Text>{' '}
        {label}
      </Text>
    </Box>
  );
};
