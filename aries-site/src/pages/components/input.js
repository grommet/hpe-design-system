import React from 'react';

import { Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  CheckboxExample,
  FormExample,
  MaskedInputExample,
  RadioButtonGroupExample,
  RangeInputExample,
  SelectExample,
  TextAreaExample,
  TextInputExample,
} from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Input';
const page = getPageDetails(title);
const topic = 'Components';

const Input = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/input"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Input components allow you to build inclusive and attentive
          experiences. The HPE Design System intends to ensure that a
          human-centered approach affords simplicity and confidence.
        </SubsectionText>
        <SubsectionText size="medium">
          Advancing the way people live and work first requires an attentive
          conversation with our customers. By listening first, we can then build
          interactions that are sensitive to human needs and tasks within an
          experience.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Checkbox">
      <SubsectionText>
          When the user needs to select one or more options, use a checkbox. The
          click target should include the checkbox label.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/CheckboxExample.js"
        >
          <CheckboxExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="MaskedInput">
        <SubsectionText>
          MaskedInput allows you to specify formailzed text within a form field.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/MaskedInputExample/MaskedInputExample.js"
        >
          <MaskedInputExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="RadioButtonGroup">
        <SubsectionText>
          When one option of a set of options can be specified, use the
          RadioButtonGroup component.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/RadioButtonGroupExample.js">
          <RadioButtonGroupExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="RangeInput">
        <SubsectionText>
          The RangeInput component is a slider control that provides a handle
          the user can move to make changes to values. It is important that the
          slider provides a value displayed to communicate with the user. This
          help ensure conficence in the use of the control.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/rangeinput?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/RangeInputExample.js">
          <RangeInputExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Select">
        <SubsectionText>
          The Select component is flexible to provide multiple select, search,
          and create options.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/select#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/SelectExample.js">
          <SelectExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="TextArea">
        <SubsectionText>
          When you need to allow the user to provide longer forms of content,
          use a TextArea component. Sometimes, using placeholder text provides
          the user with ques to the type of data that is expected in the text
          field.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/textarea?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/TextAreaExample.js"
        >
          <TextAreaExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="TextInput">
        <SubsectionText>
          The TextInput component allows the user to input shorter forms of data
          and content. Passwords and tags can also be used with the TextInput
          component. Style can be variable, based upon the use case and customer
          need that will elicit user confidence in success.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/textinput#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/TextInputExample.js">
          <TextInputExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Form">
        <SubsectionText>
          The Form component allows the user to provide various kinds of data.
          It is important to consider careful use of labels, help text,
          placeholder text and default values. Also, validation of the form and
          it’s fields should be relational and sensitive to sensemaking for the
          user.
        </SubsectionText>
        <FormExample />
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Input;
