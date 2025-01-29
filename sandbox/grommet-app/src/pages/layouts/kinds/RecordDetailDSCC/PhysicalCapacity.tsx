import React from "react";
import { Box, Grid, Meter, Text } from "grommet";
import { DashboardCard, Metric } from "../../../../components";


export const PhysicalCapacity = ({ ...rest }) => {
  return (
    <DashboardCard
      title="Physical capacity"
      subtitle={undefined}
      level={3}
      hideCta
      icon={undefined}
      external={undefined}
      footer={undefined}
      inline={undefined}
      {...rest}
    >
      <Grid
        gap="small"
        areas={[
          ["metric", "summary"],
          ["meter", "meter"]
        ]}
        columns={['flex', 'auto']}
        rows={['auto']}
      >
        <Metric
          gridArea="metric"
          label={null}
          value="47%"
          unit="used"
          options={null}
          reverse
        />
        <Meter
          gridArea="meter"
          type="bar"
          max={100}
          values={[{ value: 34 }, { value: 13 }]}
          size="full"
          thickness="small"
        />
        <Box gridArea="summary" justify="end">
          <Text>
            <Text color="text-strong" weight={500}>131.5</Text> of 281.1 TiB
          </Text>
        </Box>
      </Grid>
    </DashboardCard >
  );
};
