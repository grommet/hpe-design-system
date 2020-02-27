import React from 'react';
import { Meta, SubsectionText } from '../../components';
import {
  ChangePasswordExample,
  CustomizeExample,
  FilterExample,
  PayExample,
  SettingsExample,
  ShippingExample,
  SignInExample,
  SignUpExample,
  SortExample,
} from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Forms';
const topic = 'Templates';
const page = getPageDetails(title);

const Forms = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/forms"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>
            Template patterns for common form use cases, from application
            configurations to payment acceptance for the latest as-a-service
            product offerings.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sign Up">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <SignUpExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sign In">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <SignInExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Filter">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <FilterExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Sort">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <SortExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Change Password">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <ChangePasswordExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Settings">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <SettingsExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Customize">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <CustomizeExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Shipping">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <ShippingExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Pay">
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <PayExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default Forms;
