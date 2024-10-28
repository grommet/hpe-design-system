import { Box, Heading, List, Text } from 'grommet';
import {
  StatusCritical,
  StatusWarning,
  StatusGood,
  StatusCriticalSmall,
  StatusWarningSmall,
  StatusGoodSmall,
  CircleInformation,
} from 'grommet-icons';
import { DashboardCard, NotificationMetric } from '../../components';
import notifications from '../../mockData/notifications.json';
import { useContext } from 'react';
import { SkeletonContext } from '../../components';

const statuses = {
  critical: {
    background: 'background-status-critical',
    icon: <StatusCritical color="icon-critical" height="medium" />,
    iconCompact: <StatusCriticalSmall color="icon-critical" height="medium" />,
    label: 'Critical',
  },
  warning: {
    background: 'background-status-warning',
    icon: <StatusWarning color="icon-warning" height="medium" />,
    iconCompact: <StatusWarningSmall color="icon-warning" height="medium" />,
    label: 'Warning',
  },
  ok: {
    background: 'background-status-ok',
    icon: <StatusGood color="icon-ok" height="medium" />,
    iconCompact: <StatusGoodSmall color="icon-ok" height="medium" />,
    label: 'Ok',
  },
  info: {
    background: 'background-status-info',
    icon: <CircleInformation color="icon-info" height="medium" />,
    iconCompact: <StatusGoodSmall color="icon-info" height="medium" />,
    label: 'Information',
  },
};

export const Notifications = () => {
  const skeleton = useContext(SkeletonContext);
  return (
    <DashboardCard title="Notifications" level={2} skeleton={false}>
      <Box gap="medium">
        <Box direction="row" gap="xsmall">
          <NotificationMetric status="critical" value={1} />
          <NotificationMetric status="warning" value={6} />
          <NotificationMetric status="ok" value={86} />
          <NotificationMetric status="info" value={17} />
        </Box>
        <Box gap="small">
          <Heading level={3} margin="none">
            Recents
          </Heading>
          <List
            data={notifications.notifications}
            defaultItemProps={{
              border: { side: 'top', color: 'border-weak' },
              pad: 'small',
            }}
          >
            {datum => (
              <Box
                direction="row"
                justify="between"
                gap="medium"
                skeleton={skeleton}
              >
                <Box direction="row" gap="small">
                  {!skeleton ? statuses[datum.status].iconCompact : undefined}
                  <Box flex={false}>
                    <Text weight={500} color="text-strong">
                      {datum.service}
                    </Text>
                  </Box>
                  <Text truncate>{datum.message}</Text>
                </Box>
                <Box flex={false}>
                  <Text>
                    {Intl.DateTimeFormat(undefined, {
                      timeStyle: 'short',
                    }).format(new Date(datum.createdAt))}
                  </Text>
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </DashboardCard>
  );
};
