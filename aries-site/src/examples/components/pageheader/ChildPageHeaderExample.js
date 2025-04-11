import React from 'react';
import { Box, Page, PageContent, PageHeader } from 'grommet';
import { TextEmphasis } from 'aries-core';
import { FilterServers, ReverseAnchor } from '../../templates';
import { ContentPane } from '../../../layouts';

export const ChildPageHeaderExample = () => (
  <Page>
    <Box align="center" pad="small" background="background-front" flex={false}>
      <TextEmphasis>Global Header</TextEmphasis>
    </Box>
    <PageContent>
      <PageHeader
        title="Servers"
        subtitle="View and manage servers."
        parent={<ReverseAnchor label="Manage account" />}
      />
      <ContentPane flex={false}>
        <FilterServers />
      </ContentPane>
    </PageContent>
  </Page>
);
