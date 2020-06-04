import React from 'react';

import { Meta, Status, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { BoxExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Box';
const page = getPageDetails(title);
const topic = 'Components';

const Box = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/box"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Box is where it all starts. Flexible props allow the behavior of
          content to be defined to optimize the user experience.
        </SubsectionText>
        {page.status && <Status status={page.status} />}
        <Example
          docs="https://v2.grommet.io/box?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/BoxExample.js"
        >
          <BoxExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Box;
