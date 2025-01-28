import React from "react";
import { Box } from "grommet";
import { DashboardCard, Metric } from "../../../../components";


export const SystemSummary = ({ ...rest }) => {
  return (
    <DashboardCard
      title="System"
      level={3}
      hideCta
      {...rest}
    >
      <Metric
        label="Call home"
        value="Enabled"
      />
    </DashboardCard>
  );
};
