import React from 'react';
import { Page, PageContent } from 'grommet';

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => (
  <Page pad={{bottom: 'xlarge'}}>
    <PageContent>
      {children}
    </PageContent>
  </Page>
);

export default ComponentsLayout;