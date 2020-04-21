import React from 'react';
import { Anchor, Text } from 'grommet';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import {
  TabsExample,
  TabStatesExample,
  TabWithIconExample,
} from '../../examples';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Tabs';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const Tabs = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/tabs"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/tabs/TabsExample.js"
          designer="https://designer.grommet.io/tabs?id=HPE-design-system-hpedesignsystem-hpe-com"
          docs="https://v2.grommet.io/tabs?theme=hpe#props"
          figma="https://www.figma.com/file/Kp4dWyhUTnKIJ1Cg5CoL9o/HPE-Tabs-Component"
        >
          <TabsExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Tabs can be used to rapidly navigate between different content while
          maintaining the existing context. The Tabs component serves as the
          outer wrapper and contains individual Tab components as children.
        </SubsectionText>
      </Subsection>
      <Subsection name="Usage" level={3} gap="small">
        <SubsectionText>
          To create a set of Tabs, use the Tabs component as the outer wrapper
          with Tab components as its children. Providing a title prop to a Tab
          will populate the text on the actual tab. The children of each Tab
          will be the content that displays when the given tab is active.
        </SubsectionText>
        <SubsectionText>
          <Text weight="bold">
            It is recommended that you do not use more than 5 tabs in a group.
          </Text>{' '}
          In order to create the most effective user experience, keep the number
          of tabs to a minimum. This allows the user to easily understand the
          scope of the information presented to them. With more tabs, the
          information can become overwhelming.
        </SubsectionText>
        <SubsectionText>
          <Text weight="bold">Keep labels short.</Text> Using a simple, concise
          label such as "Settings" or "Notifications" helps the user easily
          decide which tab contains the content they need. Longer labels may
          clutter the layout and create a more effortful experience for the
          user.
        </SubsectionText>
        <SubsectionText>
          <Text weight="bold">
            If using Tabs as a navigation structure, be sure to connect them to
            the browser location.
          </Text>
          This will allow proper active styling and routing to function.
        </SubsectionText>
        <SubsectionText>
          <Text weight="bold">
            If using Tabs as a navigation structure, don't use them in
            conjunction with other navigation structures such as{' '}
            <Anchor
              href={nameToPath('Global Sidebar')}
              label={<Text weight="bold">Global Sidebar</Text>}
            />
            .
          </Text>{' '}
          Combining multiple navigation structures creates a confusing
          experience for the user. It can lead to difficulties in navigating
          through an application and in ability to remember where desired
          content lives.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          Accessibility features such as role and aria-selected are built into
          Tabs. When a tab is selected, aria-selected is switched to true and
          toggled to false for all other tabs within the group.
        </SubsectionText>
        <SubsectionText>
          If you would like to provide a custom aria-label for screen reader
          users, you can do so by providing a string to the a11yTitle prop.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          Tabs can be used to control what information is presented to a user at
          a given time. They are effective for grouping information and allowing
          users to move between those groups without leaving their existing
          context.
        </SubsectionText>
      </Subsection>
      <Subsection name="Tabs with icons" level={3}>
        <SubsectionText>
          An icon can be used on a Tab to provide additional context about the
          information contained within the tab. It is recommended that an icon
          is used in conjunction with a title to ensure the context of the tab
          is clear.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/tabs?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/tabs/TabWithIconExample.js"
          height={{ min: 'small' }}
        >
          <TabWithIconExample />
        </Example>
      </Subsection>
      <Subsection name="Tab states" level={3}>
        <SubsectionText>
          An individual Tab can take on various states: enabled, disabled,
          hover, and active. The styling of a tab differs between each of these
          states as an indicator to the user.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/tabs?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/tabs/TabStatesExample.js"
          height={{ min: 'small' }}
        >
          <TabStatesExample />
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

export default Tabs;
