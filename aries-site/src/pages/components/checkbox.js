import React from 'react';

import { Anchor } from 'grommet';
import { CardGrid, Meta, SubsectionText, BulletedList } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  CheckBoxDisabledExample,
  CheckBoxDescriptionExample,
  CheckBoxSimpleExample,
  CheckBoxToggleExample,
  CheckBoxValidationExample,
} from '../../examples/components/checkbox';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

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
          figma="https://www.figma.com/file/7Mm1xDBTOtPHqggEVpaD2N/HPE-Checkbox-Component?node-id=1745%3A43"
          designer="https://designer.grommet.io/home?id=HPE-design-system-taylor-seamans-hpe-com"
        >
          <CheckBoxSimpleExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          CheckBox can be used to present an individual option or group of
          options to the user. When presented in a group, the user can select
          a single or multiple options. Refer to CheckBoxGroup for examples.
        </SubsectionText>
        <SubsectionText>
          CheckBox can be used in the form of a <Anchor href="#toggle">toggle</Anchor>, a single option which
          can indicate something such as on or off. Toggle is prefered to
          quickly switch between two possible states. Toggles usually provides
          immediate results in which gives users the ability to control their
          preference.
        </SubsectionText>
        <SubsectionText>
          CheckBox should not be used if a user should only be allowed to select
          one option from a list of options. In the case that a user should only
          be able to select one option, refer to{' '}
          <Anchor href={nameToPath('RadioButton')}>RadioButton</Anchor>.
        </SubsectionText>
      </Subsection>
      <Subsection name="About CheckBox" level={3} gap="small">
        <SubsectionText>
          There are three states which CheckBox provides:
          <BulletedList
            level={3}
            items={[
              'Unchecked - Value has not been selected.',
              'Checked - Value has been selected. Also, the checked state may be used in situations where the CheckBox is a parent to a list of child options, and all of those options have been selected.',
              'Indeterminate - Used in situations where the CheckBox is a parent to a list of child options. Use the indeterminate state to indicate that only a subset of the child options have been checked.'
            ]}
          />
          Checked and unchecked states refer to when an individual CheckBox is
          checked or when all options from a group are checked.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          CheckBox should be used inside of a FormField to ensure that a label
          is properly associated with the input. The labels on individual
          checkboxes should clearly describe the purpose of the checkbox.
        </SubsectionText>
        <SubsectionText>
          If a CheckBox is used outside of the context of a FormField, it is
          important to meet accessibility requirements in an alternate way.
          There should always be clear visual indication, either by text or
          icon, that describes the purpose of the checkbox.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          CheckBox can be used individually, within a group, or as a toggle. A
          standalone or toggle checkbox indicates that a user is opting-in to
          the context of the checkbox. Within a group, one or multiple
          checkboxes can be selected.
        </SubsectionText>
      </Subsection>
      <Subsection name="CheckBox with Description" level={3}>
        <SubsectionText>
          Adding a description provides the user additional information about
          the context or purpose of the checkboxes.
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
          validation requirements of its bounding FormField.
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

export default CheckBox;
