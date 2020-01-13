import React from 'react';
import { Box } from 'grommet';
import { Button } from 'aries-core';
import { StorybookAnchor, SubsectionText, FigmaAnchor } from '../../components';
import {
  ButtonRow,
  ContentSection,
  PageLayout,
  Subsection,
} from '../../layouts';
import { AccordionExample, MenuExample, TabsExample } from '../../examples';

const topic = 'Components';
const title = 'Controls';

const Controls = () => (
  <PageLayout title={title}>
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
        <StorybookAnchor
          href="https://storybook.hpe.design/?path=/story/*"
          label="Storybook"
        />
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
        <ButtonRow>
          <StorybookAnchor href="#" />
          <FigmaAnchor href="#" />
        </ButtonRow>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Anchor">
        <SubsectionText>
          The anchor component provides a text link.
        </SubsectionText>
        <StorybookAnchor href="#" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Button">
        <SubsectionText>
          Buttons are used to indicate actions that can be perfomed. Ideally,
          buttons are not used as navigational elements.
        </SubsectionText>
        <Box align="start">
          <Button label="Hello Button" primary />
        </Box>
        <StorybookAnchor href="#" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Menu">
        <SubsectionText>
          Menu is used to filter or sort content on a page. It is similar to the
          select component. However, use the select component when the user must
          specify from a list of options and submit. See the Select Component.
        </SubsectionText>
        <Box align="start">
          <MenuExample />
        </Box>
        <StorybookAnchor href="#" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Tabs">
        <SubsectionText>
          Tabs allow a user to access content while maintaining the existing
          context. It consists of a container, or box, with tab controls to
          expose the contents of the container.
        </SubsectionText>
        <TabsExample />
        <StorybookAnchor href="#" />
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Controls;
