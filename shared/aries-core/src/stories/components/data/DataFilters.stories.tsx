import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataFilter, DataFilters, DataTable } from 'grommet';

const meta = {
  title: 'Components/Data',
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

export const DataFiltersExample = {
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
      <DataTable
        columns={[
          {
            property: 'name',
            header: 'Name',
          },
          {
            property: 'location',
            header: 'Location',
          },
          {
            property: 'date',
            header: 'Date',
          },
          {
            property: 'percent',
            header: 'Percent',
          },
          {
            property: 'paid',
            header: 'Paid',
          },
        ]}
      />
    </Data>
  ),
  args: {
    clearFilters: false,
    drop: false,
    heading: 'Filters',
    layer: true,
  },
} satisfies Story;
