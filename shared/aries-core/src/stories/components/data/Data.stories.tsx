import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataTable, DataTableProps, Text, Box, Meter } from 'grommet';

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const DATA = [
  {
    name: 'Alan',
    location: '',
    date: '',
    percent: 0,
    paid: 0,
  },
  {
    name: 'Bryan',
    location: 'Fort Collins',
    date: '2018-06-10',
    percent: 30,
    paid: 1234,
  },
  {
    name: 'Chris',
    location: 'Palo Alto',
    date: '2018-06-09',
    percent: 40,
    paid: 2345,
  },
  {
    name: 'Eric',
    location: 'Palo Alto',
    date: '2018-06-11',
    percent: 80,
    paid: 3456,
  },
  {
    name: 'Doug',
    location: 'Fort Collins',
    date: '2018-06-10',
    percent: 60,
    paid: 1234,
  },
  {
    name: 'Jet',
    location: 'Palo Alto',
    date: '2018-06-09',
    percent: 40,
    paid: 3456,
  },
  {
    name: 'Michael',
    location: 'Boise',
    date: '2018-06-11',
    percent: 50,
    paid: 1234,
  },
  {
    name: 'Tracy',
    location: 'San Francisco',
    date: '2018-06-10',
    percent: 10,
    paid: 2345,
  },
];

type Datum = (typeof DATA)[number];

const columns: DataTableProps<Datum>['columns'] = [
  {
    property: 'name',
    header: <Text>Name with extra</Text>,
    primary: true,
    footer: 'Total',
  },
  {
    property: 'location',
    header: 'Location',
  },
  {
    property: 'date',
    header: 'Date',
    render: datum =>
      datum.date && new Date(datum.date).toLocaleDateString('en-US'),
    align: 'end',
  },
  {
    property: 'percent',
    header: 'Percent Complete',
    render: ({ percent }) => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter values={[{ value: percent }]} thickness="small" size="small" />
      </Box>
    ),
  },
  {
    property: 'paid',
    header: 'Paid',
    render: datum => amountFormatter.format(datum.paid / 100),
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
];

const meta = {
  title: 'Components/Data',
  component: Data,
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Array of data objects.',
      table: {
        type: { summary: 'array' },
      },
    },
    properties: {
      control: { type: 'object' },
      description:
        "This describes the objects found in 'data', sort of a schema. Using this property allows the caller to specify how the label renders and which properties should be filterable, searchable, sortable, and badgeable.",
      table: {
        type: { summary: 'object' },
      },
    },
    toolbar: {
      control: { type: 'select' },
      options: [true, false, 'search', 'filters', 'view'],
      description:
        "Whether to include a toolbar and what to put in it. Setting it to 'true' will include a Toolbar containing both DataSearch and DataFilters with layer prop.",
      table: {
        type: { summary: 'boolean | string' },
      },
    },
    view: {
      control: { type: 'object' },
      description: 'The current view of the data.',
      table: {
        type: { summary: 'string | object' },
      },
    },
    views: {
      control: { type: 'object' },
      description: 'The set of predefined views of the data.',
      table: {
        type: { summary: 'array' },
      },
    },
  },
} satisfies Meta<typeof Data>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataExample = {
  name: 'Data',
  render: args => (
    <Data {...args}>
      <DataTable alignSelf="start" columns={columns} />
    </Data>
  ),
  args: {
    data: DATA,
    properties: {
      location: {
        label: 'Location',
        sort: false,
        options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco'],
      },
      name: {
        filter: false,
      },
      paid: {
        search: false,
        label: 'Paid',
      },
      percent: {
        search: false,
        label: 'Percent',
      },
      date: {
        label: 'Date',
      },
    },
    toolbar: true,
    view: {
      sort: {
        property: 'percent',
        direction: 'desc',
      },
    },
    views: [
      {
        name: 'My location',
        properties: {
          location: ['San Francisco'],
        },
      },
      {
        name: 'Recent entries',
        sort: {
          property: 'date',
          direction: 'desc',
        },
      },
      {
        name: 'High performers',
        properties: {
          percent: {
            min: 60,
            max: 100,
          },
        },
        sort: {
          property: 'percent',
          direction: 'desc',
        },
      },
    ],
  },
} satisfies Story;
