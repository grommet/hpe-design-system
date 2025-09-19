import { Box, DataChart, Text, Notification, Skeleton } from 'grommet';
import { DashboardCard, Legend } from '../components';
import expenses from '../mockData/expenses.json';
import { useContext } from 'react';
import { SkeletonContext } from '../components';

export const MonthlyCharges = () => {
  const skeleton = useContext(SkeletonContext);
  return (
    <DashboardCard
      title="Monthly charges"
      level={2}
      footer={
        <Notification
          message="Your networking expenses have increased by 23% this month. Set up a"
          actions={[{ label: 'budget alert.' }]}
          status="warning"
          fill="horizontal"
          margin={{ top: 'medium' }}
        />
      }
    >
      {skeleton ? (
        <Skeleton height="xsmall" />
      ) : (
        <>
          <DataChart
            data={expenses.expenses}
            pad={{ horizontal: "xlarge" }}
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
            <Legend label="Storage" color="graph-0" />
            <Legend label="Compute" color="graph-1" />
            <Legend label="Networking" color="graph-2" />
          </Box>
        </>
      )}
    </DashboardCard>
  );
};
