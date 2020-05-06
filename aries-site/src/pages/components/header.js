import React from 'react';
import { Anchor, Text } from 'grommet';
import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  HeaderExample,
  HeaderActionExample,
  HeaderNavigationExample,
  HeaderPageExample,
  HeaderAvatarExample,
  HeaderSearchActionsExample,
} from '../../examples';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Header';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const Header = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/header"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          designer="https://designer.grommet.io/header?id=HPE-design-system-hpedesignsystem-hpe-com"
          docs="https://v2.grommet.io/header?theme=hpe"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderExample.js"
          figma="https://www.figma.com/file/FwJr2zaT8Rr7RyIKLm7Lvg/hpe-design-system-library-headers?node-id=0%3A1"
          width="100%"
        >
          <HeaderExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Header is used to set the context for an application or a specific
          page within an application. It is a flexible element that can be
          composed of a variety of components to aid the user experience in an
          application.
        </SubsectionText>
      </Subsection>
      <Subsection name="About Header" level={3} gap="small">
        <SubsectionText>
          Header is extremely versatile and can be built by mixing and matching
          a variety of components to provide users with relevant interactive
          elements to navigate through or engage with an application.
        </SubsectionText>
        <Text weight="bold">Common use cases include:</Text>
        <BulletedList
          items={[
            'Creating a navigation structure for an application',
            `Providing a search field for an application or single page within
             an application`,
            `Displaying an action button that affects the application or 
            current page content`,
          ]}
        />
        <Text weight="bold">Components used within a Header:</Text>
        <SubsectionText>
          Some of the most common components that can be used in Header are{' '}
          <Anchor label="Button" href={nameToPath('Button')} />
          , <Anchor label="Avatar" href={nameToPath('Avatar')} />,{' '}
          <Anchor label="Search" href={nameToPath('Search')} />
          , and <Anchor label="Menu" href={nameToPath('Menu')} />.
        </SubsectionText>
      </Subsection>
      <Subsection name="Usage" level={3} gap="small">
        <SubsectionText>
          While Header is flexible in its composition, there are some important
          guidelines and use cases to consider. Following these examples and
          guidance will help ensure your Header is compliant with the HPE Design
          System standards.
        </SubsectionText>
        <Text weight="bold">
          Keep Header contents to a limited set of elements in order to:
        </Text>
        <BulletedList
          items={[
            `Provide the user with relevant, helpful actions regarding the 
            application or page`,
            'Layout smoothly and responsively across all browser widths',
          ]}
        />
        <Text weight="bold">
          Include an App Identity at the start of your header:
        </Text>
        <BulletedList
          items={[
            'Contains brand logo and application/service name',
            `Links to the landing page of your 
            application`,
          ]}
        />
      </Subsection>
      <Subsection name="App Header" level={3}>
        <SubsectionText>
          An app-level Header sets the context for an entire application. It
          should contain the HPE or Aruba logo alongside text that provides the
          application name on the left side of the Header.
        </SubsectionText>
        <Text weight="bold">
          Here are some elements that are appropriate for an App Header:
        </Text>
        <BulletedList
          items={[
            'Application navigation structure',
            'Profile Avatar button that leads to account information',
            'Search field that searches entirety of the application',
          ]}
        />
        <SubsectionText>
          If you have actions that pertain specifically to a single page,
          consider adding a Page Header to your layout in addition to your App
          Header.
        </SubsectionText>
      </Subsection>
      <Subsection name="Page Header" level={3}>
        <SubsectionText>
          A page-level Header sets the context for a single page within an
          application. It may contain the main heading of the page as well as
          some actions pertaining to the specific page content.
        </SubsectionText>
        <Text weight="bold">A page-level Header should:</Text>
        <BulletedList
          items={[
            'always be used in addition to the App Header',
            'be placed below the App Header in the layout',
            'contain actions relevant to a single page of an app',
          ]}
        />
        <SubsectionText>
          For more guidance, check out an example of{' '}
          <Anchor
            label="how to use a page-level header"
            href="#header-for-a-single-page"
          />
          .
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          When using Header as a navigation structure, use{' '}
          <Anchor label="Buttons" href={nameToPath('Button')} /> as your
          navigational elements and wrap them in a Nav component. This allows
          screen readers to identify this as a navigation region. For guidance,
          check out this example of a{' '}
          <Anchor
            label="Header with navigation buttons"
            href="#header-with-navigation-buttons"
          />
          .
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          There are various action elements that may live in a Header, depending
          on the application or page context.
        </SubsectionText>
      </Subsection>
      <Subsection name="Header with navigation buttons" level={3}>
        <SubsectionText>
          Header will commonly be used to provide the navigation structure
          within an application. On wider screens, the navigational buttons
          should display in a row. On mobile, these items will be collapsed into
          a <Anchor label="Menu" href={nameToPath('Menu')} />.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/menu?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderNavigationExample.js"
          width="100%"
          height={{ min: 'small' }}
        >
          <HeaderNavigationExample />
        </Example>
      </Subsection>
      <Subsection name="Header with main action" level={3}>
        <SubsectionText>
          Used for key actions on the page. This action will often pertain to
          the content on the visible page.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/header?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderActionExample.js"
          width="100%"
          height={{ min: 'small' }}
        >
          <HeaderActionExample />
        </Example>
      </Subsection>
      <Subsection name="Header with search" level={3}>
        <SubsectionText>
          Used to provide users with a quick, efficient way to find content. On
          mobile, the search input collapses into a single button that expands
          the input field when clicked.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/header?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderExample.js"
          width="100%"
          height={{ min: 'small' }}
        >
          <HeaderExample />
        </Example>
      </Subsection>
      <Subsection name="Header with avatar" level={3}>
        <SubsectionText>
          An avatar may be useful to have in a Header to allow users quick
          access to account related information. Wrap the Avatar in a{' '}
          <Anchor label="Button" href={nameToPath('Button')} /> or provide an
          'onClick' property to turn it into an interactive element.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/header?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderAvatarExample.js"
          width="100%"
          height={{ min: 'small' }}
        >
          <HeaderAvatarExample />
        </Example>
      </Subsection>
      <Subsection name="Header with search and actions" level={3}>
        <SubsectionText>
          A complex header can be effective for certain application purposes.
          However, it is important to note that this structure is suited better
          for wide desktop screens, as it is easy for the content to become
          crowded as the page width shrinks. Keep in mind the common use context
          of your user when creating Headers with lots of child elements.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/header?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderSearchActionsExample.js"
          width="100%"
          height={{ min: 'small' }}
        >
          <HeaderSearchActionsExample />
        </Example>
      </Subsection>
      <Subsection name="Header for a single page" level={3}>
        <SubsectionText>
          A Page Header should never replace the App Header. It should be used
          in addition to the App Header and placed below the App Header in the
          layout. The actions within a Page Header should pertain only to the
          content within the current page.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/header?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/header/HeaderPageExample.js"
          width="100%"
          height={{ min: 'small' }}
        >
          <HeaderPageExample />
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

export default Header;
