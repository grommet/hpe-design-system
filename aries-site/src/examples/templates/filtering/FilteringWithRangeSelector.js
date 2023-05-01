import React from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  List,
  Grid,
  Heading,
  Page,
  PageContent,
  Text,
  Toolbar,
} from 'grommet';
import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

const allData = [
  {
    availability: 90.2,
    name: 'Asup-array01-lvs (default)',
    location: 'San Jose, CA',
  },
  {
    availability: 70.3,
    name: 'Des-K8-Sym-R5-3 (default)',
    location: 'San Jose, CA',
  },
  {
    availability: 95.8,
    name: 'Dev36-erray01 ( default)',
    location: 'Houston, TX',
  },
  {
    availability: 85.1,
    name: 'asup-array1 (default)',
    location: 'Fort Collins, CO',
  },
  {
    availability: 53.4,
    name: 'asup-array21 (default)',
    location: 'New York, NY',
  },
  { availability: 77.3, name: 'Dpe-R3-19 (default)', location: 'Houston, TX' },
  {
    availability: 30.4,
    name: 'Asup-array10-lvs (default)',
    location: 'Fort Collins, CO',
  },
];

// Define Data properties
const properties = {
  availability: { label: 'Availability' },
  location: { label: 'Location' },
};

export const FilteringWithRangeSelector = () => (
  <Page>
    <PageContent gap="medium">
      <Heading level={2} margin="none">
        Storage
      </Heading>
      <Grid
        // Use Grid with height prop for sticky header and scrollable results
        height={{ min: 'medium' }}
      >
        <Data data={allData} properties={properties}>
          <Toolbar>
            <DataSearch responsive />
            <DataFilters layer />
          </Toolbar>
          <DataSummary />
          <Results />
        </Data>
      </Grid>
    </PageContent>
  </Page>
);

const Results = () => (
  <Box
    pad={{ horizontal: 'xxsmall', bottom: 'medium', top: 'xxsmall' }}
    overflow="auto"
    flex
  >
    <List
      border="horizontal"
      action={(item, index) => (
        <Box direction="row" align="center" gap="medium" key={index}>
          <Box direction="row" gap="small" align="center">
            <Text>Availability: {item.availability}%</Text>
            {item.availability <= 70 ? (
              <StatusCriticalSmall color="status-critical" size="small" />
            ) : (
              <StatusGoodSmall color="status-ok" size="small" />
            )}
          </Box>
        </Box>
      )}
      onClickItem={() => {
        // eslint-disable-next-line no-alert
        alert(`
          Typically a click would route to a view with 
          greater detail behind this summary information.
          `);
      }}
    >
      {(datum, index) => (
        <>
          <TextEmphasis key={index}>{datum.name}</TextEmphasis>
          <Text size="small">{datum.location}</Text>
        </>
      )}
    </List>
  </Box>
);
