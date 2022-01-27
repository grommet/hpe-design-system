import React, { useContext } from 'react';
import { Box, Grid, Header, Heading, ResponsiveContext } from 'grommet';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';

const parentGridColumns = {
  xsmall: '100%',
  small: '100%',
  medium: ['auto', 'auto'],
  large: ['auto', 'medium'],
  xlarge: ['auto', 'medium'],
};

const firstChildGridColumns = {
  xsmall: '100%',
  small: '100%',
  medium: '100%',
  large: ['auto', 'small'],
  xlarge: ['auto', 'small'],
};

const secondChildGridColumns = {
  xsmall: '100%',
  small: '100%',
  medium: '100%',
  large: { count: 'fit', size: ['small', 'auto'] },
  xlarge: { count: 'fit', size: ['small', 'auto'] },
};

export const ResponsiveContentLayoutExample = () => (
  <AppContainer background="background-back">
    <ContentArea title="Global Header" />
    <PageContainer>
      <PageHeader />
      <PageContent />
    </PageContainer>
  </AppContainer>
);

const PageHeader = () => {
  const { pad } = useContext(PageContainerContext);
  return (
    <Header pad={pad}>
      <Heading margin="none" size="small">
        Dashboard
      </Heading>
    </Header>
  );
};

const PageContent = () => {
  const size = useContext(ResponsiveContext);
  const { pad } = useContext(PageContainerContext);
  const gap = 'medium';

  return (
    <Grid gap={gap} columns={parentGridColumns[size]} pad={pad}>
      {(size === 'small' || size === 'xsmall') && (
        <ContentBlock title="1" />
      )}
      <Grid gap={gap}>
        <Grid columns={firstChildGridColumns[size]} gap={gap}>
          <ContentBlock title="2" height="xsmall" />
          <ContentBlock title="3" height="xsmall" />
        </Grid>
        <Grid columns={secondChildGridColumns[size]} gap={gap}>
          <Box gap={gap}>
            <ContentBlock title="4" />
            <ContentBlock title="5" height="medium" />
          </Box>
          <ContentBlock title="6" height="100%" />
        </Grid>
      </Grid>
      {size !== 'small' && size !== 'xsmall' && (
        <ContentBlock title="1" elevation="medium" fill="vertical" />
      )}
    </Grid>
  );
};

const ContentBlock = ({ ...rest }) => (
  <ContentArea elevation="medium" height="small" round="small" {...rest} />
);
