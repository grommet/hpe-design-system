import React from 'react';
import { Anchor, Text } from 'grommet';
import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import {
  MaskedDateExample,
  MaskedDisabledExample,
  MaskedEmailExample,
  MaskedIPRangeExample,
  MaskedIPAddressExample,
  MaskedPhoneExample,
  MaskedSizeUnitsExample,
  MaskedTimeExample,
  MaskedValidationExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, nameToPath, getRelatedContent } from '../../utils';

const title = 'MaskedInput';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const MaskedInput = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/maskedinput"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/input/MaskedInputExample/MaskedInputExample.js"
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            figma="https://www.figma.com/file/fO285pXUqN9pVZ0xpRoKjL/HPE-Masked-Input-Component?node-id=1%3A89"
          >
            <MaskedPhoneExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            MaskedInput place syntax restrictions on the text that can be
            entered in an input field. It is similar to{' '}
            <Anchor label="TextInput" href={nameToPath('TextInput')} />, in that
            is allows the user to input shorter forms of data and content.
            However, it is used to provide extra guidance and enforcement of
            input formats.
          </SubsectionText>
        </Subsection>
        <Subsection name="Usage" level={3} gap="small">
          <SubsectionText>
            MaskedInput should be used anytime there is formalized syntax and
            should always be used within a{' '}
            <Anchor label="Form" href={nameToPath('Forms')} />.
          </SubsectionText>
          <Text weight="bold">When using MaskedInput, you should:</Text>
          <BulletedList
            items={[
              'Provide suggestions whenever possible',
              'Restrict syntax as much as possible',
              `Ensure any syntax separators are automatically inserted if 
              needed but user is also able to type theme`,
            ]}
          />
        </Subsection>
        <Subsection name="Accessibility" level={3} gap="small">
          <SubsectionText>
            In every case possible, MaskedInput should be used inside of a
            FormField to ensure that a label is appropriately paired with the
            input. This behavior is important to screen reader users who need to
            know to which context the MaskedInput is referring.
          </SubsectionText>
          <SubsectionText>
            Placeholder text does not serve as a sufficient means of restricting
            syntax. As the user types, the input should auto-format to the
            intended format.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            A MaskedInput's visual state informs the user of its ability to be
            interacted with or if any validation errors have occured. It
            automatically formats input values to the desired syntax.
          </SubsectionText>
        </Subsection>
        <Subsection name="IP Address" level={3}>
          <SubsectionText>Used to collect a single IP address.</SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedIPAddressExample.js"
            height={{ min: 'small' }}
          >
            <MaskedIPAddressExample />
          </Example>
        </Subsection>
        <Subsection name="IP Range" level={3}>
          <SubsectionText>
            Used to collect a range of IP addresses. As the user types, the
            syntax is automatically filled in.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedIPRangeExample.js"
            height={{ min: 'small' }}
            width="medium"
          >
            <MaskedIPRangeExample />
          </Example>
        </Subsection>
        <Subsection name="Size with units" level={3}>
          <SubsectionText>
            Used to collect information on size, with suggestions that match
            common size intervals.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedSizeUnitsExample.js"
            height={{ min: 'small' }}
            width="medium"
          >
            <MaskedSizeUnitsExample />
          </Example>
        </Subsection>
        <Subsection name="Email" level={3}>
          <SubsectionText>
            Used to email address and formats according to email syntax.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedEmailExample.js"
            height={{ min: 'small' }}
            width="medium"
          >
            <MaskedEmailExample />
          </Example>
        </Subsection>
        <Subsection name="Time" level={3}>
          <SubsectionText>
            Allows time information to be input with options of 15 minute
            intervals by suggestion or any custom time by typing.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedTimeExample.js"
            height={{ min: 'small' }}
            width="medium"
          >
            <MaskedTimeExample />
          </Example>
        </Subsection>
        <Subsection name="Date" level={3}>
          <SubsectionText>
            Used to collect full date where day value suggestions match the
            number of days in the selected month.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedDateExample.js"
            height={{ min: 'small' }}
            width="medium"
          >
            <MaskedDateExample />
          </Example>
        </Subsection>
        <Subsection name="Validation" level={3}>
          <SubsectionText>
            Used to confirm that an input has been completed properly and to its
            entirety, even when syntax restrictions are in place. See the
            difference upon submission when inputting "123.123.123.123" vs.
            "43.21".
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedRequiredExample.js"
            height={{ min: 'small' }}
          >
            <MaskedValidationExample />
          </Example>
        </Subsection>
        <Subsection name="Disabled" level={3}>
          <SubsectionText>
            Used to indicate that a MaskedInput cannot be interacted with.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/maskedinput?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/maskedinput/MaskedDisabledExample.js"
            height={{ min: 'small' }}
          >
            <MaskedDisabledExample />
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
export default MaskedInput;
