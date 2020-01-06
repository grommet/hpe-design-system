import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const topic = 'Resources';
const title = 'Examples';

const Examples = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default Examples;
