import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableColumns,
  Grid,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from 'grommet-icons';

import serverhealth from '../../../../data/mockData/serverhealth.json';

const statusIcons = {
  Warning: <StatusWarningSmall color="status-warning" size="small" />,
  OK: <StatusGoodSmall color="status-ok" size="small" />,
  Critical: <StatusCriticalSmall color="status-critical" size="small" />,
  Unknown: <StatusUnknownSmall color="status-unknown" size="small" />,
};

const columns = [
  {
    property: 'hardware.health.summary',
    header: 'Status',
    render: datum =>
      datum.hardware.health.summary
        ? statusIcons[datum.hardware.health.summary]
        : '--',
    align: 'center',
    sortable: false,
  },

  {
    property: 'hardware.serialNumber',
    header: 'Serial',
  },
  {
    property: 'state.connected',
    header: 'State',
    render: datum => (datum.state.connected ? 'Connected' : 'Not connected'),
  },
  {
    property: 'hardware.powerState',
    header: 'Power',
  },
  {
    property: 'hardware.model',
    header: 'Model',
    render: datum => (
      <Text a11yTitle={!datum.hardware.model ? 'No value' : undefined}>
        {datum.hardware.model || '--'}
      </Text>
    ),
  },
];

// Define data structure for DataTableColumns
const options = columns.map(({ header, property }) => ({
  property,
  label: header,
}));

// Define data structure for Data properties
const properties = {
  'hardware.health.summary': { label: 'Status' },
  'state.connected': {
    label: 'State',
    options: [
      { label: 'Connected', value: true },
      { label: 'Not connected', value: false },
    ],
  },
  'hardware.powerState': { label: 'Power' },
  'hardware.model': { label: 'Model' },
};

export const FilterServers = () => (
  <Grid
    // Use Grid with height prop for sticky header and scrollable results
    height={{ min: 'medium' }}
  >
    <Data data={serverhealth} properties={properties}>
      <Toolbar>
        <DataSearch responsive />
        <DataTableColumns drop tip="Configure columns" options={options} />
        <DataFilters layer />
        {/* Flex Box added for spacing between Button */}
        <Box flex />
        <Button secondary label="Add server" />
      </Toolbar>
      <DataSummary />
      <ServerResults />
    </Data>
  </Grid>
);

const ServerResults = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [selected, setSelected] = useState([]);

  return (
    <Box flex overflow="auto">
      <DataTable
        aria-describedby="servers-heading"
        columns={[
          // Pin id column on mobile
          {
            property: 'id',
            header: 'Name',
            pin: ['xsmall', 'small'].includes(breakpoint),
            primary: true,
            render: datum => datum.displayName,
          },
          ...columns,
        ]}
        pin
        primaryKey="id"
        sortable
        onSelect={nextSelected => setSelected(nextSelected)}
        select={selected}
      />
    </Box>
  );
};
