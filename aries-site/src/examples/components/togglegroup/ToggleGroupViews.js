import React, { useState } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataFilter,
  DataSearch,
  DataSummary,
  DataTable,
  List,
  Toolbar,
  ToggleGroup,
  Text,
} from 'grommet';
import { Table, List as ListIcon } from 'grommet-icons';

const columns = [
  {
    property: 'name',
    header: <Text>Name</Text>,
    primary: true,
  },
  {
    property: 'location',
    header: 'Location',
  },
];

const options = [
  {
    icon: <ListIcon a11yTitle="List view" />,
    value: 'list',
  },
  {
    icon: <Table a11yTitle="Map view" />,
    value: 'table',
  },
];

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

export const ToggleGroupViews = () => {
  const [value, setValue] = useState('list');
  console.log(value);
  return (
    <Box pad="large" width="large">
      <Data data={DATA}>
        <Toolbar>
          <DataSearch />
          <DataFilters layer>
            <DataFilter property="location" />
          </DataFilters>
          <ToggleGroup
            onToggle={e => {
              if (e.value.length) setValue(e.value);
            }}
            value={value}
            options={options}
          />
        </Toolbar>
        <DataSummary />
        {value === 'list' ? (
          <List primaryKey="name" secondaryKey="location" />
        ) : (
          <DataTable
            aria-describedby="name"
            columns={columns}
            alignSelf="start"
          />
        )}
      </Data>
    </Box>
  );
};
