import { Box, Heading, List, Text } from 'grommet';
import {
  StatusCritical,
  StatusWarning,
  StatusGood,
  CircleInformation,
} from 'grommet-icons';
import { DashboardCard, NotificationMetric } from '../../components';
import notifications from '../../mockData/notifications.json';

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

export const Notifications = () => {
  return (
    <DashboardCard title="Notifications" level={2}>
      <Box gap="medium">
        <Box direction="row" gap="xsmall">
          <NotificationMetric status="critical" value={1} />
          <NotificationMetric status="warning" value={6} />
          <NotificationMetric status="ok" value={86} />
          <NotificationMetric status="info" value={17} />
        </Box>
        <Heading level={3} margin="none">
          Recents
        </Heading>
        <List
          data={notifications.notifications}
          defaultItemProps={{
            border: { side: 'top', color: 'border-weak' },
          }}
        >
          {datum => (
            <Box direction="row" justify="between" gap="medium">
              <Box direction="row" gap="small">
                {statuses[datum.status].icon}
                <Box flex={false}>
                  <Text weight={500} color="text-strong">
                    {datum.service}
                  </Text>
                </Box>
                <Text truncate>{datum.message}</Text>
              </Box>
              <Box flex={false}>
                {Intl.DateTimeFormat(undefined, {
                  timeStyle: 'short',
                }).format(new Date(datum.createdAt))}
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </DashboardCard>
  );
};
