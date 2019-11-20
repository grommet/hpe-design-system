import React from 'react';
import { Text } from 'grommet';

import { ContentSection, Layout, MainContent, SideBar } from '../../layouts';
import { MainDescription, MainHeading } from '../../components';

const Index = () => (
  <>
    <Layout title="Foundation">
      <SideBar>
        <Text>Secondary Nav</Text>
      </SideBar>
      <MainContent>
        <ContentSection>
          <MainHeading>Primer</MainHeading>
          <MainDescription>
            HPE Aries is an open-source library and the official design system
            of HPE for all digital products and experiences. Aries consists of
            working code, best practices, design resources, human interface
            guidelines, and a virbant community of contributors.
          </MainDescription>
        </ContentSection>
      </MainContent>
    </Layout>
  </>
);

export default Index;
