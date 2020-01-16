import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Develop';
const title = 'Start';

const Start = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Start;
