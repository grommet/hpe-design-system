import { useContext, useState } from 'react';
import { Grid, Main, ResponsiveContext } from 'grommet';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import { PageHeader } from './components';
import { CostByMonth, CostByService, CostByYear, RulesAudit } from './content';

export const ThreeColumnDashboard = () => (
  <AppContainer background="background-back">
    <ContentArea title="Global Header" />
    <PageContainer>
      <PageHeader title="Dashboard" />
      <PageContent />
    </PageContainer>
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

const PageContent = () => {
  const size = useContext(ResponsiveContext);
  const { ...pageContainer } = useContext(PageContainerContext);
  const [period] = useState(defaultPeriod);

  return (
    <Main {...pageContainer}>
      <Grid columns={parentGrid.columns[size]} gap={parentGrid.gap[size]}>
        <CostByService period={period} />
        <CostByMonth period="Last Year" />
        <CostByYear period="Lifetime" />
        <RulesAudit period="Last Year" />
        <ContentArea title={4} height="medium" />
      </Grid>
    </Main>
  );
};
