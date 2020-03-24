import React from 'react';
import { Anchor } from 'grommet';
import {
  ContentSection,
  FeedbackSection,
  Layout,
  Subsection,
} from '../../layouts';
import { DescriptiveHeader, Meta, SubsectionText } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Design';
const page = getPageDetails(title);

const Design = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={page.color}
      subText={page.description}
      icon={page.icon}
      title={title}
    />
  );

  return (
    <Layout descriptiveHeader={descriptiveHeader} title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/design"
      />
      <ContentSection>
        <Subsection name="Preferred environment" pad={{ top: 'medium' }}>
          <SubsectionText>
            The HPE Design System library is maintained on Figma. Because Figma
            is web-based, files can be easily shared across individuals and
            teams, and teams can be confident they're always viewing the most
            up-to-date versions of designs.
          </SubsectionText>
        </Subsection>
        <Subsection name="Getting started" pad={{ top: 'medium' }}>
          <SubsectionText>
            If you are new to Figma, the{' '}
            <Anchor
              label="Figma Getting Started"
              href="https://help.figma.com/hc/en-us/categories/360002051613-Getting-Started"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            page is a good place to start.
          </SubsectionText>
          <SubsectionText>
            Once you have made a Figma account with your HPE email, you can
            request to join the HPE Design System team.
          </SubsectionText>
          <SubsectionText>
            If you would prefer to access the HPE Design System library in a
            desktop app, you can download the{' '}
            <Anchor
              label="Figma Desktop App"
              href="https://help.figma.com/hc/en-us/articles/360039823654-Download-the-Figma-Desktop-App#Download_the_Desktop_App"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            for MacOS or Windows.
          </SubsectionText>
        </Subsection>
        <Subsection name="HPE Design System Sticker Sheet">
          <SubsectionText>
            The{' '}
            <Anchor
              label="HPE Design System sticker sheet"
              href="https://www.figma.com/file/K0PppsSh6aQSszqlwKAekg/hpe-design-system-stickers"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            provides a foundation for designing HPE applications. The sticker
            sheet provides examples for default styles of components as well as
            examples of styling aspects such as hover, focus, and active states.
          </SubsectionText>
        </Subsection>
      </ContentSection>
      <FeedbackSection />
    </Layout>
  );
};

export default Design;
