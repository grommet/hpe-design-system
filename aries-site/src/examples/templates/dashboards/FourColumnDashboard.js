import { useContext } from 'react';
import { Grid, Main, ResponsiveContext } from 'grommet';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import { PageHeader } from './components';
import { CostCompact } from '.';

export const FourColumnDashboard = () => (
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
      ['small', 'large'],
      ['small', 'large'],
      ['small', 'large'],
      ['small', 'large'],
    ],
  },
  gap: {
    xsmall: 'large',
    small: 'large',
    medium: 'medium',
    large: 'medium',
    xlarge: 'medium',
  },
};

const PageContent = () => {
  const size = useContext(ResponsiveContext);
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <Main {...pageContainer}>
      <Grid columns={parentGrid.columns[size]} gap={parentGrid.gap[size]}>
        <CostCompact period="Last 30 Days" />
        <ContentArea title={2} height="medium" />
        <ContentArea title={3} height="medium" />
        <ContentArea title={4} height="medium" />
        <ContentArea title={5} height="medium" />
        <ContentArea title={6} height="medium" />
      </Grid>
    </Main>
  );
};
