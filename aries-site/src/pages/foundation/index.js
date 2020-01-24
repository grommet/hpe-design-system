import React from 'react';

import { Layout, NavPage } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Foundation';
const page = getPageDetails(title);

const Foundation = () => {
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
      {page.pages.length ? (
        <NavPage items={page.pages} topic={page.name.toLowerCase()} />
      ) : (
        <ComingSoon />
      )}
    </Layout>
  );
};

export default Foundation;
