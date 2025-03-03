import React, { useState, useContext, useEffect } from 'react';
import {
  Anchor,
  Box,
  Button,
  DataFilters,
  Grid,
  Toolbar,
  DataSearch,
  Data,
  ResponsiveContext,
  DataTable,
  Pagination,
} from 'grommet';
import {
  StatusCriticalSmall,
  FormUpload,
  SettingsOption,
  StatusGoodSmall,
  StatusPlaceholderSmall,
  StatusUnknownSmall,
} from 'grommet-icons';
import opsRamp from '../../../../mockData/opsRamp.json';
import { ResourceDetails } from './ResourceDetails';
import { QuickFilters } from './QuickFilters';

export const ServersTable: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState([]);
  const [quickFilter, setQuickFilter] = useState('');
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [undefiend, setUndefined] = useState(0);
  const [showResultDetails, setShowResultDetails] = useState(false);
  const breakpoint = useContext(ResponsiveContext);

  useEffect(() => {
    const servers = opsRamp.servers || [];
    const upServers = servers.filter(server => server.state === 'up').length;
    const downServers = servers.filter(
      server => server.state === 'down',
    ).length;
    const unknownServers = servers.filter(
      server => server.state === 'unknown',
    ).length;
    const undefiendServers = servers.filter(
      server => server.state === 'undefined',
    ).length;

    setUp(upServers);
    setDown(downServers);
    setUndefined(undefiendServers);
    setUnknown(unknownServers);
    setTotal(servers.length);
    setResult(servers);
  }, []);

  useEffect(() => {
    let filteredData = opsRamp.servers || [];
    if (quickFilter) {
      filteredData = filteredData.filter(
        server => server.state === quickFilter,
      );
    }
    setResult(filteredData);
    setTotal(filteredData.length);
  }, [quickFilter]);

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

  const gridColumns = ['xsmall', 'small'].includes(breakpoint)
    ? ['flex', 'auto']
    : ['auto', 'auto'];

  const rows = ['auto'];
  const columnsGap = {
    xsmall: 'small',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };
  const rowsGap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  };

  const gap = {
    row: rowsGap[breakpoint],
    column: columnsGap[breakpoint],
  };

  const areasDefault = [
    ['quickfilters', 'resourcedetails'],
    ['datatable', 'resourcedetails'],
  ];

  const areasSmall = [
    ['quickfilters', 'unassigned'],
    ['datatable', 'unassigned'],
  ];

  const areas = ['xsmall', 'small'].includes(breakpoint)
    ? areasSmall
    : areasDefault;

  return (
    <Grid
      rows={rows}
      columns={showResultDetails ? gridColumns : 'full'}
      areas={showResultDetails ? areas : undefined}
      gap={{ row: gap.row, column: gap.column }}
    >
      <Data
        data={result}
        total={total}
        filteredTotal={result.length}
        defaultView={{
          search: '',
          sort: { property: 'name', direction: 'asc' },
          step: 10,
        }}
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
      >
        <Box
          round="small"
          background="background-front"
          pad={{ top: 'small', bottom: 'medium', horizontal: 'medium' }}
          gap="medium"
        >
          <Box gridArea="quickfilters">
            <QuickFilters
              value={quickFilter}
              setValue={setQuickFilter}
              counts={{ up, down, unknown, undefiend }}
            />
          </Box>
          <Box pad={{ vertical: 'small' }} overflow="auto" gridArea="datatable">
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
              <Button kind="toolbar" icon={<FormUpload />} />
              <Button kind="toolbar" icon={<SettingsOption />} />
            </Toolbar>
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
      <Box gridArea="resourcedetails">
        {showResultDetails && (
          <ResourceDetails
            layer={['xsmall', 'small', 'medium'].includes(breakpoint)}
            onClose={() => setShowResultDetails(false)}
            animation={
              ['xsmall', 'small', 'medium'].includes(breakpoint)
                ? false
                : ['slideLeft', 'fadeIn']
            }
          />
        )}
      </Box>
    </Grid>
  );
};
