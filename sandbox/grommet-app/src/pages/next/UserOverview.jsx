import { Box, Meter, Text, Notification } from 'grommet';
import { DashboardCard } from '../../components';
import { Legend } from '../../components';
import { useContext } from 'react';
import { SkeletonContext } from '../../components';

export const UserOverview = () => {
  const skeleton = useContext(SkeletonContext);
  return (
    <DashboardCard
      title="User overview"
      level={2}
      footer={
        <Notification
          message="19 unverified users to be removed."
          status="warning"
          fill="horizontal"
          margin={{ top: 'medium' }}
        />
      }
    >
      <Box gap="medium">
        <Meter
          alignSelf="center"
          type="pie"
          values={[
            {
              value: 70,
              color: skeleton ? 'background-contrast' : 'chart-qualitative-70',
            },
            {
              value: 10,
              color: skeleton ? 'background-contrast' : 'chart-qualitative-50',
            },
            {
              value: 20,
              color: skeleton ? 'background-contrast' : 'chart-qualitative-30',
            },
          ]}
          size="small"
        />

        <Box gap="small" skeleton={skeleton ? { depth: 1 } : undefined}>
          <Box
            direction="row"
            align="center"
            justify="between"
            pad={{ bottom: 'small' }}
            border={{ side: 'bottom', color: 'border-weak' }}
          >
            <Text weight={500} size="small">
              Total
            </Text>
            <Text weight={500} color="text-strong" size="small">
              232
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend
              label="Assigned and subscribed"
              color="chart-qualitative-70"
            />
            <Text weight={500} color="text-strong" size="small">
              163
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend label="Inactive" color="chart-qualitative-50" />
            <Text weight={500} color="text-strong" size="small">
              40
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend label="Unverified" color="chart-qualitative-30" />
            <Text weight={500} color="text-strong" size="small">
              19
            </Text>
          </Box>
        </Box>
      </Box>
    </DashboardCard>
  );
};
