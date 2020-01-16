import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Resources';
const title = 'Themer';

const Themer = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Themer;
