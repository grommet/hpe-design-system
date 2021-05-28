import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  DataTable,
  DropButton,
  Header,
  Heading,
  Menu,
  ResponsiveContext,
  TextInput,
} from 'grommet';
import { Edit, Search } from 'grommet-icons';

import { Filters } from './Filters';
import { StyledButton } from './StyledButton';
import { RecordSummary } from './RecordSummary';
import { ColumnSettings } from './ColumnSettings';

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

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const TableCustomizationExample = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(COLUMNS);
  const inputRef = useRef();
  const size = useContext(ResponsiveContext);
  useEffect(() => {
    if (searchFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchFocused, setSearchFocused]);

  const filterData = (array, criteria, searchValue = search) => {
    if (Object.keys(criteria).length) setFiltering(true);
    else setFiltering(false);
    setFilters(criteria);

    let filterResults;
    const filterKeys = Object.keys(criteria);
    filterResults = array.filter(item =>
      // validates all filter criteria
      filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof criteria[key] !== 'function') return true;
        return criteria[key](item[key]);
      }),
    );

    if (searchValue) {
      filterResults = filterResults.filter(o =>
        Object.keys(o).some(
          k =>
            typeof o[k] === 'string' &&
            o[k].toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
    return filterResults;
  };

  return (
    <Box
      fill
      gap="medium"
      margin="auto"
      pad={{ horizontal: 'medium' }}
      width={{ max: 'xxlarge' }}
    >
      <Header pad={{ top: 'medium' }}>
        <Box gap="xsmall" fill="horizontal">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Users
          </Heading>
          <Box direction="row" justify="between">
            <Box>
              <Box align="center" direction="row" gap="small">
                {size !== 'small' || searchFocused ? (
                  <Box width="medium">
                    <StyledTextInput
                      ref={inputRef}
                      type="search"
                      icon={<Search id="search-icon" />}
                      placeholder="Search placeholder"
                      onBlur={() => setSearchFocused(false)}
                      value={search}
                      onChange={event => {
                        setSearch(event.target.value);
                        const nextData = filterData(
                          allData,
                          filters,
                          event.target.value,
                        );
                        setData(nextData);
                      }}
                    />
                  </Box>
                ) : (
                  <StyledButton
                    id="search-button"
                    icon={<Search />}
                    onClick={() => setSearchFocused(true)}
                  />
                )}
                {(size !== 'small' || !searchFocused) && (
                  <Filters
                    data={allData}
                    filtering={filtering}
                    setFiltering={setFiltering}
                    setData={setData}
                    filters={filters}
                    setFilters={setFilters}
                    filterData={filterData}
                    setSearch={setSearch}
                  />
                )}
              </Box>
              <RecordSummary
                data={allData}
                filteredData={data}
                filtering={filtering}
              />
            </Box>
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
      <Results data={data} columns={visibleColumns} />
    </Box>
  );
};

const Results = ({ data, columns }) => {
  const [select, setSelect] = useState([]);

  return (
    <Box fill="vertical" overflow="auto">
      <DataTable
        data={data}
        columns={columns}
        select={select}
        onSelect={setSelect}
        fill
        pin
      />
    </Box>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      hoursAvailable: PropTypes.number,
      location: PropTypes.string,
      name: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({ property: PropTypes.string, header: PropTypes.string }),
  ),
};
