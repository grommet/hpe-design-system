import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSort, DataTable } from 'grommet';

const meta = {
  title: 'Components/Data & friends/DataSort',
  component: DataSort,
  argTypes: {
    drop: {
      control: { type: 'boolean' },
      description: 'Whether to show the controls via a DropButton.',
    },
  },
} satisfies Meta<typeof DataSort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataSort',
  render: args => (
    <Data
      data={[
        { id: 1, name: 'Scott' },
        { id: 2, name: 'Matt' },
        { id: 3, name: 'Jessica' },
        { id: 4, name: 'Mike' },
        { id: 5, name: 'Julia' },
        { id: 6, name: 'Seamus' },
      ]}
    >
      <DataSort {...args} />
      <DataTable
        columns={[
          {
            property: 'name',
            header: 'Name',
          },
        ]}
        primaryKey="id"
      />
    </Data>
  ),
  args: {
    drop: true,
  },
} satisfies Story;
