import React, { useContext } from 'react';
import { Box, Grid, ResponsiveContext, Text } from 'grommet';
import {
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
import { getPageDetails, getRelatedContent, formatName } from '../../utils';

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
        <Subsection name="Sidebar, header, and footer">
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
        <Subsection name="Sidebar and header">
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
        <Subsection name="Header and footer">
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
        <Subsection name="Sticky header">
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
        <Subsection name="Header only">
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
