import React from 'react';

import { Meta } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Login Screen';
const topic = 'Templates';
const page = getPageDetails(title);

const LoginScreen = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates/login-screen"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic} />
    </ContentSection>
  </Layout>
);

export default LoginScreen;
