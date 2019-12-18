import React from 'react';
import { PageLayout } from '../../layouts';
import { MainHeading } from '../../components';

const title = 'Develop';
const Develop = () => {
  return (
    <PageLayout title={title} isLanding>
      <MainHeading>{title}</MainHeading>
    </PageLayout>
  );
};

export default Develop;
