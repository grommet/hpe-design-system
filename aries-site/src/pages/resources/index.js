import React from 'react';

import { PageLayout } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Resources';
const page = getPageDetails(title);

const Resources = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={page.color}
      subText={page.description}
      icon={page.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://aries.hpe.design/resources"
      />
      <ComingSoon />
    </PageLayout>
  );
};

export default Resources;
