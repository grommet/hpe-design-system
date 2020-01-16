import React from 'react';

import { ContentSection, Layout, Subsection } from '../../layouts';

const topic = 'Foundation';
const title = 'Tokens';

const Tokens = () => (
  <Layout title={title}>
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default Tokens;
