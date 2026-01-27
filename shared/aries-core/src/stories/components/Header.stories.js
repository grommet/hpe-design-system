import React from 'react';
import { Header, Heading, Button, Avatar, Box } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

const meta = {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    ...boxArgs,
  },
};

export default meta;

export const NavigationHeader = {
  render: args => (
    <Header {...args}>
      <Box direction="row" align="center" gap="medium">
        <Heading level="3" margin="none">
          HPE
        </Heading>
        <Box direction="row" gap="medium">
          <Button label="Dashboard" plain />
          <Button label="Analytics" plain />
          <Button label="Settings" plain />
        </Box>
      </Box>
      <Avatar background="brand">AJ</Avatar>
    </Header>
  ),
  args: {
    background: 'background-front',
    pad: 'medium',
  },
  name: 'Header',
};
