import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { GridExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Grid';
const page = getPageDetails(title);
const topic = 'Components';

const Grid = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/grid"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The Grid component is used to layout content. Responsive grid is
          important to consider in every use case.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/grid?theme=hpe#props"
          figma="https://www.figma.com/file/OvLyDPjqHbwoDI97r2nD8j/hpe-design-system-library-grid?node-id=0%3A1"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/GridExample.js"
        >
          <GridExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Grid;
