import React from 'react';
import { Header, Button, Avatar, Box, Text } from 'grommet';
import { Element } from '@hpe-design/icons-grommet';
import {
  backgroundArg,
  borderArg,
  padArg,
  directionArg,
  elevationArg,
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
    elevation: elevationArg,
    height: heightArg,
    skeleton: skeletonArg,
  },
};

export default meta;

export const NavigationHeader = {
  render: args => (
    <Header {...args}>
      <Box direction="row" align="center" gap="medium">
        <Element />
        <Box direction="row" gap="medium">
          <Button label="Dashboard" plain />
          <Button label="Analytics" plain />
          <Button label="Settings" plain />
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
