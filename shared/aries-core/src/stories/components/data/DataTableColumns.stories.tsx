import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataTableColumns, DataTable } from 'grommet';

const meta = {
  title: 'Components/Data',
  component: DataTableColumns,
  argTypes: {
    drop: {
      control: { type: 'boolean' },
      description: 'Whether to show the controls via a DropButton.',
    },
    options: {
      control: { type: 'object' },
      description:
        'The set of possible columns. Can be array of strings or objects with label, property, disabled, and pinned properties.',
    },
  },
} satisfies Meta<typeof DataTableColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataTableColumnsExample = {
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
      <DataTableColumns {...args} />
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
    drop: false,
    options: [
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
    ],
  },
} satisfies Story;
