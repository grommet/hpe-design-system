import React, { useContext } from 'react';
import { Anchor, Box, Grid, ResponsiveContext, Text } from 'grommet';
import {
  BulletedList,
  CardGrid,
  ContentPreviewCard,
  Meta,
  SubsectionText,
} from '../../components';
import {
  HeaderOnlyExample,
  HeaderFooterExample,
  SidebarHeaderExample,
  SidebarHeaderFooterExample,
  StickyHeaderExample,
  SidebarHeaderFooterPreview,
  SidebarHeaderPreview,
  HeaderFooterPreview,
  StickyHeaderPreview,
  HeaderOnlyPreview,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import {
  getPageDetails,
  getRelatedContent,
  formatName,
  nameToPath,
} from '../../utils';

const title = 'Page Layouts';
const topic = 'Templates';
const pageDetails = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const layouts = [
  {
    name: 'Sidebar, header, and footer',
    preview: <SidebarHeaderFooterPreview />,
  },
  {
    name: 'Sidebar and header',
    preview: <SidebarHeaderPreview />,
  },
  {
    name: 'Header and footer',
    preview: <HeaderFooterPreview />,
  },
  {
    name: 'Sticky Header',
    preview: <StickyHeaderPreview />,
  },
  {
    name: 'Header only',
    preview: <HeaderOnlyPreview />,
  },
];

const LayoutPreviewGrid = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={size !== 'small' ? 'medium' : '100%'}
      rows={[['auto', 'full']]}
      gap="medium"
      justify="center"
      fill
    >
      {layouts.map(layout => (
        <ContentPreviewCard
          forwardedAs="a"
          style={{ textDecoration: 'none' }}
          href={`#${formatName(layout.name)}`}
        >
          <Box height="small" width="100%" round="xsmall">
            {layout.preview}
          </Box>
          <Text weight="bold" size="large" margin={{ top: 'small' }}>
            {layout.name}
          </Text>
        </ContentPreviewCard>
      ))}
    </Grid>
  );
};

