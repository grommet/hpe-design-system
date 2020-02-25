import React from 'react';
import { CheckBox } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import { DashboardExample } from '../../examples';
import {
  ContentSection,
  Example,
  ExampleComponents,
  Layout,
  Subsection,
} from '../../layouts';
import { getPageDetails, nameToPath } from '../../utils';

const title = 'Dashboards';
const topic = 'Templates';
const page = getPageDetails(title);

const Dashboards = () => {
  const [checked, setChecked] = React.useState(false);

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
            Template dashboard patterns for presenting operational and
            analytical dashboards. Dashboards provide users peace-of-mind
            knowing critical measures, applications, and services are healthy
            &mdash; plus, easy access to areas needing attention for the moments
            when they are not.
          </SubsectionText>
          <SubsectionText size="medium">
            Well designed dashboards begin by defining the specific purpose and
            user needs it is serving. Operational dashboards focus on delivering
            information such as data deviations, current resources, and resource
            statuses so that users can proactively execute time-sensitive tasks.
            Analytical dashboards present comparison, relationship, and
            distribution data supporting analysis and decision making.
          </SubsectionText>
          <SubsectionText size="medium">
            Regardless of need, each of these templates deliver at-a-glance
            critical information and quick navigation to underlying detail.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Operational Dashboard">
          <CheckBox
            label="View mobile layout"
            onChange={() => setChecked(!checked)}
            value={checked}
            toggle
          />
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js">
            <DashboardExample mobile={checked} />
          </Example>
        </Subsection>
        <ExampleComponents
          components={[
            {
              name: 'Box',
              href: nameToPath('Box'),
            },
            {
              name: 'Button',
              href: nameToPath('Button'),
            },
            {
              name: 'Header',
              href: nameToPath('Header'),
            },
            {
              name: 'Grid',
              href: 'https://v2.grommet.io/grid?theme=hpe#props',
              target: '_blank',
            },
          ]}
        />
      </ContentSection>
    </Layout>
  );
};
export default Dashboards;
