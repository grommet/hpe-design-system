import React from 'react';
import { Anchor } from 'grommet';

import { ContentSection, Layout, NavPage, Subsection } from '../../layouts';
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
      {page.pages.length ? (
        <NavPage items={page.pages} topic={page.name.toLowerCase()} />
      ) : (
        <>
          <ContentSection>
            <Subsection name="Preferred">
              <SubsectionText>
                The HPE Design System is primarily focused on user interfaces
                developed with ReactJS and Grommet. There are more resources,
                examples, and community help for this environment.
              </SubsectionText>
              <SubsectionText size="medium">
                If you are new to ReactJS, the{' '}
                <Anchor
                  label="React Tutorial"
                  href="https://reactjs.org/tutorial/tutorial.html"
                />{' '}
                is a good place to start.
              </SubsectionText>
              <SubsectionText size="medium">
                If you are already familiar with ReactJS but are unfamiliar with
                Grommet, check out the{' '}
                <Anchor
                  label="Getting Started with Grommet"
                  href="https://v2.grommet.io/starter"
                />{' '}
                guide.
              </SubsectionText>
              <SubsectionText size="medium">
                If you are already familiar with ReactJS and Grommet, make sure
                you have the latest <code>grommet-theme-hpe</code> theme
                via <code>npm</code> or <code>yarn</code>.
              </SubsectionText>
              <SubsectionText size="medium">
                Questions and feedback should be routed through the
                #hpe-design-system channel on{' '}
                <Anchor label="Slack" href="https://grommet.slack.com" />.
              </SubsectionText>
            </Subsection>
          </ContentSection>
          <ContentSection>
            <Subsection name="Alternatives">
              <SubsectionText>
                For non-ReactJS environments, such as those with a large code
                base that are not ready to absorb changing the UI framework, we
                recommend using the examples and patterns shown in the HPE
                Design System as a reference to update their style to get close.
                This could be done by inspecting the styling in the browser
                developer tools.
              </SubsectionText>
              <SubsectionText>
                If you have questions or would like some guidance in migrating
                to ReactJS, please reach out to the{' '}
                <Anchor
                  label="HPE Design System team"
                  href="mailto:designsystem-req@hpe.com"
                />
                .
              </SubsectionText>
            </Subsection>
          </ContentSection>
        </>
      )}
    </Layout>
  );
};

export default Develop;
