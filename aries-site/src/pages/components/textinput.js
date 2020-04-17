import React from 'react';
import { Anchor } from 'grommet';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import {
  TextInputExample,
  TextInputDisabledExample,
  TextInputLabeledByExample,
  TextInputPasswordExample,
  TextInputSuggestionsExample,
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
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          designer="https://designer.grommet.io/textinput?id=HPE-design-system-taylor-seamans-hpe-com&mode=edit"
          docs="https://v2.grommet.io/textinput?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textinput/TextInputExample.js"
          figma="https://www.figma.com/file/E40Oo2MpdRNMyVaJqfJ0Wd/HPE-Text-Input-Component"
        >
          <TextInputExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          The TextInput component allows the user to input shorter forms of data
          and content. Passwords and tags can also be used with the TextInput
          component. Style can be variable, based upon the use case and customer
          need that will elicit user confidence in success.
        </SubsectionText>
      </Subsection>
      <Subsection name="About TextInput" level={3} gap="small">
        <SubsectionText>
          Text input fields perform text validation. Some use cases for
          TextInput include username fields, password fields, and search fields.
        </SubsectionText>
        <SubsectionText>
          A TextInput display the following states: enabled, focused, focused
          with value, validation, and disabled.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          In every case possible, TextInput should be used inside of a FormField
          to ensure that a label is appropriately paired with the input. This
          behavior is important to screen reader users who need to know to
          which context the TextInput is referring.
        </SubsectionText>
        <SubsectionText>
          If you need to use TextInput outside of the context of a FormField, it
          is important to make sure the TextInput is labeled in an alternate way
          to meet accessibility requirements. One approach is to use another
          visual indicator, such as the TextInput's icon, to serve as the label.
          See how this is done in the{' '}
          <Anchor href="#labeled-by-icon">Labeled by icon</Anchor> example.
        </SubsectionText>
        <SubsectionText>
          Placeholder text does not serve as a sufficient means of meeting
          accessibility requirements for labels. To meet accessbility
          requirements, placeholder text should be used in conjunction with a
          label or aria-labelledby attribute.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          A TextInput's visual state informs the user of its ability to be
          interacted with or if any validation errors have occured.
        </SubsectionText>
      </Subsection>
      <Subsection name="Password" level={3}>
        <SubsectionText>
          Used to maintain the privacy of the password a user has entered. This
          is achieved by applying type="password" to the TextInput.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textinput/TextInputPasswordExample.js"
          height={{ min: 'small' }}
        >
          <TextInputPasswordExample />
        </Example>
      </Subsection>
      <Subsection name="With suggestions" level={3}>
        <SubsectionText>
          Used to prompt users with available options or suggestions.
          Suggestions may persist regardless of what the user has entered or may
          be filtered based on what the user has typed.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textinput/TextInputSuggestionsExample.js"
          height={{ min: 'small' }}
        >
          <TextInputSuggestionsExample />
        </Example>
      </Subsection>
      <Subsection name="Labeled by icon" level={3}>
        <SubsectionText>
          Some situations may need TextInput without a visual label, 
          such as when implementing a search field. To meet 
          accessibility requirements, the TextInput may be labeled by 
          another visual context such as an icon with an id.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textinput/TextInputLabeledByExample.js"
          height={{ min: 'small' }}
        >
          <TextInputLabeledByExample />
        </Example>
      </Subsection>
      <Subsection name="Validation" level={3}>
        <SubsectionText>
          Used to indicate that a TextInput does not meet the validation
          requirements of its bounding FormField. Click the Validate button while
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
