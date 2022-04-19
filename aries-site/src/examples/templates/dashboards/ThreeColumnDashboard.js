import { useContext, useState } from 'react';
import { Grid, Main, ResponsiveContext, Page, PageContent } from 'grommet';
import { AppContainer } from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import { PageHeader } from '../PageHeader';
import { CostByMonth, CostByService, CostByYear, RulesAudit } from './content';

export const ThreeColumnDashboard = () => (
  <AppContainer background="background-back">
    <ContentArea title="Global Header" />
    <Page>
      <PageContent gap="large">
        <PageHeader title="Dashboard" />
        <Content />
      </PageContent>
    </Page>
    <ContentArea title="Global Footer" />
  </AppContainer>
);

const parentGrid = {
  columns: {
    xsmall: ['100%'],
    small: ['100%'],
    medium: [
      ['small', 'large'],
      ['small', 'large'],
    ],
    large: [
      ['small', 'medium'],
      ['small', 'medium'],
      ['small', 'medium'],
    ],
    xlarge: [
      ['medium', 'large'],
      ['medium', 'large'],
      ['medium', 'large'],
    ],
  },
  gap: {
    xsmall: 'large',
    small: 'large',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  },
};

const defaultPeriod = 'Last 30 Days';

const Content = () => {
  const size = useContext(ResponsiveContext);
  const [period] = useState(defaultPeriod);

  return (
    <Main>
      <Grid columns={parentGrid.columns[size]} gap={parentGrid.gap[size]}>
        <CostByService period={period} />
        <CostByMonth period="Last Year" />
        <CostByYear period="Lifetime" />
        <RulesAudit period="Last Year" />
      </Grid>
    </Main>
  );
};
