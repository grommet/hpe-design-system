import React from 'react';
import { PageLayout, SideBar, SideBarItemList } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Develop';
const prefix = title.toLowerCase();

const Develop = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
      <SideBar items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Develop;
