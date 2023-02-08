import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  Splits,
} from 'grommet-icons';

import serverhealth from '../../../../data/mockData/serverhealth.json';

// Define which attributes should be made available for the user
// to filter upon
const filtersConfig = [
  {
    property: 'hardware.health.summary',
    label: 'Status',
    filterType: 'CheckBoxGroup',
  },
  {
    property: 'state.connected',
    label: 'State',
    filterType: 'CheckBoxGroup',
    render: datum => (datum ? 'Connected' : 'Not connected'),
  },
  {
    property: 'hardware.powerState',
    label: 'Power',
    filterType: 'CheckBoxGroup',
  },
  {
    property: 'hardware.model',
    label: 'Model',
    filterType: 'CheckBoxGroup',
  },
];

const columns = [
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

const statusIcons = {
  Warning: <StatusWarningSmall color="status-warning" size="small" />,
  OK: <StatusGoodSmall color="status-ok" size="small" />,
  Critical: <StatusCriticalSmall color="status-critical" size="small" />,
  Unknown: <StatusUnknownSmall color="status-unknown" size="small" />,
};

export const FilterServers = () => {
  const size = useContext(ResponsiveContext);
  const [selected, setSelected] = useState([]);

  return (
    <Box fill>
      <Data
        updateOn="submit"
        data={serverhealth}
        height={{ min: 'small', max: '100%' }}
      >
        <Toolbar>
          <DataSearch />
          <Button icon={<Splits />} kind="toolbar" tip="Configure columns" />
          <DataFilters layer>
            {/* TODO: fill out rest of filters with potential nesting */}
            <DataFilter property="hardware.powerState" label="Power State" />
          </DataFilters>
          <Box flex />
          <Button label="Add server" secondary />
        </Toolbar>
        <DataSummary />
        <Box overflow="auto">
          <DataTable
            aria-describedby="servers-heading"
            columns={[
              {
                property: 'hardware.health.summary',
                header: 'Status',
                render: datum =>
                  datum.hardware.health.summary
                    ? statusIcons[datum.hardware.health.summary]
                    : '-',
                align: 'center',
                sortable: false,
              },
              {
                property: 'id',
                header: 'Name',
                pin: ['xsmall', 'small'].includes(size),
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
      </Data>
    </Box>
  );
};
