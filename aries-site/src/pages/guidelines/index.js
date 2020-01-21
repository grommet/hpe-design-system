import React from 'react';

import { NavPage, Layout } from '../../layouts';
import { DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Guidelines';
const page = getPageDetails(title);

const Guidelines = () => {
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
        canonicalUrl="https://aries.hpe.design/guidelines"
      />
      <NavPage items={page.pages} topic={page.name.toLowerCase()} />
    </Layout>
  );
};

export default Guidelines;
