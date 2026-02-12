import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataFilter, DataFilters } from 'grommet';

const meta = {
  title: 'Components/DataFilters',
  component: DataFilters,
  argTypes: {
    clearFilters: {
      control: { type: 'boolean' },
    },
    drop: {
      control: { type: 'boolean' },
    },
    heading: {
      control: { type: 'text' },
    },
    layer: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof DataFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataFilters',
  render: args => (
    <Data
      data={[
        {
          name: 'Bryan',
          location: 'Fort Collins',
          date: '2018-06-10',
          percent: 30,
          paid: 1234,
        },
        {
          name: 'Chris',
          location: 'Palo Alto',
          date: '2018-06-09',
          percent: 40,
          paid: 2345,
        },
        {
          name: 'Eric',
          location: 'Palo Alto',
          date: '2018-06-11',
          percent: 80,
          paid: 3456,
        },
      ]}
    >
      <DataFilters {...args}>
        <DataFilter property="name" />
        <DataFilter property="location" />
        <DataFilter property="percent" />
        <DataFilter property="paid" />
      </DataFilters>
    </Data>
  ),
  args: {
    clearFilters: false,
    drop: false,
    heading: 'Filters',
    layer: true,
  },
} satisfies Story;
