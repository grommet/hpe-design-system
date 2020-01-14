import React from 'react';
import { PageLayout, NavPage } from '../../layouts';
import { DescriptiveHeader, Meta } from '../../components';
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
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://aries.hpe.design/components"
      />
      <NavPage items={page.pages} topic={page.name.toLowerCase()} />
    </PageLayout>
  );
};

export default Components;
