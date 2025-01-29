import React from "react";
import { Box, Text } from "grommet";
import { DashboardCard, Metric, metricSizes } from "../../../../components";
import { StatusGoodSmall } from "grommet-icons";


export const SystemSummary = ({ ...rest }) => {
  return (
    <DashboardCard
      title="System"
      subtitle={undefined}
      level={3}
      hideCta
      icon={undefined}
      external={undefined}
      footer={undefined}
      inline={undefined}
      {...rest}
    >
      <Box direction="row" gap="medium">
        <Metric
          label="Call home"
          value={
            <Box direction="row" align="center" gap="xsmall">
              <StatusGoodSmall color="status-ok" />
              <Text size={metricSizes.medium.value} color="text-strong" weight={500}>On</Text>
            </Box>
          }
          reverse
        />
        <Metric
          label="Source"
          value="System name"
          reverse
        />
      </Box>
    </DashboardCard>
  );
};
