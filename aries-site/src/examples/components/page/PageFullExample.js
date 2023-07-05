import React from 'react';
import {
  Box,
  Button,
  Footer,
  Grid,
  Header,
  List,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import { Bookmark } from 'grommet-icons';

import { TextEmphasis } from 'aries-core';
import serverhealth from '../../../data/mockData/serverhealth.json';
import { StatusIndicator } from '../../templates';
// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
import { demoStyle } from './demoStyle';

export const PageFullExample = () => (
  <Page kind="full" flex="grow" {...demoStyle}>
    <PageContent fill {...demoStyle}>
      <PageHeader title="Full Page" />
      <Grid columns={['medium', 'flex']} rows={['large']} border>
        <ServerList />
        <Box
          background={{
            image: 'url(/images/world_map.jpg)',
            position: 'right',
            size: 'cover',
          }}
        />
      </Grid>
    </PageContent>
  </Page>
);

const ServerList = () => (
  <Box background="background-front" overflow="auto">
    <List data={serverhealth} pad={{ bottom: 'xsmall' }}>
      {datum => (
        <Box
          border={{ side: 'bottom', color: 'border-weak' }}
          pad="xsmall"
          height={{ min: 'xsmall' }}
          justify="between"
        >
          <Header align="start">
            <Box>
              <TextEmphasis>{datum.displayName}</TextEmphasis>{' '}
              <Text size="xsmall">{datum.hardware.model?.toUpperCase()}</Text>
            </Box>
            <Button a11yTitle="Save" icon={<Bookmark />} />
          </Header>
          <Footer>
            <StatusIndicator status={datum.hardware.health.summary} />
          </Footer>
        </Box>
      )}
    </List>
  </Box>
);
