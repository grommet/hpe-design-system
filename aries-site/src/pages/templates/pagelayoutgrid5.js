import { useContext, useState } from 'react';
import {
  Box,
  Grid,
  Header,
  NameValueList,
  NameValuePair,
  RadioButtonGroup,
  ResponsiveContext,
  Text,
  ThemeContext,
} from 'grommet';

import {
  ContentArea,
  PageContainer,
  PageContainerContext,
} from '../../examples/templates/app-layouts';

const PageLayoutGrid = () => {
  const size = useContext(ResponsiveContext);
  const usePageContainer = useContext(PageContainerContext);
  const { pad } = usePageContainer;
  const [pageContainerWidth, setPageContainerWidth] = useState('wide');

  const columns = {
    full: {
      xsmall: 'auto',
      small: 'auto',
      medium: [['auto', 'flex'], 'medium'],
      large: [['medium', 'flex'], 'medium'],
      xlarge: [
        ['large', 'flex'],
        ['medium', 'flex'],
      ],
    },
    wide: {
      xsmall: 'auto',
      small: 'auto',
      medium: [['auto', 'flex'], 'medium'],
      large: [['medium', 'flex'], 'medium'],
      xlarge: [
        ['large', 'flex'],
        ['medium', 'flex'],
      ],
    },
    narrow: {
      xsmall: 'auto',
      small: 'auto',
      medium: 'auto',
      large: 'auto',
      xlarge: 'auto',
    },
  };

  const gap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  };

  return (
    <PageContainer
      kind={pageContainerWidth}
      gap="medium"
      border={{ style: 'dashed' }}
    >
      <Header pad={usePageContainer && pad} border={{ style: 'dashed' }}>
        <ContentArea title="Page Header" fill />
      </Header>
      <Grid
        border={{ style: 'dashed' }}
        gap={gap[size]}
        columns={columns[pageContainerWidth][size]}
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
      <Box
        pad={usePageContainer && { ...pad, vertical: 'medium' }}
        gap="medium"
      >
        <Text weight="bold" size="large">
          Demo Controls
        </Text>
        <NameValueList gap="small" nameProps={{ width: ['xsmall', 'small'] }}>
          <NameValuePair name="Page Container Width">
            <RadioButtonGroup
              options={[
                { label: 'Wide', value: 'wide' },
                { label: 'Full', value: 'full' },
                { label: 'Narrow', value: 'narrow' },
              ]}
              value={pageContainerWidth}
              onChange={event => setPageContainerWidth(event.target.value)}
            />
          </NameValuePair>
          <NameValuePair name="Current Breakpoint">
            {size.replace(
              /\w\S*/g,
              txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
            )}
          </NameValuePair>
        </NameValueList>
      </Box>
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
