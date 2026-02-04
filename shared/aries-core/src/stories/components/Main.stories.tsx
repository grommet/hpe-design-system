import React from 'react';
import { Main, Heading, Text, BoxExtendedProps } from 'grommet';
import type { StoryObj } from '@storybook/react';

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
type Story = StoryObj<typeof meta>;

export const BasicMain: Story = {
  render: (args: BoxExtendedProps) => (
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
