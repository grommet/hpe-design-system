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
                  Photo booth la croix tofu mumblecore vaporware edison bulb
                  leggings affogato schlitz readymade polaroid air plant
                  farm-to-table adaptogen stumptown.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/SidebarHeaderFooterExample.js"
                  relevantComponents={['Footer', 'Global Sidebar', 'Header']}
                  width="100%"
                  template
                  showResponsiveControls
                >
                  <SidebarHeaderFooterExample />
                </Example>
              </Subsection>
              <Subsection name="Sidebar and header">
                <SubsectionText>
                  Photo booth la croix tofu mumblecore vaporware edison bulb
                  leggings affogato schlitz readymade polaroid air plant
                  farm-to-table adaptogen stumptown.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/SidebarHeaderExample.js"
                  relevantComponents={['Global Sidebar', 'Header']}
                  width="100%"
                  template
                  showResponsiveControls
                >
                  <SidebarHeaderExample />
                </Example>
              </Subsection>
              <Subsection name="Header and footer">
                <SubsectionText>
                  Photo booth la croix tofu mumblecore vaporware edison bulb
                  leggings affogato schlitz readymade polaroid air plant
                  farm-to-table adaptogen stumptown.
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
                  Photo booth la croix tofu mumblecore vaporware edison bulb
                  leggings affogato schlitz readymade polaroid air plant
                  farm-to-table adaptogen stumptown.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/HeaderFooterExample.js"
                  relevantComponents={['Header', 'Footer']}
                  width="100%"
                  template
                  showResponsiveControls
                >
                  <StickyHeaderExample />
                </Example>
              </Subsection>
              <Subsection name="Header only">
                <SubsectionText>
                  Photo booth la croix tofu mumblecore vaporware edison bulb
                  leggings affogato schlitz readymade polaroid air plant
                  farm-to-table adaptogen stumptown.
                </SubsectionText>
                <Example
                  code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/page-layouts/HeaderOnlyExample.js"
                  relevantComponents={['Header']}
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
