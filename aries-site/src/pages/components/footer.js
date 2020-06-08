import React from 'react';
import { Anchor, Box, List, Text } from 'grommet';
import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import {
  FooterExample,
  FooterComboExample,
  FooterPageExample,
} from '../../examples';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Footer';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const data = [
  {
    title: 'Copyright information',
    description: `It is vital to make it clear that the content within the 
    website and applications is protected and copyrighted.`,
  },
  {
    title: 'Terms of use',
    description: `These guidelines will help ensure partners and customers the 
    terms of doing business with us.`,
  },
  {
    title: 'Privacy',
    description: `As a large corporation, it is essential to display a link to 
    our privacy policy page to let users know that we follow GDPR laws.`,
  },
  {
    title: 'Security',
    description: `It is important for users to get an overview that explains 
    our security processes and tools that are used to protect data and users.`,
  },
];
const Footer = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/footer"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          designer="https://designer.grommet.io/footer?id=HPE-design-system-hpedesignsystem-hpe-com&mode=edit"
          docs="https://v2.grommet.io/footer?theme=hpe"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/footer/FooterExample.js"
          figma="https://www.figma.com/file/9aoCaf5lqzdQv1q4NFi0GN/HPE-Footer-Component?node-id=84%3A26"
          width="100%"
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
          your applications or webpages. Unlike Header, Footer is not as
          flexible and contains certain required elements.
        </SubsectionText>
        <SubsectionText>
          The most common footer is an{' '}
          <Anchor label="App Footer" href="#app-footer" /> which is contains
          legal and other important resources that pertain to the entirety of an
          application.
        </SubsectionText>
        <SubsectionText>
          The other type of footer is a{' '}
          <Anchor label="Page Footer" href="#page-footer" /> which contains
          additional actions or resources specific to a single page of an
          application.
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
          Always provide these essential links in your footer:
        </Text>
        <List
          as="ol"
          data={data}
          border={{ style: 'hidden' }}
          pad={{ vertical: 'small' }}
        >
          {(datum, index) => (
            <Box key={index} gap="xsmall">
              <Text weight="bold">
                {index + 1}) {datum.title}
              </Text>
              <SubsectionText size="small">{datum.description}</SubsectionText>
            </Box>
          )}
        </List>
        <SubsectionText>
          Check out this <Anchor href="#" label="simple Footer example" /> to
          see how these essential elements are included within a Footer.
        </SubsectionText>
      </Subsection>
      <Subsection name="Page Footer" level={3}>
        <SubsectionText>
          A page-level Footer provides additional resources or functions for a
          single page within an application.
        </SubsectionText>
        <Text weight="bold">A page-level Footer should:</Text>
        <BulletedList
          items={[
            'always be used in addition to the App Footer',
            'be placed above the App Footer in the layout',
            'contain actions relevant to a single page of an app',
          ]}
        />
        <SubsectionText>
          For more guidance, check out an example of{' '}
          <Anchor
            label="how to use a page-level footer"
            href="#footer-for-a-single-page"
          />
          .
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          Wrap buttons at the bottom of a page in a Footer to inform screen
          readers that the contained content is part of a page footer. This
          meets accessibility requirements to contain all page content in
          relevant landmarks. For more information, you can read more on{' '}
          <Anchor
            label="using landmarks to identify page regions"
            href="https://www.w3.org/TR/WCAG20-TECHS/ARIA11.html"
            target="_blank"
            rel="noopener"
          />
          .
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          There are various action elements that may live in a Footer, depending
          on the application or page context.
        </SubsectionText>
      </Subsection>
      <Subsection name="Footer for a single page" level={3}>
        <SubsectionText>
          A Page Footer should never replace the App Footer. It should be used
          in addition to the App Footer and placed above the App Footer in the
          layout. The actions or resources within a Page Footer should pertain
          only to the content within the current page.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/footer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/footer/FooterPageExample.js"
          height={{ min: 'small' }}
          width="100%"
        >
          <FooterPageExample />
        </Example>
      </Subsection>
      <Subsection name="App footer with page footer" level={3}>
        <SubsectionText>
          Here is how to stack a Page Footer with an App Footer in your layout.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/footer?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/footer/FooterComboExample.js"
          height={{ min: 'small' }}
          width="100%"
        >
          <FooterComboExample />
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
