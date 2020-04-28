import React from 'react';
import { Anchor, List } from 'grommet';
import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent } from '../../utils';

const title = 'Designer Guidance';
const topic = 'Extend';
const pageDetails = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const DesignerGuidance = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/extend/designer-guidance"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{pageDetails.description}</SubsectionText>
        </Subsection>
        <Subsection name="Getting started">
          <SubsectionText>
            We're excited you're using the HPE Design System! Below are a set of
            resources that will help you get started using the HPE Design System
            components in your designs. If you don't find what you're looking
            for, please reach out in the #hpe-design-system channel on{' '}
            <Anchor
              label="Slack"
              href="https://grommet.slack.com"
              target="_blank"
              rel="noopener noreferrer"
            />
            .
          </SubsectionText>
        </Subsection>
        <Subsection name="Setting up your Figma account" level={3}>
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
            <Anchor
              label="Create a Figma account"
              href="https://help.figma.com/hc/en-us/articles/360039811114-Create-a-Figma-account"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            with your HPE email address. Using your HPE email provides immediate
            access to all HPE Design System files.
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
        <Subsection name="Joining the HPE Design System Figma team" level={3}>
          <SubsectionText>
            Once you have made a Figma account with your HPE email, you can
            request to join the HPE Design System team. You can do so by
            following these steps:
          </SubsectionText>
          <List
            as="ol"
            data={[
              `Log into Figma and look for an HPE icon in your left control bar.
              Navigate to this section, you will see all the HPE Figma teams. 
              Look for "HPE Design System" and click "Request to join".`,
              'Click on HPE. Here, you will see all HPE Figma teams.',
              'Look for "HPE Design System" and click "Request to join".',
            ]}
            border={{ style: 'hidden' }}
            pad={{ vertical: 'xsmall' }}
          >
            {(item, index) => (
              <SubsectionText key={item} size="medium">
                {index + 1}) {item}
              </SubsectionText>
            )}
          </List>
          <SubsectionText>
            Once you have been added to this team, you will have access to all
            of the HPE Design System files.
          </SubsectionText>
        </Subsection>
        <Subsection name="HPE Design System Library" level={3}>
          <SubsectionText>
            The{' '}
            <Anchor
              label="HPE Design System sticker sheet"
              href="https://www.figma.com/file/ItdN5pNBubFpV8GP5RowY3/HPE-Component-Sticker-Sheet?node-id=58%3A40"
              target="_blank"
              rel="noopener noreferrer"
            />{' '}
            provides a foundation for designing HPE applications. The sticker
            sheet provides an overview of the components contained within the
            Design System library.
          </SubsectionText>
          <SubsectionText>
            To access individual files for each component, navigate to the HPE
            Design System Figma team. If you are having trouble accessing the
            files, you may need to{' '}
            <Anchor
              label="join the HPE Design System Figma team"
              href="#joining-the-hpe-design-system-figma-team"
            />{' '}
            first.
          </SubsectionText>
          <SubsectionText>
            Each component has its own library file that demonstrates the
            various states of the component such as enabled, disabled, hover,
            active, and focus. The examples within these files can be leveraged
            within your design files and are built to be interactive and
            responsive.
          </SubsectionText>
        </Subsection>
        {relatedContent.length > 0 ? (
          <Subsection name="Related">
            <SubsectionText>
              Related content you may find useful when using {title}.
            </SubsectionText>
            <CardGrid cards={relatedContent} />
          </Subsection>
        ) : null}
      </ContentSection>
    </Layout>
  );
};

export default DesignerGuidance;
