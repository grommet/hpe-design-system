import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CheckBoxGroup,
  FormField,
  Image,
  Header,
  Heading,
  Grid,
  Layer,
  RangeSelector,
  ResponsiveContext,
  Stack,
  Text,
  TextInput,
} from 'grommet';
import { Filter, FormClose, Search } from 'grommet-icons';

const allData = [
  {
    address: 'Engholm Parkvej 8, Ground Floor, Alleroed, DK-3450, Denmark',
    country: 'Denmark',
    employeeCount: 200,
    image:
      'https://images.unsplash.com/photo-1584704135557-d8bf7ca50eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Office',
    name: 'Allerod, Denmark (ALL)',
    status: 'Online',
  },
  {
    address: 'Vicente Aleixandre 1, Las Rozas, 28232, Spain',
    country: 'Spain',
    employeeCount: 700,
    image:
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Office',
    name: 'Madrid, Spain (ESM)',
    status: 'Offline',
  },
  {
    address:
      '3404 E Harmony Road, Fort Collins, Colorado, 80528, United States',
    country: 'United States',
    employeeCount: 1100,
    image:
      'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
    locationType: 'Office',
    name: 'Fort Collins, CO',
    status: 'Online',
  },
  {
    address:
      '6280 America Center Dr., San Jose, California, 95002, United States',
    country: 'United States',
    employeeCount: 1000,
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
    locationType: 'Customer Center',
    name: 'WW Corporate Headquarters - San Jose, CA',
    status: 'Online',
  },
  {
    address: '461 Fifth Avenue, New York, NY, 10017, United States',
    country: 'United States',
    employeeCount: 300,
    image:
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Customer Center',
    name: 'New York, NY',
    status: 'Offline',
  },
  {
    address: `Stroombaan 16, 1181 VX Amstelveen, 
    Amstelveen, The Netherlands`,
    country: 'Netherlands',
    employeeCount: 500,
    image:
      'https://images.unsplash.com/photo-1584450150050-4b9bdbd51f68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Customer Center',
    name: 'Amstelveen HQ, NL',
    status: 'Online',
  },
];

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  :focus,
  :hover {
    transform: scale(1.01, 1.01);
  }
