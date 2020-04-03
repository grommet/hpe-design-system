import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { StackExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Stack';
const page = getPageDetails(title);
const topic = 'Components';

const Stack = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/stack"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          A Stack component is a container that stacks content on top of each
          other.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/stack?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/StackExample.js"
        >
          <StackExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Stack;
