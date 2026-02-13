import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataView, DataTable, Toolbar } from 'grommet';

const meta = {
  title: 'Components/DataView',
  component: DataView,
  argTypes: {
    // DataView has no props to control
  },
} satisfies Meta<typeof DataView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataView',
  render: args => (
    <Data
      data={[{ age: 12 }, { age: 91 }]}
      views={[
        { name: 'oldest', sort: { property: 'age', direction: 'desc' } },
        { name: 'youngest', sort: { property: 'age', direction: 'asc' } },
      ]}
    >
      <Toolbar>
        <DataView {...args} />
      </Toolbar>
      <DataTable />
    </Data>
  ),
  args: {},
} satisfies Story;
