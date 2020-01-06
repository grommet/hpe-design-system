import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const title = 'Tokens';
const topic = 'Guidelines';

const Tokens = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default Tokens;
