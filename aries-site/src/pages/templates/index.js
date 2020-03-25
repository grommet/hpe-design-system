import React from 'react';

import { Layout, NavPage } from '../../layouts';
import { ComingSoon, DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Templates';
const {
  color,
  description,
  icon,
  pages,
  name,
  seoDescription,
} = getPageDetails(title);

const Templates = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={color}
      subText={description}
      icon={icon}
      title={title}
    />
  );

  return (
    <Layout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates"
      />
      {pages.length ? (
        <NavPage items={pages} topic={name.toLowerCase()} />
      ) : (
        <ComingSoon />
      )}
    </Layout>
  );
};

export default Templates;
