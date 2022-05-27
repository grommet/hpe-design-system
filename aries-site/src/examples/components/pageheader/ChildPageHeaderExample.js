import React from 'react';
import { Box, Page, PageContent, PageHeader, Text } from 'grommet';

import { FilterServers, ReverseAnchor } from '../../templates';

export const ChildPageHeaderExample = () => (
  <Page>
    <Box align="center" pad="small" elevation="small">
      <Text weight="bold">Global Header</Text>
    </Box>
    <PageContent>
      <PageHeader
        title="Servers"
        subtitle="View and manage servers."
        parent={<ReverseAnchor label="Manage Account" />}
      />
      <FilterServers />
    </PageContent>
  </Page>
);
