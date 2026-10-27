// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Paragraph,
  Text,
} from 'grommet';
import PropTypes from 'prop-types';
import { Chat } from '@hpe-design/icons-grommet';
import {
  CardGrid,
  EventList,
  PageColumns,
  PageSections,
  Panel,
  PeerStack,
  RhythmPage,
  Section,
} from '../components';
import { surfaceBackground } from '../components/RhythmPage';

const resources = [
  {
    title: 'Documentation',
    description: 'Guides, references, and best practices for every service.',
    link: 'Browse documentation',
  },
  {
    title: 'Community',
    description: 'Ask questions and share what you have learned.',
    link: 'Visit the community',
  },
  {
    title: 'Training',
    description: 'Self-paced courses and certification paths.',
    link: 'View courses',
  },
  {
    title: 'Release notes',
    description: 'What has changed in the services you use.',
    link: 'Read release notes',
  },
];

const cases = [
  {
    status: 'warning',
    text: 'Case 4821: Slow replication to DR site',
    time: 'Updated 2 hours ago',
  },
  {
    status: 'ok',
    text: 'Case 4790: Firmware upgrade guidance',
    time: 'Resolved Oct 17',
  },
  { status: 'ok', text: 'Case 4752: Billing question', time: 'Resolved Oct 9' },
];

const services = [
  { title: 'Compute Ops Management', status: 'ok', text: 'Operational' },
  {
    title: 'Storage services',
    status: 'warning',
    text: 'Degraded performance in EU',
  },
  { title: 'Networking', status: 'ok', text: 'Operational' },
];

const ResourceCard = ({ description, link, title }) => (
  <Card background={surfaceBackground}>
    <CardBody gap="xsmall" align="start">
      <Heading level={3} margin="none">
        {title}
      </Heading>
      <Paragraph margin="none">{description}</Paragraph>
      <Anchor href="#" label={link} />
    </CardBody>
  </Card>
);

ResourceCard.propTypes = {
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

// A hub page that mixes a card grid, a list, and a side column of status.
export const SupportCenter = () => (
  <RhythmPage
    title="Support"
    subtitle="Find answers or get help from HPE."
    actions={<Button label="Open a case" icon={<Chat />} primary />}
  >
    <PageColumns>
      <PageSections>
        <Section title="Self-service resources">
          <CardGrid>
            {resources.map(resource => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
          </CardGrid>
        </Section>
        <Section title="Your cases">
          <Panel title="Recent cases">
            <EventList a11yTitle="Recent support cases" items={cases} />
          </Panel>
        </Section>
      </PageSections>
      <PageSections>
        <Section title="Service status">
          <PeerStack>
            {services.map(({ status, text, title }) => (
              <Panel key={title} title={title}>
                <EventList
                  a11yTitle={`${title} status`}
                  items={[{ status, text, time: 'Checked 5 min ago' }]}
                />
              </Panel>
            ))}
          </PeerStack>
        </Section>
        <Section title="Contact us">
          <Panel title="Phone support">
            <Box gap="3xsmall">
              <Text>1-800-555-0100</Text>
              <Text size="small">24 hours a day for critical issues.</Text>
            </Box>
          </Panel>
        </Section>
      </PageSections>
    </PageColumns>
  </RhythmPage>
);
