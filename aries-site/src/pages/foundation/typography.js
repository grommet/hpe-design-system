import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const topic = 'Foundation';
const title = 'Typography';

const Typography = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default Typography;
