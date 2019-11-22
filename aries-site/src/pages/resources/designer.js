import React from 'react';

import { ContentSection, PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Designer';

const Designer = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
    </ContentSection>
  </PageLayout>
);

export default Designer;
