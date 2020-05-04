import React from 'react';
import { Anchor, Text } from 'grommet';
import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import {
  ChangePasswordExample,
  CustomizeExample,
  FilterExample,
  PayExample,
  SettingsExample,
  ShippingExample,
  SignInExample,
  SimpleSignUpExample,
  SignUpExample,
  SortExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Forms';
const topic = 'Templates';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Forms = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/forms"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/SimpleSignUpExample.js"
            docs="https://v2.grommet.io/form?theme=hpe"
            figma="https://www.figma.com/file/3fkwBelW5UsCbfwdDCJkT8/HPE-Form-Templates?node-id=1%3A2"
          >
            <SimpleSignUpExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            Forms provide a way to collect important data from a user. However,
            this data is only collected effectively when Forms are built in a
            way in which users are inclined to fill out in full.
          </SubsectionText>
        </Subsection>
        <Subsection name="Usage" level={3} gap="small">
          <SubsectionText>
            Forms don't need to be a tedious task for users to complete, as they
            often come to be. It is important to ease as much of this effort as
            possible when building a Form. Making Forms simple to complete leads
            to increase in form completion.
          </SubsectionText>
          <Text weight="bold">
            Follow these guidelines when creating a Form:
          </Text>
          <BulletedList
            items={[
              'Use as few fields as possible',
              'Wrap all input elements in a FormField',
              'Fill in default values for as many fields as possible',
              'Reveal fields progressively so the user is not overwhelmed',
              'Use clear, concise labels for each field',
            ]}
          />
        </Subsection>
        <Subsection name="Required vs. optional fields" level={3}>
          <SubsectionText>
            When possible, restrict Forms only to fields that are required. This
            ensures that the Form remains concise for the user. However, there
            may be cases where optional fields may be fitting.
          </SubsectionText>
          <SubsectionText>
            When using a mixture of required and optional fields, apply the
            "required" prop to any given FormField restrict form submission
            until this field has been completed.
          </SubsectionText>
        </Subsection>
        <Subsection name="Using help text" level={3}>
          <SubsectionText>
            In most cases, the FormField label should be clear enough to
            instruct the user how to complete a field. However, if help text is
            required, ensure that it is kept brief and precise.
          </SubsectionText>
          <SubsectionText>
            Help text may be relevant for cases such as{' '}
            <Anchor label="password requirements" href="#sign-up" /> or{' '}
            <Anchor label="additional resources" href="#customize" /> on a
            field's context.
          </SubsectionText>
        </Subsection>
        <Subsection name="Button placement and labeling" level={3}>
          <SubsectionText>
            Submit, reset, or cancel buttons should always be placed at the
            bottom of a Form.
          </SubsectionText>
          <SubsectionText>
            Button labels should be specific to the action of the button. For
            example, a <Anchor label="sign-up form" href="#sign-up" /> may have
            a submit button with label "Sign Up". Alternately,{' '}
            <Anchor label="password change form" href="#change-password" /> may
            have a button with label "Update Password".
          </SubsectionText>
          <SubsectionText>
            Button label specificity provides users confidence in the action
            they are performing.
          </SubsectionText>
        </Subsection>
        <Subsection name="Form submission" level={3}>
          <SubsectionText>
            Visual feedback is important to instill confidence in a user after
            form submission.
          </SubsectionText>
          <Text weight="bold">On submission, your Form should:</Text>
          <BulletedList
            items={[
              `Display any relevant errors (if applicable) with text that 
              explains the necessary criteria to fix errors`,
              `Provide user with indication that form was submitted 
              successfully (notification, success page, etc.)`,
              `Allow user to continue navigating through the application 
              immediately`,
            ]}
          />
          <SubsectionText>
            Never force the user to wait for post-submission processing to
            complete before they can continue using an application.
          </SubsectionText>
        </Subsection>
        <Subsection name="Accessibility" level={3} gap="small">
          <SubsectionText>
            All Form input elements need to be contained within a FormField.
          </SubsectionText>
          <Text weight="bold">FormFields need to have:</Text>
          <BulletedList
            items={[
              'An htmlFor property that matches the id of its child input',
              'A clear, concise label',
            ]}
          />
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sign Up">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/SignUpExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=259%3A86"
          >
            <SignUpExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sign In">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/SignInExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=242%3A28"
          >
            <SignInExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Filter">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/FilterExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=251%3A437"
          >
            <FilterExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sort">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/SortExample.js">
            <SortExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Change Password">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/ChangePasswordExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=259%3A85"
          >
            <ChangePasswordExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Settings">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/SettingsExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=267%3A77"
          >
            <SettingsExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Pay">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/PayExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=0%3A1"
          >
            <PayExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Shipping">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/ShippingExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=251%3A189"
          >
            <ShippingExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Customize">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/forms/CustomizeExample.js"
            figma="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers?node-id=259%3A87"
          >
            <CustomizeExample />
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
export default Forms;
