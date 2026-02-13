import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataTable, Text, Box, Meter } from 'grommet';

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

const columns = [
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
    render: (datum) =>
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
    render: (datum) => amountFormatter.format(datum.paid / 100),
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
];

const meta = {
  title: 'Components/Data',
  component: Data,
  argTypes: {
    toolbar: {
      control: { type: 'boolean' },
      description: 'Whether to show the toolbar with data controls.',
    },
  },
} satisfies Meta<typeof Data>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Data',
  render: args => (
    <Data data={DATA} {...args}>
      <DataTable alignSelf="start" columns={columns} />
    </Data>
  ),
  args: {
    toolbar: true,
  },
} satisfies Story;