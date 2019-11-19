import React from 'react';
import Head from 'next/head';
import { Text } from 'grommet';

import { Layout, MainContent, SideBar } from '../layouts';

const Index = () => (
  <>
    <Head>
      <title>Aries | HPE Design System</title>
    </Head>
    <Layout>
      <SideBar>
        <Text>Secondary Nav</Text>
      </SideBar>
      <MainContent>
        <Text>Main Content</Text>
      </MainContent>
    </Layout>
  </>
);

export default Index;
