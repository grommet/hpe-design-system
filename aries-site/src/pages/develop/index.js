import React from 'react';
import { Anchor } from 'grommet';
import {
  ContentSection,
  FeedbackSection,
  Layout,
  Subsection,
} from '../../layouts';
import { DescriptiveHeader, Meta, SubsectionText } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Develop';
const page = getPageDetails(title);

const Develop = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={page.color}
      subText={page.description}
      icon={page.icon}
      title={title}
    />
  );
  return (
    <Layout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/develop"
      />
      <ContentSection>
        <Subsection name="Preferred environment" pad={{ top: 'medium' }}>
          <SubsectionText>
            The HPE Design System is primarily focused on user interfaces
            developed with ReactJS and Grommet. We encourage teams to use
            ReactJS and Grommet if possible because there are more resources,
            examples, and community help for this environment.
          </SubsectionText>
          <SubsectionText>
            Questions and feedback should be routed through the
            #hpe-design-system channel on{' '}
            <Anchor
              label="Slack"
              href="https://grommet.slack.com"
              target="_blank"
              rel="noopener noreferrer"
            />
            .
          </SubsectionText>
        </Subsection>
        <Subsection name="Getting started">
          <SubsectionText>
            If you are new to ReactJS, the{' '}
            <Anchor
              label="React Tutorial"
              href="https://reactjs.org/tutorial/tutorial.html"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            is a good place to start.
          </SubsectionText>
          <SubsectionText size="medium">
            If you are already familiar with ReactJS but are unfamiliar with
            Grommet, check out the{' '}
            <Anchor
              label="Getting Started with Grommet"
              href="https://v2.grommet.io/starter"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            guide.
          </SubsectionText>
        </Subsection>
        <Subsection name="Applying the HPE theme">
          <SubsectionText>
            Once your project is set up with ReactJS and Grommet, make sure you
            have the latest{' '}
            <Anchor
              href="https://github.com/grommet/grommet-theme-hpe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>grommet-theme-hpe</code>
            </Anchor>{' '}
            theme via <code>npm</code> or <code>yarn</code>. This will help
            ensure that your application is aligned with the HPE Design System
            colors, fonts, and default component styles.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="What if our team doesn't use ReactJS?">
          <SubsectionText>
            For non-ReactJS environments, such as those with a large code base
            that are not ready to absorb changing the UI framework, we recommend
            using the examples and patterns shown in the HPE Design System as a
            reference. Styles should be matched as closely as possible. Using
            the browser develop tools to inspect the styling can help with this
            process.
          </SubsectionText>
          <SubsectionText>
            If you have questions or would like some guidance on migrating to
            ReactJS, please reach out to the{' '}
            <Anchor
              label="HPE Design System team"
              href="mailto:hpedesignsystem@hpe.com"
            />
            .
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <FeedbackSection />
    </Layout>
  );
};

export default Develop;
