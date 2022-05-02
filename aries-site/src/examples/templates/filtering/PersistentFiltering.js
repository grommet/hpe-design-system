import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
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
    alt: `City buildings with bikes and cars parked on the street on a 
    sunny day.`,
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
    alt: 'View overlooking central intersection of Madrid at sunset.',
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
    alt: `Valley of green grass and trees with yellow leaves surrounded by tall 
    mountains with snowy peaks.`,
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
    alt: `City buildings with bikes and cars parked on the street on a 
      sunny day.`,
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
    alt: `View from helicopter of New York City skyline with Empire State 
    Building at the center.`,
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
    alt: `View looking up at European style apartments with green trees on 
    the sides and a blue sky in the background.`,
    locationType: 'Customer Center',
    name: 'Amstelveen HQ, NL',
    status: 'Online',
  },
];

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

export function PersistentFiltering({ containerRef }) {
  // containerRef above is for demo purposes only, remove in production
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [filterValues, setFilterValues] = useState({
    country: allFilters.country.defaultValue,
    employeeCount: allFilters.employeeCount.defaultValue,
    locationType: allFilters.locationType.defaultValue,
    status: allFilters.status.defaultValue,
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState('');
  const size = useContext(ResponsiveContext);
  const inputRef = useRef();

  useEffect(() => {
    if (searchFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchFocused, setSearchFocused]);

  const filterData = useCallback(
    (array, criteria, searchValue = search) => {
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
    },
    [search],
  );

  useEffect(() => {
    const nextData = filterData(allData, filters);
    setData(nextData);
  }, [filters, filterData]);

  const filterProps = {
    data,
    setData,
    filterData,
    filters,
    setFilters,
    filtering,
    setFiltering,
    filterValues,
    setFilterValues,
    setSearch,
    // target is for demo purposes only, remove in production
    target: containerRef && containerRef.current,
  };

  return (
    <Box
      background="background"
      gap="large"
      width={{ max: 'xxlarge' }}
      margin="auto"
      overflow="auto"
      pad={{ horizontal: 'medium', top: 'small' }}
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
            {!['xsmall', 'small'].includes(size) || searchFocused ? (
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
              <Button
                kind="toolbar"
                id="search-button"
                icon={<Search />}
                onClick={() => setSearchFocused(true)}
              />
            )}
            {['xsmall', 'small'].includes(size) && !searchFocused && (
              <Filters {...filterProps} />
            )}
          </Box>
          <RecordSummary data={data} filtering={filtering} />
        </Box>
      </Header>
      <Box direction="row" fill>
        {!['xsmall', 'small'].includes(size) && <Filters {...filterProps} />}
        <Box fill>
          {!['xsmall', 'small'].includes(size) && (
            <ActiveFilters
              filters={filters}
              filterData={filterData}
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              setData={setData}
              setFilters={setFilters}
            />
          )}
          <Results data={data} />
        </Box>
      </Box>
    </Box>
  );
}

PersistentFiltering.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

function ActiveFilters({
  filterValues,
  setFilterValues,
  filters,
  filterData,
  setData,
  setFilters,
}) {
  const activeValues = Object.keys(filterValues)
    .filter(key => {
      if (key === 'employeeCount') {
        if (
          filterValues.employeeCount[0] ===
            allFilters.employeeCount.defaultValue[0] &&
          filterValues.employeeCount[1] ===
            allFilters.employeeCount.defaultValue[1]
        )
          return false;
        return true;
      }
      return true;
    })
    .reduce((obj, key) => {
      const reducedObject = obj;
      reducedObject[key] = filterValues[key];
      return reducedObject;
    }, {});

  return (
    <Box
      direction="row"
      gap="xsmall"
      pad={{ horizontal: 'medium', vertical: 'xxsmall' }}
      flex={false}
      wrap
    >
      {activeValues &&
        Object.entries(activeValues).map(([key, value], index) => {
          if (Array.isArray(value)) {
            // special case we show employeeCount as label
            if (key === 'employeeCount') {
              if (
                value[0] !== allFilters.employeeCount.defaultValue[0] ||
                value[1] !== allFilters.employeeCount.defaultValue[1]
              )
                return (
                  <Button
                    key={index}
                    label={allFilters[key].name}
                    icon={<FormClose />}
                    gap="xsmall"
                    onClick={() => {
                      const nextFilters = filters;
                      delete nextFilters[key];
                      setFilterValues({
                        ...filterValues,
                        employeeCount: allFilters.employeeCount.defaultValue,
                      });
                      setFilters(nextFilters);
                    }}
                    reverse
                  />
                );
            } else
              return value.map(option => (
                <Button
                  key={option}
                  label={option}
                  icon={<FormClose />}
                  gap="xsmall"
                  onClick={() => {
                    const nextValue = value.filter(a => a !== option);
                    const nextFilters = {
                      ...filters,
                      [key]:
                        nextValue.length &&
                        (incomingValue => nextValue.includes(incomingValue)),
                    };
                    if (!nextValue.length) delete nextFilters[key];
                    setFilterValues({ ...filterValues, [key]: nextValue });
                    setFilters(nextFilters);
                  }}
                  reverse
                />
              ));
          }
          return (
            <Button
              key={index}
              label={value}
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
          );
        })}
    </Box>
  );
}

ActiveFilters.propTypes = {
  filters: PropTypes.shape({}),
  filterValues: PropTypes.shape({
    employeeCount: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
};

function Filters({
  filters,
  setFilters,
  filtering,
  filterData,
  setData,
  setFiltering,
  filterValues,
  setFilterValues,
  setSearch,
  target, // target is for demo purposes only, remove in production
}) {
  const { country, employeeCount, locationType, status } = filterValues;
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setFilterValues({
      country: allFilters.country.defaultValue,
      employeeCount: allFilters.employeeCount.defaultValue,
      status: allFilters.status.defaultValue,
      locationType: allFilters.locationType.defaultValue,
    });
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
    setFilterValues({
      country: values.country,
      employeeCount: values.employeeCount,
      locationType: values.locationType,
      status: values.status,
    });
  };

  const filterProps = {
    filters,
    setFilters,
    filterValues,
    setFilterValues,
  };

  const content = (
    <Box>
      <Box flex={false}>
        <LocationTypeFilter {...filterProps} />
      </Box>
      <Box flex={false}>
        <StatusFilter {...filterProps} />
      </Box>
      <Box flex={false}>
        <CountryFilter {...filterProps} />
      </Box>
      <EmployeeCountFilter {...filterProps} />
    </Box>
  );

  return ['xsmall', 'small'].includes(size) ? (
    <>
      <Box align="center" direction="row" gap="small">
        <Button
          kind="toolbar"
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
          position={!['xsmall', 'small'].includes(size) ? 'right' : undefined}
          full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
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
}

Filters.propTypes = {
  filters: PropTypes.shape({}),
  filterValues: PropTypes.shape({
    country: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    employeeCount: PropTypes.arrayOf(PropTypes.number).isRequired,
    locationType: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }),
  setFilterValues: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filterData: PropTypes.func.isRequired,
  filtering: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  target: PropTypes.object,
};

function LocationTypeFilter({
  filters,
  setFilters,
  filterValues,
  setFilterValues,
}) {
  return <FormField
    label="Location Type"
    htmlFor="location-type-b"
    name="location-type-b"
  >
    <CheckBoxGroup
      id="location-type-b"
      name="location-type-b"
      options={allFilters.locationType.options}
      value={filters.locationType ? filterValues.locationType : []}
      onChange={({ value }) => {
        setFilterValues({ ...filterValues, locationType: value });
        const nextFilters = {
          ...filters,
          locationType:
            value.length &&
            (nextLocationType => value.includes(nextLocationType)),
        };
        if (!value.length) delete nextFilters.locationType;
        setFilters(nextFilters);
      }}
    />
  </FormField>;
}

LocationTypeFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterValues: PropTypes.shape({
    locationType: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
};

function StatusFilter({
  filters,
  setFilters,
  filterValues,
  setFilterValues,
}) {
  return <FormField label="Status" htmlFor="status-b" name="status-b">
    <CheckBoxGroup
      id="status-b"
      name="status-b"
      options={allFilters.status.options}
      value={filters.status ? filterValues.status : []}
      onChange={({ value }) => {
        setFilterValues({ ...filterValues, status: value });
        const nextFilters = {
          ...filters,
          status: value.length && (nextStatus => value.includes(nextStatus)),
        };
        if (!value.length) delete nextFilters.status;
        setFilters(nextFilters);
      }}
    />
  </FormField>;
}

StatusFilter.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterValues: PropTypes.shape({
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
};

function CountryFilter({
  filters,
  setFilters,
  filterValues,
  setFilterValues,
}) {
  return <FormField label="Country" htmlFor="country-b" name="country-b">
    <CheckBoxGroup
      id="country-b"
      name="country-b"
      options={allFilters.country.options}
      value={filters.country ? filterValues.country : []}
      onChange={({ value }) => {
        setFilterValues({ ...filterValues, country: value });
        const nextFilters = {
          ...filters,
          country: value.length && (nextCountry => value.includes(nextCountry)),
        };
        if (!value.length) delete nextFilters.country;
        setFilters(nextFilters);
      }}
    />
  </FormField>;
}

CountryFilter.propTypes = {
  filters: PropTypes.shape({
    country: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterValues: PropTypes.shape({
    country: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
};

function EmployeeCountFilter({
  filters,
  setFilters,
  filterValues,
  setFilterValues,
}) {
  return <Box flex={false}>
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
              ? filterValues.employeeCount
              : allFilters.employeeCount.defaultValue
          }
          onChange={nextRange => {
            setFilterValues({ ...filterValues, employeeCount: nextRange });
            const nextFilters = {
              ...filters,
              employeeCount: nextEmployeeCount =>
                nextEmployeeCount >= filterValues.employeeCount[0] &&
                nextEmployeeCount <= filterValues.employeeCount[1],
            };
            if (
              nextRange[0] === allFilters.employeeCount.defaultValue[0] &&
              nextRange[1] === allFilters.employeeCount.defaultValue[1]
            ) {
              delete nextFilters.employeeCount;
            }
            setFilters(nextFilters);
          }}
        />
      </Stack>
    </FormField>
    <Text size="small">
      {`${filterValues.employeeCount[0]} - 
        ${filterValues.employeeCount[1]} people`}
    </Text>
  </Box>;
}

EmployeeCountFilter.propTypes = {
  filters: PropTypes.shape({
    employeeCount: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterValues: PropTypes.shape({
    employeeCount: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  setFilterValues: PropTypes.func.isRequired,
};

function RecordSummary({ data, filtering }) {
  return <Box direction="row" gap="xxsmall">
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
  </Box>;
}

RecordSummary.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filtering: PropTypes.bool.isRequired,
};

function Results({ data }) {
  const size = useContext(ResponsiveContext);

  return (
    <Box overflow="auto" fill>
      <Grid
        columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
        gap="medium"
        pad={!['xsmall', 'small'].includes(size) ? 'medium' : 'small'}
      >
        {data.map((datum, index) => (
          <Card
            background="background"
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
              <Image alt={datum.alt} src={datum.image} fit="cover" />
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
                <Text size="small">Location Type</Text>
                <Text color="text-strong">{datum.locationType}</Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}

Results.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
