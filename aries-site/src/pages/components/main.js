import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { GridExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Main';
const page = getPageDetails(title);
const topic = 'Components';

const Main = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/main"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The Main component is where you define the location and layout of the
          primary context of your content. See it here in the context of an app
          layout.
        </SubsectionText>
        <Example>
          <GridExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Main;
