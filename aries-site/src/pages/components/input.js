import React from 'react';

import { ExternalCTA, Meta, SubsectionText } from '../../components';
import { ContentSection, PageLayout, Subsection } from '../../layouts';
import {
  CheckboxExample,
  FormExample,
  MaskedInputExample,
  RadioButtonGroupExample,
  RangeInputExample,
  RangeSelectorExample,
  SelectExample,
  TextAreaExample,
  TextInputExample,
} from '../../examples';

const title = 'Input';
const topic = 'Components';

const Input = () => (
  <PageLayout title={title}>
    <Meta title={title} description="" />
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
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Checkbox">
        <CheckboxExample />
        <SubsectionText>
          When the user needs to select one or more options, use a checkbox. The
          click target should include the checkbox label.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="MaskedInput">
        <MaskedInputExample />
        <SubsectionText>
          MaskedInput allows you to specify formailzed text within a form field.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="RadioButtonGroup">
        <RadioButtonGroupExample />
        <SubsectionText>
          When one option of a set of options can be specified, use the
          RadioButtonGroup component.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="RangeInput">
        <RangeInputExample />
        <SubsectionText>
          The RangeInput component is a slider control that provides a handle
          the user can move to make changes to values. It is important that the
          slider provides a value displayed to communicate with the user. This
          help ensure conficence in the use of the control.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="RangeSelector">
        <RangeSelectorExample />
        <SubsectionText>
          To specify a range of values, use the RangeSelector.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Select">
        <SelectExample />
        <SubsectionText>
          The Select component is flexible to provide multiple select, search,
          and create options.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="TextArea">
        <TextAreaExample />
        <SubsectionText>
          When you need to allow the user to provide longer forms of content,
          use a TextArea component. Sometimes, using placeholder text provides
          the user with ques to the type of data that is expected in the text
          field.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="TextInput">
        <TextInputExample />
        <SubsectionText>
          The TextInput component allows the user to input shorter forms of data
          and content. Passwords and tags can also be used with the TextInput
          component. Style can be variable, based upon the use case and customer
          need that will elicit user confidence in success.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Form">
        <FormExample />
        <SubsectionText>
          The Form component allows the user to provide various kinds of data.
          It is important to consider careful use of labels, help text,
          placeholder text and default values. Also, validation of the form and
          it’s fields should be relational and sensitive to sensemaking for the
          user.
        </SubsectionText>
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Input;
