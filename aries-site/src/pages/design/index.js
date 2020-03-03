import React from 'react';

import { ContentSection, Layout, NavPage, Subsection } from '../../layouts';
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
    <Layout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={page.seoDescription}
        canonicalUrl="https://design-system.hpe.design/design"
      />
      {page.pages.length ? (
        <NavPage items={page.pages} topic={page.name.toLowerCase()} />
      ) : (
        <>
          <ContentSection>
            <Subsection name="Preferred">
              <SubsectionText>
                The HPE Design System is primarily focused on user interfaces
                developed with ReactJS and Grommet. There are more resources,
                examples, and community help for this environment.
              </SubsectionText>
              <SubsectionText size="medium">
                The HPE Design System contains an open-source library of
                elements consisting of working code, best practices, design
                resources, human-centered guidelines, and a vibrant community of
                contributors.
              </SubsectionText>
            </Subsection>
          </ContentSection>
          <ContentSection>
            <Subsection name="Alternatives">
              <SubsectionText>
                The HPE Design System’s ethos is rooted and thrives in an
                environment of generosity and community. It seeks to share and
                invite conversations that are inclusive, as well as to boldly
                express the cultural DNA of Hewlett Packard Enterprise.
                Embracing the courage and commitment to learn, share and serve
                with uncompromising integrity, the HPE Design System will
                advance the way people live and work.
              </SubsectionText>
            </Subsection>
            <Subsection name="Generous">
              <SubsectionText>
                Living generously requires understanding the needs of others.
                The HPE Design System is crafted upon user research and
                listening to customers first. We can then bring to bear the
                experiences that generously provide for the needs of people and
                their work. It requires a humility and position that is ready to
                serve others and continues to relentless pursue excellence in
                its craft for the sake of others.
              </SubsectionText>
            </Subsection>
            <Subsection name="Community">
              <SubsectionText>
                Partnering in community allows the HPE Design System to be built
                upon the energy and empowerment of collaboration. The community
                provides accountability, conversation and relationships that are
                the crucible for generating innovation. Community is the fuel
                for the fires of creativity and allows the Design System to
                expand and thrive. Best of all, it’s a great place to find
                support and celebrate success!
              </SubsectionText>
            </Subsection>
          </ContentSection>
        </>
      )}
    </Layout>
  );
};

export default Design;
