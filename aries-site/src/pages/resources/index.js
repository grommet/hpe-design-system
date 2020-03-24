import React from 'react';

import { Layout, NavPage } from '../../layouts';
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
    <Layout descriptiveHeader={descriptiveHeader} title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/resources"
      />
      {page.pages.length ? (
        <NavPage items={page.pages} topic={page.name.toLowerCase()} />
      ) : (
        <ComingSoon />
      )}
    </Layout>
  );
};

export default Resources;
