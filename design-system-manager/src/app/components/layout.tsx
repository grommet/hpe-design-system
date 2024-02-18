import React from 'react';
import { Page, PageContent } from 'grommet';

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => (
  <Page pad={{bottom: 'xlarge'}}>
    <PageContent animation={{ type: 'fadeIn', duration: 1000,}}>
      {children}
    </PageContent>
  </Page>
);

export default ComponentsLayout;