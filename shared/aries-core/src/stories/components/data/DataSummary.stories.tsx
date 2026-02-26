import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSummary } from 'grommet';

const meta = {
  title: 'Components/Data',
  component: DataSummary,
  argTypes: {},
} satisfies Meta<typeof DataSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataSummaryExample = {
  name: 'DataSummary',
  render: args => (
    <Data
      data={[
        {
          id: 1,
          name: 'Scott',
          age: 28,
          department: 'Engineering',
          salary: 75000,
        },
        { id: 2, name: 'Zelda', age: 32, department: 'Design', salary: 80000 },
        {
          id: 3,
          name: 'Alex',
          age: 25,
          department: 'Engineering',
          salary: 70000,
        },
        {
          id: 4,
          name: 'Morgan',
          age: 29,
          department: 'Marketing',
          salary: 65000,
        },
        { id: 5, name: 'Jordan', age: 35, department: 'Design', salary: 85000 },
      ]}
    >
      <DataSummary {...args} />
    </Data>
  ),
  args: {},
} satisfies Story;
