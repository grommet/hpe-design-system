import React from 'react';

import { PageLayout } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Design';
const page = getPageDetails(title);

const Design = () => {
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
        canonicalUrl="https://aries.hpe.design/design"
      />
      <ComingSoon />
    </PageLayout>
  );
};

export default Design;
