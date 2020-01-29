import React from 'react';
import { Box, Button } from 'grommet';

import { ExternalCTA, Meta, SubsectionText } from '../../components';
import {
  ButtonRow,
  ContentSection,
  Layout,
  Subsection,
  UsageExample,
} from '../../layouts';
import { AccordionExample, MenuExample, TabsExample } from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Controls';
const page = getPageDetails(title);
const topic = 'Components';

const Controls = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/controls"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The HPE Design System controls are a set of core elements that help
          you solve interactive design problems. They enable the user to engage
          with an experience that is responsive and approachable.
        </SubsectionText>
        <SubsectionText size="medium">
          Each component is crafted to be universally understood. They enable
          you to create and build a relational interface that is attentive to
          the user’s needs, appropriately responding to a user’s purpose and
          intent.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Accordion">
        <AccordionExample />
        <SubsectionText>
          The accordian affords content to be delivered progressively. The
          chevron is used to identify the expand or collapse action while the
          entire header can be clicked to expand or collapse content. When
          seeking to provide maximum content in limited, vertical space, an
          accordion is a good alternative.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Anchor">
        <SubsectionText>
          The anchor component provides a text link.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Button">
        <UsageExample>
          <Box align="start">
            <Button label="Hello Button" primary />
          </Box>
        </UsageExample>
        <SubsectionText>
          Buttons are used to indicate actions that can be perfomed. Ideally,
          buttons are not used as navigational elements.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Menu">
        <MenuExample />
        <SubsectionText>
          Menu is used to filter or sort content on a page. It is similar to the
          select component. However, use the select component when the user must
          specify from a list of options and submit. See the Select Component.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Tabs">
        <TabsExample />
        <SubsectionText>
          Tabs allow a user to access content while maintaining the existing
          context. It consists of a container, or box, with tab controls to
          expose the contents of the container.
        </SubsectionText>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Controls;
