import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  CheckBoxGroup,
  Grid,
  Header,
  Heading,
  Layer,
  List,
  ResponsiveContext,
  Text,
} from 'grommet';
import {
  Deliver,
  Filter,
  FormClose,
  Package,
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

const defaultFilters = {};
const defaultservice = [
  'HPE GreenLake Private Cloud',
  'Mercury',
  'VMaaS for R&D',
];
const defaultTenant = ['Boeing', 'Coke', 'Suncor Energy'];
const defaultStatus = [
  'Cancelled',
  'Created',
  'Delivered',
  'In Transit',
  'Ready to Ship',
];

export const FilteringLists = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);

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
            Orders
          </Heading>
          <Filters
            data={data}
            filtering={filtering}
            setFiltering={setFiltering}
            setData={setData}
          />
          <RecordSummary data={data} filtering={filtering} />
        </Box>
      </Header>
      <Results data={data} />
    </Box>
  );
};

const FilterButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const Filters = ({ filtering, setData, setFiltering }) => {
  const [filters, setFilters] = useState(defaultFilters);
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

  const filterData = (array, criteria) => {
    if (Object.keys(criteria).length) setFiltering(true);
    setFilters(criteria);

    const filterKeys = Object.keys(criteria);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof criteria[key] !== 'function') return true;
        return criteria[key](item[key]);
      });
    });
  };

  const content = (
    <Box width={size !== 'small' ? 'large' : undefined} overflow="auto">
      <Grid
        columns={size !== 'small' ? { count: 'fit', size: 'small' } : 'auto'}
        gap="large"
      >
        <Box gap="xsmall">
          <Text color="text-strong" size="large" weight="bold">
            Service
          </Text>
          <ServiceFilter
            filters={filters}
            setFilters={setFilters}
            service={service}
            setService={setService}
          />
        </Box>
        <Box gap="xsmall">
          <Text color="text-strong" size="large" weight="bold">
            Status
          </Text>
          <StatusFilter
            filters={filters}
            setFilters={setFilters}
            status={status}
            setStatus={setStatus}
          />
        </Box>
        <Box gap="xsmall">
          <Text color="text-strong" size="large" weight="bold">
            Tenant
          </Text>
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
            height={size !== 'small' ? { max: 'large' } : undefined}
            pad="medium"
            gap="medium"
          >
            <Header>
              <Text color="text-strong" size="xxlarge" weight="bold">
                Filters
              </Text>
              <Button
                icon={<FormClose />}
                onClick={() => {
                  filterData(allData, previousFilters);
                  restoreValues(previousValues);
                  setShowLayer(!showLayer);
                }}
              />
            </Header>
            {content}
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
  filtering: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

const ServiceFilter = ({ filters, setFilters, service, setService }) => (
  <CheckBoxGroup
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
  <CheckBoxGroup
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
  <CheckBoxGroup
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
      service: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
};

const Results = ({ data }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box fill overflow="auto">
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
          <Box key={index}>
            <Box direction="row" gap="small">
              {/* <Box
                flex={false}
                height="xxsmall"
                width="xxsmall"
                round="small"
                overflow="hidden"
              >
                <Image src={datum.image} fit="cover" />
              </Box> */}

              <Box gap="xsmall" justify="between">
                <Text color="text-strong" size="large" weight="bold">
                  {datum.name}
                </Text>
                <Text color="text-strong">
                  {datum.tenant} | {datum.service}
                </Text>
              </Box>
            </Box>
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
