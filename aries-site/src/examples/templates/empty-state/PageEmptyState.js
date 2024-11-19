import React from 'react';
import { PageHeader, Main, Page, PageContent } from 'grommet';

import { ListingEmptyState } from './ListingEmptyState';

export const PageEmptyState = ({ ...rest }) => {
  return (
    <Page>
      <PageContent gap="medium">
        <PageHeader title="Page title" subtitle="Description about the page." />
        <Main>
          <ListingEmptyState {...rest} />
        </Main>
      </PageContent>
    </Page>
  );
};
