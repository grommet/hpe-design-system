import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataTableGroupBy, DataTable } from 'grommet';

const meta = {
  title: 'Components/DataTableGroupBy',
  component: DataTableGroupBy,
  argTypes: {
    options: {
      control: { type: 'object' },
      description:
        'The set of possible columns to group by. Can be array of strings or objects with label/value.',
    },
  },
} satisfies Meta<typeof DataTableGroupBy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataTableGroupBy',
  render: args => (
    <Data
      data={[
        { id: 1, name: 'Scott', country: 'AUS' },
        { id: 2, name: 'Zelda', country: 'AUS' },
        { id: 3, name: 'Geri', country: 'CAN' },
        { id: 4, name: 'Tracy', country: 'CAN' },
        { id: 5, name: 'Maggie', country: 'USA' },
      ]}
    >
      <DataTableGroupBy {...args} drop />
      <DataTable
        columns={[
          {
            property: 'name',
            header: 'Name',
          },
          {
            property: 'country',
            header: 'Country',
          },
        ]}
      />
    </Data>
  ),
  args: {
    options: ['country'],
  },
} satisfies Story;
