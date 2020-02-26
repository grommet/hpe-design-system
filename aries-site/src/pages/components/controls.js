import React from 'react';
import { Anchor } from 'grommet';

import { Meta, SubsectionText } from '../../components';
import {
  ContentSection,
  Layout,
  Subsection,
  Example,
} from '../../layouts';
import {
  AccordionExample,
  ButtonExample,
  MenuExample,
  TabsExample,
} from '../../examples';
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
        <SubsectionText>
          The accordian affords content to be delivered progressively. The
          chevron is used to identify the expand or collapse action while the
          entire header can be clicked to expand or collapse content. When
          seeking to provide maximum content in limited, vertical space, an
          accordion is a good alternative.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/accordion#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/AccordionExample.js"
        >
          <AccordionExample />
        </Example>
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
        <SubsectionText>
          Buttons are used to indicate actions that can be performed.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/button?theme=hpe#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/ButtonExample.js"
          figma="https://www.figma.com/file/Y0MvUtkdobqCk0X56fZB6j/hpe-design-system-library-button"
          designer="https://designer.grommet.io/button?id=HPE-design-system-eric-soderberg-hpe-com"
        >
          <ButtonExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Menu">
        <SubsectionText>
          Menu is used to filter or sort content on a page. It is
          similar to the{' '}
          <Anchor color="green!" href="input#select">
            Select component
          </Anchor>{' '}
          However, use the select component when the user must specify from a
          list of options and submit.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/menu#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/MenuExample.js"
        >
          <MenuExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Tabs">
        <SubsectionText>
          Tabs allow a user to access content while maintaining the existing
          context. It consists of a container, or box, with tab controls to
          expose the contents of the container.
        </SubsectionText>
        <Example
          docs="https://v2.grommet.io/tabs#props"
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/TabsExample.js"
        >
          <TabsExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Controls;
