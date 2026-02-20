import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataFilter, DataTable } from 'grommet';

const meta = {
  title: 'Components/DataFilter',
  component: DataFilter,
  argTypes: {
    property: {
      control: { type: 'select' },
      options: ['name', 'location', 'date', 'percent', 'paid'],
    },
    range: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof DataFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataFilter',
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
      <DataFilter {...args} />
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
    property: 'location',
    range: undefined,
  },
} satisfies Story;
