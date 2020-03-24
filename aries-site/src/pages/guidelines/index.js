import React from 'react';

import { NavPage, Layout } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
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
        canonicalUrl="https://design-system.hpe.design/guidelines"
      />
      {page.pages.length ? (
        <NavPage items={page.pages} topic={page.name.toLowerCase()} />
      ) : (
        <ComingSoon />
      )}
    </Layout>
  );
};

export default Guidelines;
