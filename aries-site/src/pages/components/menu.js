import React from 'react';
import { Anchor, Text } from 'grommet';

import { CardGrid, Meta, SubsectionText } from '../../components';
import {
  MenuExample,
  MenuDisabledExample,
  MenuHeaderExample,
  MenuIconExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Menu';
const topic = 'Components';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Menu = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components/menu"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/menu/MenuExample.js"
            designer="https://designer.grommet.io/menu?id=HPE-design-system-hpedesignsystem-hpe-com"
            docs="https://v2.grommet.io/menu?theme=hpe#props"
            figma="https://www.figma.com/file/DyFWlzLBUtK5KH5jJhwoCB/HPE-Menu-Component?node-id=38%3A40"
          >
            <MenuExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            A Menu is a set of actions that may be used to engage with content
            on a page or to navigate to other pages. When a menu item is
            clicked, the action will be executed.
          </SubsectionText>
          <SubsectionText> 
            Menu should not be confused with{' '}
            <Anchor href={nameToPath('Select')}>Select</Anchor>. Though
            visually similar, Select is often used in the context of a Form and 
            used to choose from a set of values rather than actions.
          </SubsectionText>
        </Subsection>
        <Subsection name="Usage" level={3} gap="small">
          <SubsectionText>
           To create a predictable experience for users, the following
            are guidelines for using Menu.
          </SubsectionText>
          <SubsectionText>
            <Text weight="bold">
              It is recommended that you do not have more than 5 items in a
              menu.
            </Text>{' '}
            In order to create the most effective user experience, keep the
            number of items to a minimum. This allows the user to easily
            understand the scope of the actions they can perform.
          </SubsectionText>
          <SubsectionText>
            <Text weight="bold">Give the menu a clear title.</Text> Instead of
            labeling the menu as "Menu", provide a name that conveys its
            purpose. For example, a label of "Account Information" would be
            appropriate if the menu items associated were actions such as
            "Change username" or "Reset password".
          </SubsectionText>
          <SubsectionText>
            <Text weight="bold">Keep labels short.</Text> Using a simple,
            concise label for menu items, such as "Settings" or "Logout", helps
            the user easily understand the action that will be performed when
            they click. Longer labels may clutter the layout and create a more
            effortful experience for the user.
          </SubsectionText>
          <SubsectionText>
            <Text weight="bold">Avoid creating cascading menus.</Text> Menus
            with multiple layers creates a confusing experience for the user
            because relevant actions may become nested and difficult to find.
            Refining menu items to necessary actions creates a more manageable
            user experience.
          </SubsectionText>
        </Subsection>
        <Subsection name="Accessibility" level={3} gap="small">
          <SubsectionText>
            Accessibility features such as screen reader messages are
            automatically built into Menu. By default, these messages are "Open
            Menu" and "Close Menu". However, if a more specific message is
            necessary, a custom <Anchor href="https://v2.grommet.io/menu?theme=hpe#a11yTitle" target="__blank" >a11yTitle</Anchor> or <Anchor href="https://v2.grommet.io/menu?theme=hpe#messages" target="__blank" >messages</Anchor> may be applied.
          </SubsectionText>
          <SubsectionText>
            An icon can be used on a menu item to provide additional context
            about the action. It is recommended that an icon is used in
            conjunction with text to ensure the context of the menu item is
            clear. However, there may be cases where an icon alone is
            sufficient. For example, highly familiar action indicators, such as
            this example of{' '}
            <Anchor href="#with-custom-icon">Menu with custom icon</Anchor>,
            demonstrate when an icon only may be sufficient.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            There are various places a Menu may be useful within an application.
            If the user is going to be selecting from a list of options to
            execute an action, Menu is a good component to use. The usage of
            labels and icons allow a menu to be versatile for different layout
            contexts.
          </SubsectionText>
        </Subsection>
        <Subsection name="Within a header" level={3}>
          <SubsectionText>
            A menu can be used in a{' '}
            <Anchor href={nameToPath('Header')}>Header</Anchor> to group related
            actions.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/menu?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/menu/MenuHeaderExample.js"
            height={{ min: 'small' }}
          >
            <MenuHeaderExample />
          </Example>
        </Subsection>
        <Subsection name="With custom icon" level={3}>
          <SubsectionText>
            Adding an icon prop changes the icon that appears on the menu. In
            some contexts, it may be appropriate to use a more specific or
            alternate icon. Here is an example Menu being used in a{' '}
            <Anchor href={nameToPath('Lists')}>List</Anchor> to indicate actions
            that can be performed on list items.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/menu?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/menu/MenuIconExample.js"
            height={{ min: 'small' }}
          >
            <MenuIconExample />
          </Example>
        </Subsection>
        <Subsection name="Disabled" level={3}>
          <SubsectionText>
            Used to indicate that a Menu cannot be interacted with.
          </SubsectionText>
          <Example
            docs="https://v2.grommet.io/menu?theme=hpe#props"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/menu/MenuDisabledExample.js"
            height={{ min: 'small' }}
          >
            <MenuDisabledExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        {relatedContent.length && (
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
};
export default Menu;
