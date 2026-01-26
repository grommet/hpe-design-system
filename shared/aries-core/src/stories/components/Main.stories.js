import React from 'react';
import { Main, Header, Footer, Box, Heading, Text } from 'grommet';
import {
  backgroundColors,
  spacingSizes,
  containerSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Layouts/Main',
  component: Main,
  parameters: {
    docs: {
      description: {
        component:
          'The Main component is where you define the location and layout of the primary context of your content.',
      },
    },
  },
  argTypes: {
    background: {
      control: { type: 'select' },
      options: backgroundColors,
    },
    fill: {
      control: { type: 'select' },
      options: [true, false, 'horizontal', 'vertical'],
    },
    overflow: {
      control: { type: 'select' },
      options: ['auto', 'hidden', 'scroll', 'visible'],
    },
    pad: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    width: {
      control: { type: 'select' },
      options: containerSizes,
    },
  },
};

export default meta;

export const BasicMain = {
  render: args => (
    <Box fill>
      <Header background="background-contrast" pad="medium">
        <Heading level={3} margin="none">
          Header
        </Heading>
      </Header>
      <Main {...args}>
        <Heading level={2}>Main Content</Heading>
        <Text>This is the primary content area of the page.</Text>
      </Main>
      <Footer background="background-contrast" pad="medium">
        <Text>Footer</Text>
      </Footer>
    </Box>
  ),
  args: {
    pad: 'medium',
    background: 'background-back',
    flex: true,
  },
  name: 'Main',
};

export const ScrollableMain = {
  render: args => (
    <Box fill height="medium">
      <Header background="background-contrast" pad="medium">
        <Heading level={3} margin="none">
          App Header
        </Heading>
      </Header>
      <Main {...args}>
        <Box gap="medium">
          <Heading level={2}>Scrollable Content</Heading>
          {Array.from({ length: 20 }, (_, i) => (
            <Text key={i}>Content item {i + 1}</Text>
          ))}
        </Box>
      </Main>
    </Box>
  ),
  args: {
    pad: 'medium',
    overflow: 'auto',
    flex: true,
  },
  name: 'Scrollable Main',
};

export const WithSidebar = {
  render: args => (
    <Box fill direction="row">
      <Box width="medium" background="background-contrast" pad="medium">
        <Heading level={4} margin="none">
          Sidebar
        </Heading>
      </Box>
      <Main {...args}>
        <Heading level={2}>Main Content with Sidebar</Heading>
        <Text>The main content area when using a sidebar layout.</Text>
      </Main>
    </Box>
  ),
  args: {
    pad: 'medium',
    flex: true,
  },
  name: 'With Sidebar',
};
