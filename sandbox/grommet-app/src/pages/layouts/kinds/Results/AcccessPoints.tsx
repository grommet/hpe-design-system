import { Box, DataChart, Text, Skeleton, Menu } from 'grommet';
import { Legend } from '../../../../components';
import expenses from '../../../../mockData/expenses.json';
import { useContext } from 'react';
import { SkeletonContext } from '../../../../components';
import { MoreVertical } from 'grommet-icons';

export const AcccessPoints = () => {
  const skeleton = useContext(SkeletonContext);
  return skeleton ? (
    <Skeleton height="small" />
  ) : (
    <Box align="center" gap="medium">
      <Box direction="row" justify="between" gap="small" fill="horizontal">
        <Text>Denver Access Points, last 24 hours</Text>
        <Menu icon={<MoreVertical />} items={[]} />
      </Box>
      <DataChart
        data={expenses.expenses}
        series={[
          {
            property: 'date',
            render: date => (
              <Text>
                {Intl.DateTimeFormat(undefined, {
                  month: 'short',
                }).format(new Date(date))}
              </Text>
            ),
          },
          'storage',
          'compute',
          'networking',
        ]}
        chart={[
          {
            property: [
              {
                property: 'storage',
                thickness: 'small',
                color: 'graph-0',
              },
              {
                property: 'compute',
                thickness: 'small',
                color: 'graph-1',
              },
              {
                property: 'networking',
                thickness: 'small',
                color: 'graph-2',
              },
            ],
            type: 'bars',
          },
        ]}
        axis={{ x: { property: 'date' }, y: true }}
        guide={{ y: { granularity: 'fine' } }}
      />
      <Box direction="row" alignSelf="center" gap="medium">
        <Legend label="IOPs, Read" color="graph-0" />
        <Legend label="Baseline" color="graph-1" />
        <Legend label="IOPs, Write" color="graph-2" />
      </Box>
    </Box>
  );
};
