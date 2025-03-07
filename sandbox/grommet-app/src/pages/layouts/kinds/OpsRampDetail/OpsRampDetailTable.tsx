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
} from 'grommet';
import {
  StatusCriticalSmall,
  Upload,
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
};

interface NodeTableProps {
  showResultDetails: boolean;
  setShowResultDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OpsRampDetailTable: React.FC<NodeTableProps> = ({
  setShowResultDetails,
}) => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<
    {
      name: string;
      'ip address': string;
      make: string;
      model: string;
      state: string;
    }[]
  >([]);
  const [quickFilter, setQuickFilter] = useState('');
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [view, setView] = useState(defaultView);
  const [unknown, setUnknown] = useState(0);
  const [undefinedState, setUndefinedState] = useState(0);

  console.log('opsRamp', opsRamp);

  useEffect(() => {
    const node = opsRamp.node || [];
    const upnode = node.filter(node => node.state === 'up').length;
    const downnode = node.filter(node => node.state === 'down').length;
    const unknownnode = node.filter(node => node.state === 'unknown').length;
    const undefinednode = node.filter(
      node => node.state === 'undefined',
    ).length;

    setUp(upnode);
    setDown(downnode);
    setUndefinedState(undefinednode);
    setUnknown(unknownnode);
    setTotal(node.length);
    setResult(node);
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
    if (view && view.properties) {
      Object.keys(view.properties).forEach(property => {
        if (Array.isArray(view.properties[property])) {
          filteredData = filteredData.filter(nodes =>
            view.properties[property].includes(nodes[property]),
          );
        }
      });
    }

    setResult(filteredData);
    setTotal(filteredData.length);
  }, [view, quickFilter]);

  console.log('view', view);

  const columns = [
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
      <Box
        round="small"
        background="background-front"
        pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
        gap="medium"
        flex={false}
      >
        <Toolbar align="center" flex={false}>
          <QuickFilters
            value={quickFilter}
            setValue={setQuickFilter}
            counts={{ up, down, unknown, undefinedState }}
          />
          <Box flex />
          <DataSearch />
          <DataFilters layer />
          <Button kind="toolbar" icon={<Upload />} />
          <Button kind="toolbar" icon={<SettingsOption />} />
        </Toolbar>
        <DataSummary />
        <Box>
          <DataTable
            aria-describedby="node-table"
            onSelect={() => {}}
            columns={columns}
            sortable
          />
          <Pagination
            summary
            stepOptions
            border="top"
            pad={{ vertical: 'xsmall', horizontal: 'small' }}
          />
        </Box>
      </Box>
    </Data>
  );
};
