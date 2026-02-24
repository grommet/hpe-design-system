import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from 'grommet';
import {
  containerSizes,
  fillArg,
  padArg,
  placeholderArg,
} from '../../utils/commonArgs';

// Create a typed wrapper to avoid generic type issues
const TypedDataTable = DataTable as any;

const columns = [
  {
    property: 'name',
    header: 'Name',
    primary: true,
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
    header: 'Complete',
  },
];

const DATA = [
  {
    name: 'Alan',
    location: 'San Francisco',
    date: '2023-07-02',
    percent: '20%',
  },
  {
    name: 'Bryan',
    location: 'Fort Collins',
    date: '2023-06-05',
    percent: '30%',
  },
  {
    name: 'Chris',
    location: 'Palo Alto',
    date: '2023-06-11',
    percent: '40%',
  },
  {
    name: 'Eric',
    location: 'San Francisco',
    date: '2023-06-13',
    percent: '80%',
  },
];

const meta = {
  title: 'Components/Data',
  component: TypedDataTable,
  argTypes: {
    columns: {
      control: { type: 'object' },
    },
    data: {
      control: { type: 'object' },
    },
    fill: fillArg,
    groupBy: {
      control: { type: 'text' },
    },
    pad: padArg,
    paginate: {
      control: { type: 'boolean' },
    },
    pin: {
      control: { type: 'boolean' },
    },
    placeholder: placeholderArg,
    resizeable: {
      control: { type: 'boolean' },
    },
    show: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: containerSizes,
    },
    sortable: {
      control: { type: 'boolean' },
    },
    step: {
      control: { type: 'number' },
    },
  },
} as Meta<typeof TypedDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataTableExample = {
  name: 'DataTable',
  render: args => <TypedDataTable {...args} />,
  args: {
    columns: columns,
    data: DATA,
    fill: false,
    groupBy: undefined,
    pad: undefined,
    paginate: false,
    pin: false,
    placeholder: undefined,
    resizeable: false,
    show: undefined,
    size: undefined,
    sortable: false,
    step: 2,
  },
} as Story;
