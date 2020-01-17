import React from 'react';
import { Box } from 'grommet';
import { Button } from 'aries-core';

import {
  ButtonRow,
  NavPage,
  Layout,
  ContentSection,
  Subsection,
} from '../../layouts';
import { DescriptiveHeader, Meta, SubsectionText } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Guidelines';
const page = getPageDetails(title);

const Guidelines = () => {
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
        canonicalUrl="https://aries.hpe.design/guidelines"
      />
      <Box border={{ side: 'bottom' }} pad={{ top: 'large' }}>
        <ContentSection lastSection>
          <Subsection name={title} showHeading={false}>
            <SubsectionText size="large">
              The HPE Design System is for developers, designers and product
              makers. Its ethos is rooted in human-centered philosophy providing
              resources like components, patterns, case studies, and templates.
              It also provides a source of conversation and unified principles
              to craft experiences which advance the way people live and work.
            </SubsectionText>
            <ButtonRow>
              <Button href="#" label="Design" primary />
              <Button href="#" label="Develop" primary />
            </ButtonRow>
          </Subsection>
        </ContentSection>
      </Box>
      <NavPage items={page.pages} topic={page.name.toLowerCase()} />
    </Layout>
  );
};

export default Guidelines;
