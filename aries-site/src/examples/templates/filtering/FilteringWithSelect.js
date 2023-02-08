import React, { useContext } from 'react';
import {
  Box,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  List,
  Heading,
  Menu,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import { More, StatusGoodSmall, StatusWarningSmall } from 'grommet-icons';

const allData = [
  { name: 'Apex-Server', status: 'Ready' },
  { name: 'AuroraEdge-7.7.-edgedeploy4', status: 'Paused' },
  { name: 'ECAAS3', status: 'Ready' },
  { name: 'ECP-Master-01', status: 'Ready' },
  { name: 'ECaas-EdgeSite1', status: 'Paused' },
  { name: 'IronMan-2', status: 'Ready' },
  { name: 'california_1', status: 'Paused' },
];

export const FilteringWithSelect = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      background="background"
      gap="medium"
      width={{ max: 'xxlarge' }}
      pad={!['xsmall', 'small'].includes(size) ? 'large' : 'medium'}
      margin="auto"
      fill
    >
      <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
        Hosts
      </Heading>
      <Box fill>
        <Data
          data={allData}
          updateOn="submit"
          height={{ min: 'medium', max: '100%' }}
        >
          <Toolbar>
            <DataSearch />
            <DataFilters drop>
              <DataFilter property="status" label="Status" />
            </DataFilters>
          </Toolbar>
          <DataSummary />
          <Results />
        </Data>
      </Box>
    </Box>
  );
};

const Results = () => {
  const size = useContext(ResponsiveContext);
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
              {!['xsmall', 'small'].includes(size) && (
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
          <Text weight="bold" key={index}>
            {datum.name}
          </Text>
        )}
      </List>
    </Box>
  );
};
