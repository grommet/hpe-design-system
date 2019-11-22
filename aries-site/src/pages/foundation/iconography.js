import React from 'react';

import { ContentSection, PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Iconography';

const Iconography = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
    </ContentSection>
  </PageLayout>
);

export default Iconography;
