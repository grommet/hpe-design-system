import React from 'react';
import { Main, Header, Footer, Box, Heading, Text } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

const meta = {
  title: 'Components/Main',
  component: Main,
  argTypes: {
    ...boxArgs,
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
