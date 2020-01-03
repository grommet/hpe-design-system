import React from 'react';

import { PageLayout, NavPage, SideBar, SideBarItemList } from '../../layouts';
import { DescriptiveHeader } from '../../components/headings';

import { data } from '../../components/home';

const title = 'Components';
const prefix = title.toLowerCase();

const Components = () => {
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
      {/* Swap this out with NavPage once we have the icons available */}
      <SideBar items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Components;
