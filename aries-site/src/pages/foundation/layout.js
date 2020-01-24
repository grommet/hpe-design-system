import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Foundation';
const title = 'Layout';

const Index = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Index;
