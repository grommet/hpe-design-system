// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Paragraph,
  Tag,
} from 'grommet';
import { CardGrid, PageSections, RhythmPage, Section } from '../components';
import { surfaceBackground } from '../components/RhythmPage';

const groups = [
  {
    title: 'Profile',
    settings: [
      {
        title: 'Personal information',
        description: 'Name, email address, and phone number.',
      },
      {
        title: 'Language and region',
        description: 'Display language, time zone, and date format.',
      },
    ],
  },
  {
    title: 'Security',
    settings: [
      {
        title: 'Password',
        description: 'Last changed 82 days ago.',
      },
      {
        title: 'Multi-factor authentication',
        description: 'Require a second step when signing in.',
        tag: 'Enabled',
      },
      {
        title: 'Active sessions',
        description: 'Review devices signed in to your account.',
      },
    ],
  },
  {
    title: 'Notifications',
    settings: [
      {
        title: 'Email',
        description: 'Alerts, digests, and product updates.',
      },
      {
        title: 'In-app',
        description: 'Banners and toast messages while you work.',
      },
      {
        title: 'Mobile',
        description: 'Push notifications for critical alerts.',
        tag: 'Not set up',
      },
    ],
  },
  {
    title: 'Integrations',
    settings: [
      {
        title: 'API clients',
        description: 'Credentials for scripts and automation.',
      },
      {
        title: 'Webhooks',
        description: 'Send events to your own systems.',
      },
      {
        title: 'Single sign-on',
        description: 'Connect your identity provider.',
        tag: 'Not set up',
      },
      {
        title: 'Audit log streaming',
        description: 'Forward activity to a SIEM.',
      },
    ],
  },
];

const SettingCard = ({ description, tag, title }) => (
  <Card background={surfaceBackground}>
    <CardBody gap="xsmall">
      <Box direction="row" align="center" justify="between" gap="xsmall">
        <Heading level={3} margin="none">
          {title}
        </Heading>
        {tag && <Tag value={tag} size="xsmall" border={false} />}
      </Box>
      <Paragraph margin="none">{description}</Paragraph>
    </CardBody>
    <CardFooter justify="start">
      <Button label="Manage" secondary a11yTitle={`Manage ${title}`} />
    </CardFooter>
  </Card>
);

SettingCard.propTypes = {
  description: PropTypes.string.isRequired,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};

// A settings hub: grouped sections of small, action-bearing cards.
export const AccountSettings = () => (
  <RhythmPage
    title="Account settings"
    subtitle="Manage your profile, security, and integrations."
  >
    <PageSections>
      {groups.map(({ settings, title }) => (
        <Section key={title} title={title}>
          <CardGrid size="medium">
            {settings.map(setting => (
              <SettingCard key={setting.title} {...setting} />
            ))}
          </CardGrid>
        </Section>
      ))}
    </PageSections>
  </RhythmPage>
);
