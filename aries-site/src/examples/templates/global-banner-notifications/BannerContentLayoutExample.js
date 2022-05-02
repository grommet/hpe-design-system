import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Main,
  Page,
  PageContent,
  PageHeader,
  Notification,
  Text,
  ResponsiveContext,
} from 'grommet';
import { HelpOption, HomeRounded } from 'grommet-icons';
import { AppContainer } from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';

export function BannerContentLayoutExample() {
  return (
    <AppContainer>
      <Box>
        <ContentArea
          pad={{ horizontal: 'large', vertical: 'small' }}
          direction="row"
          icon
          title="HPE Service Name"
          gap="none"
          justify="between"
        >
          <Box align="center" direction="row" gap="small">
            <>
              <Button icon={<HelpOption />} a11yTitle="Help" title="Help" />
              <Button icon={<HomeRounded />} a11yTitle="Home" title="Home" />
            </>
            <Avatar background="purple!" flex={false}>
              <Text size="small" color="text-strong">
                JS
              </Text>
            </Avatar>
          </Box>
        </ContentArea>
        <Notification
          status="warning"
          message={`Your supscription will expire in 7 days. Renew your 
            subscription to ensure you don't lose access.`}
          onClose={() => {}}
          actions={[
            {
              href: '#',
              label: 'Renew Subscription',
            },
          ]}
          global
        />
      </Box>
      <Page>
        <PageContent>
          {/* needed pad to match align with content 
        // strip out once fixed */}
          <PageHeader title="Page Header" pad="small" />
          <Content />
        </PageContent>
      </Page>
    </AppContainer>
  );
}

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

function Content() {
  const size = useContext(ResponsiveContext);

  return (
    <Main>
      <Grid
        // needed pad elevation was getting cut off
        // TODO look at page and strip out once fixed
        pad="small"
        gap={parentGrid.gap[size]}
        columns={parentGrid.columns[size]}
      >
        {/* Content Block 1 is top priority content. At narrow breakpoints, 
          place as first content element. Otherwise, place in second column. */}
        {['xsmall', 'small'].includes(size) && <ContentBlock title="1" />}
        <Grid gap={firstChildGrid.gap}>
          <Grid columns={firstChildGrid.columns[size]} gap={firstChildGrid.gap}>
            <ContentBlock title="2" />
            <ContentBlock title="3" />
          </Grid>
          <Grid
            columns={secondChildGrid.columns[size]}
            gap={secondChildGrid.gap}
          >
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
    </Main>
  );
}

function ContentBlock({ ...rest }) {
  return (
    <ContentArea elevation="medium" height="small" round="small" {...rest} />
  );
}
