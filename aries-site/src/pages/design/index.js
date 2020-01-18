import React from 'react';

import { Layout } from '../../layouts';
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
    <Layout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://aries.hpe.design/design"
      />
      <ComingSoon />
    </Layout>
  );
};

export default Design;
