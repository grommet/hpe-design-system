import React, { useContext } from 'react';
import {
  Box,
  Grid,
  // Main,
  ResponsiveContext,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';

import { AppContainer } from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';

export const ResponsiveContentLayoutExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer background="background-back">
      <ContentArea title="Global Header" />
      <Page pad={{ bottom: 'xlarge' }}>
        <PageContent gap="xlarge">
          <PageHeader
            /* for dev purposes, will be replaced with dashboard content */
            title={`Dashboard @ '${size}' breakpoint`}
          />
          <Content />
        </PageContent>
      </Page>
      <ContentArea title="Global Footer" />
    </AppContainer>
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

const Content = () => {
  const size = useContext(ResponsiveContext);

  return (
    // Main is commented out for this example, but should be used in a
    // real application.
    // <Main>
    // </Main>
    <Grid gap={parentGrid.gap[size]} columns={parentGrid.columns[size]}>
      {/* Content Block 1 is top priority content. At narrow breakpoints, 
        place as first content element. Otherwise, place in second column. */}
      {['xsmall', 'small'].includes(size) && <ContentBlock title="1" />}
      <Grid gap={firstChildGrid.gap}>
        <Grid columns={firstChildGrid.columns[size]} gap={firstChildGrid.gap}>
          <ContentBlock title="2" />
          <ContentBlock title="3" />
        </Grid>
        <Grid columns={secondChildGrid.columns[size]} gap={secondChildGrid.gap}>
          <Box gap={secondChildGrid.gap}>
            <ContentBlock title="4" />
            <ContentBlock title="5" />
          </Box>
          <ContentBlock title="6" fill="vertical" />
        </Grid>
      </Grid>
      {!['xsmall', 'small'].includes(size) && size !== 'xsmall' && (
        <ContentBlock title="1" fill="vertical" />
      )}
    </Grid>
  );
};

const ContentBlock = ({ ...rest }) => (
  <ContentArea height="xsmall" round="medium" {...rest} />
);
