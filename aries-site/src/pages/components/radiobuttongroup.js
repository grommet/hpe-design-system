import React from 'react';
import Link from 'next/link';
import { Anchor, Box, Text } from 'grommet';

import {
  BulletedList,
  CardGrid,
  Meta,
  Status,
  SubsectionText,
} from '../../components';
import {
  RadioButtonGroupDisabledExample,
  RadioButtonGroupExample,
  RadioButtonGroupValidationExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'RadioButtonGroup';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const RadioButtonGroup = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/radiobuttongroup"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          {page.status && <Status status={page.status} />}
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/radiobuttongroup/RadioButtonGroupExample.js"
            designer="https://designer.grommet.io/radiobuttongroup?id=HPE-design-system-hpedesignsystem-hpe-com"
            figma="https://www.figma.com/file/aZyY606ENQedz4FXugdzgS/HPE-Radio-Button-Group-Component?node-id=105%3A643"
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
            width="medium"
          >
            <RadioButtonGroupExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance" />
        <Subsection name="Best Practices" level={3} gap="small">
          <Box width={{ max: 'large' }}>
            <BulletedList
              level={3}
              items={[
                `Keep labels concise and simple. Avoid lengthy descriptions, 
                however err on clarity over brevity.`,
                <Text>
                  If there are more than five options, or if the default value
                  is expected most of the time, consider using{' '}
                  <Link href={nameToPath('Select')} passHref>
                    <Anchor>Select</Anchor>
                  </Link>{' '}
                  instead to avoid cluttering the experience.
                </Text>,
                'Use when the user needs to see all related options.',
                `Radio buttons should always be listed vertically with one 
                choice per line.`,
                'Never add sub-categories to a RadioButtonGroup.',
              ]}
            />
          </Box>
        </Subsection>
        <Subsection name="When to use RadioButtonGroup" level={3} gap="small">
          <SubsectionText>
            RadioButtonGroup is used to lay out a discreet list of mutually
            related options that are easily visible. RadioButtonGroup requires
            an input choice, so it is important to be clear with what is being
            asked of the user on the label.
          </SubsectionText>
          <SubsectionText>
            When users should be able to select more than one option, use{' '}
            <Link href={nameToPath('CheckBoxGroup')} passHref>
              <Anchor>CheckboxGroup</Anchor>
            </Link>{' '}
            instead.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            RadioButtonGroup is primarily used to select a single item from a
            list of two or more options.
          </SubsectionText>
        </Subsection>
        <Subsection name="Validation" level={3} gap="small">
          <SubsectionText>
            Validation styling indicates that a selection was not made. In many
            cases, a clear label for the group and an error message of
            'required' may be sufficient. Bonus points go to messages explaining
            why a required selection is beneficial to the user.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/radiobuttongroup/RadioButtonGroupValidationExample.js"
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
            height={{ min: 'small' }}
            width="medium"
          >
            <RadioButtonGroupValidationExample />
          </Example>
        </Subsection>
        <Subsection name="Disabled" level={3} gap="small">
          <SubsectionText>
            Indicates that the RadioButtonGroup input exists but cannot be
            interacted with until a precondition is met.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/radiobuttongroup/RadioButtonGroupDisabledExample.js"
            docs="https://v2.grommet.io/radiobuttongroup?theme=hpe#props"
            height={{ min: 'small' }}
            width="medium"
          >
            <RadioButtonGroupDisabledExample />
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
export default RadioButtonGroup;
