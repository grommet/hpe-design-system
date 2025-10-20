import { useContext, useState, useEffect } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataTable,
  DataSearch,
  DataSummary,
  Menu,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import {
  StatusWarning,
  StatusCritical,
  StatusGood,
  StatusUnknown,
} from '@hpe-design/icons-grommet';
import { ContentPane } from '../../../layouts';

const { servers } = require('../../../data/mockData/servers.json');

export const MenuBatchActionsExample = () => (
  <ContentPane>
    <Data
      data={servers.items.slice(3, 12)}
      views={[
        { name: 'All', properties: { status: ['Ready', 'Paused'] } },
        { name: 'Paused', properties: { status: ['Paused'] } },
        { name: 'Ready', properties: { status: ['Ready'] } },
      ]}
    >
      <Toolbar gap="medium">
        <Toolbar>
          <DataSearch responsive />
          <DataFilters layer />
        </Toolbar>
        {/* Flex Box added for spacing between Button */}
        <Box flex />
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
      </Toolbar>
      <DataSummary />
      <ServerResults />
    </Data>
  </ContentPane>
);

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
  Warning: <StatusWarning color="status-warning" size="small" />,
  OK: <StatusGood color="status-ok" size="small" />,
  Critical: <StatusCritical color="status-critical" size="small" />,
  Unknown: <StatusUnknown color="status-unknown" size="small" />,
};

const ServerResults = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [selected, setSelected] = useState([]);

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
