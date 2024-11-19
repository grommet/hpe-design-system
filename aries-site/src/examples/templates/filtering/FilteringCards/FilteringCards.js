import { useContext } from 'react';
import {
  Box,
  Cards,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  Heading,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import { Card } from '../../Card';
import { users } from './mockData';

// Define Data properties
const properties = {
  role: { label: 'Role' },
  status: { label: 'Status' },
  location: { label: 'Location' },
  hoursAvailable: {
    label: 'Remaining hours available',
    range: { min: 0, max: 40 },
  },
  name: { label: 'Name' },
};

export const FilteringCards = () => (
  <Page>
    <PageContent gap="medium">
      <Heading level={2} margin="none">
        Users
      </Heading>
      {/* <Grid
        // Use Grid with height prop for sticky header and scrollable results
        height={{ min: 'medium' }}
      > */}
      <Data data={users} properties={properties}>
        <Toolbar>
          <DataSearch responsive />
          <DataFilters layer />
        </Toolbar>
        <DataSummary />
        <Users />
      </Data>
      {/* </Grid> */}
    </PageContent>
  </Page>
);

const Users = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box flex overflow="auto" pad={{ bottom: 'medium' }}>
      <Cards
        columns={!['xsmall', 'small'].includes(breakpoint) ? 'small' : ['auto']}
        gap={!['xsmall', 'small'].includes(breakpoint) ? 'medium' : 'small'}
      >
        {datum => (
          <Card
            as="li"
            aria-label={`User card for ${datum.name}`}
            key={datum.id}
            // margin ensures focus on cards is not cutoff
            margin="xxsmall"
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert(`
                Typically a click would route to a view with 
                greater detail behind this summary information.
              `);
            }}
            icon={
              <Box align="center" direction="row" gap="xsmall">
                <Box
                  background={datum.status === 'Online' ? 'brand' : 'text-weak'}
                  pad="xsmall"
                  round
                />
                <Text color="text-strong">{datum.status}</Text>
              </Box>
            }
            title={datum.name}
            subtitle={datum.location}
            level={2}
          >
            <Box flex justify="end">
              <Text size="small">Role</Text>
              <Text color="text-strong">{datum.role}</Text>
            </Box>
          </Card>
        )}
      </Cards>
    </Box>
  );
};
