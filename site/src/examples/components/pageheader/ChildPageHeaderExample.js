import React from 'react';
import { Box, Page, PageContent, PageHeader } from 'grommet';
import { TextEmphasis } from 'library';
import { FilterServers, ReverseAnchor } from '../../templates';

export const ChildPageHeaderExample = () => (
  <Page>
    <Box align="center" pad="small" elevation="small">
      <TextEmphasis>Global Header</TextEmphasis>
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
