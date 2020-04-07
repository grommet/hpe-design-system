import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { TabsExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Tabs';
const page = getPageDetails(title);
const topic = 'Components';

const Tabs = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/tabs"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Tabs allow a user to access content while maintaining the existing
          context. It consists of a container, or box, with tab controls to
          expose the contents of the container.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/tabs?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/TabsExample.js"
        >
          <TabsExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Tabs;
