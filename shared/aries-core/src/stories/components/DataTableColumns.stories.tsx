import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataTableColumns, Toolbar } from 'grommet';

const meta = {
  title: 'Components/DataTableColumns',
  component: DataTableColumns,
  argTypes: {
    drop: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof DataTableColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataTableColumns',
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
      <DataTableColumns
        {...args}
        options={[
          {
            property: 'name',
            label: 'Name',
          },
          {
            property: 'location',
            label: 'Location',
          },
          {
            property: 'date',
            label: 'Date',
          },
          {
            property: 'percent',
            label: 'Percent',
          },
          {
            property: 'paid',
            label: 'Paid',
          },
        ]}
      />
    </Data>
  ),
  args: {
    drop: true,
  },
} satisfies Story;
