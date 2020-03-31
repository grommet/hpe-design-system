import React from 'react';

import { ComingSoon, Meta } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Cards';
const topic = 'Templates';
const pageDetails = getPageDetails(title);

const Cards = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/foundation/cards"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic} />
      </ContentSection>
      <ComingSoon />
    </Layout>
  );
};

export default Cards;
