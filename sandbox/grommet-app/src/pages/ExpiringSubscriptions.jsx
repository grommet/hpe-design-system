import { Box, List, Text, Notification } from 'grommet';
import { StatusCriticalSmall, StatusWarningSmall } from 'grommet-icons';
import { DashboardCard } from '../components';
import services from '../mockData/services.json';
import { useContext } from 'react';
import { SkeletonContext } from '../components';

export const ExpiringSubscriptions = () => {
  const skeleton = useContext(SkeletonContext);
  return (
    <DashboardCard
      title="Expiring subscriptions"
      level={2}
      footer={
        <Notification
          message="12 of your subscriptions will this month."
          status="warning"
          fill="horizontal"
          margin={{ top: 'medium' }}
        />
      }
    >
      <List
        data={services.services.filter(service => service.subscription)}
        defaultItemProps={{
          border: { side: 'bottom', color: 'border-weak' },
          pad: { vertical: 'xsmall' },
        }}
      >
        {datum => {
          const expired =
            new Date(datum.subscription.expiration).getTime() < Date.now();
          return (
            <Box skeleton={skeleton ? { depth: 2 } : undefined}>
              <Box direction="row" gap="3xsmall">
                {!skeleton ? (
                  expired ? (
                    <StatusCriticalSmall
                      color="status-critical"
                      height="medium"
                    />
                  ) : (
                    <StatusWarningSmall
                      color="status-warning"
                      height="medium"
                    />
                  )
                ) : undefined}
                <Box flex={false}>
                  <Text weight={500} color="text-strong">
                    {datum.subscription.name}
                  </Text>
                  <Text size="small">{`${
                    expired ? 'Expired' : 'Expires'
                  } ${Intl.DateTimeFormat(undefined, {
                    dateStyle: 'medium',
                  }).format(new Date(datum.subscription.expiration))}`}</Text>
                </Box>
              </Box>
            </Box>
          );
        }}
      </List>
    </DashboardCard>
  );
};
