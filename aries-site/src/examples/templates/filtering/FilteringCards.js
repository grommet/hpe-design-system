import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  DropButton,
  Form,
  FormField,
  Image,
  Header,
  Heading,
  Grid,
  Layer,
  RangeSelector,
  ResponsiveContext,
  Select,
  Stack,
  Text,
} from 'grommet';
import { Filter, FormClose } from 'grommet-icons';

const allData = [
  {
    address: 'Engholm Parkvej 8, Ground Floor, Alleroed, DK-3450, Denmark',
    employeeCount: 200,
    image:
      'https://images.unsplash.com/photo-1584704135557-d8bf7ca50eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Office',
    name: 'Allerod, Denmark (ALL)',
    status: 'Online',
  },
  {
    address: 'Vicente Aleixandre 1, Las Rozas, 28232, Spain',
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
    employeeCount: 1000,
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
    locationType: 'Customer Center',
    name: 'WW Corporate Headquarters - San Jose, CA',
    status: 'Online',
  },
  {
    address: '461 Fifth Avenue, New York, NY, 10017, United States',
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
const defaultFilters = {};
const defaultEmployeeCount = [0, 2000];
const defaultLocationType = 'All Location Types';
const defaultStatus = 'All Statuses';

export const FilteringCards = () => {
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

const Filters = ({ data, filtering, setData, setFiltering }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [employeeCount, setEmployeeCount] = useState(defaultEmployeeCount);
  const [locationType, setLocationType] = useState(defaultLocationType);
  const [open, setOpen] = useState(false);
  const [previousValues, setPreviousValues] = useState({});
  const [status, setStatus] = useState([defaultStatus]);
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setEmployeeCount(defaultEmployeeCount);
    setStatus(defaultStatus);
    setLocationType(defaultLocationType);
    setFilters(defaultFilters);
  };

  useEffect(() => {
    if (Object.keys(filters).length !== 0) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
  }, [filters, setFilters, setFiltering]);

  const filterData = (array, criteria) => {
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
    <Box direction={size !== 'small' ? 'row' : 'column'} gap="small">
      <LocationTypeFilter
        locationType={locationType}
        filterData={filterData}
        filters={filters}
        setLocationType={setLocationType}
        setData={setData}
      />
      <StatusFilter
        status={status}
        filterData={filterData}
        filters={filters}
        setStatus={setStatus}
        setData={setData}
      />
      {size !== 'small' ? (
        <DropButton
          alignSelf="start"
          icon={<Filter />}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          dropContent={
            <Box pad="medium" width="medium">
              <Form>
                <FormField
                  name="range-selector-employee-count"
                  htmlFor="range-selector-employee-count"
                  label="Employee Count"
                >
                  <EmployeeCountFilter
                    filters={filters}
                    filterData={filterData}
                    previousValues={previousValues}
                    setPreviousValues={setPreviousValues}
                    setEmployeeCount={setEmployeeCount}
                    setData={setData}
                    employeeCount={employeeCount}
                  />
                </FormField>
                <Text size="small">
                  {`${employeeCount[0]} - ${employeeCount[1]} people`}
                </Text>
                <Box direction="row" justify="end" gap="small">
                  <Button
                    label="Reset Filter"
                    secondary
                    onClick={() => {
                      const nextFilters = {
                        ...filters,
                        employeeCount: undefined,
                      };
                      const nextData = filterData(allData, nextFilters);
                      setData(nextData);
                      setEmployeeCount(defaultEmployeeCount);
                      setOpen(!open);
                    }}
                  />
                  <Button
                    label="Apply Filter"
                    primary
                    onClick={() => {
                      const nextFilters = {
                        ...filters,
                        employeeCount: nextEmployeeCount =>
                          nextEmployeeCount >= employeeCount[0] &&
                          nextEmployeeCount <= employeeCount[1],
                      };
                      const nextData = filterData(allData, nextFilters);
                      setData(nextData);
                      setOpen(!open);
                    }}
                  />
                </Box>
              </Form>
            </Box>
          }
          dropAlign={{ top: 'bottom', left: 'left' }}
        />
      ) : (
        <>
          <FormField
            name="range-selector-employee-count"
            htmlFor="range-selector-employee-count"
            label="Employee Count"
          >
            <EmployeeCountFilter
              filters={filters}
              filterData={filterData}
              previousValues={previousValues}
              setPreviousValues={setPreviousValues}
              setEmployeeCount={setEmployeeCount}
              setData={setData}
              employeeCount={employeeCount}
            />
          </FormField>
          <Text size="small">
            {`${employeeCount[0]} - ${employeeCount[1]} people`}
          </Text>
        </>
      )}
    </Box>
  );

  return (
    <>
      {size !== 'small' ? (
        <Box align="center" direction="row" gap="small">
          <Box direction="row" gap="small">
            {content}
          </Box>
          {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
        </Box>
      ) : (
        <>
          <Button
            alignSelf="start"
            icon={<Filter />}
            onClick={() => setShowLayer(true)}
          />
          {showLayer && (
            <Layer full>
              <Box
                width={{ max: 'medium' }}
                pad="medium"
                margin="auto"
                gap="small"
                fill
              >
                <Header>
                  <Text color="text-strong" size="xlarge" weight="bold">
                    Filters
                  </Text>
                  <Button
                    icon={<FormClose />}
                    onClick={() => setShowLayer(!showLayer)}
                  />
                </Header>
                {content}
                <Box align="center" justify="end" direction="row" gap="small">
                  {filtering && (
                    <Anchor label="Clear filters" onClick={resetFilters} />
                  )}
                  <Button
                    label={`Show ${data.length} results`}
                    onClick={() => {
                      setShowLayer(!showLayer);
                    }}
                    primary
                  />
                </Box>
              </Box>
            </Layer>
          )}
        </>
      )}
    </>
  );
};

Filters.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
      image: PropTypes.string,
      locationType: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

const LocationTypeFilter = ({
  locationType,
  filterData,
  filters,
  setLocationType,
  setData,
}) => (
  <Select
    options={[defaultLocationType, 'Customer Center', 'Office']}
    value={locationType}
    onChange={({ option }) => {
      const nextFilters = {
        ...filters,
        locationType: nextLocationType => nextLocationType === option,
      };
      if (option === defaultLocationType) delete nextFilters.locationType;
      const nextData = filterData(allData, nextFilters);
      setLocationType(option);
      setData(nextData);
    }}
  />
);

LocationTypeFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  locationType: PropTypes.string.isRequired,
  setLocationType: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
};

const StatusFilter = ({ filters, filterData, setStatus, setData, status }) => (
  <Select
    options={[defaultStatus, 'Online', 'Offline']}
    value={status}
    onChange={({ option }) => {
      const nextFilters = {
        ...filters,
        status: nextStatus => nextStatus === option,
      };
      if (option === defaultStatus) delete nextFilters.status;
      const nextData = filterData(allData, nextFilters);
      setStatus(option);
      setData(nextData);
    }}
  />
);

StatusFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setStatus: PropTypes.func.isRequired,
};

const EmployeeCountFilter = ({
  filters,
  filterData,
  previousValues,
  setPreviousValues,
  setEmployeeCount,
  setData,
  employeeCount,
}) => {
  const size = useContext(ResponsiveContext);
  return (
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
          // on mobile, we want to filter the data immediately but
          // on desktop, we wait until the user clicks
          // "Apply Filter" to filter the data
          if (size === 'small') {
            const nextFilters = {
              ...filters,
              employeeCount: nextEmployeeCount =>
                nextEmployeeCount >= employeeCount[0] &&
                nextEmployeeCount <= employeeCount[1],
            };
            const nextData = filterData(allData, nextFilters);
            // save previous value in case user
            // clicks 'x'
            setPreviousValues({
              ...previousValues,
              employeeCount,
            });
            setData(nextData);
          }
        }}
      />
    </Stack>
  );
};

EmployeeCountFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    status: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  employeeCount: PropTypes.arrayOf(PropTypes.number).isRequired,
  setEmployeeCount: PropTypes.func.isRequired,
  previousValues: PropTypes.shape({
    availability: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
  }).isRequired,
  setPreviousValues: PropTypes.func.isRequired,
};

const RecordSummary = ({ data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text color="text-weak" size="small" weight="bold">
      {data.length}
    </Text>
    <Text color="text-weak" size="small">
      {filtering ? 'results' : 'items'}
    </Text>
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
    <Grid columns={size !== 'small' ? 'medium' : '100%'} fill gap="medium">
      {data.map((datum, index) => (
        <StyledCard
          key={index}
          height="medium"
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
              <Text color="text-weak" size="small">
                Location Type
              </Text>
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
