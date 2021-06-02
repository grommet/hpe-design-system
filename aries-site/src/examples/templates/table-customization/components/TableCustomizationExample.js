import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, DataTable, DropButton, Header, Heading, Menu } from 'grommet';
import { Edit } from 'grommet-icons';

import { ColumnSettings } from './ColumnSettings';
import {
  FilterControls,
  FiltersProvider,
  useFilters,
} from '../../FilterControls';

const COLUMNS = [
  { property: 'name', header: 'Name', primary: true, pin: true },
  { property: 'status', header: 'Status' },
  { property: 'role', header: 'Role' },
  { property: 'location', header: 'Location' },
  { property: 'hoursAvailable', header: 'Hours Available', align: 'end' },
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
  { property: 'role', label: 'Role', filterType: 'CheckBoxGroup' },
  { property: 'status', label: 'Status', filterType: 'CheckBoxGroup' },
  {
    property: 'location',
    label: 'Location',
    filterType: 'CheckBoxGroup',
  },
  {
    property: 'hoursAvailable',
    label: 'Remaining Hours Available',
    filterType: 'RangeSelector',
    inputProps: {
      min: 0,
      max: 40,
      valueRange: '0 - 40 hours',
    },
  },
  { property: 'name', label: 'Name', filterType: 'CheckBoxGroup' },
];

export const TableCustomizationExample = () => {
  const [visibleColumns, setVisibleColumns] = useState(COLUMNS);

  return (
    <Box
      fill
      gap="medium"
      margin="auto"
      pad={{ horizontal: 'medium' }}
      width={{ max: 'xxlarge' }}
    >
      <FiltersProvider>
        <Header pad={{ top: 'medium' }}>
          <Box gap="xsmall" fill="horizontal">
            <Heading level={2} margin="none">
              Users
            </Heading>
            <Box direction="row" justify="between">
              <FilterControls
                data={allData}
                filters={filtersConfig}
                searchFilter={{ placeholder: 'Search users...' }}
              />
              <Box direction="row" height="fit-content">
                <DropButton
                  icon={<Edit />}
                  dropAlign={{ top: 'bottom', right: 'right' }}
                  dropContent={
                    <ColumnSettings
                      columns={COLUMNS}
                      visibleColumns={visibleColumns}
                      setVisibleColumns={setVisibleColumns}
                    />
                  }
                />
                <Menu label="Actions" items={[]} />
              </Box>
            </Box>
          </Box>
        </Header>
        <Results columns={visibleColumns} />
      </FiltersProvider>
    </Box>
  );
};

const Results = ({ columns }) => {
  const [select, setSelect] = useState([]);
  const { filteredResults } = useFilters();

  return (
    <Box fill overflow="auto">
      <DataTable
        data={filteredResults}
        columns={columns}
        select={select}
        onSelect={setSelect}
        pin
      />
    </Box>
  );
};

Results.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ property: PropTypes.string, header: PropTypes.string }),
  ),
};
