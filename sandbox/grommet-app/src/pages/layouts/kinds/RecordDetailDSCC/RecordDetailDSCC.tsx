import React from "react";
import {
  Box,
  Grid,
  Page,
  PageContent,
  PageHeader
} from "grommet";
import { SystemSummary } from "./SystemSummary";

export const RecordDetailDSCC = () => {
  const summaryColumns = [
    "flex",
    "flex",
    "flex",
  ];

  const summaryRows = [["xsmall", "auto"]];

  const summaryAreas = [
    ["summary-1", "summary-2", "summary-3"],
  ];

  const detailColumns = ['flex', 'medium'];
  const detailRows = ["auto"];
  const detailAreas = [
    ["detail-1", "detail-2"],
  ];

  return (
    <Page>
      <PageContent>
        <PageHeader title="System detail page" />
        <Box gap="large">
          <Grid
            areas={summaryAreas}
            columns={summaryColumns}
            rows={summaryRows}
            gap="medium"
          >
            <SystemSummary gridArea="summary-1" />
            <Box gridArea="summary-2" background="background-front">2</Box>
            <Box gridArea="summary-3" background="background-front">3</Box>
          </Grid>
          <Grid
            areas={detailAreas}
            columns={detailColumns}
            rows={detailRows}
            gap="large"
          >
            <Box gridArea="detail-1" background="background-front">1</Box>
            <Box gridArea="detail-2" background="background-front">2</Box>
          </Grid>
        </Box>
      </PageContent>
    </Page >
  );
}