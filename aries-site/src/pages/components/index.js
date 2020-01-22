import React from 'react';
import { Layout, NavPage } from '../../layouts';
import { DescriptiveHeader, Meta, ComingSoon } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Components';
const page = getPageDetails(title);

const Components = () => {
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
        canonicalUrl="https://aries.hpe.design/components"
      />
      {page.pages.length ? (
        <NavPage items={page.pages} topic={page.name.toLowerCase()} />
      ) : (
        <ComingSoon />
      )}
    </Layout>
  );
};

export default Components;
