import React from 'react';
import { Box, Button } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import { ServiceListScreenExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, nameToPath } from '../../utils';

const title = 'List Screen';
const topic = 'Templates';
const page = getPageDetails(title);

const ListScreen = () => (
  <Layout title={title}>
    <Meta
      title={title}
      description={page.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates/service-list-screen"
    />
    <ContentSection>
      <Subsection name={title} level={1} topic={topic}>
        <SubsectionText>
          Post-ironic man bun forage drinking vinegar, green juice truffaut YOLO
          art party scenester cronut chillwave crucifix. Microdosing fashion axe
          craft beer humblebrag selfies. Dreamcatcher salvia fam four loko
          readymade hella vice hammock. Blue bottle edison bulb subway tile VHS
          vegan cornhole.
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
        >
          <ServiceListScreenExample />
        </Example>
        <SubsectionText>
          Kickstarter austin heirloom whatever meggings artisan, hoodie vinyl
          listicle. Drinking vinegar lumbersexual hell of umami palo santo YOLO.
          Meh neutra deep v edison bulb portland jianbing. Aesthetic taxidermy
          lyft, YOLO glossier enamel pin fam 3 wolf moon. Chartreuse subway tile
          craft beer swag brooklyn PBR&B 8-bit live-edge edison bulb artisan.
        </SubsectionText>
      </Subsection>
      <Subsection name="Mobile">
        <Example
          code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/components/controls/ButtonExample.js"
          figma="https://www.figma.com/file/Y0MvUtkdobqCk0X56fZB6j/hpe-design-system-library-button"
          designer="https://designer.grommet.io/button?id=HPE-design-system-eric-soderberg-hpe-com"
        >
          <ServiceListScreenExample mobile />
        </Example>
        <SubsectionText>
          Kickstarter austin heirloom whatever meggings artisan, hoodie vinyl
          listicle. Drinking vinegar lumbersexual hell of umami palo santo YOLO.
          Meh neutra deep v edison bulb portland jianbing. Aesthetic taxidermy
          lyft, YOLO glossier enamel pin fam 3 wolf moon. Chartreuse subway tile
          craft beer swag brooklyn PBR&B 8-bit live-edge edison bulb artisan.
        </SubsectionText>
      </Subsection>
      <Subsection name="What components make this screen?" level={3}>
        <SubsectionText>
          To find more details about the usage of each of these components,
          check out their documentation.
        </SubsectionText>
        <Box direction="row-responsive" gap="medium">
          <Button label="Header" href={nameToPath('Header')} />
          <Button
            label="List"
            href="https://v2.grommet.io/list"
            target="_blank"
          />
          <Button label="Box" href={nameToPath('Box')} />
          <Button label="Button" href={nameToPath('Button')} />
        </Box>
      </Subsection>
    </ContentSection>
  </Layout>
);

export default ListScreen;
