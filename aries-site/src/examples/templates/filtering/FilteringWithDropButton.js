import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Card,
  CheckBoxGroup,
  DropButton,
  FormField,
  Form,
  Header,
  Heading,
  Grid,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Filter } from 'grommet-icons';

const allData = [
  {
    deviceType: 'MacOS',
    name: '54678GI468038489UF466238sl',
    status: 'Online',
  },
  {
    deviceType: 'Windows 10',
    name: '54678GDJAI8489UF466238sl',
    status: 'Offline',
  },
  {
    deviceType: 'MacOS',
    name: '1231GI4680w923j66238sl',
    status: 'Online',
  },
  {
    deviceType: 'MacOS',
    name: '431HHIGI468sql489UF466238sl',
    status: 'Online',
  },
  {
    deviceType: '461 Fifth Avenue, New York, NY, 10017, United States',
    name: '3321I46803jksUF466238sl',
    status: 'Offline',
  },
  {
    deviceType: 'Windows 10',
    name: '9823aaBuI468038489UF466238sl',
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

const defaultFilters = {};
const deviceTypes = ['MacOS', 'Windows 10'];
const statuses = ['Online', 'Offline'];

export const FilteringWithDropButton = () => {
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
            Sites
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

const FilterButton = styled(DropButton)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const Filters = ({ filtering, setData, setFiltering }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [deviceType, setDeviceType] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);

  const resetFilters = () => {
    setData(allData);
    setStatus([]);
    setDeviceType([]);
    setFilters(defaultFilters);
    setFiltering(false);
  };

  // everytime the Filters layer opens, save a temp
  // of the previous filters and values in case user clicks "x"
  const storePreviousFilterInfo = () => {
    setPreviousFilters(filters);
    setPreviousValues({
      ...previousValues,
      deviceType,
      status,
    });
  };

  const restoreValues = values => {
    setDeviceType(values.deviceType);
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
    <Box gap="small" pad="medium" width="medium">
      <Heading as="p" color="text-strong" margin="none" size="small">
        Filters
      </Heading>
      <Form>
        <FormField label="Device Type">
          <DeviceTypeFilter
            filters={filters}
            setFilters={setFilters}
            deviceType={deviceType}
            setDeviceType={setDeviceType}
          />
        </FormField>
        <FormField label="Status">
          <StatusFilter
            filters={filters}
            setFilters={setFilters}
            status={status}
            setStatus={setStatus}
          />
        </FormField>
      </Form>

      <Box align="center" direction="row" gap="small">
        <Button
          label="Apply Filters"
          onClick={() => {
            const nextData = filterData(allData, filters);
            setData(nextData);
            setOpen(!open);
          }}
          primary
        />
        <Button
          label="Reset Filters"
          onClick={() => {
            resetFilters();
            setOpen(!open);
          }}
          secondary
        />
      </Box>
    </Box>
  );

  return (
    <Box align="center" direction="row" gap="small">
      <FilterButton
        icon={<Filter />}
        onClick={() => {
          if (open) {
            filterData(allData, previousFilters);
            restoreValues(previousValues);
          } else {
            storePreviousFilterInfo();
          }
          setOpen(!open);
        }}
        open={open}
        dropAlign={{ top: 'bottom', left: 'left' }}
        dropContent={content}
      />
      {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
    </Box>
  );
};

Filters.propTypes = {
  filtering: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

const DeviceTypeFilter = ({
  filters,
  setFilters,
  deviceType,
  setDeviceType,
}) => (
  <CheckBoxGroup
    options={deviceTypes}
    value={deviceType}
    onChange={({ value }) => {
      setDeviceType(value);
      const nextFilters = {
        ...filters,
        deviceType:
          value.length && (nextdeviceType => value.includes(nextdeviceType)),
      };
      setFilters(nextFilters);
    }}
  />
);

DeviceTypeFilter.propTypes = {
  filters: PropTypes.shape({
    deviceType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  deviceType: PropTypes.array.isRequired,
  setDeviceType: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const StatusFilter = ({ filters, setFilters, setStatus, status }) => (
  <CheckBoxGroup
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
);

StatusFilter.propTypes = {
  filters: PropTypes.shape({
    deviceType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setStatus: PropTypes.func.isRequired,
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
      deviceType: PropTypes.string,
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
          key={index}
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
          }}
        >
          <Box gap="xsmall" pad="medium" justify="between">
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
            </Box>
            <Box>
              <Text color="text-weak" size="small">
                Device Type
              </Text>
              <Text color="text-strong">{datum.deviceType}</Text>
            </Box>
          </Box>
        </StyledCard>
      ))}
    </Grid>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      deviceType: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};
