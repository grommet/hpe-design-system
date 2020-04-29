import React from 'react';
import { Anchor } from 'grommet';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Developer Guidance';
const topic = 'Extend';
const pageDetails = getPageDetails(title);
const relatedContent = getRelatedContent(title);
const DeveloperGuidance = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/extend/developer-guidance"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{pageDetails.description}</SubsectionText>
        </Subsection>
        <Subsection name="Getting started">
          <SubsectionText>
            We're excited you're using the HPE Design System! Below are a set of
            resources that will help you get your application set-up with
            Grommet and the HPE theme. If you don't find what you're looking
            for, please reach out in the #hpe-design-system channel on{' '}
            <Anchor
              label="Slack"
              href="https://grommet.slack.com"
              target="_blank"
              rel="noopener noreferrer"
            />
            .
          </SubsectionText>
        </Subsection>
        <Subsection name="Preferred environment" level={3}>
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
        <Subsection name="ReactJS and Grommet starter resources" level={3}>
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
          <SubsectionText>
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
        <Subsection name="Applying the HPE theme" level={3}>
          <SubsectionText>
            Once your project is set up with ReactJS and Grommet, make sure you
            have the latest{' '}
            <Anchor
              href="https://github.com/grommet/grommet-theme-hpe"
              target="_blank"
              rel="noopener noreferrer"
            >
              grommet-theme-hpe
            </Anchor>{' '}
            theme via <code>npm</code> or <code>yarn</code>. This will help
            ensure that your application is aligned with the HPE Design System
            colors, fonts, and default component styles.
          </SubsectionText>
        </Subsection>
        <Subsection name="What if our team doesn't use ReactJS?" level={3}>
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
};

export default DeveloperGuidance;
