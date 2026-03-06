import React from 'react';
import { Box, Main, Grid, Page, PageContent, PageHeader } from 'grommet';
import { Card } from '../Card';
import { ErrorManagementEmptyState } from './ErrorManagementEmptyState';
import { CostByMonth, CostByYear } from '../dashboards';

export const CardEmptyState = () => {
  return (
    <Main>
      <Page pad={{ bottom: '3xlarge' }}>
        <PageContent gap="medium">
          <PageHeader title="Dashboard" />
          <Grid columns="medium" gap="medium">
            <CostByMonth period="Last Year" />
            <CostByYear period="Lifetime" />
            <Card align="center" title="Cost by service" level={2}>
              <Box pad={{ vertical: 'medium' }}>
                <ErrorManagementEmptyState level={3} />
              </Box>
            </Card>
          </Grid>
        </PageContent>
      </Page>
    </Main>
  );
};
