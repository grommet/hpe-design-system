import React from 'react';
import {
  PageHeader,
  // Main,
  Page,
  PageContent,
} from 'grommet';

import { ListingEmptyState } from './ListingEmptyState';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const PageEmptyState = ({ ...rest }) => {
  return (
    <Page>
      <PageContent gap="medium">
        <PageHeader title="Page title" subtitle="Description about the page." />
        {/* Main is commented out for this example, but should be used in a
        real application. */}
        {/* <Main> */}
        <ContentPane>
          <ListingEmptyState {...rest} />
        </ContentPane>
        {/* </Main> */}
      </PageContent>
    </Page>
  );
};
