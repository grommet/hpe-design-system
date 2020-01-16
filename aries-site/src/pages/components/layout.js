import React from 'react';
import { ExternalCTA, SubsectionText } from '../../components';
import { ContentSection, PageLayout, Subsection } from '../../layouts';
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
        <SubsectionText>
          Box is where it all starts. Flexible props allow the behavior of
          content to be defined to optimize the user experience.
        </SubsectionText>
        <BoxExample />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Footer">
        <SubsectionText>
          Footer is a Box with a set of preset properties. Box properties allow
          you to custmize the footer.
        </SubsectionText>
        <FooterExample />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Grid">
        <SubsectionText>
          The Grid component is used to layout content. Responsive grid is
          important to consider in every use case.
        </SubsectionText>
        <GridExample />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Header">
        <SubsectionText>
          Header is a Box with a set of preset properties for introductory
          content. Box properties allow you to customize the header.
        </SubsectionText>
        <HeaderExample />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Layer">
        <SubsectionText>
          The Layer component is flexible and can be used in multiple use cases.
          Modal dialogs, notifications and help text are just a few
          possibilities.
        </SubsectionText>
        <LayerExample />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Main">
        <SubsectionText>
          The Main component is where you define the location and layout of the
          primary context of your content. Check out the Grid component
          description to see “Main” in use.
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
