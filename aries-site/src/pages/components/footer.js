import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { FooterExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Footer';
const page = getPageDetails(title);
const topic = 'Components';

const Footer = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/footer"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Footer is a Box with a set of preset properties. Box properties allow
          you to customize the footer.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/footer?theme=hpe"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/FooterExample.js"
          figma="https://www.figma.com/file/9aoCaf5lqzdQv1q4NFi0GN/hpe-design-system-library-footer"
          width="100%"
        >
          <FooterExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Footer;
