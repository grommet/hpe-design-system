import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const title = 'Primer';

const Primer = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} />
    </ContentSection>
  </PageLayout>
);

export default Primer;
