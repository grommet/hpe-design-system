import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
} from "grommet";
import { Previous } from "grommet-icons";
import { RoutedAnchor } from "../../../../components";
import { DetailPane } from "./DetailPane";
import { PerformanceSummary } from "./PerformanceSummary";
import { PhysicalCapacity } from "./PhysicalCapacity";
import { SystemSummary } from "./SystemSummary";
import { PropertiesGeneral } from "./PropertiesGeneral";
import { PropertiesRelated } from "./PropertiesRelated";

export const RecordDetailDSCC = () => {
  const breakpoint = useContext(ResponsiveContext);
  console.log(breakpoint);

  const summaryColumns = ["flex", "flex", "auto"];

  const summaryRows = [["xsmall", "auto"]];

  const summaryAreas = ['xsmall', 'small'].includes(breakpoint) ?
    [
      ["summary-1", "summary-2"],
      ["summary-3", "summary-3"],
    ] : [
      ["summary-1", "summary-2", "summary-3"],
    ];

  const detailColumns = ['xsmall', 'small', 'medium'].includes(breakpoint) ?
    ['flex', 'flex'] : ['flex', 'medium'];
  const detailRows = ["auto"];
  const detailAreas = ['xsmall', 'small', 'medium'].includes(breakpoint) ?
    [
      ["detail-1", "detail-1"],
      ["detail-2", "detail-3"],
    ] :
    [
      ["detail-1", "detail-2"],
      ["unassigned-1", "detail-3"]
    ];

  const metricSize = ['xsmall', 'small', 'medium'].includes(breakpoint) ? "small" : "medium";

  return (
    <Page pad={{ bottom: 'xlarge' }} >
      <PageContent>
        <PageHeader
          title="System detail page"
          parent={<RoutedAnchor as={Link} to="/layouts" label="Layouts" icon={<Previous />} />}
        />
        <Box gap="large">
          <Grid
            areas={summaryAreas}
            columns={summaryColumns}
            rows={summaryRows}
            gap="medium"
          >
            <SystemSummary gridArea="summary-1" size={metricSize} />
            <PhysicalCapacity gridArea="summary-2" size={metricSize} />
            <PerformanceSummary gridArea="summary-3" size={metricSize} />
          </Grid>
          <Grid
            areas={detailAreas}
            columns={detailColumns}
            rows={detailRows}
            gap="large"
          >
            <DetailPane gridArea="detail-1" />
            {/* <Box gridArea="detail-2" gap="medium"> */}
            <PropertiesGeneral gridArea="detail-2" />
            <PropertiesRelated gridArea="detail-3" />
            {/* </Box> */}
          </Grid>
        </Box>
      </PageContent>
    </Page >
  );
}