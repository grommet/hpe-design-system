import React from 'react';
import { Box, Button, CheckBox } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import { DashboardExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
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
        <Subsection name="What components make this screen?" level={3}>
          <SubsectionText>
            To find more details about the usage of each of these components,
            check out their documentation.
          </SubsectionText>
          <Box direction="row-responsive" gap="medium" wrap>
            <Button
              label="Box"
              href={nameToPath('Box')}
              margin={{ bottom: 'small' }}
            />
            <Button
              label="Button"
              href={nameToPath('Button')}
              margin={{ bottom: 'small' }}
            />
            <Button
              label="Header"
              href={nameToPath('Header')}
              margin={{ bottom: 'small' }}
            />
            <Button label="Tiles" margin={{ bottom: 'small' }} />
          </Box>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};
export default Dashboards;
