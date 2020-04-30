import React from 'react';

import { Anchor as GrommetAnchor, Button } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import {
  ButtonRow,
  Layout,
  Subsection,
  ContentSection,
  Example,
} from '../../layouts';
import { getPageDetails, nameToPath } from '../../utils';

import {
  IconComponentExample,
  IconPlainExample,
  IconSizeExample,
  IconTextExample,
} from '../../examples';

const title = 'Icons';
const topic = 'Foundation';
const pageDetails = getPageDetails(title);

const Icons = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/foundation/icons"
      />
      <ContentSection>
        <Subsection level={1} name={title} topic={topic}>
          <SubsectionText>{pageDetails.description}</SubsectionText>
          <SubsectionText size="medium">
            Icons can be used to represent information to users. These can
            include different actions a user can perform. Icons can represent
            different types of functionality. It is important that the context
            of an icon is clear. In some cases, it may be beneficial to pair
            icons with text to ensure the purpose of the icon is clear.
          </SubsectionText>
        </Subsection>
        <ButtonRow>
          <Button
            label="See in Figma"
            href="https://www.figma.com/file/G99KGffGLFKICy8xRs51lW/HPE-Icons"
            primary
            target="_blank"
            rel="noreferrer noopener"
          />
        </ButtonRow>
      </ContentSection>
      <ContentSection>
        <Subsection name="Developing with Grommet Icons" level={3}>
          <SubsectionText>
            For instructions on how to install and use grommet icons within your
            application, check out the Grommet Icons site.
          </SubsectionText>
        </Subsection>
        <Button
          label="HPE Theme Grommet Icons"
          href="https://icons.grommet.io/?theme=hpe"
          target="_blank"
          rel="noreferrer noopener"
        />
      </ContentSection>
      <ContentSection>
        <Subsection name="Accessibility" level={3}>
          <SubsectionText>
            For screen reader accessibility there is an aria-label provided for
            each icon. The color of the icons should also pass any color
            contrast ratio.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Icon within components" level={3}>
          <SubsectionText>
            Icons can be used in a variety of different ways. They are used
            within other components such as{' '}
            <GrommetAnchor label="Search" href={nameToPath('Search')} /> and{' '}
            <GrommetAnchor label="Menu" href={nameToPath('Menu')} /> They can
          </SubsectionText>
          <Example
            docs="https://icons.grommet.io/?theme=hpe"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconSimpleExample.js"
            figma="https://www.figma.com/file/G99KGffGLFKICy8xRs51lW/HPE-Icons?node-id=261%3A0"
          >
            <IconComponentExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Icon Sizes" level={3}>
          <SubsectionText>
            The icon default size is medium. This should be adjusted depending
            on where in your application the icon is being used.
          </SubsectionText>
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconSizeExample.js">
            <IconSizeExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Button Icons" level={3}>
          <SubsectionText>
            The icon should be centered aligned with any text that is being used
            next to it. The correct size icon should be paired with similar size
            text. When using the Icon as a button both the label and icon will
            be wrapped within that Button.
          </SubsectionText>
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconSizeExample.js">
            <IconTextExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Icon Plain Color" level={3}>
          <SubsectionText>
            The default icon color is 'text-strong' for the corresponding
            light/dark mode. For some icons there are spcific colors in how they
            are represented, such as Aruba, Amazon, HPE that need to respect the
            built in colors for those SVGs so the color prop can be given
            'plain'
          </SubsectionText>
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconColorExample.js">
            <IconPlainExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};

export default Icons;
