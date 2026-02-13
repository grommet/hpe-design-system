import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSort, DataTable } from 'grommet';

const meta = {
  title: 'Components/DataSort',
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
        { name: 'Scott' },
        { name: 'Matt' },
        { name: 'Jessica' },
        { name: 'Mike' },
        { name: 'Julia' },
        { name: 'Seamus' },
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
      />
    </Data>
  ),
  args: {
    drop: true,
  },
} satisfies Story;
