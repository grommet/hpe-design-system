import React from 'react';

import { Text } from 'grommet';

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
          designer="https://designer.grommet.io/accordion?id=HPE-design-system-hpedesignsystem-hpe-com"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/accordion/AccordionExample.js"
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
          title headers. The titles give the user a high-level idea of what
          content will be disclosed when an accordion panel opens.
        </SubsectionText>
        <SubsectionText>
          Accordions help organize information, which helps the user consume the
          information they need at a faster pace.
        </SubsectionText>
      </Subsection>
      <Subsection name="About Accordion" level={3} gap="small">
        <SubsectionText>
          Accordion has two states:
          <BulletedList level={3} items={['Collapsed', 'Expanded']} />
          <Text weight="bold">The chevron icon</Text> is used to identify the
          expand or collapse action while the entire header can be clicked to
          expand or collapse content.
        </SubsectionText>
        <SubsectionText>
          <Text weight="bold">The default behavior</Text> is for all of the
          panels to be closed, with the user only having visual to the heading.
        </SubsectionText>
        <SubsectionText>
          <Text weight="bold">The accordion labels</Text> should be kept short
          and to the point of the information following in each panel. Lengthy
          panel content will want to be avoided.
        </SubsectionText>
      </Subsection>
      <Subsection name="Accessibility" level={3} gap="small">
        <SubsectionText>
          Buttons are used for the accordion panels which makes them
          accessible by screen readers and keyboard. Having a very descriptive
          heading label helps so the user gets to the content section they are
          interested in faster. Users are able to click anywhere within the panel
          heading for the state to change to expanded.
        </SubsectionText>
        <SubsectionText>
          To help with readability, accordions should only have one panel open
          at a time.
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
