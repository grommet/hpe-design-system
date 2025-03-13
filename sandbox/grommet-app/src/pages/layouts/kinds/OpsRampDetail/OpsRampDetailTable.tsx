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
  Tip,
  View,
} from 'grommet';
import { Actions, Share } from 'grommet-icons';
import opsRamp from '../../../../mockData/opsRamp.json';

import { QuickFilters } from './QuickFilters';
import { defaultView, columns, NodeTableProps } from './Config';

export const OpsRampDetailTable: React.FC<NodeTableProps> = ({
  setShowResultDetails,
}) => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState<Node[]>([]);
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
          <DataTable
            aria-describedby="node-table"
            onSelect={() => {}}
            columns={columns(setShowResultDetails)}
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
