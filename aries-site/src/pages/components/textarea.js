import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { TextAreaExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'TextArea';
const page = getPageDetails(title);
const topic = 'Components';

const TextArea = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/textarea"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
        When you need to allow the user to provide longer forms of
        content, use a TextArea component. Sometimes, using
        placeholder text provides the user with ques to the
        type of data that is expected in the text field.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/textarea?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/TextAreaExample.js"
        >
          <TextAreaExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default TextArea;
