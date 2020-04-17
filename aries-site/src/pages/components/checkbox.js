import React from 'react';

import { Anchor } from 'grommet';
import { CardGrid, Meta, SubsectionText, BulletedList } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  CheckBoxDisabledExample,
  CheckBoxDescriptionExample,
  CheckBoxMultExample,
  CheckBoxSimpleExample,
  CheckBoxToggleExample,
  CheckBoxValidationExample,
} from '../../examples/components/checkbox';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'CheckBox';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const CheckBox = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/checkbox"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          When the user needs to select one or more options, use a checkbox. The
          click target should include the checkbox label.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkbox/CheckboxSimpleExample.js"
          figma="https://www.figma.com/file/7Mm1xDBTOtPHqggEVpaD2N/HPE-Checkbox-Component?node-id=1744%3A1"
          designer="https://designer.grommet.io/home?id=HPE-design-system-taylor-seamans-hpe-com"
        >
          <CheckBoxSimpleExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          CheckBox can be used for a list of different options that are being
          provided to a user to select a option as well as being able to select
          multiple options.
        </SubsectionText>
        <SubsectionText>
          CheckBox can be used in the form of a toggle, a single option which can
          indicate something such as on or off. Toggle is prefered to quickly
          switch between two possible states. Toggles usually provide immediate
          results in which gives users the ability to control their preference.
        </SubsectionText>
        <SubsectionText>
          CheckBox should not be used if a user can only choose one option from
          a list of options. In the case that a user should only be able to
          select one option refer to{' '}
          <Anchor href="/components/radiobutton">RadioButton</Anchor>
        </SubsectionText>
      </Subsection>
      <Subsection name="About CheckBox" level={3} gap="small">
        <SubsectionText>
          There are three different states that the checkbox provides.
          <BulletedList
            level={3}
            items={['Unchecked', 'Checked', 'Indertminate']}
          />
          Checked and Unchecked are controlled by the user either clicking on
          the box or label. Indertminate can be used when a checkbox has a group
          of selections in which some/ or all can be selected.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          CheckBox used be used inside of a FormField to ensure that a label is
          used as the overall wrapping of the different options being provided
          by checkboxs. These labels describe the purpose in which the checkbox
          are serving.
        </SubsectionText>
        <SubsectionText>
          If CheckBox is used outside of Formfield is it still very important to
          providethe label for each checkbox. These labels should be clear and
          to the point for the checkbox. These labels should appear to the right
          of the checkboxes this makes it easier for users to read.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          CheckBox can be used individually, within a group of checkboxes, or as
          a toggle. A standalone or toggle checkbox indicates that a user is
          opting-in to the context of the checkbox. Within a group, one or
          multiple checkboxes can be selected.
        </SubsectionText>
      </Subsection>
      <Subsection name="CheckBox list with hints" level={3}>
        <SubsectionText>
          You can add a description that provides your user additional
          information about the items provided by the checkboxes.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkbox/CheckBoxDescription.js"
          height={{ min: 'small' }}
        >
          <CheckBoxDescriptionExample />
        </Example>
      </Subsection>
      <Subsection name="Toggle" level={3}>
        <SubsectionText>
          Toggle is a great choice to use when the user is given a single option
          that they can turn on or off.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkbox/CheckBoxToggleExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxToggleExample />
        </Example>
      </Subsection>
      <Subsection name="Validation" level={3}>
        <SubsectionText>
          Validation is used to show that the checkbox does not meet the
          validation requirements of its bounding FormField. Click the validate
          button to see the validation state.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkbox/CheckBoxValidationExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxValidationExample />
        </Example>
      </Subsection>
      <Subsection name="Disabled" level={3}>
        <SubsectionText>
          Used to indicate that CheckBox cannot be interacted with.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkbox/CheckBoxDisabledExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxDisabledExample />
        </Example>
      </Subsection>
      <Subsection name="CheckBox without FormField" level={3}>
        <SubsectionText>
          CheckBox can be used without being wrapped in a FormField we would
          still recomment using some text to have the label referring to the
          checkbox list.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkbox?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkbox/CheckBoxMultExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxMultExample />
        </Example>
      </Subsection>
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
    </ContentSection>
  </Layout>
);

export default CheckBox;
