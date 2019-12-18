import React from 'react';
import { PageLayout, SideBar, SideBarItemList } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Resources';
const prefix = title.toLowerCase();

const Resources = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
      <SideBar items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Resources;
