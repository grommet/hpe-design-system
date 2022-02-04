import React, { useContext } from 'react';
import { Box, Grid, Main, ResponsiveContext } from 'grommet';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import { PageHeader } from './components';
import { FirmWareStatus, ServerAttention, ServerHealth } from './content';

export const TwoColumnDashboard = () => (
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
    xsmall: '100%',
    small: '100%',
    medium: ['auto', 'auto'],
    large: ['auto', 'medium'],
    xlarge: ['auto', 'medium'],
  },
  gap: {
    xsmall: 'large',
    small: 'large',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  },
};

const firstChildGrid = {
  columns: {
    xsmall: '100%',
    small: '100%',
    medium: '100%',
    large: ['auto', ['small', 'medium']],
    xlarge: ['auto', ['small', 'medium']],
  },
  gap: 'medium',
};

const secondChildGrid = {
  columns: {
    xsmall: '100%',
    small: '100%',
    medium: '100%',
    large: { count: 'fit', size: ['medium', 'auto'] },
    xlarge: { count: 'fit', size: ['medium', 'auto'] },
  },
  gap: 'medium',
};

const PageContent = () => {
  const size = useContext(ResponsiveContext);
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <Main {...pageContainer}>
      <Grid gap={parentGrid.gap[size]} columns={parentGrid.columns[size]}>
        {/* Content Block 1 is top priority content. At narrow breakpoints, 
        place as first content element. Otherwise, place in second column. */}
        {(size === 'small' || size === 'xsmall') && <ContentBlock title="1" />}
        <Grid gap={firstChildGrid.gap}>
          <Grid columns={firstChildGrid.columns[size]} gap={firstChildGrid.gap}>
            <ServerHealth />
            <ServerAttention />
          </Grid>
          <Grid
            columns={secondChildGrid.columns[size]}
            gap={secondChildGrid.gap}
          >
            <Box gap={secondChildGrid.gap}>
              <FirmWareStatus />
              <ContentBlock title="5" />
            </Box>
            <ContentBlock title="6" fill="vertical" />
          </Grid>
        </Grid>
        {size !== 'small' && size !== 'xsmall' && (
          <ContentBlock title="1" fill="vertical" />
        )}
      </Grid>
    </Main>
  );
};

const ContentBlock = ({ ...rest }) => (
  <ContentArea elevation="medium" height="small" round="small" {...rest} />
);
