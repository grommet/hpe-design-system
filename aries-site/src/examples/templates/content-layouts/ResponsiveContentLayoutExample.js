import React, { useContext } from 'react';
import { Box, Grid, Header, Heading, ResponsiveContext } from 'grommet';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';

export const ResponsiveContentLayoutExample = () => (
  <AppContainer background="background-back">
    <ContentArea title="Global Header" />
    <PageContainer>
      <PageHeader />
      <PageContent />
    </PageContainer>
    <ContentArea title="Global Footer" />
  </AppContainer>
);

const PageHeader = () => {
  const { pad } = useContext(PageContainerContext);
  return (
    <Header pad={pad}>
      <Heading level={1} margin="none" size="small">
        Dashboard
      </Heading>
    </Header>
  );
};

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
  const { pad } = useContext(PageContainerContext);

  return (
    <Grid
      gap={parentGrid.gap[size]}
      columns={parentGrid.columns[size]}
      pad={pad}
    >
      {/* Content Block 1 is top priority content. At narrow breakpoints, place 
      as first content element. Otherwise, place in second column. */}
      {(size === 'small' || size === 'xsmall') && <ContentBlock title="1" />}
      <Grid gap={firstChildGrid.gap}>
        <Grid columns={firstChildGrid.columns[size]} gap={firstChildGrid.gap}>
          <ContentBlock
            title="2"
            height={size !== 'xsmall' && size !== 'small' ? 'xsmall' : 'small'}
          />
          <ContentBlock
            title="3"
            height={size !== 'xsmall' && size !== 'small' ? 'xsmall' : 'small'}
          />
        </Grid>
        <Grid columns={secondChildGrid.columns[size]} gap={secondChildGrid.gap}>
          <Box gap={secondChildGrid.gap}>
            <ContentBlock title="4" />
            <ContentBlock title="5" />
          </Box>
          <ContentBlock title="6" fill="vertical" />
        </Grid>
      </Grid>
      {size !== 'small' && size !== 'xsmall' && (
        <ContentBlock title="1" fill="vertical" />
      )}
    </Grid>
  );
};

const ContentBlock = ({ ...rest }) => (
  <ContentArea elevation="medium" height="small" round="small" {...rest} />
);
