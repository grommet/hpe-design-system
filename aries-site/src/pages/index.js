import React from 'react';
import { Anchor, Box, Text } from 'grommet';
import { FormNext } from 'grommet-icons';

import {
  ContentSection,
  PageLayout,
  MainContent,
  Subsection,
} from '../layouts';
import { MainDescription, MainHeading, Subheading } from '../components';

/* Start Page */

const Index = () => (
  <PageLayout>
    <MainContent>
      <ContentSection>
        <MainHeading>About</MainHeading>
        <MainDescription>
          HPE Aries is an open-source library and the official design system of
          HPE for all digital products and experiences. Aries consists of
          working code, best practices, design resources, human interface
          guidelines, and a virbant community of contributors.
        </MainDescription>
        <Text>
          HPE's Aries connects the ideas, technology, and creativity from
          Hewlett Packard Enterprise and exposes it to the larger community with
          the hope of learning and building experiences that reach a broader
          audience.
        </Text>
        <Box direction="row" gap="medium">
          <Anchor
            label="Our Principles"
            href="/principles"
            icon={<FormNext />}
            reverse
            color="brand"
          />
          <Anchor
            label="Our Community"
            icon={<FormNext />}
            reverse
            color="brand"
          />
        </Box>
      </ContentSection>
      <ContentSection>
        <Subsection>
          <Subheading>Why Aries?</Subheading>
          <Text>
            In Latin, Aries means ram. In Greek Mythology, Aries is the symbol
            of the ram responsible for the golden fleece too Poseidon and is a
            symbol of authority and kingship. HPE translates these themes into
            agility, preparedness, responsibiltiy, and resolute performance
            above all else.
          </Text>
        </Subsection>
        <Subsection>
          <Subheading>What HPE Aries is</Subheading>
          <Text>
            This library provides language, guidelines, design tools, code, and
            best practices to succeed when using HPE’s Design Language for your
            applications and digital experiences for the web. Aries was created
            to help evolve the way we interact with our screens. These
            experiences are tested and qualified by the designers, developers,
            and researchers at HPE on the Aries team.
          </Text>
        </Subsection>
        <Subsection>
          <Subheading>What HPE Aries is not</Subheading>
          <Text>
            This library is not just a brand or style guide, it is a living
            breathing animal. It is not just a list of list of assets or a
            design file. Aries does not provide solutions for all.
          </Text>
        </Subsection>
      </ContentSection>
    </MainContent>
  </PageLayout>
);

export default Index;
