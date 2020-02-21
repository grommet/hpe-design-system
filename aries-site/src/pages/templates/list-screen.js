import React from 'react';
import { Meta, SubsectionText } from '../../components';
import { ListScreenExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, nameToPath } from '../../utils';

const title = 'List Screen';
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
        canonicalUrl="https://design-system.hpe.design/templates/service-list-screen"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>
            Post-ironic man bun forage drinking vinegar, green juice truffaut
            YOLO art party scenester cronut chillwave crucifix. Microdosing
            fashion axe craft beer humblebrag selfies. Dreamcatcher salvia fam
            four loko readymade hella vice hammock. Blue bottle edison bulb
            subway tile VHS vegan cornhole.
          </SubsectionText>
          <SubsectionText size="small">
            Lorem ipsum dolor amet beard flexitarian iPhone seitan pinterest
            unicorn tumeric. Activated charcoal cornhole thundercats, deep v
            seitan pug prism letterpress vice health goth helvetica shoreditch
            cold-pressed 3 wolf moon brooklyn. Iceland ennui flexitarian freegan
            mlkshk pok pok godard farm-to-table tilde normcore cray.
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
          <SubsectionText>
            Kickstarter austin heirloom whatever meggings artisan, hoodie vinyl
            listicle. Drinking vinegar lumbersexual hell of umami palo santo
            YOLO. Meh neutra deep v edison bulb portland jianbing. Aesthetic
            taxidermy lyft, YOLO glossier enamel pin fam 3 wolf moon. Chartreuse
            subway tile craft beer swag brooklyn PBR&B 8-bit live-edge edison
            bulb artisan.
          </SubsectionText>
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
          <SubsectionText>
            Kickstarter austin heirloom whatever meggings artisan, hoodie vinyl
            listicle. Drinking vinegar lumbersexual hell of umami palo santo
            YOLO. Meh neutra deep v edison bulb portland jianbing. Aesthetic
            taxidermy lyft, YOLO glossier enamel pin fam 3 wolf moon. Chartreuse
            subway tile craft beer swag brooklyn PBR&B 8-bit live-edge edison
            bulb artisan.
          </SubsectionText>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};

export default ListScreen;
