import { useContext } from 'react';
import { Grid, Main, ResponsiveContext } from 'grommet';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import { PageHeader } from './components';

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
    medium: ['auto', 'auto'],
    large: ['auto', 'auto', 'auto'],
    xlarge: ['auto', 'auto', 'auto'],
  },
  gap: {
    xsmall: 'large',
    small: 'large',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  },
};

const PageContent = () => {
  const size = useContext(ResponsiveContext);
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <Main {...pageContainer}>
      <Grid columns={parentGrid.columns[size]} gap={parentGrid.gap[size]}>
        <ContentArea title={1} height="medium" />
        <ContentArea title={2} height="medium" />
        <ContentArea title={3} height="medium" />
        <ContentArea title={4} height="medium" />
      </Grid>
    </Main>
  );
};
