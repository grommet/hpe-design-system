import React from 'react';

import { ComingSoon, Meta } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'HPE Docs';
const topic = 'Extend';
const pageDetails = getPageDetails(title);

const HPEDocs = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/extend/hpe-docs"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic} />
      </ContentSection>
      <ComingSoon />
    </Layout>
  );
};

export default HPEDocs;
