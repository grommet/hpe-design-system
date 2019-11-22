import React from 'react';

import { ContentSection, PageLayout } from '../../layouts';
import { MainDescription, MainHeading } from '../../components';

const title = 'Code';

const Code = () => (
  <PageLayout title={title}>
    <ContentSection>
      <MainHeading>{title}</MainHeading>
      <MainDescription>
        Each element is tailored for the web and has resources for both the
        designer, developer, and casual users of Aries. The elements alone
        provide a base set of guidelines that will help you succeed when
        desiging experiences for HPE.
      </MainDescription>
    </ContentSection>
  </PageLayout>
);

export default Code;
