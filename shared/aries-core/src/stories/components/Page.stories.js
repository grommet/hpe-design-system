import React from 'react';
import { Page, PageContent, PageHeader, Box, Heading, Text } from 'grommet';
import {
  backgroundColors,
} from '../utils/commonArgs';

const meta = {
  title: 'Layouts/Page',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'Page is a helpful container providing consistent layouts across all HPE applications.',
      },
    },
  },
  argTypes: {
    background: {
      control: { type: 'select' },
      options: backgroundColors,
    },
    kind: {
      control: { type: 'select' },
      options: ['wide', 'narrow', 'full'],
    },
  },
};

export default meta;

export const DefaultPage = {
  render: args => (
    <Page {...args}>
      <PageContent>
        <PageHeader title="Page Title" subtitle="A description of what this page is about" />
        <Box gap="medium">
          <Heading level={2}>Content Section</Heading>
          <Text>This is the main content of the page.</Text>
        </Box>
      </PageContent>
    </Page>
  ),
  args: {
    background: 'background-back',
  },
  name: 'Page',
};

export const NarrowPage = {
  render: args => (
    <Page {...args}>
      <PageContent>
        <PageHeader 
          title="Narrow Page" 
          subtitle="This page uses a narrow layout constraint" 
        />
        <Text>
          Narrow pages are good for content that benefits from a more focused, 
          readable width such as articles or forms.
        </Text>
      </PageContent>
    </Page>
  ),
  args: {
    kind: 'narrow',
    background: 'background-back',
  },
  name: 'Narrow Page',
};

export const FullPage = {
  render: args => (
    <Page {...args}>
      <PageContent>
        <PageHeader 
          title="Full Width Page" 
          subtitle="This page uses the full width available" 
        />
        <Text>
          Full width pages are good for dashboards, tables, or other content 
          that benefits from maximum screen real estate.
        </Text>
      </PageContent>
    </Page>
  ),
  args: {
    kind: 'full',
    background: 'background-back',
  },
  name: 'Full Page',
};

export const MultiplePageContent = {
  render: args => (
    <Page {...args}>
      <PageContent background="brand">
        <Box pad="xlarge" align="center">
          <Heading level={1} color="white">Hero Section</Heading>
          <Text color="white">This could be a hero or banner section.</Text>
        </Box>
      </PageContent>
      <PageContent>
        <Box gap="medium" pad="medium">
          <Heading level={2}>Main Content</Heading>
          <Text>This is the primary content section with different styling.</Text>
        </Box>
      </PageContent>
    </Page>
  ),
  args: {
    background: 'background-back',
  },
  name: 'Multiple Page Content',
};
