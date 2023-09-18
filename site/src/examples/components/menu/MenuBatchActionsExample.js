import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Box, DataTable, Menu, ResponsiveContext, Text } from 'grommet';
import {
  StatusWarningSmall,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from 'grommet-icons';

import {
  FilterControls,
  FiltersProvider,
  useFilters,
} from '../../templates/FilterControls';

const { servers } = require('../../../data/mockData/servers.json');

const filtersConfig = [];

export const MenuBatchActionsExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.

  const layerProps = {
    // containerRef is for demonstration purposes on this site. Most
    // implementations should likely remove.
    target: containerRef && containerRef.current,
  };

  return (
    <FiltersProvider>
      <Box gap="medium">
        <FilterControls
          // only need a subset of records for this example
          data={servers.items.slice(3, 12)}
          filters={filtersConfig}
          layerProps={layerProps}
          searchFilter={{ placeholder: 'Search' }}
          actions={
            <Menu
              label="Actions"
              kind="toolbar"
              open
              items={[
                [
                  { label: 'Power on', onClick: () => {} },
                  { label: 'Power off', onClick: () => {} },
                  { label: 'Reset', onClick: () => {} },
                  { label: 'Update firmware', onClick: () => {} },
                ],
                [{ label: 'Add to group', onClick: () => {} }],
              ]}
              dropAlign={{ top: 'bottom', right: 'right' }}
            />
          }
        />
        <ServerResults />
      </Box>
    </FiltersProvider>
  );
};

MenuBatchActionsExample.propTypes = {
  containerRef: PropTypes.object,
};

const columns = [
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

const ServerResults = () => {
  const breakpoint = useContext(ResponsiveContext);
  const { filteredResults, selected, setSelected } = useFilters();

  useEffect(() => {
    setSelected([
      '875765-S01+2M282501WV',
      '874460-S01+MXQ824045C',
      '875765-S01+2M282501KR',
    ]);
  }, [setSelected]);

  return (
    <Box height="medium" overflow="auto">
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
