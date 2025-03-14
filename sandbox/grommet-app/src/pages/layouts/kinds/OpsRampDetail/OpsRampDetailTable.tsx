import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  DataFilters,
  DataSummary,
  DataSort,
  Toolbar,
  DataSearch,
  Data,
  DataTable,
  Pagination,
} from 'grommet';
import { Actions, Share } from 'grommet-icons';
import opsRamp from '../../../../mockData/opsRamp.json';

import { QuickFilters } from './QuickFilters';
import {
  defaultView,
  columns,
  nodeTableProps,
  properties,
  Node,
  resultType,
} from './config';

export const OpsRampDetailTable: React.FC<nodeTableProps> = ({
  setShowResultDetails,
  setSelectedName,
  setSelectedIpAddress,
}) => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<resultType>({
    data: [],
    filteredTotal: 0,
    page: 1,
  });
  const [quickFilter, setQuickFilter] = useState('');
  const [view, setView] = useState(defaultView);
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [undefinedState, setUndefinedState] = useState(0);

  useEffect(() => {
    const nodes = opsRamp.nodes || [];
    let upNodes = 0;
    let downNodes = 0;
    let unknownNodes = 0;
    let undefinedNodes = 0;
    nodes.forEach(node => {
      switch (node.state) {
        case 'up':
          upNodes++;
          break;
        case 'down':
          downNodes++;
          break;
        case 'unknown':
          unknownNodes++;
          break;
        case 'undefined':
          undefinedNodes++;
          break;
      }
    });
    setUp(upNodes);
    setDown(downNodes);
    setUnknown(unknownNodes);
    setUndefinedState(undefinedNodes);
  }, []);

  useEffect(() => {
    let filteredData: Node[] = opsRamp.nodes || [];
    if (quickFilter) {
      filteredData = filteredData.filter(node => node.state === quickFilter);
    }

    if (view && view.properties && typeof view.properties === 'object') {
      Object.keys(view.properties).forEach(property => {
        if (Array.isArray(view.properties[property])) {
          filteredData = filteredData.filter(node =>
            view.properties[property].includes(node[property]),
          );
        }
      });
    }

    // Apply math for pagination
    const filteredTotal = filteredData.length;
    const step = view?.step || defaultView.step;
    const page = view?.page || defaultView.page;

    const startIndex = (page - 1) * step;
    const endIndex = startIndex + step;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setResult({
      data: paginatedData,
      filteredTotal,
      page,
    });
    setTotal(filteredData.length);
  }, [quickFilter, view]);

  const handleViewChange = (newView: any) => {
    setView(newView);
  };

  return (
    <Data
      data={result.data}
      total={total}
      filteredTotal={result.filteredTotal}
      defaultView={defaultView}
      gap="medium"
      properties={properties}
      view={view}
      onView={handleViewChange}
    >
      <QuickFilters
        value={quickFilter}
        setValue={setQuickFilter}
        counts={{ up, down, unknown, undefinedState }}
      />
      <Box>
        <Toolbar justify="between">
          <Toolbar>
            <DataSearch />
            <DataFilters layer />
            <DataSort drop />
          </Toolbar>
          <Toolbar gap="xsmall">
            <Button
              kind="toolbar"
              icon={<Share />}
              tip="Share Kubernetes nodes"
            />
            <Button tip="Actions" kind="toolbar" icon={<Actions />} />
          </Toolbar>
        </Toolbar>
        <DataSummary />
        <Box overflow="auto">
          {/* instead of datatable should we change to list on smaller views */}
          <DataTable
            aria-label="Kubernetes nodes table displaying node statuses"
            // style of onSelect use the same green color as the Select component
            onSelect={() => {}}
            columns={columns(
              setShowResultDetails,
              setSelectedName,
              setSelectedIpAddress,
            )}
            sortable
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
