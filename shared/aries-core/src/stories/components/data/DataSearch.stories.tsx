import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSearch, DataTable } from 'grommet';

const meta = {
  title: 'Components/Data',
  component: DataSearch,
  argTypes: {
    drop: {
      control: { type: 'boolean' },
      description: 'Whether to show the search via a DropButton.',
    },
    updateOn: {
      control: { type: 'select' },
      options: ['change', 'submit'],
      description:
        'Whether to change the view on each search input change or to gather multiple changes up into a single submit when the Enter key is pressed.',
    },
  },
} satisfies Meta<typeof DataSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataSearchExample = {
  name: 'DataSearch',
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
      <DataSearch {...args} />
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
    drop: false,
    updateOn: 'change',
  },
} satisfies Story;
