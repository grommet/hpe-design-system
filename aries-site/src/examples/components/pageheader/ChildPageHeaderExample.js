import React from 'react';
import { Anchor, Box, Page, PageContent, PageHeader, Text } from 'grommet';
import { FormPrevious } from 'grommet-icons';

import { FilterServers } from '../../templates';

export const ChildPageHeaderExample = () => (
  <Page>
    <Box align="center" pad="small" elevation="small">
      <Text weight="bold">Global Header</Text>
    </Box>
    <PageContent>
      <PageHeader
        title="Servers"
        subtitle="View and manage servers."
        parent={<Anchor label="Manage Account" icon={<FormPrevious />} />}
        pad={{ vertical: 'large', bottom: 'medium' }}
      />
      <FilterServers />
    </PageContent>
  </Page>
);
