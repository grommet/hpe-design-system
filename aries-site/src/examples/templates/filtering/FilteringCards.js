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
const defaultHoursAvailable = [0, 40];
const getValues = field => {
  const results = [];
  allData.forEach(
    item => !results.includes(item[field]) && results.push(item[field]),
  );
  return results;
};

const locations = getValues('location');
const roles = getValues('role');
const statuses = getValues('status');
const names = getValues('name');

export const FilteringCards = ({ containerRef }) => {
  // containerRef above is for demo purposes only, remove in production
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
      background="background"
      fill
      gap="medium"
      margin="auto"
      pad={{ horizontal: 'medium' }}
      width={{ max: 'xxlarge' }}
    >
      <Header pad={{ top: 'medium' }}>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Users
          </Heading>
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
                data={data}
                filtering={filtering}
                setFiltering={setFiltering}
                setData={setData}
                filters={filters}
                setFilters={setFilters}
                filterData={filterData}
                // target is for demo purposes only, remove in production
                target={containerRef && containerRef.current}
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

FilteringCards.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Filters = ({
  filtering,
  filters,
  setFilters,
  filterData,
  setData,
  setFiltering,
  target, // target is for demo purposes only, remove in production
}) => {
  const [hoursAvailable, setHoursAvailable] = useState(defaultHoursAvailable);
  const [location, setLocation] = useState([]);
  const [role, setRole] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [status, setStatus] = useState([]);
  const [name, setName] = useState([]);
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setLocation([]);
    setHoursAvailable(defaultHoursAvailable);
    setStatus([]);
    setRole([]);
    setName([]);
    setFilters(defaultFilters);
    setFiltering(false);
  };

  // everytime the Filters layer opens, save a temp
  // of the previous filters and values in case user clicks "x"
  const storePreviousFilterInfo = () => {
    setPreviousFilters(filters);
    setPreviousValues({
      ...previousValues,
      location,
      hoursAvailable,
      role,
      status,
      name,
    });
  };

  const restoreValues = values => {
    setLocation(values.location);
    setHoursAvailable(values.hoursAvailable);
    setRole(values.role);
    setStatus(values.status);
    setName(values.name);
  };

  const content = (
    <Box flex overflow="auto" pad={{ horizontal: 'xsmall' }}>
      <Box flex={false}>
        <RoleFilter
          filters={filters}
          setFilters={setFilters}
          role={role}
          setRole={setRole}
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
        <NameFilter
          filters={filters}
          setFilters={setFilters}
          name={name}
          setName={setName}
        />
      </Box>
      <Box flex={false}>
        <LocationFilter
          filters={filters}
          setFilters={setFilters}
          location={location}
          setLocation={setLocation}
        />
      </Box>
      <Box flex={false}>
        <HoursAvailableFilter
          hoursAvailable={hoursAvailable}
          setHoursAvailable={setHoursAvailable}
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
          // target is for demo purposes only, remove in production
          target={target}
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
              <Button label="Reset Filters" onClick={resetFilters} secondary />
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
  target: PropTypes.object,
};

const RoleFilter = ({ filters, setFilters, role, setRole }) => (
  <FormField label="Role" name="role-a" htmlFor="role-a">
    <CheckBoxGroup
      id="rle-a"
      name="rle-a"
      options={roles}
      value={role}
      onChange={({ value }) => {
        setRole(value);
        const nextFilters = {
          ...filters,
          role: value.length && (nextRole => value.includes(nextRole)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

RoleFilter.propTypes = {
  filters: PropTypes.shape({
    role: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  role: PropTypes.array.isRequired,
  setRole: PropTypes.func.isRequired,
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
    role: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setStatus: PropTypes.func.isRequired,
};

const NameFilter = ({ filters, setFilters, setName, name }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Box margin={{ bottom: 'medium' }}>
      <FormField
        label="User"
        name="user-filter-a"
        htmlFor="user-filter-a"
        margin="none"
      >
        <CheckBoxGroup
          id="user-filter-a"
          name="user-filter-a"
          options={showMore ? names : names.slice(0, 3)}
          value={name}
          onChange={({ value }) => {
            setName(value);
            const nextFilters = {
              ...filters,
              name: value.length && (nextname => value.includes(nextname)),
            };
            setFilters(nextFilters);
          }}
        />
      </FormField>
      <Anchor
        label={showMore ? 'Show less' : 'Show more'}
        size="xsmall"
        onClick={() => setShowMore(!showMore)}
      />
    </Box>
  );
};

NameFilter.propTypes = {
  filters: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setName: PropTypes.func.isRequired,
};

const LocationFilter = ({ filters, setFilters, setLocation, location }) => (
  <FormField
    label="Location"
    htmlFor="location-filter-a"
    name="location-filter-a"
  >
    <CheckBoxGroup
      id="location-filter-a"
      name="location-filter-a"
      options={locations}
      value={location}
      onChange={({ value }) => {
        setLocation(value);
        const nextFilters = {
          ...filters,
          location:
            value.length && (nextLocation => value.includes(nextLocation)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

LocationFilter.propTypes = {
  filters: PropTypes.shape({
    role: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setLocation: PropTypes.func.isRequired,
};

const HoursAvailableFilter = ({
  hoursAvailable,
  setHoursAvailable,
  filters,
  setFilters,
}) => (
    <Box flex={false}>
      <FormField label="Remaining Available Work Hours">
        <Stack>
          <Box background="border" height="3px" direction="row" />
          <RangeSelector
            name="range-selector-employee-count"
            id="range-selector-employee-count"
            min={defaultHoursAvailable[0]}
            max={defaultHoursAvailable[1]}
            values={hoursAvailable}
            onChange={nextRange => {
              setHoursAvailable(nextRange);
              const nextFilters = {
                ...filters,
                hoursAvailable: nexthoursAvailable =>
                  nexthoursAvailable >= hoursAvailable[0] &&
                  nexthoursAvailable <= hoursAvailable[1],
              };
              setFilters(nextFilters);
            }}
          />
        </Stack>
      </FormField>
      <Text size="small">
        {`${hoursAvailable[0]} - ${hoursAvailable[1]} hours`}
      </Text>
    </Box>
  );

HoursAvailableFilter.propTypes = {
  filters: PropTypes.shape({
    role: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  hoursAvailable: PropTypes.arrayOf(PropTypes.number).isRequired,
  setHoursAvailable: PropTypes.func.isRequired,
};

const RecordSummary = ({ data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text size="small" weight="bold">
      {data.length}
    </Text>
    <Text size="small">
      {filtering ? `result${data.length > 1 ? 's' : ''} of ` : 'items'}
    </Text>
    {filtering && (
      <Box direction="row" gap="xxsmall">
        <Text size="small" weight="bold">
          {allData.length}
        </Text>
        <Text size="small">{`item${allData.length > 1 ? 's' : ''}`}</Text>
      </Box>
    )}
  </Box>
);

RecordSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
};

const Results = ({ data }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box overflow="auto" pad={{ bottom: 'medium' }} fill>
      <Grid
        columns={size !== 'small' ? 'small' : { count: 2, size: 'auto' }}
        gap={size !== 'small' ? 'medium' : 'small'}
        margin={{ top: 'small' }}
      >
        {data.map((datum, index) => (
          <StyledCard
            background="background"
            elevation="medium"
            key={index}
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
            }}
          >
            <CardBody gap="xsmall" justify="between">
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
                <Text color="text-strong">{datum.location}</Text>
              </Box>
              <Box>
                <Text size="small">Role</Text>
                <Text color="text-strong">{datum.role}</Text>
              </Box>
            </CardBody>
          </StyledCard>
        ))}
      </Grid>
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
};
