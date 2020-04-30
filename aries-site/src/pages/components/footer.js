import React from 'react';
import { Anchor, Text } from 'grommet';
import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { FooterExample } from '../../examples';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Footer';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const Footer = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/footer"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Footer is a Box with a set of preset properties. Box properties allow
          you to customize the footer.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/footer?theme=hpe"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/FooterExample.js"
          figma="https://www.figma.com/file/9aoCaf5lqzdQv1q4NFi0GN/hpe-design-system-library-footer"
        >
          <FooterExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Footer is used at the bottom of an application. It provides buttons
          that link to company information and other important links to
          secondary pages that may not be part of the{' '}
          <Anchor label="Header" href={nameToPath('Header')} /> navigation
          structure.
        </SubsectionText>
      </Subsection>
      <Subsection name="Usage" level={3} gap="small">
        <SubsectionText>
          A footer is a consistent element to be used at the bottom of all of
          your applications or webpages.
        </SubsectionText>
        <Text weight="bold">
          Always provide these essential elements in your footer:
        </Text>
        <BulletedList
          items={[
            'Copyright information',
            'Terms of Use',
            'Privacy',
            'Security',
          ]}
        />
        <SubsectionText>
          Check out this <Anchor href="#" label="simple Footer example" /> to
          see how these essential elements are included within a Footer.
        </SubsectionText>
      </Subsection>
      <Subsection name="App Footer" level={3}>
        <SubsectionText>
          A simple, clean and straightforward app footer displays useful
          information for the user that couldn’t be displayed on the header.
          This Footer is typically present on every screen of an application and
          its contents are universal to the entire application.
        </SubsectionText>
        <Text weight="bold">
          Always provide these essential elements in your app footer:
        </Text>
        <BulletedList
          items={[
            'Copyright information',
            'Terms of Use',
            'Privacy',
            'Security',
          ]}
        />
        <SubsectionText>
          Check out this <Anchor href="#" label="simple Footer example" /> to
          see how these essential elements are included within a Footer.
        </SubsectionText>
      </Subsection>
      <Subsection name="Page Footer" level={3}>
        <SubsectionText>
          A page-level Header provides additional resources or functions for a
          single page within an application.
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
          height={{ min: 'small' }}
        >
          {/* <HeaderNavigationExample /> */}
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
          height={{ min: 'small' }}
        >
          {/* <HeaderActionExample /> */}
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
          height={{ min: 'small' }}
        >
          {/* <HeaderExample /> */}
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
          height={{ min: 'small' }}
        >
          {/* <HeaderAvatarExample /> */}
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
          height={{ min: 'small' }}
        >
          {/* <HeaderSearchActionsExample /> */}
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
          height={{ min: 'small' }}
        >
          {/* <HeaderPageExample /> */}
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

export default Footer;
