import { useContext } from 'react';
import {
  Box,
  Card,
  Cards,
  CardBody,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  Grid,
  Header,
  Heading,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';

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
      <Header>
        <Heading level={2} margin="none">
          Users
        </Heading>
      </Header>
      <Grid
        // Use Grid with height prop for sticky header and scrollable results
        height={{ min: 'medium' }}
      >
        <Data data={users} properties={properties}>
          <Toolbar>
            <DataSearch />
            <DataFilters layer />
          </Toolbar>
          <DataSummary />
          <Users />
        </Data>
      </Grid>
    </PageContent>
  </Page>
);

const Users = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box flex overflow="auto">
      <Cards
        columns={!['xsmall', 'small'].includes(breakpoint) ? 'small' : ['auto']}
        gap={!['xsmall', 'small'].includes(breakpoint) ? 'medium' : 'small'}
      >
        {datum => (
          <Card
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
    </Box>
  );
};
