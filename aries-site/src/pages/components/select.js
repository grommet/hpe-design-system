import React from 'react';
import { Anchor, Text, Box } from 'grommet';

import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import {
  SelectDisabledExample,
  SelectExample,
  SelectMultipleExample,
  SelectSearchExample,
  SelectValidationExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Select';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Select = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/select"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/select/SelectExample.js"
            designer="https://designer.grommet.io/select?id=HPE-design-system-hpedesignsystem-hpe-com"
            docs="https://v2.grommet.io/select?theme=hpe#props"
            figma="https://www.figma.com/file/fZJdRcNrvZ1JjdPRYHpFFU/hpe-select?node-id=117%3A4"
          >
            <SelectExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            Select is a flexible input element able to serve a wide variety of
            use cases. Though flexible, asking "is Select the best tool in this
            circumstance?" is a healthy exercise. Variants of Select, such
            as&nbsp;
            <Anchor href="#select-with-search">Select with Search</Anchor>, or
            alternatives like{' '}
            <Anchor href="/components/radiobuttongroup">
              RadioButtonGroup
            </Anchor>
            , <Anchor href="/components/maskedinput">MaskedInput</Anchor>,
            or&nbsp;
            <Anchor href="/components/textinput#textinput-with-suggestions">
              TextInput with suggestions
            </Anchor>{' '}
            may be more appropriate for crafting an elegant user experience.
          </SubsectionText>
        </Subsection>
        <Subsection name="When to use Select" level={3} gap="small">
          <SubsectionText>
            Because Select is flexible and familiar, the following questions are
            helpful to consider alternatives and/or confirm that Select is the
            most appropriate element:
          </SubsectionText>
          <Box width={{ max: 'large' }}>
            <BulletedList
              level={3}
              items={[
                `Is there a need to conserve screen space? Select may be 
              appropriate.`,
                `Ensuring collection of standardized values? Select may 
              be appropriate.`,
                <Text>
                  Are there less than five options? Consider a CheckBoxGroup or
                  &nbsp;
                  <Anchor href="/components/radiobuttongroup">
                    RadioButtonGroup
                  </Anchor>{' '}
                  as they may be more efficient for users. Select can hide
                  information and requires extra clicks/taps for users to access
                  that information.
                </Text>,
                <Text>
                  Are there a large number of options? Lengthy scrolling can be
                  problematic for users. Consider{' '}
                  <Anchor href="#select-with-search">Select with Search</Anchor>
                  &nbsp; or {/* eslint-disable-next-line max-len */}
                  <Anchor href="/components/textinput#textinput-with-suggestions">
                    TextInput with suggestions
                  </Anchor>
                  .
                </Text>,
                `Is the select for a State/Province in the context of 
                collecting an address? Consider only asking for ZIP/Postal 
                Code and automatically determining City, State, Country, 
                etc. without user input.`,
                <Text>
                  Are the values in list well known and understood, such as
                  Year? Consider {/* eslint-disable-next-line max-len */}
                  <Anchor href="/components/textinput#textinput-with-suggestions">
                    TextInput with suggestions
                  </Anchor>{' '}
                  or <Anchor href="/components/maskedinput">MaskedInput</Anchor>
                  .
                </Text>,
              ]}
            />
          </Box>
        </Subsection>
        <Subsection name="Accessibility" level={3}>
          <SubsectionText>
            Using Select as a form field is preferred for user experience. When
            Select is used in conjunction with FormField, users receive clear
            indication for the contents and purpose of the input. Additionally,
            this use promotes best practices in accessibility by ensuring user
            inputs are accompanied by labels used by assistive technologies.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            The Select input is flexible and may be extended to allow for
            multi-select, search, and create options.
          </SubsectionText>
        </Subsection>
        <Subsection name="Multi-Select" level={3}>
          <SubsectionText>
            Allow multiple options to be selected.
          </SubsectionText>
          <SubsectionText>
            <Anchor href="">CheckBoxGroup</Anchor> is also great alternative to
            consider when multiple selections are desired.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/select/SelectMultipleExample.js"
            docs="https://v2.grommet.io/select?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SelectMultipleExample />
          </Example>
        </Subsection>
        <Subsection name="Select with Search" level={3}>
          <SubsectionText>
            Allow users to quickly find their desired option by incorporating
            Search within the Select component.
          </SubsectionText>
          <SubsectionText>
            Select with search is especially useful when presenting lengthy
            options lists such as when selecting from countries or regions.{' '}
            <Anchor href="/components/textinput#textinput-with-suggestions">
              TextInput with suggestions
            </Anchor>{' '}
            and <Anchor href="/components/maskedinput">MaskedInput</Anchor> are
            also worth considering in circumstances where values are well known.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/select/SelectSearchExample.js"
            docs="https://v2.grommet.io/select?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SelectSearchExample />
          </Example>
        </Subsection>
        <Subsection name="Validation" level={3}>
          <SubsectionText>
            Validation styling calls visual attention to the Select input with
            an error and should be accompanied by text instructing the user how
            to resolve. A "required" input error is the most common with Select
            since the available options are typically pre-defined.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/select/SelectValidationExample.js"
            docs="https://v2.grommet.io/select?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SelectValidationExample />
          </Example>
        </Subsection>
        <Subsection name="Disabled" level={3}>
          <SubsectionText>
            Indicates that the Select input exists but cannot be interacted with
            until a precondition is met.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/select/SelectDisabledExample.js"
            docs="https://v2.grommet.io/select?theme=hpe#props"
            height={{ min: 'small' }}
          >
            <SelectDisabledExample />
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
};
export default Select;
