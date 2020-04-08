import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { LayerExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Layer';
const page = getPageDetails(title);
const topic = 'Components';

const Layer = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/layer"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The Layer component is flexible and can be used in multiple use cases.
          Modal dialogs, notifications, and help text are just a few
          possibilities.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/layer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/LayerExample.js"
        >
          <LayerExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Layer;
