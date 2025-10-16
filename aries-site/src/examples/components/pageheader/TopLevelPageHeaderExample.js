import React from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Heading,
  Grid,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import {
  ChapterAdd,
  Cycle,
  Key,
  Organization,
  ServerCluster,
  Tag,
  User,
} from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';

const data = [
  {
    icon: <Organization />,
    title: 'Account details',
    subtitle: 'View and edit your company account information.',
  },
  {
    icon: <ServerCluster />,
    title: 'Servers',
    subtitle: 'Manage all of your HPE servers.',
  },
  {
    icon: <User />,
    title: 'Users',
    subtitle: 'Lookup users and manage their access.',
  },
  {
    icon: <Key />,
    title: 'Authentication',
    subtitle: 'Improve security and login with ease with SAML or RADIUS.',
  },
  {
    icon: <Cycle />,
    title: 'Subscriptions',
    subtitle: 'Manage your device and service subscriptions.',
  },
  {
    icon: <Tag />,
    title: 'Tags',
    subtitle: 'Manage tags that can be associated with devices.',
  },
];

export const TopLevelPageHeaderExample = () => (
  <Page>
    <Box align="center" pad="xsmall" background="background-front" flex={false}>
      <TextEmphasis>Global Header</TextEmphasis>
    </Box>
    <PageContent>
      <PageHeader
        title="Manage account"
        subtitle="Manage your HPE Common Cloud Account."
        actions={
          <Button a11yTitle="Add cards" icon={<ChapterAdd />} tip="Add cards" />
        }
      />
      <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
        {data.map((datum, index) => (
          <Card
            key={index}
            // eslint-disable-next-line no-alert
            onClick={() => alert('This should navigate to the child page.')}
          >
            <CardHeader align="start" direction="column" gap="3xsmall">
              {datum.icon}
              <Heading level={2} margin="none">
                {datum.title}
              </Heading>
              <Text size="small">{datum.subtitle}</Text>
            </CardHeader>
          </Card>
        ))}
      </Grid>
    </PageContent>
  </Page>
);
