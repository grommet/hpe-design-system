import React from 'react';

import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Global Navigation';
const topic = 'Templates';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Navigation = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates/navigation"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>{page.description}</SubsectionText>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
          // template
          height={{ min: 'small' }}
        >
          {/* <DashboardExample /> */}
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Guidance">
        <SubsectionText>
          Use Hub &amp; Spoke when multiple discreet applications or tasks
          options are presented, or when screen real estate is limited. Each
          "spoke" can be used independently, without reliance on other spokes.
          This allows the user to focus on the task at hand.
        </SubsectionText>
      </Subsection>
      <Subsection name="When to Use Hub &amp; Spoke" level={3} gap="small">
        <SubsectionText>Hub &amp; Spoke should be used when:</SubsectionText>
        <BulletedList
          items={[
            'Users desire focus on a single application or task at a time.',
            `Presenting an overview of the applications, tasks, or content 
            available, with the ability to drill in for detail.`,
            "A user's device is limited in screen real estate.",
          ]}
        />
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Variants">
        <SubsectionText>
          Use Hub &amp; Spoke when multiple discreet applications or tasks
          options are presented, or when screen real estate is limited. Each
          "spoke" can be used independently, without reliance on other spokes.
          This allows the user to focus on the task at hand.
        </SubsectionText>
      </Subsection>
      <Subsection name="Application Focus" level={3}>
        <SubsectionText>
          Evaluating performance is independent of user roles and permissions.
        </SubsectionText>
      </Subsection>
      <Subsection name="Overview of Options" level={3}>
        <SubsectionText>
          Sushi restaurant's menu. Appetizers, Rolls, Sushi &amp; Sashimi,
          Entrees, Drinks.
        </SubsectionText>
      </Subsection>
      <Subsection name="Limited Real Estate" level={3}>
        <SubsectionText>
          Limited real estate fdjka dasfj;ladf da;jkadsf adsl;kj da
        </SubsectionText>
      </Subsection>
      <Subsection name="Tiles" level={3}>
        <SubsectionText>
          Limited real estate fdjka dasfj;ladf da;jkadsf adsl;kj da
        </SubsectionText>
      </Subsection>
      <Subsection name="List" level={3}>
        <SubsectionText>
          Limited real estate fdjka dasfj;ladf da;jkadsf adsl;kj da
        </SubsectionText>
      </Subsection>
    </ContentSection>
    {relatedContent.length > 0 ? (
      <Subsection name="Related">
        <SubsectionText>
          Related content you may find useful when using {title}.
        </SubsectionText>
        <CardGrid cards={relatedContent} />
      </Subsection>
    ) : null}
  </Layout>
);

export default Navigation;
