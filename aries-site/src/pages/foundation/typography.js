import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const title = 'Typography';
const topic = 'Guidelines';

const Typography = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default Typography;
