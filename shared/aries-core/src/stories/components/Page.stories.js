import React from 'react';
import { Page, PageContent, PageHeader, Heading, Paragraph } from 'grommet';

const meta = {
  title: 'Components/Page',
  component: Page,
  argTypes: {
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
        <PageHeader
          title="Page Title"
          subtitle="A description of what this page is about"
        />
        <Heading level={2} margin="none">
          Content Section
        </Heading>
        <Paragraph>This is the main content of the page.</Paragraph>
      </PageContent>
    </Page>
  ),
  name: 'Page',
};
