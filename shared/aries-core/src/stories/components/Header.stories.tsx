import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Header, Button, Avatar, Box, Text, HeaderExtendedProps } from 'grommet';
import { Element } from '@hpe-design/icons-grommet';
import {
  backgroundArg,
  borderArg,
  padArg,
  directionArg,
  heightArg,
  skeletonArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    background: backgroundArg,
    pad: padArg,
    border: borderArg,
    direction: directionArg,
    height: heightArg,
    skeleton: skeletonArg,
  },
  globals: {
    background: { value: 'background-back' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigationHeader: Story = {
  render: (args: HeaderExtendedProps) => (
    <Header {...args}>
      <Box direction="row" align="center" gap="medium">
        <Element color="decorative-brand" />
        <Box direction="row" gap="xsmall">
          <Button label="Dashboard" />
          <Button label="Analytics" />
          <Button label="Settings" />
        </Box>
      </Box>
      <Avatar background="decorative-green">
        <Text color="text-strong">AJ</Text>
      </Avatar>
    </Header>
  ),
  args: {
    background: 'background-front',
    pad: 'medium',
  },
  name: 'Header',
};
