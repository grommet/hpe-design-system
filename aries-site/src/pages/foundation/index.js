import React from 'react';

import { ContentSection, PageLayout, MainContent } from '../../layouts';
import { MainDescription, MainHeading } from '../../components';

const title = 'Primer';

const Index = () => (
  <PageLayout title={title}>
    <MainContent>
      <ContentSection>
        <MainHeading>{title}</MainHeading>
        <MainDescription>
          HPE Aries is an open-source library and the official design system of
          HPE for all digital products and experiences. Aries consists of
          working code, best practices, design resources, human interface
          guidelines, and a virbant community of contributors.
        </MainDescription>
      </ContentSection>
    </MainContent>
  </PageLayout>
);

export default Index;
