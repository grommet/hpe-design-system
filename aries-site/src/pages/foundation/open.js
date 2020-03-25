import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Foundation';
const title = 'Open';

const Open = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Open;
