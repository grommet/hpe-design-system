import React from 'react';

import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { HubSpokeCardsExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Hub and Spoke Navigation';
const topic = 'Templates';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const HubSpokeNavigation = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates/hub-and-spoke-navigation"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/hub-spoke-navigation/HubSpokeCardsExample.js"
          template
          width="100%"
        >
          <HubSpokeCardsExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Hub &amp; Spoke Navigation works well for applications primarily
          concerned with task execution, as opposed to presenting large volumes
          of content.
        </SubsectionText>
        <SubsectionText>
          The "hub" cleanly presents multiple discreet application sections or
          "spokes." Each "spoke" keeps the user focused on the task at hand and
          used independently from other spokes.
        </SubsectionText>
        <SubsectionText>
          A hub should consist of no more than five to seven spokes &mdash; if
          more paths are needed, subsequent hubs are always an option. Each step
          down provides navigational context back up the information hierarchy.
          Each page has a primary focus with minimal contextual navigation
          chrome.
        </SubsectionText>
      </Subsection>
      <Subsection name="When to Use Hub &amp; Spoke" level={3} gap="small">
        <SubsectionText>Hub &amp; Spoke should be used when:</SubsectionText>
        <BulletedList
          items={[
            'Users desire focus on a single application or task at a time.',
            `Presenting an overview of the applications, tasks, or content 
            available, with the ability to drill in for detail.`,
            "In cases where a user's device is limited in screen real estate.",
          ]}
        />
      </Subsection>
    </ContentSection>
    <ContentSection>
      {relatedContent.length > 0 ? (
        <Subsection name="Related">
          <SubsectionText>
            Explore more navigation patterns and the components used to compose
            the {title} demonstrations.
          </SubsectionText>
          <CardGrid cards={relatedContent} />
        </Subsection>
      ) : null}
    </ContentSection>
  </Layout>
);

export default HubSpokeNavigation;
