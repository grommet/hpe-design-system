import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Image,
  Header,
  Heading,
  Layer,
  List,
  ResponsiveContext,
  Select,
  Text,
} from 'grommet';
import { Filter, FormClose } from 'grommet-icons';

const allData = [
  {
    address: 'Engholm Parkvej 8, Ground Floor, Alleroed, DK-3450, Denmark',
    image:
      'https://images.unsplash.com/photo-1584704135557-d8bf7ca50eae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Office',
    name: 'Allerod, Denmark (ALL)',
    status: 'Online',
  },
  {
    address: 'Vicente Aleixandre 1, Las Rozas, 28232, Spain',
    image:
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Office',
    name: 'Madrid, Spain (ESM)',
    status: 'Offline',
  },
  {
    address:
      '3404 E Harmony Road, Fort Collins, Colorado, 80528, United States',
    image:
      'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
    locationType: 'Office',
    name: 'Fort Collins, CO',
    status: 'Online',
  },
  {
    address:
      '6280 America Center Dr., San Jose, California, 95002, United States',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
    locationType: 'Customer Center',
    name: 'WW Corporate Headquarters - San Jose, CA',
    status: 'Online',
  },
  {
    address: '461 Fifth Avenue, New York, NY, 10017, United States',
    image:
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Customer Center',
    name: 'New York, NY',
    status: 'Offline',
  },
  {
    address: `Stroombaan 16, 1181 VX Amstelveen, 
    Amstelveen, The Netherlands`,
    image:
      'https://images.unsplash.com/photo-1584450150050-4b9bdbd51f68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    locationType: 'Customer Center',
    name: 'Amstelveen HQ, NL',
    status: 'Online',
  },
];

const defaultFilters = {};
const defaultLocationType = 'All Location Types';
const defaultStatus = 'All Statuses';

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
  const [locationType, setLocationType] = useState(defaultLocationType);
  const [status, setStatus] = useState(defaultStatus);
  const [showLayer, setShowLayer] = useState(false);

  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setStatus(defaultStatus);
    setLocationType(defaultLocationType);
    setFilters(defaultFilters);
  };

  useEffect(() => {
    if (locationType === defaultLocationType && status === defaultStatus) {
      setFiltering(false);
    } else {
      setFiltering(true);
    }
  }, [locationType, status, setFiltering]);

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
        filters={filters}
        filterData={filterData}
        setStatus={setStatus}
        setData={setData}
        status={status}
      />
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
          <Button icon={<Filter />} onClick={() => setShowLayer(true)} />
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
        locationType:
          option !== defaultLocationType &&
          (nextLocationType => nextLocationType === option),
      };
      const nextData = filterData(allData, nextFilters);
      setLocationType(option);
      setData(nextData);
    }}
  />
);

LocationTypeFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.string,
    status: PropTypes.string,
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
        status:
          option !== defaultStatus
            ? nextStatus => nextStatus === option
            : undefined,
      };
      const nextData = filterData(allData, nextFilters);
      setStatus(option);
      setData(nextData);
    }}
  />
);

StatusFilter.propTypes = {
  filters: PropTypes.shape({
    locationType: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
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
    <Box fill overflow="auto">
      <List
        action={(item, index) =>
          size !== 'small' && (
            <Box key={index} align="center" direction="row" gap="xsmall">
              <Box
                background={item.status === 'Online' ? 'brand' : 'text-weak'}
                pad="xsmall"
                round
              />
              <Text color="text-strong">{item.status}</Text>
            </Box>
          )
        }
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
              <Box
                flex={false}
                height="xxsmall"
                width="xxsmall"
                round="small"
                overflow="hidden"
              >
                <Image src={datum.image} fit="cover" />
              </Box>
              <Box gap="xsmall" justify="between">
                <Box>
                  <Text color="text-strong" size="large" weight="bold">
                    {datum.name}
                  </Text>
                  {size !== 'small' && (
                    <Text color="text-strong">{datum.address}</Text>
                  )}
                </Box>
                {size !== 'small' ? (
                  <Box direction="row" gap="xsmall">
                    <Text size="small">Location Type:</Text>
                    <Text size="small">{datum.locationType}</Text>
                  </Box>
                ) : (
                  <Box key={index} align="center" direction="row" gap="xsmall">
                    <Box
                      background={
                        datum.status === 'Online' ? 'brand' : 'text-weak'
                      }
                      pad="xsmall"
                      round
                    />
                    <Text color="text-strong">{datum.status}</Text>
                  </Box>
                )}
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
      locationType: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};
