import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Box,
  Button,
  DataFilters,
  DataSummary,
  Toolbar,
  DataSearch,
  Data,
  DataTable,
  Pagination,
  ResponsiveContext,
  ColumnConfig,
  View,
} from 'grommet';
import {
  StatusCriticalSmall,
  Share,
  SettingsOption,
  StatusGoodSmall,
  StatusPlaceholderSmall,
  StatusUnknownSmall,
} from 'grommet-icons';
import opsRamp from '../../../../mockData/opsRamp.json';

import { QuickFilters } from './QuickFilters';

const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' as 'asc' | 'desc' },
  step: 10,
  properties: {},
  page: 1,
};

interface NodeTableProps {
  showResultDetails: boolean;
  setShowResultDetails: (showResultDetails: boolean) => void;
}

type Node = {
  name: string;
  'ip address': string;
  make: string;
  model: string;
  state: string;
};

export const OpsRampDetailTable: React.FC<NodeTableProps> = ({
  setShowResultDetails,
}) => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<Node[]>([]);
  const [quickFilter, setQuickFilter] = useState('');
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [view, setView] = useState<View>(defaultView);
  const [unknown, setUnknown] = useState(0);
  const [undefinedState, setUndefinedState] = useState(0);

  useEffect(() => {
    const nodes = opsRamp.nodes || [];
    const upNodes = nodes.filter(nodes => nodes.state === 'up').length;
    const downNodes = nodes.filter(nodes => nodes.state === 'down').length;
    const unknownNodes = nodes.filter(
      nodes => nodes.state === 'unknown',
    ).length;
    const undefinedNodes = nodes.filter(
      nodes => nodes.state === 'undefined',
    ).length;

    setUp(upNodes);
    setDown(downNodes);
    setUndefinedState(undefinedNodes);
    setUnknown(unknownNodes);
    setTotal(nodes.length);
    setResult(nodes);
  }, []);

  useEffect(() => {
    if (!view) return;

    let filteredData = opsRamp.nodes;
    if (!('properties' in view)) {
      setQuickFilter('');
    }

    if (quickFilter) {
      filteredData = filteredData.filter(nodes => nodes.state === quickFilter);
    }
    if (view && view.properties && typeof view.properties === 'object') {
      Object.keys(view.properties).forEach(property => {
        if (view.properties && Array.isArray(view.properties[property])) {
          filteredData = filteredData.filter(
            nodes =>
              view.properties &&
              view.properties[property].includes(nodes[property]),
          );
        }
      });
    }

    setResult(filteredData);
    setTotal(filteredData.length);
  }, [view, quickFilter]);

  const columns: ColumnConfig<Node>[] = [
    {
      property: 'name',
      primary: true,
      header: 'Name',
      render: datum => (
        <Box align="center" direction="row" gap="xsmall">
          {datum.state === 'up' ? (
            <StatusGoodSmall color="status-ok" />
          ) : datum.state === 'down' ? (
            <StatusCriticalSmall color="status-critical" />
          ) : datum.state === 'unknown' ? (
            <StatusUnknownSmall color="status-unknown" />
          ) : datum.state === 'undefined' ? (
            <StatusPlaceholderSmall />
          ) : null}
          <Anchor
            onClick={() => {
              setShowResultDetails(true);
            }}
          >
            {datum.name}
          </Anchor>
        </Box>
      ),
    },
    {
      property: 'ip address',
      header: 'IP Address',
      sortable: false,
    },
    {
      property: 'make',
      header: 'Make',
      sortable: false,
    },
    {
      property: 'model',
      header: 'Model',
      sortable: false,
    },
  ];

  return (
    <Data
      data={result}
      total={total}
      filteredTotal={result.length}
      defaultView={defaultView}
      gap="medium"
      properties={{
        model: {
          label: 'Model',
          options: ['VirtualMachine', 'VMware Virtual Platform'],
        },
        state: {
          label: 'State',
          options: ['up', 'down', 'unknown', 'undefined'],
        },
      }}
      view={view}
      onView={setView}
    >
      <QuickFilters
        value={quickFilter}
        setValue={setQuickFilter}
        counts={{ up, down, unknown, undefinedState }}
      />
      <Box>
        <Toolbar>
          <DataSearch />
          <DataFilters layer />
          <Button kind="toolbar" icon={<Share />} />
          <Button kind="toolbar" icon={<SettingsOption />} />
        </Toolbar>
        <DataSummary />
        <Box overflow="auto">
          <DataTable
            aria-describedby="node-table"
            onSelect={() => {}}
            columns={columns}
            sortable
            data={result.slice(
              ((view.page ?? 1) - 1) * (view.step ?? 10),
              (view.page ?? 1) * (view.step ?? 10),
            )}
          />
        </Box>
        <Pagination
          summary
          stepOptions
          border="top"
          pad={{ vertical: 'xsmall', horizontal: 'small' }}
        />
      </Box>
    </Data>
  );
};
