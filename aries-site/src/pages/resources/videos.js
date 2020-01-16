import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Resources';
const title = 'Videos';

const Videos = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Videos;
