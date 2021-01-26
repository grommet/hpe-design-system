import React, { useContext, useRef, useState } from 'react';
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
  TextInput,
} from 'grommet';
import { Filter, Search } from 'grommet-icons';

const allData = [
  {
    status: 'Online',
    name: 'd6db7379-c71c-4e88-ab26-ab788cdccaa5',
    ram: '16',
  },
  {
    status: 'Offline',
    name: 'bbde1017-2de5-4a6a-9fa0-7802dafc852c',
    ram: '32',
  },
  {
    status: 'Online',
    name: '931cdda8-d5f2-4294-85b5-da8ff8100fa5',
    ram: '128',
  },
  {
    status: 'Online',
    name: '09ff2e6f-b452-4943-b6b6-a13d70a20117',
    ram: '128',
  },
  {
    status: 'Offline',
    name: '8a617640-69ca-4d6f-8503-4b272426728f',
    ram: '128',
  },
  {
    status: 'Offline',
    name: '16c9aae6-6732-4f95-b139-3363701e7770',
    ram: '32',
  },
];

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  :focus,
  :hover {
    transform: scale(1.01, 1.01);
  }
`;

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

const StyledButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const defaultFilters = {};
const ramOptions = ['16', '32', '128'];
const statuses = ['Online', 'Offline'];

export const FilteringWithDropButton = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [search, setSearch] = useState();
  const size = useContext(ResponsiveContext);
  const inputRef = useRef();

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
            Machines
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

const FilterButton = styled(DropButton)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

const Filters = ({
  filters,
  filterData,
  setFilters,
  filtering,
  setData,
  setFiltering,
}) => {
  const [ram, setRam] = useState([]);
  const [previousValues, setPreviousValues] = useState({});
  const [previousFilters, setPreviousFilters] = useState({});
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);

  const resetFilters = () => {
    setData(allData);
    setStatus([]);
    setRam([]);
    setFilters(defaultFilters);
    setFiltering(false);
  };

  // everytime the Filters layer opens, save a temp
  // of the previous filters and values in case user clicks "x"
  const storePreviousFilterInfo = () => {
    setPreviousFilters(filters);
    setPreviousValues({
      ...previousValues,
      ram,
      status,
    });
  };

  const restoreValues = values => {
    setRam(values.ram);
    setStatus(values.status);
  };

  const content = (
    <Box gap="small" pad="medium" width="medium">
      <Heading as="p" color="text-strong" margin="none" size="small">
        Filters
      </Heading>
      <Form>
        <FormField label="RAM (GiB)">
          <RamFilter
            filters={filters}
            setFilters={setFilters}
            ram={ram}
            setRam={setRam}
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
        <Button label="Reset Filters" onClick={resetFilters} secondary />
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
  filters: PropTypes.shape({}).isRequired,
  setFilters: PropTypes.func.isRequired,
  filtering: PropTypes.bool.isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

const RamFilter = ({ filters, setFilters, ram, setRam }) => (
  <CheckBoxGroup
    options={ramOptions}
    value={ram}
    onChange={({ value }) => {
      setRam(value);
      const nextFilters = {
        ...filters,
        ram: value.length && (nextRam => value.includes(nextRam)),
      };
      setFilters(nextFilters);
    }}
  />
);

RamFilter.propTypes = {
  filters: PropTypes.shape({
    ram: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  ram: PropTypes.array.isRequired,
  setRam: PropTypes.func.isRequired,
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
    ram: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
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
      ram: PropTypes.string,
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
            <Box gap="xsmall" pad="medium" justify="between">
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
              </Box>
              <Box>
                <Text color="text-weak" size="small">
                  RAM
                </Text>
                <Text color="text-strong">{`${datum.ram} GiB`}</Text>
              </Box>
            </Box>
          </StyledCard>
        ))}
      </Grid>
    </Box>
  );
};

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ram: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};
