import React from 'react';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import {
  TextAreaExample,
  TextAreaDisabledExample,
  TextAreaValidationExample,
} from '../../examples';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'TextArea';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const TextArea = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/textarea"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textarea/TextAreaExample.js"
          designer="https://designer.grommet.io/textarea?id=HPE-design-system-hpedesignsystem-hpe-com"
          docs="https://v2.grommet.io/textarea?theme=hpe#props"
          figma="https://www.figma.com/file/evH1LQewFPc8Y2fteywMxM/HPE-Text-Area-Component?node-id=663%3A8"
        >
          <TextAreaExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Use TextArea for multi-line input such as notes or comments. TextArea
          is used frequently within the context of a form, but there may be
          cases where it would exist independently. Placeholder text can be used
          to guide the user towards how to start their entry.
        </SubsectionText>
      </Subsection>
      <Subsection name="Usage" level={3}>
        <SubsectionText>
          In order to give the user a hint about how long their response should
          be, set the initial size of the TextArea to the length of the response
          expected.
        </SubsectionText>
        <SubsectionText>
          In the context of a FormField, apply resize="vertical" on the TextArea
          to ensure the TextArea doesn't expand beyond the width of the
          FormField it is contained in. In other contexts, the TextArea should
          be allowed to resize both vertically and horizontally.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3}>
        <SubsectionText>
          In every case possible, TextArea should be used inside of a FormField
          to ensure that a label is appropriately paired with the input. This
          behavior is important to screen reader users who need to know what
          context the TextArea is referring to.
        </SubsectionText>
        <SubsectionText>
          If you need to use TextArea outside of the context of a FormField, it
          is important to make sure the TextArea is labeled in an alternate way
          to meet accessibility requirements.
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
          A TextArea's visual state informs the user of its ability to be
          interacted with or if any validation errors have occured.
        </SubsectionText>
      </Subsection>
      <Subsection name="Validation" level={3}>
        <SubsectionText>
          Used to indicate that a TextArea does not meet the validation
          requirements of its bounding FormField. Click the Validate button
          while the TextArea is empty to see the validation state.
        </SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textarea/TextAreaValidationExample.js"
          docs="https://v2.grommet.io/textarea?theme=hpe#props"
        >
          <TextAreaValidationExample />
        </Example>
      </Subsection>
      <Subsection name="Disabled" level={3}>
        <SubsectionText>
          Used to indicate that a TextArea cannot be interacted with.
        </SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/textarea/TextAreaDisabledExample.js"
          docs="https://v2.grommet.io/textarea?theme=hpe#props"
        >
          <TextAreaDisabledExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      {relatedContent.length > 0 && (
        <Subsection name="Related">
          <SubsectionText>
            Related content you may find useful when using {title}.
          </SubsectionText>
          <CardGrid cards={relatedContent} />
        </Subsection>
      )}
    </ContentSection>
  </Layout>
);

export default TextArea;
