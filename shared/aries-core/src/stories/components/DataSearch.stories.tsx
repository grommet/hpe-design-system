import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSearch, DataTable, Toolbar } from 'grommet';

const meta = {
  title: 'Components/DataSearch',
  component: DataSearch,
  argTypes: {
    drop: {
      control: { type: 'boolean' },
      description: 'Whether to show the search via a DropButton.',
    },
    responsive: {
      control: { type: 'boolean' },
      description: 'Whether the search is responsive.',
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

export const Default = {
  name: 'DataSearch',
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
      <DataSearch {...args} />
      <DataTable />
    </Data>
  ),
  args: {
    drop: false,
    responsive: true,
    updateOn: 'change',
  },
} satisfies Story;
