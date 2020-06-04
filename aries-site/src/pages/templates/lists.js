import React from 'react';
import { Meta, Status, SubsectionText } from '../../components';
import { ListScreenExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Lists';
const topic = 'Templates';
const page = getPageDetails(title);

const Lists = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/lists"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>
            HPE Design System list view templates are go-to patterns for
            displaying homogeneous data such as services, devices, users, and
            more.
          </SubsectionText>
          <SubsectionText size="medium">
            List views are optimized for scanability and reading comprehension.
            Each list item provides users focussed information and identity
            labels to aid selection, decision making, and action.
          </SubsectionText>
          {page.status && <Status status={page.status} />}
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Manage Users Screen">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/list-views/ListScreenExample.js"
            template
            width="100%"
          >
            <ListScreenExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};

export default Lists;
