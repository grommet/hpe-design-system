import React from 'react';
import { PageLayout } from '../../layouts';
import { ComingSoon, DescriptiveHeader } from '../../components';
import { structure } from '../../data';

const title = 'Resources';
const topic = structure.find(page => page.name === title);

const Resources = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={topic.color}
      subText={topic.description}
      icon={topic.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <ComingSoon />
    </PageLayout>
  );
};

export default Resources;
