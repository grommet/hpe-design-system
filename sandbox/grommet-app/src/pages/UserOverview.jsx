import { Box, Meter, Text, Notification } from 'grommet';
import { DashboardCard } from '../components';
import { Legend } from '../components';
import { useContext } from 'react';
import { SkeletonContext } from '../components';

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
              color: skeleton ? 'background-contrast' : 'graph-0',
            },
            {
              value: 10,
              color: skeleton ? 'background-contrast' : 'graph-1',
            },
            {
              value: 20,
              color: skeleton ? 'background-contrast' : 'graph-2',
            },
          ]}
          size='xsmall'
        />

        <Box gap='xsmall' skeleton={skeleton ? { depth: 1 } : undefined}>
          <Box
            direction="row"
            align="center"
            justify="between"
            pad={{ bottom: 'xsmall' }}
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
            <Legend label="Assigned and subscribed" color="graph-0" />
            <Text weight={500} color="text-strong" size="small">
              163
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend label="Inactive" color="graph-1" />
            <Text weight={500} color="text-strong" size="small">
              40
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend label="Unverified" color="graph-2" />
            <Text weight={500} color="text-strong" size="small">
              19
            </Text>
          </Box>
        </Box>
      </Box>
    </DashboardCard>
  );
};
