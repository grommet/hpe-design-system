import React from 'react';
import { Box, Text } from 'grommet';
import { AnchorCallToAction } from 'aries-core';

import { ContentSection, PageLayout, Subsection } from '../../layouts';
import { MainDescription, MainHeading, Meta } from '../../components';

const title = 'About';
const description =
  'HPE Aries is an open-source library and the official ' +
  'design system of HPE for all digital products and experiences. Aries ' +
  'consists of working code, best practices, design resources, and more.';

const About = () => (
  <PageLayout>
    <Meta
      title={title}
      description={description}
      canonicalUrl="https://aries.hpe.design/start/about"
    />
    <ContentSection>
      <MainHeading>{title}</MainHeading>
      <MainDescription>
        HPE Aries is an open-source library and the official design system of
        HPE for all digital products and experiences. Aries consists of working
        code, best practices, design resources, human interface guidelines, and
        a vibrant community of contributors.
      </MainDescription>
      <Text>
        HPE's Aries connects the ideas, technology, and creativity from Hewlett
        Packard Enterprise and exposes it to the larger community with the hope
        of learning and building experiences that reach a broader audience.
      </Text>
      <Box direction="row" gap="medium">
        <AnchorCallToAction label="Our Principles" href="/start/principles" />
        <AnchorCallToAction label="Our Community" href="" />
      </Box>
    </ContentSection>
    <ContentSection>
      <Subsection name="Why Aries?">
        <Text>
          In Latin, Aries means ram. In Greek Mythology, Aries is the symbol of
          the ram responsible for the golden fleece too Poseidon and is a symbol
          of authority and kingship. HPE translates these themes into agility,
          preparedness, responsibiltiy, and resolute performance above all else.
        </Text>
      </Subsection>
      <Subsection name="What HPE Aries is">
        <Text>
          This library provides language, guidelines, design tools, code, and
          best practices to succeed when using HPE’s Design Language for your
          applications and digital experiences for the web. Aries was created to
          help evolve the way we interact with our screens. These experiences
          are tested and qualified by the designers, developers, and researchers
          at HPE on the Aries team.
        </Text>
      </Subsection>
      <Subsection name="What HPE Aries is not">
        <Text>
          This library is not just a brand or style guide, it is a living
          breathing animal. It is not just a list of list of assets or a design
          file. Aries does not provide solutions for all.
        </Text>
      </Subsection>
    </ContentSection>
  </PageLayout>
);

export default About;
