import React from 'react';

import { PageLayout } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Resources';
const topic = getPageDetails(title);

const Resources = () => {
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
        canonicalUrl="https://aries.hpe.design/resources"
      />
      <ComingSoon />
    </PageLayout>
  );
};

export default Resources;
