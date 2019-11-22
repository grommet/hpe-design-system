import React from 'react';

import { ContentSection, PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Data-visualization';

const Index = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
    </ContentSection>
  </PageLayout>
);

export default Index;
