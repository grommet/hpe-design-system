import React from 'react';

import { PageLayout, NavPage, SideBarItemList } from '../../layouts';
import { DescriptiveHeader } from '../../components/headings';

import { data } from '../../components/home';

const title = 'Develop';
const prefix = title.toLowerCase();

const Develop = () => {
  const titleObject = data[title];

  const descriptiveHeader = (
    <DescriptiveHeader
      background={titleObject.color}
      subText={titleObject.subTitle}
      icon={titleObject.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <NavPage items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Develop;
