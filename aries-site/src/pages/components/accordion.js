import React from 'react';

import { CardGrid, Meta, SubsectionText, BulletedList } from '../../components';
import { ContentSection, Layout, Subsection, Example } from '../../layouts';
import { AccordionExample } from '../../examples';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Accordion';
const page = getPageDetails(title);
const topic = 'Components';
const relatedContent = getRelatedContent(title);

const Accordion = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/accordion"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          docs="https://v2.grommet.io/accordion#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/AccordionExample.js"
          figma="https://www.figma.com/file/UvTBUQdhk07wV79nijsrtr/HPE-Accordion-Component?node-id=71%3A25"
        >
          <AccordionExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          When seeking to provide maximum content in limited, vertical space, an
          accordion is a good choice.
        </SubsectionText>
        <SubsectionText>
          An accordion is a group of vertically stacked collapsible buttons with
          title headers. This gives the user a high level idea of what content
          will be disclosed before collapsing a section.
        </SubsectionText>
        <SubsectionText>
          Accordions make it easy for the user to process and find the
          information they need in a more effective manner. Accordions can be
          used to organize information, which helps the user consume the
          information they need at a faster pace.
        </SubsectionText>
      </Subsection>
      <Subsection name="About Accordion" level={3} gap="small">
        <SubsectionText>
          Accordion has two states:
          <BulletedList level={3} items={['Collapsed', 'Expanded']} />
          The chevron icon is used to identify the expand or collapse action
          while the entire header can be clicked to expand or collapse content.
          The default behavior is for all of the panels to be closed, with the
          user only having visual to the heading.
        </SubsectionText>
        <SubsectionText>
          The accordion labels should be kept short and to the point of the
          information following in each panel. Lengthy panel content will want
          to be avoided.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          Buttons are using for the header which make the panel header tabable
          and accessible by screen readers. This makes having a very descriptive
          heading label helps so the user gets to the content section they are
          intrested faster. Users are able to click anywhere within the panel
          heading for the state to change to expanded.
        </SubsectionText>
        <SubsectionText>
          Only one panel can be opened at a time to help with readability.
        </SubsectionText>
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

export default Accordion;
