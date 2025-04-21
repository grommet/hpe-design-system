import React from 'react';
import { Box, Text } from 'grommet';
import { DashboardCard, Metric, metricSizes } from '../../../../components';
import { StatusGoodSmall } from 'grommet-icons';

export const SystemSummary = ({ size, ...rest }) => {
  return (
    <DashboardCard
      title="System"
      subtitle={null}
      level={2}
      hideCta
      icon={null}
      external={null}
      footer={null}
      inline={null}
      onClick={null}
      {...rest}
    >
      <Box direction="row" gap={{ column: 'medium', row: '3xsmall' }} wrap>
        <Metric
          label="Call home"
          value={
            <Box direction="row" align="center" gap="3xsmall">
              <StatusGoodSmall color="status-ok" />
              <Text
                size={metricSizes[size].value}
                color="text-strong"
                weight={500}
              >
                On
              </Text>
            </Box>
          }
          reverse
          options={null}
          unit={null}
          size={size}
        />
        <Metric
          label="Source"
          value="System name"
          reverse
          options={null}
          unit={null}
          size={size}
        />
      </Box>
    </DashboardCard>
  );
};
