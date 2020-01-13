import React from 'react';

import { PageLayout } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Design';
const topic = getPageDetails(title);

const Design = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={topic.color}
      subText={topic.description}
      icon={topic.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={topic.seoDescription}
        canonicalUrl="https://aries.hpe.design/design"
      />
      <ComingSoon />
    </PageLayout>
  );
};

export default Design;
