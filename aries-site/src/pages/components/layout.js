import React from 'react';
import { Anchor } from 'grommet';
import { ExternalCTA, SubsectionText } from '../../components';
import {
  ButtonRow,
  ContentSection,
  Layout as PageLayout,
  Subsection,
} from '../../layouts';
import {
  BoxExample,
  FooterExample,
  GridExample,
  HeaderExample,
  LayerExample,
  StackExample,
} from '../../examples';

const topic = 'Components';
const title = 'Layout';

const Layout = () => (
  // Needs to use alias of PageLayout since the export is called "Layout"
  <PageLayout title={title}>
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
        <ExternalCTA href="#" type="storybook" />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Box">
        <BoxExample />
        <SubsectionText>
          Box is where it all starts. Flexible props allow the behavior of
          content to be defined to optimize the user experience.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Footer">
        <FooterExample />
        <SubsectionText>
          Footer is a Box with a set of preset properties. Box properties allow
          you to custmize the footer.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Grid">
        <GridExample />
        <SubsectionText>
          The Grid component is used to layout content. Responsive grid is
          important to consider in every use case.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Header">
        <HeaderExample />
        <SubsectionText>
          Header is a Box with a set of preset properties for introductory
          content. Box properties allow you to customize the header.
        </SubsectionText>
        <ButtonRow>
          <ExternalCTA href="#" type="storybook" />
          <ExternalCTA
            href="https://www.figma.com/file/FwJr2zaT8Rr7RyIKLm7Lvg/hpe-design-system-library-headers?node-id=0%3A1"
            type="figma"
          />
        </ButtonRow>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Layer">
        <LayerExample />
        <SubsectionText>
          The Layer component is flexible and can be used in multiple use cases.
          Modal dialogs, notifications and help text are just a few
          possibilities.
        </SubsectionText>
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
        <StackExample />
        <SubsectionText>
          A Stack component is a container that stacks content on top of each
          other.
        </SubsectionText>
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default Layout;
