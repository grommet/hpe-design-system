import React, { useContext } from 'react';
import {
  Box,
  Data,
  DataSearch,
  DataFilters,
  DataSummary,
  DataView,
  Grid,
  List,
  Heading,
  Menu,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import { More, StatusGoodSmall, StatusWarningSmall } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

const allData = [
  { name: 'Apex-Server', status: 'Ready' },
  { name: 'AuroraEdge-7.7.-edgedeploy4', status: 'Paused' },
  { name: 'ECAAS3', status: 'Ready' },
  { name: 'ECP-Master-01', status: 'Ready' },
  { name: 'ECaas-EdgeSite1', status: 'Paused' },
  { name: 'IronMan-2', status: 'Ready' },
  { name: 'california_1', status: 'Paused' },
];

export const FilteringWithSelect = () => (
  <Page>
    <PageContent gap="medium">
      <Heading level={2} margin="none">
        Hosts
      </Heading>
      <Grid height={{ min: 'medium' }}>
        <Data
          data={allData}
          views={[
            { name: 'All', properties: { status: ['Ready', 'Paused'] } },
            { name: 'Paused', properties: { status: ['Paused'] } },
            { name: 'Ready', properties: { status: ['Ready'] } },
          ]}
          properties={{
            name: { label: 'Name' },
            status: { label: 'Status' },
          }}
        >
          <Toolbar gap="medium">
            <Toolbar>
              <DataSearch responsive />
              <DataFilters layer />
            </Toolbar>
            <DataView />
          </Toolbar>
          <DataSummary />
          <Results />
        </Data>
      </Grid>
    </PageContent>
  </Page>
);

const Results = () => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box pad={{ bottom: 'medium' }} overflow="auto" fill>
      <List
        border="horizontal"
        action={(item, index) => (
          <Box
            direction="row"
            align="center"
            gap="medium"
            key={index}
            flex={false}
          >
            <Box direction="row" gap="small" align="center">
              {!['xsmall', 'small'].includes(breakpoint) && (
                <Text>{item.status}</Text>
              )}
              {item.status === 'Ready' ? (
                <StatusGoodSmall color="status-ok" size="small" />
              ) : (
                <StatusWarningSmall color="status-warning" size="small" />
              )}
            </Box>
            <Menu
              icon={<More />}
              hoverIndicator
              items={[{ label: 'Manage host' }]}
            />
          </Box>
        )}
      >
        {(datum, index) => (
          <TextEmphasis key={index}>{datum.name}</TextEmphasis>
        )}
      </List>
    </Box>
  );
};
