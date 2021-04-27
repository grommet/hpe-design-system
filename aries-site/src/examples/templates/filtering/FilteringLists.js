import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  CheckBoxGroup,
  Grid,
  FormField,
  Header,
  Heading,
  Layer,
  List,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';
import {
  Deliver,
  Filter,
  FormClose,
  Package,
  Search,
  StatusCritical,
  StatusGood,
} from 'grommet-icons';

const allData = [
  {
    name: 'My PVT Cloud Order',
    service: 'HPE GreenLake Private Cloud',
    status: 'Delivered',
    tenant: 'Coke',
  },
  {
    name: 'GEM_1',
    service: 'VMaaS for R&D',
    status: 'In Transit',
    tenant: 'Boeing',
  },
  {
    name: 'GEM_2',
    service: 'HPE GreenLake Private Cloud',
    status: 'Created',
    tenant: 'Coke',
  },
  {
    name: 'My PVT Cloud Order 2',
    service: 'Mercury',
    status: 'Cancelled',
    tenant: 'Boeing',
  },
  {
    name: 'Mercury 7',
    service: 'VMaaS for R&D',
    status: 'Ready to Ship',
    tenant: 'Suncor Energy',
  },
  {
    name: 'GEM_3',
    service: 'Mercury',
    status: 'Created',
    tenant: 'Coke',
  },
];

const statusIcons = {
  Cancelled: <StatusCritical />,
  Delivered: <StatusGood />,
  'In Transit': <Deliver />,
  'Ready to Ship': <Package />,
};

const getValues = field => {
  const results = [];
  allData.forEach(
    item => !results.includes(item[field]) && results.push(item[field]),
  );
  return results;
};

const defaultFilters = {};
const defaultservice = getValues('service');
const defaultTenant = getValues('tenant');
const defaultStatus = getValues('status');

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const FilteringLists = ({ containerRef }) => {
  // containerRef above is for demo purposes only, remove in production
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchFocused, setSearchFocused] = useState(false);
  const [search, setSearch] = useState('');
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
      <Header pad={{ vertical: 'medium' }}>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Orders
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
              <Button
                kind="tertiary"
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
                setSearch={setSearch}
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

FilteringLists.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const FilterButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const Filters = ({
  filters,
  setFilters,
  filterData,
  filtering,
  setData,
  setFiltering,
  setSearch,
  // target is for demo purposes only, remove in production
  target,
}) => {
  const [service, setService] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [status, setStatus] = useState([]);
  const [tenant, setTenant] = useState([]);
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setStatus([]);
    setService([]);
    setTenant([]);
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
      service,
      status,
      tenant,
    });
  };

  const restoreValues = values => {
    setTenant(values.tenant);
    setService(values.service);
    setStatus(values.status);
  };

  const content = (
    <Box width={size !== 'small' ? 'large' : undefined}>
      <Grid
        columns={size !== 'small' ? { count: 'fit', size: 'small' } : 'auto'}
        gap={size !== 'small' ? 'large' : undefined}
      >
        <Box flex={false}>
          <ServiceFilter
            filters={filters}
            setFilters={setFilters}
            service={service}
            setService={setService}
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
          <TenantFilter
            filters={filters}
            setFilters={setFilters}
            tenant={tenant}
            setTenant={setTenant}
          />
        </Box>
      </Grid>
    </Box>
  );

  return (
    <>
      <Box align="center" direction="row" gap="small">
        <FilterButton
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
          position={size !== 'small' ? 'center' : undefined}
          full={size === 'small' ? true : undefined}
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
            height={size !== 'small' ? { max: 'large' } : undefined}
            pad={{ horizontal: 'large', vertical: 'medium' }}
            gap="medium"
          >
            <Header>
              <Heading as="p" color="text-strong" level={1} margin="none">
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
  setSearch: PropTypes.func.isRequired,
  target: PropTypes.object,
};

const ServiceFilter = ({ filters, setFilters, service, setService }) => (
  <FormField label="Service" htmlFor="service-filter-a" name="service-filter-a">
    <CheckBoxGroup
      id="service-filter-a"
      name="service-filter-a"
      options={defaultservice}
      value={service}
      onChange={({ value }) => {
        setService(value);
        const nextFilters = {
          ...filters,
          service: value.length && (nextservice => value.includes(nextservice)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

ServiceFilter.propTypes = {
  filters: PropTypes.shape({
    service: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  service: PropTypes.array.isRequired,
  setService: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const StatusFilter = ({ filters, setFilters, setStatus, status }) => (
  <FormField label="Status" htmlFor="status-c" name="status-c">
    <CheckBoxGroup
      id="status-c"
      name="status-c"
      options={defaultStatus}
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
    service: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setStatus: PropTypes.func.isRequired,
};

const TenantFilter = ({ filters, setFilters, setTenant, tenant }) => (
  <FormField label="Tenant" id="tenant-c" htmlFor="tenant-c">
    <CheckBoxGroup
      id="tenant-c"
      name="tenant-c"
      options={defaultTenant}
      value={tenant}
      onChange={({ value }) => {
        setTenant(value);
        const nextFilters = {
          ...filters,
          tenant: value.length && (nextTenant => value.includes(nextTenant)),
        };
        setFilters(nextFilters);
      }}
    />
  </FormField>
);

TenantFilter.propTypes = {
  filters: PropTypes.shape({
    service: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  tenant: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setTenant: PropTypes.func.isRequired,
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
      service: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
};

const Results = ({ data }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      fill
      overflow="auto"
      pad={{ horizontal: 'xxsmall', bottom: 'medium', top: 'xxsmall' }}
    >
      <List
        action={(item, index) => (
          <Box key={index} align="center" direction="row" gap="small">
            {size !== 'small' && <Text color="text-strong">{item.status}</Text>}
            {statusIcons[item.status]}
          </Box>
        )}
        border="horizontal"
        data={data}
        onClickItem={() => {
          // eslint-disable-next-line no-alert
          alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
        }}
      >
        {(datum, index) => (
          <Box gap="xsmall" justify="between" key={index}>
            <Text color="text-strong" size="large" weight="bold">
              {datum.name}
            </Text>
            <Text color="text-strong">
              {datum.tenant} | {datum.service}
            </Text>
          </Box>
        )}
      </List>
    </Box>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      service: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};
