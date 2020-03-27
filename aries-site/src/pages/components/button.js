import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { ButtonExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Button';
const page = getPageDetails(title);
const topic = 'Components';

const Button = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/button"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Buttons are used to indicate actions that can be performed.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/ButtonExample.js"
          figma="https://www.figma.com/file/Oi5UEEQ33VCAyOKQcZ8Nr8/hpe-design-system-library-button?node-id=0%3A1"
          designer="https://designer.grommet.io/button?id=HPE-design-system-eric-soderberg-hpe-com"
        >
          <ButtonExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Button;
