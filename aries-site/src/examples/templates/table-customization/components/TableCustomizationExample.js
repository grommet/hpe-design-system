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
  {
    property: 'hoursAvailable',
    header: 'Hours Available',
    align: 'end',
    visible: true,
  },
];

const allData = [
  {
    location: 'San Jose, CA',
    hoursAvailable: 10,
    image:
      'https://images.unsplash.com/photo-1584704135557-d8bf7ca50eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    role: 'Engineer',
    name: 'Eric Soderberg',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    hoursAvailable: 30,
    image:
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    role: 'Engineer',
    name: 'Taylor Seamans',
    status: 'Online',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 25,
    image:
      'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
    role: 'Engineer',
    name: 'Matthew Glissmann',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 5,
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
    role: 'Designer',
    name: 'Greg Furuiye',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    hoursAvailable: 25,
    image:
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    role: 'Designer',
    name: 'Vicky Avalos',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 12,
    image:
      'https://images.unsplash.com/photo-1584450150050-4b9bdbd51f68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
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
  const [columns, setColumns] = useState(COLUMNS);
  const [visible, setVisible] = useState(() =>
    COLUMNS.map(col => col.property),
  );
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
                    columns={columns}
                    setColumns={setColumns}
                    visible={visible}
                    setVisible={setVisible}
                  />
                }
              />
              <Menu label="Actions" items={[]} />
            </Box>
          </Box>
        </Box>
      </Header>
      <Results
        data={data}
        columns={columns.filter(({ property }) => visible.includes(property))}
      />
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
      role: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  columns: PropTypes.array,
};
