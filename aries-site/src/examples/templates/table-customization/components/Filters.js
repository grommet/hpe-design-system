import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Anchor,
  Box,
  Button,
  CheckBoxGroup,
  FormField,
  Header,
  Heading,
  Layer,
  RangeSelector,
  ResponsiveContext,
  Stack,
  Text,
} from 'grommet';

import { Filter, FormClose } from 'grommet-icons';

import { StyledButton } from './StyledButton';

const defaultFilters = {};
const defaultHoursAvailable = [0, 40];

const getValues = (field, data) => {
  const results = [];
  data.forEach(
    item => !results.includes(item[field]) && results.push(item[field]),
  );
  return results;
};

const RoleFilter = ({ filters, setFilters, role, setRole, data }) => {
  const roles = useMemo(() => getValues('role', data), [data]);
  return (
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
};

RoleFilter.propTypes = {
  data: PropTypes.array.isRequired,
  filters: PropTypes.shape({
    role: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  role: PropTypes.array.isRequired,
  setRole: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const StatusFilter = ({ filters, setFilters, setStatus, status, data }) => {
  const statuses = useMemo(() => getValues('status', data), [data]);
  return (
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
};

StatusFilter.propTypes = {
  data: PropTypes.array.isRequired,
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

const NameFilter = ({ filters, setFilters, setName, name, data }) => {
  const [showMore, setShowMore] = useState(false);
  const names = useMemo(() => getValues('name', data), [data]);

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
  data: PropTypes.array.isRequired,
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

const LocationFilter = ({
  filters,
  setFilters,
  setLocation,
  location,
  data,
}) => {
  const locations = useMemo(() => getValues('location', data), [data]);
  return (
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
};

LocationFilter.propTypes = {
  data: PropTypes.array.isRequired,
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

export const Filters = ({
  data,
  filtering,
  filters,
  setFilters,
  filterData,
  setData,
  setFiltering,
  setSearch,
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
    setData(data);
    setLocation([]);
    setHoursAvailable(defaultHoursAvailable);
    setStatus([]);
    setRole([]);
    setName([]);
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
          data={data}
          filters={filters}
          setFilters={setFilters}
          role={role}
          setRole={setRole}
        />
      </Box>
      <Box flex={false}>
        <StatusFilter
          data={data}
          filters={filters}
          setFilters={setFilters}
          status={status}
          setStatus={setStatus}
        />
      </Box>
      <Box flex={false}>
        <NameFilter
          data={data}
          filters={filters}
          setFilters={setFilters}
          name={name}
          setName={setName}
        />
      </Box>
      <Box flex={false}>
        <LocationFilter
          data={data}
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
            filterData(data, previousFilters);
            restoreValues(previousValues);
            setShowLayer(!showLayer);
          }}
          onEsc={() => {
            filterData(data, previousFilters);
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
                  filterData(data, previousFilters);
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
                  const nextData = filterData(data, filters);
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
  data: PropTypes.array.isRequired,
  filters: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func.isRequired,
  filtering: PropTypes.bool.isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  target: PropTypes.object,
};
