import React from 'react';
import { PageLayout, SideBar, SideBarItemList } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Start';
const prefix = title.toLowerCase();

const Guidelines = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
      <SideBar items={SideBarItemList[prefix]} prefix={prefix} />
    </PageLayout>
  );
};

export default Guidelines;
