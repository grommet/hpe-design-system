import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from 'grommet';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    numberEdgePages: {
      control: { type: 'number', min: 1, max: 10 },
    },
    numberItems: {
      control: { type: 'number', min: 1, max: 100 },
    },
    numberMiddlePages: {
      control: { type: 'number', min: 0, max: 100 },
    },
    page: {
      control: { type: 'number', min: 1, max: 100 },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    step: {
      control: { type: 'select' },
      options: [10, 20, 50, 100],
      description: 'Number of items per page',
    },
    stepOptions: {
      control: { type: 'boolean' },
    },
    summary: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPagination = {
  args: {
    numberEdgePages: undefined,
    numberItems: 100,
    numberMiddlePages: undefined,
    page: 1,
    size: undefined,
    step: 10,
    stepOptions: false,
    summary: false,
  },
  render: args => <Pagination {...args} />,
  name: 'Pagination',
} satisfies Story;
