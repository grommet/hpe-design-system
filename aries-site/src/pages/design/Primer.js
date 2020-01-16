import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Design';
const title = 'Primer';

const Primer = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Primer;
