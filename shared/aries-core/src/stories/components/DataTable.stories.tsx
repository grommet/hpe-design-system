import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableProps } from 'grommet';
import {
  containerSizes,
  fillArg,
  padArg,
  placeholderArg,
} from '../utils/commonArgs';

const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
});
type Datum = (typeof DATA)[number];
const DATA = [
  {
    name: 'Alan',
    location: 'San Francisco',
    date: '2023-07-02',
    percent: 20,
  },
  {
    name: 'Bryan',
    location: 'Fort Collins',
    date: '2023-06-05',
    percent: 30,
  },
  {
    name: 'Chris',
    location: 'Palo Alto',
    date: '2023-06-11',
    percent: 40,
  },
  {
    name: 'Eric',
    location: 'San Francisco',
    date: '2023-06-13',
    percent: 80,
  },
];

const columns: DataTableProps<Datum>['columns'] = [
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
    header: 'Complete %',
    render: (datum: Datum) => percentFormatter.format(datum.percent / 100),
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable as React.ComponentType<DataTableProps<Datum>>,
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
} satisfies Meta<typeof DataTable<Datum>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataTable',
  render: args => <DataTable {...args} />,
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
} satisfies Story;
