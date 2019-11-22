import React from 'react';

import { ContentSection, PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Videos';

const Videos = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
    </ContentSection>
  </PageLayout>
);

export default Videos;
