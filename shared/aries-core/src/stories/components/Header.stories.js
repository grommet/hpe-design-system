import React from 'react';
import { Header, Heading, Button, Avatar, TextInput, Box } from 'grommet';
import { Search, Menu } from '@hpe-design/icons-grommet';
import {
  backgroundColors,
  spacingSizes,
  containerSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component: 'Header is a Box with a set of preset properties for introductory content.',
      },
    },
  },
  argTypes: {
    background: {
      control: { type: 'select' },
      options: backgroundColors,
    },
    border: {
      control: { type: 'boolean' },
    },
    fill: {
      control: { type: 'select' },
      options: [true, false, 'horizontal', 'vertical'],
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

export const BasicHeader = {
  render: args => (
    <Header {...args}>
      <Heading level="3" margin="none">Application Name</Heading>
      <Button icon={<Menu />} />
    </Header>
  ),
  args: {
    background: 'background-front',
    pad: 'medium',
  },
  name: 'Header',
};

export const WithSearch = {
  render: args => (
    <Header {...args}>
      <Heading level="3" margin="none">App Name</Heading>
      <TextInput
        icon={<Search />}
        placeholder="Search..."
        plain
      />
      <Avatar background="brand">JD</Avatar>
    </Header>
  ),
  args: {
    background: 'background-front',
    pad: 'medium',
  },
  name: 'With Search',
};

export const WithActions = {
  render: args => (
    <Header {...args}>
      <Heading level="3" margin="none">Dashboard</Heading>
      <Box direction="row" gap="small">
        <Button label="Export" secondary />
        <Button label="Create" primary />
      </Box>
    </Header>
  ),
  args: {
    background: 'background-front',
    pad: 'medium',
  },
  name: 'With Actions',
};

export const NavigationHeader = {
  render: args => (
    <Header {...args}>
      <Box direction="row" align="center" gap="medium">
        <Heading level="3" margin="none">HPE</Heading>
        <Box direction="row" gap="medium">
          <Button label="Dashboard" plain />
          <Button label="Analytics" plain />
          <Button label="Settings" plain />
        </Box>
      </Box>
      <Avatar background="brand">USER</Avatar>
    </Header>
  ),
  args: {
    background: 'background-front',
    pad: 'medium',
  },
  name: 'Navigation Header',
};
