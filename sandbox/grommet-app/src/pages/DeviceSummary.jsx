import { useContext } from 'react';
import { Box, Stack, Meter, Text } from 'grommet';
import { DashboardCard } from '../components';
import { Legend } from '../components';
import { SkeletonContext } from '../components';

export const DeviceSummary = () => {
  const skeleton = useContext(SkeletonContext);

  return (
    <DashboardCard title="Device summary" level={2}>
      <Box gap="medium">
        <Stack anchor="center" alignSelf="center">
          <Meter
            type="circle"
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
            size="xsmall"
            thickness="medium"
          />
          <Box align="center" pad={{ bottom: '3xsmall' }}>
            <Text size="xxlarge" weight={500} color="text-strong">
              {347}
            </Text>
            <Text size="small">Total devices</Text>
          </Box>
        </Stack>
        <Box gap="xsmall">
          <Box direction="row" align="center" justify="between">
            <Legend label="Require assignments" color="graph-2" />
            <Text weight={500} color="text-strong">
              68
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend label="Require subscriptions" color="graph-1" />
            <Text weight={500} color="text-strong">
              34
            </Text>
          </Box>
          <Box direction="row" align="center" justify="between">
            <Legend label="Assigned and subscribed" color="graph-0" />
            <Text weight={500} color="text-strong">
              245
            </Text>
          </Box>
        </Box>
      </Box>
    </DashboardCard>
  );
};
