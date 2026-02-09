import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, Text, Box } from 'grommet';
import { alignArg, marginArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    activeIndex: {
      control: { type: 'number', min: 0, max: 2 },
    },
    alignControls: alignArg,
    margin: marginArg,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTabs: Story = {
  render: args => (
    <Tabs {...args}>
      <Tab title="General">
        <Box pad={{ vertical: 'medium' }}>
          <Text>
            Tab content should be flush with the left edge of the Tab. A
            "medium" vertical padding should be applied to create space between
            the Tab and its content.
          </Text>
        </Box>
      </Tab>
      <Tab title="Account">
        <Box pad={{ vertical: 'medium' }}>
          <Text>Account Information</Text>
        </Box>
      </Tab>
      <Tab title="Billing">
        <Box pad={{ vertical: 'medium' }}>
          <Text>Billing Information</Text>
        </Box>
      </Tab>
    </Tabs>
  ),
  // ts-ignore is needed because TabsExtended props requires 'children' prop
  // @ts-ignore
  args: {
    activeIndex: undefined,
    alignControls: 'start',
    margin: undefined,
  },
  name: 'Tabs',
};
