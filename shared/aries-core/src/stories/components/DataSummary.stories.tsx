import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSummary } from 'grommet';

const meta = {
  title: 'Components/DataSummary',
  component: DataSummary,
  argTypes: {
    messages: {
      control: { type: 'object' },
      description:
        'Customize the messages shown. This can also be driven via Data "messages".',
    },
  },
} satisfies Meta<typeof DataSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataSummary',
  render: args => (
    <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
      <DataSummary {...args} />
    </Data>
  ),
  args: {
    messages: {
      filtered: '{filteredTotal} results of {total} {items}',
      filteredSingle: '{filteredTotal} result of {total} {items}',
      items: 'items',
      itemsSingle: 'item',
      selected: '{selected} selected',
      total: '{total} {items}',
      totalSingle: '{total} {items}',
    },
  },
} satisfies Story;
