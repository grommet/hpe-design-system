import React from 'react';
import Link from 'next/link';
import { Anchor, Text } from 'grommet';
import {
  CardGrid,
  Meta,
  Status,
  SubsectionText,
  BulletedList,
} from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  CheckBoxGroupDisabledExample,
  CheckBoxGroupDescriptionExample,
  CheckBoxGroupObjectExample,
  CheckBoxGroupSimpleExample,
  CheckBoxGroupValidationExample,
} from '../../examples/components/checkboxgroup';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'CheckBoxGroup';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const CheckBoxGroup = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/checkboxgroup"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        {page.status && <Status status={page.status} />}
        <Example
          docs="https://v2.grommet.io/checkboxgroup?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkboxgroup/CheckBoxGroupSimpleExample.js"
          figma="https://www.figma.com/file/zkQOQRUt8frxiSo67kTkfE/HPE-Checkbox-Group-Component?node-id=174%3A23"
          designer="https://designer.grommet.io/checkboxgroup?id=HPE-design-system-hpedesignsystem-hpe-com&mode=edit"
        >
          <CheckBoxGroupSimpleExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          CheckBoxGroup should be used to present a group of options to the
          user. The user can select a single or multiple options.
        </SubsectionText>
      </Subsection>
      <Subsection name="Best Practices" level={3} gap="small">
        <BulletedList
          level={3}
          items={[
            `CheckBoxGroup should be used to select zero or more of options 
              from a list.`,
            'In a CheckBoxGroup, options are independent from one another.',
            `Settings changed by checkboxes should not take effect until the 
              user clicks to proceed.`,
            `It is recommended to have only 10 or fewer options in a 
              CheckBoxGroup. Use multiple CheckboxGroups if necessary.`,
          ]}
        />
      </Subsection>
      <Subsection name="Usage" level={3} gap="small">
        <Text weight="bold">The dos for CheckBoxGroup:</Text>
        <BulletedList
          level={3}
          items={[
            'Always label CheckBoxGroups with short and concise labels.',
            `Give every CheckBox in the group a short, but descriptive 
              value.`,
            `Clearly separate Checkbox Groups from other groups on the same
              page.`,
            `Organize Checkboxes in a logical order by grouping related
              options.`,
            'Consider placing most common options first in the group.',
          ]}
        />
        <Text weight="bold">The don'ts for CheckBoxGroup:</Text>
        <BulletedList
          level={3}
          items={[
            'Don’t align checkboxes horizontally in a group.',
            `Refrain from using CheckboxGroup when only one item can be 
              selected from a list.`,
          ]}
        />
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          When using multiple checkboxes in a single FormField, use a
          CheckBoxGroup. If you're using a single checkbox, use{' '}
          <Link href={nameToPath('CheckBox')} passHref>
            <Anchor label="Checkbox" />
          </Link>
          .
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          CheckBoxGroup contains multiple checkboxes and has various states.
          When enabled, CheckBoxGroup should always allow one or more options to
          be selected.
        </SubsectionText>
      </Subsection>
      <Subsection name="With description" level={3}>
        <SubsectionText>
          Adding a description provides the user additional information about
          the context or purpose of the CheckBoxGroup.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkboxgroup?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkboxgroup/CheckBoxGroupDescriptionExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxGroupDescriptionExample />
        </Example>
      </Subsection>
      <Subsection name="Validation" level={3}>
        <SubsectionText>
          Validation is used to show that the CheckBoxGroup does not meet the
          validation requirements of its bounding FormField.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkboxgroup?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkboxgroup/CheckBoxGroupValidationExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxGroupValidationExample />
        </Example>
      </Subsection>
      <Subsection name="With options as array of objects" level={3}>
        <SubsectionText>
          CheckBoxGroup options are typically an array of strings, but they can
          also be an array of objects.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkboxgroup?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkboxgroup/CheckBoxGroupObjectExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxGroupObjectExample />
        </Example>
      </Subsection>
      <Subsection name="Disabled" level={3}>
        <SubsectionText>
          Used to indicate that CheckBoxGroup cannot be interacted with.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/checkboxgroup?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/checkboxgroup/CheckBoxGroupDisabledExample.js"
          height={{ min: 'small' }}
        >
          <CheckBoxGroupDisabledExample />
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

export default CheckBoxGroup;
