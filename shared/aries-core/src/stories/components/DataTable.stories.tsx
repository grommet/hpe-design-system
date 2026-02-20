import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from 'grommet';
import {
  a11yTitleArg,
  fillArg,
  functionArg,
  marginArg,
  padArg,
  placeholderArg,
} from '../utils/commonArgs';

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

const meta = {
  title: 'Components/DataTable',
  component: TypedDataTable,
  argTypes: {
    a11yTitle: a11yTitleArg,
    alignSelf: alignSelfArg,
    allowSelectAll: booleanArg,
    columns: objectArg,
    data: objectArg,
    disabled: objectArg,
    fill: fillArg,
    groupBy: textArg,
    margin: marginArg,
    onClickRow: functionArg,
    pad: padArg,
    paginate: booleanArg,
    pin: booleanArg,
    placeholder: placeholderArg,
    resizeable: booleanArg,
    size: sizeArg,
    sortable: booleanArg,
    step: numberArg,
  },
} as Meta<typeof TypedDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DataTable',
  render: args => <TypedDataTable {...args} />,
  args: {
    allowSelectAll: false,
    columns,
    data: DATA,
    paginate: false,
    pin: false,
    resizeable: false,
    sortable: false,
    step: 10,
  },
} as Story;
