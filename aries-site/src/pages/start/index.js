import React from 'react';
import { PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Guidelines';
const Guidelines = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
    </PageLayout>
  );
};

export default Guidelines;
