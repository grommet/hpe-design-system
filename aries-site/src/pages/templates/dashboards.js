import React from 'react';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { DashboardExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Dashboards';
const topic = 'Templates';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Dashboards = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/dashboards"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>
            At-a-glance preview for operation critical information with easy
            access to areas requiring attention.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
            template
            details={[
              `Dashboards provide users peace-of-mind knowing critical 
            measures, applications, and services are healthy; plus, easy access 
            to areas needing attention for the moments when they are not.`,
              `Well designed dashboards begin by defining the specific purpose 
            and user needs it is serving. Operational dashboards focus on 
            delivering information such as data deviations, current 
            resources, and resource statuses so that users can proactively 
            execute time-sensitive tasks. Analytical dashboards present 
            comparison, relationship, and distribution data supporting 
            analysis and decision making.`,
              `Regardless of need, each of these templates deliver at-a-glance
            critical information and quick navigation to underlying detail.`,
            ]}
          >
            <DashboardExample />
          </Example>
        </Subsection>
        {relatedContent.length > 0 ? (
          <Subsection name="Related">
            <SubsectionText>Content related to {title}.</SubsectionText>
            <CardGrid cards={relatedContent} />
          </Subsection>
        ) : null}
      </ContentSection>
    </Layout>
  );
};
export default Dashboards;
