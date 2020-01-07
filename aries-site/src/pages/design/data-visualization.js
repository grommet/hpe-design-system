import React from 'react';

import { ContentSection, PageLayout, Subsection } from '../../layouts';

const topic = 'Design';
const title = 'Data-visualization';

const DataVisualization = () => (
  <PageLayout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </PageLayout>
);

export default DataVisualization;
