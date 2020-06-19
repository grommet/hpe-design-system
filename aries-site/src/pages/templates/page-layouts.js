import React from 'react';
import { Box, Grid, ResponsiveContext, Text } from 'grommet';
import { ContentPreviewCard, Meta, SubsectionText } from '../../components';
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
import { getPageDetails, formatName } from '../../utils';

const title = 'Page Layouts';
const topic = 'Templates';
const pageDetails = getPageDetails(title);

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
const PageLayouts = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/page-layouts"
      />
      <ResponsiveContext.Consumer>
        {size => (
          <>
            <ContentSection>
              <Subsection name={title} level={1} topic={topic}>
                <SubsectionText>{pageDetails.description}</SubsectionText>
                <SubsectionText>
                  Here are some common layouts to get you started:
                </SubsectionText>
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
                      <Text
                        weight="bold"
                        size="large"
                        margin={{ top: 'small' }}
                      >
                        {layout.name}
                      </Text>
                    </ContentPreviewCard>
                  ))}
                </Grid>
              </Subsection>
            </ContentSection>
            <ContentSection>
              <Subsection name="Sidebar, header, and footer">
                <SubsectionText>
                  On desktop, the sidebar is fixed to the left side while
                  header, main, and footer are a scrollable region. On mobile,
                  the sidebar is fixed to the bottom of the screen.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/SidebarHeaderFooterExample.js"
                  relevantComponents={[
                    'Footer',
                    'Global Sidebar',
                    'Header',
                    'Main',
                  ]}
                  width="100%"
                  template
                  showResponsiveControls
                >
                  <SidebarHeaderFooterExample />
                </Example>
              </Subsection>
              <Subsection name="Sidebar and header">
                <SubsectionText>
                  On desktop, the sidebar is fixed to the left side while header
                  and main are a scrollable region. On mobile, the sidebar is
                  fixed to the bottom of the screen.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/SidebarHeaderExample.js"
                  relevantComponents={['Global Sidebar', 'Header', 'Main']}
                  width="100%"
                  template
                  showResponsiveControls
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
                  relevantComponents={['Header', 'Footer']}
                  width="100%"
                  template
                  showResponsiveControls
                >
                  <HeaderFooterExample />
                </Example>
              </Subsection>
              <Subsection name="Sticky header">
                <SubsectionText>
                  On both desktop and mobile, header is fixed to the top of the
                  screen while main and footer are a scrollable region.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/HeaderFooterExample.js"
                  relevantComponents={['Header', 'Footer', 'Main']}
                  width="100%"
                  template
                  showResponsiveControls
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
                  relevantComponents={['Header', 'Main']}
                  width="100%"
                  template
                  showResponsiveControls
                >
                  <HeaderOnlyExample />
                </Example>
              </Subsection>
            </ContentSection>
          </>
        )}
      </ResponsiveContext.Consumer>
    </Layout>
  );
};

export default PageLayouts;
