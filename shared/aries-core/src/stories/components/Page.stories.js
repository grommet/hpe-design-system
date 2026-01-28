import React from 'react';
import { Page, PageContent, PageHeader, Box, Heading, Text } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

const meta = {
  title: 'Components/Page',
  component: Page,
  argTypes: {
    kind: {
      control: { type: 'select' },
      options: ['wide', 'narrow', 'full'],
    },
    ...boxArgs,
  },
};

export default meta;

export const DefaultPage = {
  render: args => (
    <Page {...args}>
      <PageContent>
        <PageHeader
          title="Page Title"
          subtitle="A description of what this page is about"
        />
        <Box gap="medium">
          <Heading level={2}>Content Section</Heading>
          <Text>This is the main content of the page.</Text>
        </Box>
      </PageContent>
    </Page>
  ),
  name: 'Page',
};
