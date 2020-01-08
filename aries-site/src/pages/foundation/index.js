import React from 'react';
import { PageLayout, NavPage } from '../../layouts';
import { DescriptiveHeader } from '../../components/headings';
import { structure } from '../../data';

const title = 'Foundation';
const topic = structure.find(page => page.name === title);

const Foundation = () => {
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
      <NavPage items={topic.pages} topic={topic.name.toLowerCase()} />
    </PageLayout>
  );
};

export default Foundation;
