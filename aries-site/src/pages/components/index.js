import React from 'react';
import { PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Components';
const Components = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
    </PageLayout>
  );
};

export default Components;
