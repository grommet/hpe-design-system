import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Anchor,
  Box,
  Card,
  CardBody,
  Image,
  Grid,
  Header,
  Heading,
  ResponsiveContext,
  Select,
  Text,
} from 'grommet';

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

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  :focus,
  :hover {
    transform: scale(1.01, 1.01);
  }
`;

const defaultFilters = {};
const defaultLocationType = 'All Location Types';
const defaultStatus = 'All statuses';

export const FilteringCards = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [locationType, setLocationType] = useState(defaultLocationType);
  const [status, setStatus] = useState(defaultStatus);
  const size = useContext(ResponsiveContext);

  const resetFilters = () => {
    setData(allData);
    setStatus(defaultStatus);
    setLocationType(defaultLocationType);
    setFiltering(false);
    setFilters(defaultFilters);
  };

  useEffect(() => {
    if (locationType === defaultLocationType && status === defaultStatus) {
      resetFilters();
    } else {
      setFiltering(true);
    }
  }, [locationType, status]);

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
            <Select
              options={[defaultLocationType, 'Customer Center', 'Office']}
              value={locationType}
              onChange={({ option }) => {
                const nextFilters = {
                  ...filters,
                  locationType: nextLocationType => nextLocationType === option,
                };
                const nextData = filterData(allData, nextFilters);
                setLocationType(option);
                setData(nextData);
              }}
            />

            <Select
              options={[defaultStatus, 'Online', 'Offline']}
              placeholder="Status"
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
            {filtering && (
              <Anchor label="Clear filters" onClick={resetFilters} />
            )}
          </Box>
          <Box direction="row" gap="xxsmall">
            <Text color="text-weak" size="small" weight="bold">
              {data.length}
            </Text>
            <Text color="text-weak" size="small">
              {filtering ? 'results' : 'items'}
            </Text>
          </Box>
        </Box>
      </Header>
      <Grid columns={size !== 'small' ? 'medium' : '100%'} fill gap="medium">
        {data.map(datum => (
          <StyledCard
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
                <Text color="text-weak" size="small">
                  Location Type
                </Text>
                <Text color="text-strong">{datum.locationType}</Text>
              </Box>
            </CardBody>
          </StyledCard>
        ))}
      </Grid>
    </Box>
  );
};
