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

interface ServersTableProps {
  showResultDetails: boolean;
  setShowResultDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ServersTable: React.FC<ServersTableProps> = ({
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

  useEffect(() => {
    const servers = opsRamp.servers || [];
    const upServers = servers.filter(server => server.state === 'up').length;
    const downServers = servers.filter(
      server => server.state === 'down',
    ).length;
    const unknownServers = servers.filter(
      server => server.state === 'unknown',
    ).length;
    const undefinedServers = servers.filter(
      server => server.state === 'undefined',
    ).length;

    setUp(upServers);
    setDown(downServers);
    setUndefinedState(undefinedServers);
    setUnknown(unknownServers);
    setTotal(servers.length);
    setResult(servers);
  }, []);

  useEffect(() => {
    let filteredData = opsRamp.servers;
    if (!('properties' in view)) {
      setQuickFilter('');
    }
    if (view && quickFilter !== '') {
      filteredData = filteredData.filter(
        server => server.state === quickFilter,
      );
    }
    setResult(filteredData);
    setTotal(filteredData.length);
  }, [view, quickFilter]);

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
        name: {
          label: 'Name',
        },
        'ip address': {
          label: 'IP Address',
        },
        model: {
          label: 'Model',
        },
        state: {
          label: 'State',
        },
      }}
      view={view}
      onView={view => setView(view as typeof defaultView)}
    >
      <Box
        round="small"
        background="background-front"
        pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
        gap="medium"
        flex={false}
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
            <Button kind="toolbar" icon={<Upload />} />
            <Button kind="toolbar" icon={<SettingsOption />} />
          </Toolbar>
          <DataSummary />
        </Box>
        <Box>
          <DataTable
            aria-describedby="server-table"
            onSelect={() => {}}
            columns={columns}
            sortable
          />
          <Pagination
            summary
            stepOptions
            border="top"
            pad={{ vertical: 'xsmall', left: 'small' }}
          />
        </Box>
      </Box>
    </Data>
  );
};
