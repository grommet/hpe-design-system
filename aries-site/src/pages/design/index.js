import React from 'react';
import { PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Design';
const Design = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
    </PageLayout>
  );
};

export default Design;
