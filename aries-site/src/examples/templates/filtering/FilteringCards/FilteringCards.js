import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Cards,
  CardBody,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  Grid,
  Heading,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';

import { users } from './mockData';

export const FilteringCards = ({ containerRef }) => {
  const size = useContext(ResponsiveContext);

  // Define which attributes should be made available for the user
  // to filter upon
  const filtersConfig = [
    { property: 'role', label: 'Role', filterType: 'CheckBoxGroup' },
    { property: 'status', label: 'Status', filterType: 'CheckBoxGroup' },
    {
      property: 'location',
      label: 'Location',
      filterType: 'CheckBoxGroup',
    },
    {
      property: 'hoursAvailable',
      label: 'Remaining hours available',
      filterType: 'RangeSelector',
      inputProps: {
        min: 0,
        max: 40,
        valueRange: '0 - 40 hours',
      },
    },
    { property: 'name', label: 'Name', filterType: 'CheckBoxGroup' },
  ];

  // Customize layer properties. Any Grommet Layer props, plus Box props
  // for the Layer's container and contents.
  const layerProps = {
    // containerRef is for demonstration purposes on this site. Most
    // implementations should likely remove.
    target: containerRef && containerRef.current,
  };

  return (
    <Box
      background="background"
      pad={!['xsmall', 'small'].includes(size) ? 'large' : 'medium'}
      gap="medium"
    >
      <Heading level={2} margin="none">
        Users
      </Heading>
      <Box fill>
        <Data
          data={users}
          updateOn="change"
          height={{ min: 'medium', max: '100%' }}
        >
          <Toolbar>
            <DataSearch />
            <DataFilters layer>
              <DataFilter property="role" label="Role" />
              <DataFilter property="status" label="Status" />
              <DataFilter property="location" label="Location" />
              <DataFilter property="hoursAvailable" label="Hours Available" />
              <DataFilter property="name" label="Name" />
            </DataFilters>
          </Toolbar>
          <DataSummary />
          <Users />
        </Data>
      </Box>
    </Box>
  );
};

const Users = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box flex overflow="auto">
      <Grid
        columns={
          !['xsmall', 'small'].includes(size)
            ? [['small', 'xlarge']]
            : { count: 2, size: 'auto' }
        }
        gap={!['xsmall', 'small'].includes(size) ? 'medium' : 'small'}
      >
        <Cards>
          {datum => (
            <Card
              key={datum.id}
              background="background"
              // margin ensures focus on cards is not cutoff
              margin="xxsmall"
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
            </Card>
          )}
        </Cards>
      </Grid>
    </Box>
  );
};

FilteringCards.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
