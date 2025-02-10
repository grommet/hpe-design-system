import { Box, Notification } from 'grommet';
import { DashboardCard, Metric } from '../components';

const currencyOptions = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
};

export const BillingSummary = () => {
  return (
    <DashboardCard
      title="Billing summary"
      subtitle="August 1-10, 2023"
      level={2}
      footer={
        <Notification
          status="warning"
          message="Your costs have increased by 14% this month. Avoid surprises with a"
          actions={[{ label: 'budget alert.' }]}
        />
      }
    >
      <Box gap="medium">
        <Metric
          label="Month-to-date total cost"
          value={618.18}
          options={currencyOptions}
        />
        <Metric
          label="End-of-month total cost (forecasted)"
          value={652.11}
          options={currencyOptions}
        />
      </Box>
    </DashboardCard>
  );
};
