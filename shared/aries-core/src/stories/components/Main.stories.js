import React from 'react';
import { Main, Heading, Text } from 'grommet';
import {
  backgroundArg,
  padArg,
  alignArg,
  borderArg,
  gapArg,
  heightArg,
  skeletonArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Main',
  component: Main,
  argTypes: {
    pad: padArg,
    background: backgroundArg,
    align: alignArg,
    border: borderArg,
    gap: gapArg,
    height: heightArg,
    skeleton: skeletonArg,
  },
};

export default meta;

export const BasicMain = {
  render: args => (
    <Main {...args}>
      <Heading level={1}>Main Content</Heading>
      <Text>This is the primary content area of the page.</Text>
    </Main>
  ),
  args: {
    pad: 'medium',
    background: 'background-back',
    flex: true,
  },
  name: 'Main',
};
