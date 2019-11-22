import React from 'react';

import { ContentSection, Layout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Open';

const Index = () => (
  <Layout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
    </ContentSection>
  </Layout>
);

export default Index;
