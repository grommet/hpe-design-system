import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataView, DataTable, Toolbar } from 'grommet';

const meta = {
  title: 'Components/Data',
  component: DataView,
  argTypes: {
    // DataView has no props to control
  },
} satisfies Meta<typeof DataView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataViewExample = {
  name: 'DataView',
  render: args => (
    <Data
      data={[
        { id: 1, name: 'Person 1', age: 12 },
        { id: 2, name: 'Person 2', age: 91 },
      ]}
      views={[
        { name: 'oldest', sort: { property: 'age', direction: 'desc' } },
        { name: 'youngest', sort: { property: 'age', direction: 'asc' } },
      ]}
    >
      <Toolbar>
        <DataView {...args} />
      </Toolbar>
      <DataTable
        columns={[
          {
            property: 'name',
            header: 'Name',
          },
          {
            property: 'age',
            header: 'Age',
          },
        ]}
      />
    </Data>
  ),
  args: {},
} satisfies Story;
