import React from 'react';

import { Button } from 'grommet';
import { Meta, SubsectionText } from '../../components';
import {
  ButtonRow,
  Layout,
  Subsection,
  ContentSection,
  Example,
} from '../../layouts';
import { getPageDetails } from '../../utils';

import {
  IconSimpleExample,
  IconColorExample,
  IconSizeExample,
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
            include different action items from the user, an icon can represent
            different types of functionality.
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
          primary
          target="_blank"
          rel="noreferrer noopener"
        />
      </ContentSection>
      <ContentSection>
        <Subsection name="Accessibility" level={3}>
          <SubsectionText>
            For screen reader accessibility there is an aria-label provided for
            each icon.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Default Icon" level={3}>
          <Example
            docs="https://icons.grommet.io/?theme=hpe"
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconSimpleExample.js"
            figma="https://www.figma.com/file/G99KGffGLFKICy8xRs51lW/HPE-Icons?node-id=261%3A0"
          >
            <IconSimpleExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Icon Sizes" level={3}>
          <SubsectionText>
            The icon should be centered aligned with any text that is being used
            next to it. The correct size icon should be paired with similar size
            text.
          </SubsectionText>
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconSizeExample.js">
            <IconSizeExample />
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Icon Color" level={3}>
          <SubsectionText>
            The icon default color is 'strong text' for the corresponding
            light/dark mode For icons like Hpe logo the brand color will need to
            be assigned to the icon.
          </SubsectionText>
          <Example code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/foundation/icons/IconColorExample.js">
            <IconColorExample />
          </Example>
        </Subsection>
      </ContentSection>
    </Layout>
  );
};

export default Icons;
