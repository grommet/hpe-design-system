import { Box, DataChart, Text, Notification, Skeleton } from 'grommet';
import { DashboardCard, Legend } from '../../components';
import expenses from '../../mockData/expenses.json';
import { useContext } from 'react';
import { SkeletonContext } from '../../components';

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
        <Skeleton height="small" />
      ) : (
        <>
          <DataChart
            data={expenses.expenses}
            pad={{ horizontal: 'large' }}
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
                    color: 'chart-qualitative-30',
                  },
                  {
                    property: 'compute',
                    thickness: 'small',
                    color: 'chart-qualitative-70',
                  },
                  {
                    property: 'networking',
                    thickness: 'small',
                    color: 'chart-qualitative-50',
                  },
                ],
                type: 'bars',
              },
            ]}
            axis={{ x: { property: 'date' }, y: true }}
            guide={{ y: { granularity: 'fine' } }}
          />
          <Box direction="row" alignSelf="center" gap="medium">
            <Legend label="Storage" color="chart-qualitative-30" />
            <Legend label="Compute" color="chart-qualitative-70" />
            <Legend label="Networking" color="chart-qualitative-50" />
          </Box>
        </>
      )}
    </DashboardCard>
  );
};