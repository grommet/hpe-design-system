import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ListScreenExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, nameToPath } from '../../utils';

const title = 'List Views';
const topic = 'Templates';
const page = getPageDetails(title);

const components = [
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
    name: 'Heading',
    href: nameToPath('Heading'),
  },
  {
    name: 'Tiles',
  },
];

const ListScreen = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/list-views"
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
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Desktop">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/ButtonExample.js"
            figma="https://www.figma.com/file/Y0MvUtkdobqCk0X56fZB6j/hpe-design-system-library-button"
            designer="https://designer.grommet.io/button?id=HPE-design-system-eric-soderberg-hpe-com"
            components={components}
          >
            <ListScreenExample />
          </Example>
        </Subsection>
        <Subsection name="Mobile">
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/ButtonExample.js"
            figma="https://www.figma.com/file/Y0MvUtkdobqCk0X56fZB6j/hpe-design-system-library-button"
            designer="https://designer.grommet.io/button?id=HPE-design-system-eric-soderberg-hpe-com"
            components={components}
          >
            <ListScreenExample mobile />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};

export default ListScreen;
