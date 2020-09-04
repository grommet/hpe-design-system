import React, { useContext, useEffect, useRef, useState } from 'react';
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

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

const defaultFilters = {};
const defaultEmployeeCount = [0, 2000];
const countries = ['Denmark', 'Netherlands', 'Spain', 'United States'];
const locationTypes = ['Customer Center', 'Office'];
const statuses = ['Online', 'Offline'];

export const FilteringCards = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState();
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

  return (
    <Box
      fill
      gap="medium"
      margin="auto"
      overflow="auto"
      pad="medium"
      width={{ max: 'xxlarge' }}
    >
      <Header>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
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
            {(size !== 'small' || !searchFocused) && (
              <Filters
                data={data}
                filtering={filtering}
                setFiltering={setFiltering}
                setData={setData}
                filters={filters}
                setFilters={setFilters}
                filterData={filterData}
              />
            )}
          </Box>

          <RecordSummary data={data} filtering={filtering} />
        </Box>
      </Header>
      <Results data={data} />
    </Box>
  );
};

const Filters = ({
  filtering,
  filters,
  setFilters,
  filterData,
  setData,
  setFiltering,
}) => {
  const [employeeCount, setEmployeeCount] = useState(defaultEmployeeCount);
  const [country, setCountry] = useState([]);
  const [locationType, setLocationType] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [status, setStatus] = useState([]);
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setCountry([]);
    setEmployeeCount(defaultEmployeeCount);
    setStatus([]);
    setLocationType([]);
    setFilters(defaultFilters);
    setFiltering(false);
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
    <Box flex overflow="auto" pad={{ horizontal: 'xsmall' }}>
      <Box flex={false}>
        <LocationTypeFilter
          filters={filters}
          setFilters={setFilters}
          locationType={locationType}
          setLocationType={setLocationType}
        />
      </Box>
      <Box flex={false}>
        <StatusFilter
          filters={filters}
          setFilters={setFilters}
          status={status}
          setStatus={setStatus}
        />
      </Box>
      <Box flex={false}>
        <CountryFilter
          filters={filters}
          setFilters={setFilters}
          country={country}
          setCountry={setCountry}
        />
      </Box>
      <Box flex={false}>
        <EmployeeCountFilter
          employeeCount={employeeCount}
          setEmployeeCount={setEmployeeCount}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
    </Box>
  );

  return (
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
            width={{ min: 'medium' }}
            pad={{ horizontal: 'medium', vertical: 'medium' }}
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
            <Box pad="xsmall" overflow="auto" flex>
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
  );
};

Filters.propTypes = {
  filters: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func.isRequired,
  filtering: PropTypes.bool.isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

const LocationTypeFilter = ({
  filters,
  setFilters,
  locationType,
  setLocationType,
}) => (
  <FormField
    label="Location Type"
    name="location-type-a"
    htmlFor="location-type-a"
  >
    <CheckBoxGroup
      id="location-type-a"
      name="location-type-a"
      options={locationTypes}
      value={locationType}
      onChange={({ value }) => {
        setLocationType(value);
        const nextFilters = {
          ...filters,
          locationType:
            value.length &&
            (nextLocationType => value.includes(nextLocationType)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

LocationTypeFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  locationType: PropTypes.array.isRequired,
  setLocationType: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const StatusFilter = ({ filters, setFilters, setStatus, status }) => (
  <FormField label="Status" name="status-filter-a" htmlFor="status-filter-a">
    <CheckBoxGroup
      id="status-filter-a"
      name="status-filter-a"
      options={statuses}
      value={status}
      onChange={({ value }) => {
        setStatus(value);
        const nextFilters = {
          ...filters,
          status: value.length && (nextStatus => value.includes(nextStatus)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

StatusFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setStatus: PropTypes.func.isRequired,
};

const CountryFilter = ({ filters, setFilters, setCountry, country }) => (
  <FormField label="Country" htmlFor="country-filter-a" name="country-filter-a">
    <CheckBoxGroup
      id="country-filter-a"
      name="country-filter-a"
      options={countries}
      value={country}
      onChange={({ value }) => {
        setCountry(value);
        const nextFilters = {
          ...filters,
          country: value.length && (nextCountry => value.includes(nextCountry)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

CountryFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
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
  setFilters,
}) => {
  return (
    <Box flex={false}>
      <FormField label="Employee Count" pad="medium">
        <Stack>
          <Box background="border" height="3px" direction="row" />
          <RangeSelector
            name="range-selector-employee-count"
            id="range-selector-employee-count"
            min={0}
            max={2000}
            values={employeeCount}
            onChange={nextRange => {
              setEmployeeCount(nextRange);
              const nextFilters = {
                ...filters,
                employeeCount: nextEmployeeCount =>
                  nextEmployeeCount >= employeeCount[0] &&
                  nextEmployeeCount <= employeeCount[1],
              };
              setFilters(nextFilters);
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
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      locationType: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
};

const Results = ({ data }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="medium">
      {data.map((datum, index) => (
        <StyledCard
          background="background-contrast"
          key={index}
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
          }}
        >
          <CardBody gap="xsmall" pad="medium" justify="between">
            <Box flex={false}>
              <Box align="center" direction="row" gap="xsmall">
                <Box
                  background={datum.status === 'Online' ? 'brand' : 'text-weak'}
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
              <Text size="small">Location Type</Text>
              <Text color="text-strong">{datum.locationType}</Text>
            </Box>
          </CardBody>
        </StyledCard>
      ))}
    </Grid>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      locationType: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};
