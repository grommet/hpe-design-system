import React from 'react';

import { ComingSoon, Meta } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Accessibility';
const topic = 'Foundation';
const pageDetails = getPageDetails(title);

const Accessibility = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/foundation/content"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic} />
      </ContentSection>
      <ComingSoon />
    </Layout>
  );
};

export default Accessibility;
