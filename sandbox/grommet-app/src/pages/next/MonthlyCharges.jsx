import { Box, DataChart, Text, Notification } from 'grommet';
import { DashboardCard, Legend } from '../../components';
import expenses from '../../mockData/expenses.json';

export const MonthlyCharges = () => (
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
            { property: 'storage', thickness: 'small', color: 'graph-2' },
            { property: 'compute', thickness: 'small', color: 'graph-4' },
            { property: 'networking', thickness: 'small', color: 'graph-0' },
          ],
          type: 'bars',
        },
      ]}
      axis={{ x: { property: 'date' }, y: true }}
      guide={{ y: { granularity: 'fine' } }}
    />
    <Box direction="row" alignSelf="center" gap="medium">
      <Legend label="Storage" color="graph-2" />
      <Legend label="Compute" color="graph-4" />
      <Legend label="Networking" color="graph-0" />
    </Box>
  </DashboardCard>
);
