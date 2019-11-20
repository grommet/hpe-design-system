import React from 'react';
import { Text } from 'grommet';

import { ContentSection, Layout, MainContent, SideBar } from '../../layouts';
import { MainHeading } from '../../components';

const Index = () => (
  <>
    <Layout title="Branding">
      <SideBar>
        <Text>Secondary Nav</Text>
      </SideBar>
      <MainContent>
        <ContentSection>
          <MainHeading>Branding</MainHeading>
        </ContentSection>
      </MainContent>
    </Layout>
  </>
);

export default Index;
