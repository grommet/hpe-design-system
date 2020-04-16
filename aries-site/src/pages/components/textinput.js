import React from 'react';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import {
  TextInputExample,
  TextInputDisabledExample,
  TextInputValidationExample,
} from '../../examples';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'TextInput';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);
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
          The TextInput component allows the user to input shorter forms of data
          and content. Passwords and tags can also be used with the TextInput
          component. Style can be variable, based upon the use case and customer
          need that will elicit user confidence in success.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/textinput?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/TextInputExample.js"
        >
          <TextInputExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          The when, how, and why to use TextInput.
        </SubsectionText>
      </Subsection>
      <Subsection name="About TextInput" level={3} gap="small">
        <SubsectionText>
          Text input fields perform text validation. Text input fields with
          labels need to describe the purpose of the form control.
        </SubsectionText>
        <SubsectionText>
          A text field without a label can also display the following states:
          enabled, focus, focus/value, has value, validation, description,
          disabled and validation/focus.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          TextInput should always be used inside of a FormField. This ensures
          that accessibility requirements for labels is met. This behavior is
          important to screen reader users who need to know what context the
          TextInput is referring to.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="TextInput States">
        <SubsectionText>
          A TextInput's visual state informs the user of its ability to be
          interacted with or if any validation errors have occured.
        </SubsectionText>
      </Subsection>
      <Subsection name="Validation" level={3}>
        <SubsectionText>
          Used to indicate that a TextInput does not meet the validation
          requirements of its bounding FormField. Click the Submit button while
          the TextInput is empty to see the validation state.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textinput/TextInputValidationExample.js"
          height={{ min: 'small' }}
        >
          <TextInputValidationExample />
        </Example>
      </Subsection>
      <Subsection name="Disabled" level={3}>
        <SubsectionText>
          Used to indicate that a TextInput cannot be interacted with.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textinput/TextInputDisabledExample.js"
          height={{ min: 'small' }}
        >
          <TextInputDisabledExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
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

export default TextInput;
