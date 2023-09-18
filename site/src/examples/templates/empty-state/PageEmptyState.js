import React from 'react';
import { PageHeader, Page, PageContent } from 'grommet';

import { ListingEmptyState } from './ListingEmptyState';

export const PageEmptyState = ({ ...rest }) => {
  return (
    <Page>
      <PageContent gap="medium">
        <PageHeader title="Page title" subtitle="Description about the page." />
        <ListingEmptyState {...rest} />
      </PageContent>
    </Page>
  );
};
