import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { AnchorExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Anchor';
const page = getPageDetails(title);
const topic = 'Components';

const Anchor = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/anchor"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Anchors are used with text based navigation, such as inline text,
          header navigation, and footer navigation.
        </SubsectionText>
        <Example
          details={[
            `The default anchor color is brand, however, it is possible to use 
            HPE Design System font colors for anchor in some use cases (i.e. 
            header and footer). When using an inline text anchor, the color 
            should remain default.`,
          ]}
          docs="https://v2.grommet.io/anchor?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/AnchorExample.js"
          figma="https://www.figma.com/file/I7PsiUmvr7OEJ6311rBUfg/hpe-design-system-library-anchor?node-id=0%3A1"
        >
          <AnchorExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Anchor;
