import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Develop';
const title = 'Components';

const Components = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Components;
