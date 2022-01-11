import { useContext } from 'react';
import { Box, Grid, Header, ResponsiveContext, ThemeContext } from 'grommet';

import {
  ContentArea,
  PageContainer,
  PageContainerContext,
} from '../../examples/templates/app-layouts';

const PageLayoutGrid = () => {
  const size = useContext(ResponsiveContext);
  const usePageContainer = useContext(PageContainerContext);
  const { pad } = usePageContainer;

  const columns = {
    xsmall: 'auto',
    small: 'auto',
    medium: [['auto', 'flex'], 'medium'],
    large: [['medium', 'flex'], 'medium'],
    xlarge: [
      ['large', 'flex'],
      ['medium', 'flex'],
    ],
  };

  const gap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  };

  return (
    <PageContainer kind="wide" gap="medium" border={{ style: 'dashed' }}>
      <Header pad={usePageContainer && pad} border={{ style: 'dashed' }}>
        <ContentArea title="Page Header" fill />
      </Header>
      <Grid
        border={{ style: 'dashed' }}
        gap={gap[size]}
        columns={columns[size]}
        pad={usePageContainer && pad}
      >
        {['xsmall', 'small'].includes(size) && (
          <Box gap="small" border={{ style: 'dashed' }}>
            <ContentArea title="1" />
          </Box>
        )}
        <Box gap="small" border={{ style: 'dashed' }}>
          <ContentArea title="2" />
          <ContentArea title="3" />
        </Box>
        <Box gap="small" border={{ style: 'dashed' }}>
          {!['xsmall', 'small'].includes(size) && <ContentArea title="1" />}
          <ContentArea title="4" />
          <ContentArea title="5" />
        </Box>
      </Grid>
    </PageContainer>
  );
};

const Example = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const pad = { horizontal: theme.pageContainer.pad[size].horizontal };
  return (
    <PageContainerContext.Provider value={{ pad }}>
      <PageLayoutGrid />
    </PageContainerContext.Provider>
  );
};

export default Example;
