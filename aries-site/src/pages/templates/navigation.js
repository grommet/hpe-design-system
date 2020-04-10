import React from 'react';
import { Text } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import { DashboardExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails } from '../../utils';

const title = 'Navigation';
const topic = 'Templates';
const page = getPageDetails(title);

const Navigation = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates/navigation"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Template navigation patterns for presenting variety of navigation
          examples.
        </SubsectionText>
        <SubsectionText>
          Navigation patterns scheme includes several navigational pieces such
          as global, local, supplemental, and contextual navigation; all of
          these are vital aspects of the broad topic of web navigation.
        </SubsectionText>
        <SubsectionText>
          Hierarchical navigation systems are vital since it is the primary
          navigation system. It allows for the user to navigate within the site
          using levels alone, which is often seen as restricting and requires
          additional navigation systems to better structure the website.
        </SubsectionText>
        <SubsectionText>
          The global navigation of a website, as another segment of web
          navigation, serves as the outline and template in order to achieve an
          easy maneuver for the users accessing the site, while local navigation
          is often used to help the users within a specific section of the site.
        </SubsectionText>
        <SubsectionText>
          All these navigational pieces fall under the categories of various
          types of web navigation, allowing for further development and for more
          efficient experiences upon visiting a webpage.
        </SubsectionText>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Hub & Spoke Navigation">
        <Text>
          The examples would demonstrate tiles and list navigation examples
          (WIP)
        </Text>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
          template
        >
          <DashboardExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Navbar Navigation">
        <Text>The example would demonstrate a navbar navigation (WIP)</Text>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
          template
        >
          <DashboardExample />
        </Example>
      </Subsection>
    </ContentSection>
    <ContentSection>
      <Subsection name="Navigation Cocktail">
        <Text>
          The example would demonstrate a combination of multiple navigation
          patterns (WIP)
        </Text>
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
          template
        >
          <DashboardExample />
        </Example>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default Navigation;
