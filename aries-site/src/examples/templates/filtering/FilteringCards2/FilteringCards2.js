import { useContext } from 'react';
import styled from 'styled-components';
import {
  Box,
  Card,
  CardBody,
  Grid,
  Heading,
  ResponsiveContext,
  Text,
} from 'grommet';

import {
  FilterControls,
  FiltersProvider,
  useFilters,
} from '../../FilterControls';
import { users } from './mockData';

const StyledCard = styled(Card)`
  will-change: transform;
  transition: all 0.15s ease-in-out;
  :focus,
  :hover {
    transform: scale(1.01, 1.01);
  }
`;

export const FilteringCards2 = () => {
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
      label: 'Remaining Hours Available',
      filterType: 'RangeSelector',
      inputProps: {
        min: 0,
        max: 40,
        valueRange: '0 - 40 hours',
      },
    },
    { property: 'name', label: 'Name', filterType: 'CheckBoxGroup' },
  ];

  return (
    <>
      <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
        Users
      </Heading>
      <FiltersProvider>
        <FilterControls data={users} filters={filtersConfig} />
        <Users />
      </FiltersProvider>
    </>
  );
};

const Users = () => {
  const size = useContext(ResponsiveContext);
  const { filteredResults } = useFilters();

  return (
    <Box overflow="auto" pad={{ bottom: 'medium' }} fill>
      <Grid
        columns={size !== 'small' ? 'small' : { count: 2, size: 'auto' }}
        gap={size !== 'small' ? 'medium' : 'small'}
        margin={{ top: 'small' }}
      >
        {filteredResults.map((datum, index) => (
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
          </StyledCard>
        ))}
      </Grid>
    </Box>
  );
};