`;

const StyledButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const defaultFilters = {};

const allFilters = {
  country: {
    name: 'Country',
    options: ['Denmark', 'Netherlands', 'Spain', 'United States'],
    defaultValue: [],
  },
  employeeCount: {
    name: 'Employee Count',
    options: [0, 2000],
    defaultValue: [0, 2000],
  },
  locationType: {
    name: 'Location Type',
    options: ['Customer Center', 'Office'],
    defaultValue: [],
  },
  status: {
    name: 'Status',
    options: ['Online', 'Offline'],
    defaultValue: [],
  },
};

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const PersistentFiltering = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState();
  const size = useContext(ResponsiveContext);
  const inputRef = useRef();

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
    filterResults = array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof criteria[key] !== 'function') return true;
        return criteria[key](item[key]);
      });
    });

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

  const filterProps = {
    data,
    setData,
    filterData,
    filters,
    setFilters,
    filtering,
    setFiltering,
    setSearch,
  };

  return (
    <Box
      gap="large"
      width={{ max: 'xxlarge' }}
      margin="auto"
      overflow="auto"
      pad={{ horizontal: 'small', top: 'small' }}
      fill
    >
      <Header>
        <Box gap="xsmall">
          <Heading
            color="text-strong"
            level={1}
            margin={{ bottom: 'small', top: 'none' }}
          >
            Sites
          </Heading>
          <Box align="center" direction="row" gap="small">
            {size !== 'small' || searchFocused ? (
              <Box width="medium">
                <StyledTextInput
                  ref={inputRef}
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
            {size === 'small' && !searchFocused && <Filters {...filterProps} />}
          </Box>
          <RecordSummary data={data} filtering={filtering} />
        </Box>
      </Header>
      <Box direction="row" fill>
        {size !== 'small' && <Filters {...filterProps} />}
        <Box fill>
          {size !== 'small' && (
            <ActiveFilters
              filters={filters}
              filterData={filterData}
              setData={setData}
              setFilters={setFilters}
            />
          )}
          <Results data={data} />
        </Box>
      </Box>
    </Box>
  );
};

const ActiveFilters = ({ filters, filterData, setData, setFilters }) => {
  return (
    <Box
      direction="row"
      gap="xsmall"
      pad={{ horizontal: 'medium', vertical: 'xxsmall' }}
      flex={false}
    >
      {filters &&
        Object.keys(filters).map((key, index) => (
          <Button
            key={index}
            label={allFilters[key].name}
            icon={<FormClose />}
            gap="xsmall"
            onClick={() => {
              const nextFilters = filters;
              delete nextFilters[key];
              const nextData = filterData(allData, nextFilters);
              setData(nextData);
              setFilters(nextFilters);
            }}
            reverse
          />
        ))}
    </Box>
  );
};

ActiveFilters.propTypes = {
  filters: PropTypes.shape({}),
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const Filters = ({
  filters,
  setFilters,
  filtering,
  filterData,
  setData,
  setFiltering,
  setSearch,
}) => {
  const [employeeCount, setEmployeeCount] = useState(
    allFilters.employeeCount.defaultValue,
  );
  const [country, setCountry] = useState(allFilters.country.defaultValue);
  const [locationType, setLocationType] = useState(
    allFilters.locationType.defaultValue,
  );
  const [status, setStatus] = useState(allFilters.status.defaultValue);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setCountry(allFilters.country.defaultValue);
    setEmployeeCount(allFilters.employeeCount.defaultValue);
    setStatus(allFilters.status.defaultValue);
    setLocationType(allFilters.locationType.defaultValue);
    setFilters(defaultFilters);
    setFiltering(false);
    setSearch('');
  };

  // everytime the Filters layer opens, save a temp
  // of the previous filters and values in case user clicks "x"
  const storePreviousFilterInfo = () => {
    setPreviousFilters(filters);
    setPreviousValues({
      ...previousValues,
      country,
      employeeCount,
      locationType,
      status,
    });
  };

  const restoreValues = values => {
    setCountry(values.country);
    setEmployeeCount(values.employeeCount);
    setLocationType(values.locationType);
    setStatus(values.status);
  };

  const content = (
    <Box>
      <Box flex={false}>
        <LocationTypeFilter
          setData={setData}
          filterData={filterData}
          filters={filters}
          setFilters={setFilters}
          locationType={locationType}
          setLocationType={setLocationType}
        />
      </Box>
      <Box flex={false}>
        <StatusFilter
          setData={setData}
          filterData={filterData}
          filters={filters}
          setFilters={setFilters}
          status={status}
          setStatus={setStatus}
        />
      </Box>
      <Box flex={false}>
        <CountryFilter
          setData={setData}
          filterData={filterData}
          filters={filters}
          setFilters={setFilters}
          country={country}
          setCountry={setCountry}
        />
      </Box>
      <EmployeeCountFilter
        setData={setData}
        filterData={filterData}
        employeeCount={employeeCount}
        setEmployeeCount={setEmployeeCount}
        filters={filters}
        setFilters={setFilters}
      />
    </Box>
  );

  return size === 'small' ? (
    <>
      <Box align="center" direction="row" gap="small">
        <StyledButton
          icon={<Filter />}
          onClick={() => {
            setShowLayer(true);
            storePreviousFilterInfo();
          }}
        />
        {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
      </Box>
      {showLayer && (
        <Layer
          position={size !== 'small' ? 'right' : undefined}
          full={size !== 'small' ? 'vertical' : true}
          modal
          onClickOutside={() => {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
          onEsc={() => {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
        >
          <Box
            alignSelf="center"
            width={{ min: 'medium' }}
            pad={{ horizontal: 'large', vertical: 'medium' }}
            gap="medium"
            fill="vertical"
          >
            <Header>
              <Heading as="p" color="text-strong" margin="none">
                Filters
              </Heading>
              <Button
                icon={<FormClose />}
                onClick={() => {
                  filterData(allData, previousFilters);
                  restoreValues(previousValues);
                  setShowLayer(!showLayer);
                }}
              />
            </Header>
            {/* pad needed so focus indicator doesn't get cut off */}
            <Box pad="xxsmall" overflow="auto" flex>
              {content}
            </Box>
            <Box align="center" direction="row" gap="small">
              <Button
                label="Apply Filters"
                onClick={() => {
                  const nextData = filterData(allData, filters);
                  setData(nextData);
                  setShowLayer(!showLayer);
                }}
                primary
              />
              <Button
                label="Reset Filters"
                onClick={() => {
                  resetFilters();
                  setShowLayer(!showLayer);
                }}
                secondary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  ) : (
    <Box
      width="medium"
      gap="medium"
      border={{ side: 'right' }}
      pad={{ right: 'medium', left: 'xxsmall' }}
      fill="vertical"
      overflow="auto"
    >
      <Header>
        <Text color="text-strong" margin="none" size="xxlarge" weight="bold">
          Filters
        </Text>
        {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
      </Header>
      {content}
    </Box>
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({}),
  setFilters: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  filtering: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
};

const LocationTypeFilter = ({
  filterData,
  setData,
  filters,
  setFilters,
  locationType,
  setLocationType,
}) => {
  useEffect(() => {
    if (!filters.locationType) {
      setLocationType(allFilters.locationType.defaultValue);
    }
  }, [filters, setLocationType]);
  return (
    <FormField
      label="Location Type"
      htmlFor="location-type-b"
      name="location-type-b"
    >
      <CheckBoxGroup
        id="location-type-b"
        name="location-type-b"
        options={allFilters.locationType.options}
        value={filters.locationType ? locationType : []}
        onChange={({ value }) => {
          setLocationType(value);
          const nextFilters = {
            ...filters,
            locationType:
              value.length &&
              (nextLocationType => value.includes(nextLocationType)),
          };
          if (!value.length) delete nextFilters.locationType;
          setFilters(nextFilters);
          const nextData = filterData(allData, nextFilters);
          setData(nextData);
        }}
      />
    </FormField>
  );
};

LocationTypeFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  locationType: PropTypes.array.isRequired,
  setLocationType: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const StatusFilter = ({
  filterData,
  setData,
  filters,
  setFilters,
  setStatus,
  status,
}) => {
  useEffect(() => {
    if (!filters.status) {
      setStatus(allFilters.status.defaultValue);
    }
  }, [filters, setStatus]);
  return (
    <FormField label="Status" htmlFor="status-b" name="status-b">
      <CheckBoxGroup
        id="status-b"
        name="status-b"
        options={allFilters.status.options}
        value={filters.status ? status : []}
        onChange={({ value }) => {
          setStatus(value);
          const nextFilters = {
            ...filters,
            status: value.length && (nextStatus => value.includes(nextStatus)),
          };
          if (!value.length) delete nextFilters.status;
          setFilters(nextFilters);
          const nextData = filterData(allData, nextFilters);
          setData(nextData);
        }}
      />
    </FormField>
  );
};

StatusFilter.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setStatus: PropTypes.func.isRequired,
};

const CountryFilter = ({
  filterData,
  setData,
  filters,
  setFilters,
  setCountry,
  country,
}) => {
  useEffect(() => {
    if (!filters.country) {
      setCountry(allFilters.country.defaultValue);
    }
  }, [filters, setCountry]);
  return (
    <FormField label="Country" htmlFor="country-b" name="country-b">
      <CheckBoxGroup
        id="country-b"
        name="country-b"
        options={allFilters.country.options}
        value={filters.country ? country : []}
        onChange={({ value }) => {
          setCountry(value);
          const nextFilters = {
            ...filters,
            country:
              value.length && (nextCountry => value.includes(nextCountry)),
          };
          if (!value.length) delete nextFilters.country;
          setFilters(nextFilters);
          const nextData = filterData(allData, nextFilters);
          setData(nextData);
        }}
      />
    </FormField>
  );
};

CountryFilter.propTypes = {
  filters: PropTypes.shape({
    country: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setCountry: PropTypes.func.isRequired,
};

const EmployeeCountFilter = ({
  employeeCount,
  setEmployeeCount,
  filters,
  filterData,
  setData,
  setFilters,
}) => {
  useEffect(() => {
    if (!filters.employeeCount) {
      setEmployeeCount(allFilters.employeeCount.defaultValue);
    }
  }, [filters, setEmployeeCount]);
  return (
    <Box flex={false}>
      <FormField
        label="Employee Count"
        htmlFor="employee-count-b"
        name="employee-count-b"
      >
        <Stack>
          <Box background="border" height="3px" direction="row" />
          <RangeSelector
            id="employee-count-b"
            name="employee-count-b"
            min={0}
            max={2000}
            values={
              filters.employeeCount
                ? employeeCount
                : allFilters.employeeCount.defaultValue
            }
            onChange={nextRange => {
              setEmployeeCount(nextRange);
              const nextFilters = {
                ...filters,
                employeeCount: nextEmployeeCount =>
                  nextEmployeeCount >= employeeCount[0] &&
                  nextEmployeeCount <= employeeCount[1],
              };
              if (
                nextRange[0] === allFilters.employeeCount.defaultValue[0] &&
                nextRange[1] === allFilters.employeeCount.defaultValue[1]
              ) {
                delete nextFilters.employeeCount;
              }
              setFilters(nextFilters);
              const nextData = filterData(allData, nextFilters);
              setData(nextData);
            }}
          />
        </Stack>
      </FormField>
      <Text size="small">
        {`${employeeCount[0]} - ${employeeCount[1]} people`}
      </Text>
    </Box>
  );
};

EmployeeCountFilter.propTypes = {
  filters: PropTypes.shape({
    employeeCount: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  employeeCount: PropTypes.arrayOf(PropTypes.number).isRequired,
  setEmployeeCount: PropTypes.func.isRequired,
};

const RecordSummary = ({ data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text color="text-weak" size="small" weight="bold">
      {data.length}
    </Text>
    <Text color="text-weak" size="small">
      {filtering ? 'results of ' : 'items'}
    </Text>
    {filtering && (
      <Box direction="row" gap="xxsmall">
        <Text color="text-weak" size="small" weight="bold">
          {allData.length}
        </Text>
        <Text color="text-weak" size="small">
          items
        </Text>
      </Box>
    )}
  </Box>
);

RecordSummary.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filtering: PropTypes.bool.isRequired,
};

const Results = ({ data }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box overflow="auto" fill>
      <Grid
        columns={size !== 'small' ? 'medium' : '100%'}
        gap="medium"
        pad={size !== 'small' ? 'medium' : 'small'}
      >
        {data.map((datum, index) => (
          <StyledCard
            key={index}
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
            }}
          >
            <Box height="small" fill="horizontal">
              <Image src={datum.image} fit="cover" />
            </Box>
            <CardBody gap="xsmall" pad="medium" justify="between">
              <Box flex={false}>
                <Box align="center" direction="row" gap="xsmall">
                  <Box
                    background={
                      datum.status === 'Online' ? 'brand' : 'text-weak'
                    }
                    pad="xsmall"
                    round
                  />
                  <Text color="text-strong">{datum.status}</Text>
                </Box>
                <Text color="text-strong" size="large" weight="bold">
                  {datum.name}
                </Text>
                <Text color="text-strong">{datum.address}</Text>
              </Box>
              <Box>
                <Text color="text-weak" size="small">
                  Location Type
                </Text>
                <Text color="text-strong">{datum.locationType}</Text>
              </Box>
            </CardBody>
          </StyledCard>
        ))}
      </Grid>
    </Box>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
