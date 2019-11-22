import React from 'react';

import { ContentSection, PageLayout, MainContent } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Grommet';

const Index = () => (
  <PageLayout title={title}>
    <MainContent>
      <ContentSection>
        <MainHeading>{title}</MainHeading>
      </ContentSection>
    </MainContent>
  </PageLayout>
);

export default Index;
