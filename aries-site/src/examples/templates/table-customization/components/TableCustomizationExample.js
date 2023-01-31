import React, { useState } from 'react';
import {
  Box,
  Data,
  DataTable,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTableColumns,
  Header,
  Heading,
  Menu,
  Page,
  PageContent,
  Toolbar,
} from 'grommet';

const COLUMNS = [
  { property: 'name', header: 'Name', primary: true, pin: true },
  { property: 'status', header: 'Status' },
  { property: 'role', header: 'Role' },
  { property: 'location', header: 'Location' },
  { property: 'hoursAvailable', header: 'Hours available', align: 'end' },
];

const allData = [
  {
    location: 'San Jose, CA',
    hoursAvailable: 10,
    role: 'Engineer',
    name: 'Eric Soderberg',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    hoursAvailable: 30,
    role: 'Engineer',
    name: 'Taylor Seamans',
    status: 'Online',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 25,
    role: 'Engineer',
    name: 'Matthew Glissmann',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 5,
    role: 'Designer',
    name: 'Greg Furuiye',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    hoursAvailable: 25,
    role: 'Designer',
    name: 'Vicky Avalos',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 12,
    role: 'Engineer',
    name: 'Shimi Yacobi',
    status: 'Online',
  },
];

// Define which attributes should be made available for the user
// to filter upon
const filtersConfig = [
  { property: 'name', label: 'Name', filterType: 'CheckBoxGroup' },
  { property: 'status', label: 'Status', filterType: 'CheckBoxGroup' },
  { property: 'role', label: 'Role', filterType: 'CheckBoxGroup' },
  {
    property: 'location',
    label: 'Location',
    filterType: 'CheckBoxGroup',
  },
  {
    property: 'hoursAvailable',
    label: 'Remaining hours available',
    filterType: 'RangeSelector',
    inputProps: {
      min: 0,
      max: 40,
      valueRange: '0 - 40 hours',
    },
  },
];

export const TableCustomizationExample = () => (
  <Page background="background" fill>
    <PageContent>
      <Box gap="medium">
        <Header pad={{ top: 'medium' }}>
          <Heading id="users-heading" level={2} margin="none">
            Users
          </Heading>
        </Header>
        <Results />
      </Box>
    </PageContent>
  </Page>
);

const Results = () => {
  const [select, setSelect] = useState([]);

  return (
    <Data data={allData} updateOn="change" flex>
      <Toolbar>
        <DataSearch />
        <DataTableColumns drop options={filtersConfig} />
        <DataFilters layer />
        <Box flex />
        <Menu label="Actions" kind="toolbar" />
      </Toolbar>
      <DataSummary />
      <Box overflow="auto" flex>
        <DataTable
          aria-describedby="users-heading"
          background="background"
          columns={COLUMNS}
          select={select}
          onSelect={setSelect}
          pin
        />
      </Box>
    </Data>
  );
};
