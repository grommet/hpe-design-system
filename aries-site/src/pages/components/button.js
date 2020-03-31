import React from 'react';

import { CardGrid, Meta, SubsectionText } from '../../components';
import { ButtonExample } from '../../examples';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Button';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

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
      {relatedContent.length > 0 ? (
        <Subsection name="Related">
          <SubsectionText>
            Related content you may find useful when using {title}.
          </SubsectionText>
          <CardGrid cards={relatedContent} />
        </Subsection>
      ) : null}
    </ContentSection>
  </Layout>
);

export default Button;
