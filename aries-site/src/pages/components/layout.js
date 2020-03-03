import React from 'react';
import { Anchor } from 'grommet';

import { Meta, SubsectionText } from '../../components';
import {
  ContentSection,
  Layout as PageLayout,
  Subsection,
  Example,
} from '../../layouts';
import {
  BoxExample,
  FooterExample,
  GridExample,
  HeaderExample,
  LayerExample,
  StackExample,
} from '../../examples';
import { getPageDetails } from '../../utils';

const title = 'Layout';
const page = getPageDetails(title);
const topic = 'Components';

const Layout = () => (
  // Needs to use alias of PageLayout since the export is called "Layout"
  <PageLayout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components/layout"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          The HPE Design System provides the framework to build a composition
          that brings clarity and simplicity for users to navigate your digital
          landscape.
        </SubsectionText>
        <SubsectionText size="medium">
          This set of components establishes the core elements as the foundation
          for your design. They are the building blocks of the experience that
          give context to content.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Box">
      <SubsectionText>
          Box is where it all starts. Flexible props allow the behavior of
          content to be defined to optimize the user experience.
        </SubsectionText>
        <Example
          docs='https://v2.grommet.io/box?theme=hpe#props'
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/BoxExample.js"
          >
          <BoxExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Footer">
      <SubsectionText>
          Footer is a Box with a set of preset properties. Box properties allow
          you to cusotmize the footer.
      </SubsectionText>
      <Example
        docs='https://v2.grommet.io/footer?theme=hpe'
        code='https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/FooterExample.js'>
        <FooterExample />
      </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Grid">
      <SubsectionText>
          The Grid component is used to layout content. Responsive grid is
          important to consider in every use case.
        </SubsectionText>
        <Example
          docs='https://v2.grommet.io/grid?theme=hpe#props'
          code='https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/GridExample.js'>
          <GridExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Header">
        <SubsectionText>
          Header is a Box with a set of preset properties for introductory
          content. Box properties allow you to customize the header.
        </SubsectionText>
        <Example
          docs='https://v2.grommet.io/header?theme=hpe'
          code='https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/HeaderExample.js'
          figma='https://www.figma.com/file/FwJr2zaT8Rr7RyIKLm7Lvg/hpe-design-system-library-headers?node-id=0%3A1'
        >
          <HeaderExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Layer">
      <SubsectionText>
          The Layer component is flexible and can be used in multiple use cases.
          Modal dialogs, notifications and help text are just a few
          possibilities.
      </SubsectionText>
      <Example
        docs='https://v2.grommet.io/layer?theme=hpe#props'
        code='https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/layouts/LayerExample.js'
      >
        <LayerExample />
      </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Main">
        <SubsectionText>
          The Main component is where you define the location and layout of the
          primary context of your content. Check out the{' '}
          <Anchor color="green!" href="#grid">
            Grid
          </Anchor>{' '}
          component description to see “Main” in use.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Stack">
      <SubsectionText>
          A Stack component is a container that stacks content on top of each
          other.
        </SubsectionText>
        <StackExample />
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Layout;
