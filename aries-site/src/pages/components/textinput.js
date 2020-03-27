import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { TextInputExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'TextInput';
const page = getPageDetails(title);
const topic = 'Components';

const TextInput = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/textinput"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
        The TextInput component allows the user to input shorter forms
        of data and content. Passwords and tags can also be used with
        the TextInput component. Style can be variable, based upon
        the use case and customer need that will elicit user
        confidence in success.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/textinput?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/TextInputExample.js"
        >
          <TextInputExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default TextInput;
