import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const topic = 'Foundation';
const title = 'Iconography';

const Iconography = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default Iconography;
