import React from 'react';
import { PageLayout, SideBar, SideBarItemList } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Components';
const prefix = title.toLowerCase();

const Components = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
      <SideBar items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Components;
