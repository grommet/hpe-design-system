import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Guidelines';
const title = 'Inclusiveness';

const Inclusiveness = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Inclusiveness;
