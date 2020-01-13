import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const topic = 'Guidelines';
const title = 'Usability';

const Usability = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default Usability;
