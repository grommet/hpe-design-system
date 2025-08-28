import React from 'react';
import { Box } from 'grommet';
import { DashboardCard, Metric } from '../../../../components';

export const PerformanceSummary = ({ size, ...rest }) => {
  return (
    <DashboardCard
      title="Performance"
      subtitle="Last hour average"
      level={3}
      hideCta
      icon={null}
      external={null}
      footer={null}
      inline={null}
      onClick={null}
      {...rest}
    >
      <Box direction="row" gap="medium" wrap>
        <Metric
          label="R latency"
          value={1.8}
          unit="ms"
          options={{}}
          reverse
          size={size}
        />
        <Metric
          label="W latency"
          value={1.8}
          unit="ms"
          options={{}}
          reverse
          size={size}
        />
        <Metric
          label="IOPS"
          value={1500}
          unit={null}
          options={{}}
          reverse
          size={size}
        />
        <Metric
          label="W latency"
          value={23.6}
          unit="MiB/s"
          options={{}}
          reverse
          size={size}
        />
      </Box>
    </DashboardCard>
  );
};
