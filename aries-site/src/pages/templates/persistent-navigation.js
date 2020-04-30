import React from 'react';
import { Anchor } from 'grommet';

import { BulletedList, CardGrid, Meta, SubsectionText } from '../../components';
import { HeaderNavExample, MinimalSidebarExample } from '../../examples';
import { ContentSection, Example, Layout, Subsection } from '../../layouts';
import { getPageDetails, getRelatedContent, nameToPath } from '../../utils';

const title = 'Persistent Navigation';
const topic = 'Templates';
const page = getPageDetails(title);
const relatedContent = getRelatedContent(title);

const Navigation = () => {
  return (
    <Layout title={title}>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/templates/persistent-navigation"
      />
      <ContentSection>
        <Subsection name={title} level={1} topic={topic}>
          <SubsectionText>{page.description}</SubsectionText>
          <Example
          // code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
          // template
          >
            {}
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Guidance">
          <SubsectionText>
            Persistent navigation aids the user in orientation and provides
            comfort in its presence, especially in information rich
            applications. This pattern can be applied in both local and global
            contexts.
          </SubsectionText>
        </Subsection>
        <Subsection
          name="When to Use Persistent Navigation"
          level={3}
          gap="small"
        >
          <SubsectionText>
            Persistent navigation should be used when:
          </SubsectionText>
          <BulletedList
            items={[
              `A user needs to easy access to move from one area of an 
            application to another with minimal clicks.`,
              `Elements such as branding or search require a ubiquitous 
            presence.`,
            ]}
          />
        </Subsection>
      </ContentSection>
      <ContentSection>
        <Subsection name="Variants">
          <SubsectionText>
            Persistent navigation can be executed in several forms such as
            headers, app bars, and sidebars. Regardless of choice, attentiveness
            to how each of these forms present and behave on various device
            sizes is critical. In the variants below, pay special attention to
            how they behave in mobile contexts.
          </SubsectionText>
        </Subsection>
        <Subsection name="Header as Persistent Navigation" level={3}>
          <SubsectionText>
            Headers often contain persistent elements such as search, session,
            and branding, plus navigation links. When executed as a header,
            navigation choices should contain no more than four to five
            elements.
          </SubsectionText>
          <SubsectionText>
            Be sure to checkout{' '}
            <Anchor href={nameToPath('Header')}>Header</Anchor> to see the many
            variants and versatility Header enables.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/persistent-navigation/HeaderNavExample.js"
            template
          >
            <HeaderNavExample />
          </Example>
        </Subsection>
        <Subsection name="Minimal Sidebar" level={3}>
          <SubsectionText>
            Sidebar may contain up to a handful of navigation choices which are
            often mixed with elements such as session.
          </SubsectionText>
          <SubsectionText>
            Sidebars transform to a horizontal orientation on mobile devices. Be
            sure to use the "See Fullscreen" in the example below to explore the
            minimal sidebar's behavior on mobile-sized screens.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/persistent-navigation/MinimalSidebarExample.js"
            template
          >
            <MinimalSidebarExample />
          </Example>
        </Subsection>
        <Subsection name="Extended Sidebar" level={3}>
          <SubsectionText>
            Typically used for reference documentation, an extended sidebar is a
            good choice when your navigational needs serve as an outline or
            table of contents.
          </SubsectionText>
          <Example
            code="https://raw.githubusercontent.com/hpe-design/design-system/master/aries-site/src/examples/templates/dashboards/DashboardExample.js"
            height={{ min: 'small' }}
          >
            {}
          </Example>
        </Subsection>
      </ContentSection>
      <ContentSection>
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

export default Navigation;