const PageLayouts = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/page-layouts"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{pageDetails.description}</SubsectionText>
          <SubsectionText>
            Here are some common layouts to get you started:
          </SubsectionText>
          <LayoutPreviewGrid />
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            The when, how, and why to use page layouts.
          </SubsectionText>
        </Subsection>
        <Subsection name="About Page Layouts" level={3}>
          <SubsectionText>
            Choosing a page layout is an important first step in designing an
            application or website. Use of these layouts will help to maintain
            consistency across your design. They also provide visual guidance
            for how your design behaves at different screen sizes.
          </SubsectionText>
          <Text weight="bold">Common use cases include:</Text>
          <BulletedList
            items={[
              'Creating a dashboard with global navigation',
              'Providing a dialog for viewing or updating something',
              'Displaying a page in a website',
            ]}
          />
          <Text weight="bold">Components used within a Page Layout:</Text>
          <SubsectionText>
            Page Layouts are built using the{' '}
            <Anchor label="Header" href={nameToPath('Header')} /> and{' '}
            <Anchor label="Main" href={nameToPath('Main')} /> components, with
            optional{' '}
            <Anchor
              label="Global Sidebar"
              href={nameToPath('Global Sidebar')}
            />{' '}
            and <Anchor label="Footer" href={nameToPath('Footer')} />{' '}
            components. For guidance on page layout content, refer to the HPE
            Design System website pages for the components that make up your
            Page Layout.
          </SubsectionText>
        </Subsection>
        <Subsection name="Usage" level={3}>
          <SubsectionText>
            Page Layouts provide the basic structure for a variety of page
            types.
          </SubsectionText>
          <BulletedList
            items={[
              `Page-level vertical scrolling is supported, but horizontal 
              scrolling is not (and should be avoided, when possible).`,
              <Text>
                Can be used with various{' '}
                <Anchor
                  label="Navigation"
                  href={nameToPath('Navigation')}
                />{' '}
                patterns.
              </Text>,
              `Are designed to be responsive, and thus behave well, 
              regardless of the screen size they are displayed on.`,
            ]}
          />
        </Subsection>
        <Subsection name="Responsiveness" level={3}>
          <SubsectionText>
            Examples are included for different screen sizes – Desktop, Laptop
            and Mobile.
          </SubsectionText>
          <SubsectionText>
            Page content can expand to a max-width of 1440px and after that it
            stays centered. Specifically, the sidebar, main, footer, and header
            are constrained to stay centered, with equal margins on both sides.
            This behavior is demonstrated visually when a user clicks on a
            Desktop example.
          </SubsectionText>
        </Subsection>
        <Subsection name="Accessibility" level={3}>
          <SubsectionText>
            The screen reader reads page content in the order it is specified.
            Refer to the code examples to see the order in which Page Layout
            components are specified. Since Sidebar is typically used for global
            navigation, it is always specified first in Page Layout, when it is
            included.
          </SubsectionText>
          <SubsectionText>
            Specify page layout content so that it is understandable by the
            screen reader too. This should make the page easier to visually read
            as well.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>Examples of common page layouts.</SubsectionText>
        </Subsection>
        <Subsection name="Sidebar, header, and footer" level={3}>
          <SubsectionText>
            On desktop, the sidebar is fixed to the left side while header,
            main, and footer are a scrollable region. On mobile, the sidebar is
            fixed to the bottom of the screen.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/SidebarHeaderFooterExample.js"
            figma="https://www.figma.com/file/4rdBkUlHd5MCVq3hvUOXHd/App-Page-Layouts?node-id=90%3A6535"
            relevantComponents={['Footer', 'Global Sidebar', 'Header', 'Main']}
            width="100%"
            screenContainer
          >
            <SidebarHeaderFooterExample />
          </Example>
        </Subsection>
        <Subsection name="Sidebar and header" level={3}>
          <SubsectionText>
            On desktop, the sidebar is fixed to the left side while header and
            main are a scrollable region. On mobile, the sidebar is fixed to the
            bottom of the screen.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/SidebarHeaderExample.js"
            figma="https://www.figma.com/file/4rdBkUlHd5MCVq3hvUOXHd/App-Page-Layouts?node-id=90%3A6568"
            relevantComponents={['Global Sidebar', 'Header', 'Main']}
            width="100%"
            screenContainer
          >
            <SidebarHeaderExample />
          </Example>
        </Subsection>
        <Subsection name="Header and footer" level={3}>
          <SubsectionText>
            On both desktop and mobile, all content scrolls.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/HeaderFooterExample.js"
            figma="https://www.figma.com/file/4rdBkUlHd5MCVq3hvUOXHd/App-Page-Layouts?node-id=90%3A6545"
            relevantComponents={['Header', 'Footer', 'Main']}
            width="100%"
            screenContainer
          >
            <HeaderFooterExample />
          </Example>
        </Subsection>
        <Subsection name="Sticky header" level={3}>
          <SubsectionText>
            On both desktop and mobile, header is fixed to the top of the screen
            while main and footer are a scrollable region.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/HeaderFooterExample.js"
            figma="https://www.figma.com/file/4rdBkUlHd5MCVq3hvUOXHd/App-Page-Layouts?node-id=90%3A6540"
            relevantComponents={['Header', 'Footer', 'Main']}
            width="100%"
            screenContainer
          >
            <StickyHeaderExample />
          </Example>
        </Subsection>
        <Subsection name="Header only" level={3}>
          <SubsectionText>
            On both desktop and mobile, all content scrolls.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/HeaderOnlyExample.js"
            figma="https://www.figma.com/file/4rdBkUlHd5MCVq3hvUOXHd/App-Page-Layouts?node-id=90%3A6572"
            relevantComponents={['Header', 'Main']}
            width="100%"
            screenContainer
          >
            <HeaderOnlyExample />
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

export default PageLayouts;
