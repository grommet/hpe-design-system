import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, DataTable, ResponsiveContext, Text } from 'grommet';
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  Splits,
} from 'grommet-icons';

import {
  FilterControls,
  FiltersProvider,
  useFilters,
} from '../../FilterControls';
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
    render: datum => (datum ? 'Connected' : 'Not Connected'),
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

export const FilterServers = ({ bestPractice = true, height }) => (
  <FiltersProvider>
    <Box gap="medium">
      <FilterControls
        data={serverhealth}
        filters={filtersConfig}
        primaryKey="id"
        searchFilter={{ placeholder: 'Search' }}
        configure={
          <Button icon={<Splits />} kind="toolbar" tip="Configure columns" />
        }
        actions={bestPractice && <Button label="Add Server" secondary />}
      />
      <ServerResults height={height} />
    </Box>
  </FiltersProvider>
);

FilterServers.propTypes = {
  bestPractice: PropTypes.bool,
  height: PropTypes.string,
};

const columns = [
  {
    property: 'hardware.serialNumber',
    header: 'Serial',
  },
  {
    property: 'state.connected',
    header: 'State',
    render: datum => (datum.state.connected ? 'Connected' : 'Not Connected'),
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

const ServerResults = ({ height }) => {
  const size = useContext(ResponsiveContext);
  const { filteredResults, selected, setSelected } = useFilters();

  return (
    <Box height={height} overflow="auto">
      <DataTable
        aria-describedby="servers-heading"
        data={filteredResults}
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
  );
};

ServerResults.propTypes = {
  height: PropTypes.string,
};
