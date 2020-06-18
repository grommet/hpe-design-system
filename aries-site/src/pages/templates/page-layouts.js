import React from 'react';
import Link from 'next/link';
import { Anchor } from 'grommet';
import { Meta, SubsectionText, BulletedList } from '../../components';
import {
  HeaderOnlyExample,
  HeaderFooterExample,
  SidebarHeaderExample,
  SidebarHeaderFooterExample,
  StickyHeaderExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Page Layouts';
const topic = 'Templates';
const pageDetails = getPageDetails(title);

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
            Depending on the context or purpose of an application, the page
            structure may vary. The following are common and recommended page
            layouts:
          </SubsectionText>
          <SubsectionText>
            <BulletedList
              items={[
                <Link href="#sidebar-header-and-footer" passHref>
                  <Anchor label="Page with sidebar, header, and footer" />
                </Link>,
                <Link href="#sidebar-and-header" passHref>
                  <Anchor label="Page with sidebar and header" />
                </Link>,
                <Link href="#header-and-footer" passHref>
                  <Anchor label="Page with header and footer" />
                </Link>,
                <Link href="#sticky-header" passHref>
                  <Anchor label="Page with sticky header" />
                </Link>,
                <Link href="#header-only" passHref>
                  <Anchor label="Page with header only" />
                </Link>,
              ]}
            />
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sidebar, header, and footer">
          <SubsectionText>
            Photo booth la croix tofu mumblecore vaporware edison bulb leggings
            affogato schlitz readymade polaroid air plant farm-to-table
            adaptogen stumptown.
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
            Photo booth la croix tofu mumblecore vaporware edison bulb leggings
            affogato schlitz readymade polaroid air plant farm-to-table
            adaptogen stumptown.
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
            Photo booth la croix tofu mumblecore vaporware edison bulb leggings
            affogato schlitz readymade polaroid air plant farm-to-table
            adaptogen stumptown.
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
            Photo booth la croix tofu mumblecore vaporware edison bulb leggings
            affogato schlitz readymade polaroid air plant farm-to-table
            adaptogen stumptown.
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
            Photo booth la croix tofu mumblecore vaporware edison bulb leggings
            affogato schlitz readymade polaroid air plant farm-to-table
            adaptogen stumptown.
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
    </Layout>
  );
};

export default PageLayouts;
