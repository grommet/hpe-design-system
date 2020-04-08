import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { HeaderExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Header';
const page = getPageDetails(title);
const topic = 'Components';

const Header = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/header"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Header is a Box with a set of preset properties for introductory
          content. Box properties allow you to customize the header.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/header?theme=hpe"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/HeaderExample.js"
          figma="https://www.figma.com/file/FwJr2zaT8Rr7RyIKLm7Lvg/hpe-design-system-library-headers?node-id=0%3A1"
        >
          <HeaderExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Header;
