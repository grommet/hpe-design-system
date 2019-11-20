import React from 'react';
import { Text } from 'grommet';

import { ContentSection, Layout, MainContent, SideBar } from '../layouts';
import { MainHeading } from '../components';

const Index = () => (
  <>
    <Layout title="Inclusiveness">
      <SideBar>
        <Text>Secondary Nav</Text>
      </SideBar>
      <MainContent>
        <ContentSection>
          <MainHeading>Inclusiveness</MainHeading>
        </ContentSection>
      </MainContent>
    </Layout>
  </>
);

export default Index;
