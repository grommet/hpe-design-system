import React from 'react';
import { Box } from 'grommet';
import { Button } from 'aries-core';

import {
  ButtonRow,
  NavPage,
  PageLayout,
  ContentSection,
  Subsection,
} from '../../layouts';
import { DescriptiveHeader, Meta, SubsectionText } from '../../components';
import { structure } from '../../data';

const title = 'Guidelines';
const topic = structure.find(page => page.name === title);
const description =
  'The heartbeat and mindset of the HPE Design System describing the ' +
  'ideology and standards informing every design decision.';

const Guidelines = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={topic.color}
      subText={topic.description}
      icon={topic.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={description}
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
      <NavPage items={topic.pages} topic={topic.name.toLowerCase()} />
    </PageLayout>
  );
};

export default Guidelines;
