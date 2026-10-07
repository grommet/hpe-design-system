// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  DataTable,
  SkeletonContext,
  Text,
} from 'grommet';
import { Add, Servers, StatusWarning } from '@hpe-design/icons-grommet';
import { EmptyState } from '@shared/aries-core';
import { StatusIcon } from '../../components/datatable/StatusIcon';

const SKELETON_ROWS = 5;

// Column headers opt out of the surrounding skeleton so the table keeps
// its structure while the body loads, which minimizes layout shift once
// the data arrives.
const StructuralHeader = ({ children }) => (
  <SkeletonContext.Provider value={undefined}>
    <Text weight={500} color="text-strong">
      {children}
    </Text>
  </SkeletonContext.Provider>
);

StructuralHeader.propTypes = { children: PropTypes.node };

// Fixed column sizes so loading and loaded layouts line up.
const columns = [
  {
    property: 'name',
    header: <StructuralHeader>Name</StructuralHeader>,
    primary: true,
    size: 'small',
  },
  {
    property: 'model',
    header: <StructuralHeader>Model</StructuralHeader>,
    size: 'medium',
  },
  {
    property: 'os',
    header: <StructuralHeader>OS image</StructuralHeader>,
    size: 'medium',
  },
  {
    property: 'ip',
    header: <StructuralHeader>iLO IP address</StructuralHeader>,
    size: 'small',
  },
  {
    property: 'power',
    header: <StructuralHeader>Power</StructuralHeader>,
    size: 'xsmall',
  },
  {
    property: 'health',
    header: <StructuralHeader>Health</StructuralHeader>,
    size: 'small',
    render: datum => {
      const label =
        datum.health === 'ok'
          ? 'OK'
          : datum.health.charAt(0).toUpperCase() + datum.health.slice(1);
      return (
        <Box direction="row" gap="xsmall" align="center">
          <StatusIcon status={datum.health} />
          <Text>{label}</Text>
        </Box>
      );
    },
  },
];

// Placeholder rows use empty strings so each cell still renders a Text,
// which becomes a skeleton bar inside the skeleton context.
const placeholderRows = Array.from({ length: SKELETON_ROWS }, (_, i) => ({
  id: `placeholder-${i}`,
  name: '',
  model: '',
  os: '',
  ip: '',
  power: '',
  health: '',
}));

const loadingColumns = columns.map(column => ({
  ...column,
  render: undefined,
}));

const skeleton = {
  depth: 0,
  colors: {
    light: ['transparent', 'background-contrast'],
    dark: ['transparent', 'background-contrast'],
  },
  message: { start: 'Loading servers', end: 'Servers loaded' },
};

const ErrorEmptyState = ({ onRetry }) => (
  <EmptyState
    level={3}
    icon={<StatusWarning color="icon-warning" />}
    title="Unable to retrieve servers"
    description={`We couldn't reach the server inventory service, so the 
      list is temporarily unavailable. Try again, and if the problem 
      persists, contact support.`}
    actions={
      <Box align="center" gap="xsmall">
        <Button label="Try again" primary onClick={onRetry} />
        <Anchor label="Contact support" href="#" />
      </Box>
    }
  />
);

ErrorEmptyState.propTypes = { onRetry: PropTypes.func };

const NoDataEmptyState = ({ onAdd }) => (
  <EmptyState
    level={3}
    icon={<Servers />}
    title="No servers in this region"
    description={`Once a server is added to this region, it will be 
      displayed here.`}
    actions={
      <Box align="center" gap="xsmall">
        <Button label="Add server" icon={<Add />} primary onClick={onAdd} />
        <Anchor label="Learn about adding servers" href="#" />
      </Box>
    }
  />
);

NoDataEmptyState.propTypes = { onAdd: PropTypes.func };

const placeholders = {
  error: ErrorEmptyState,
  empty: NoDataEmptyState,
};

export const ServersTable = ({
  data = [],
  describedBy,
  onAdd,
  onRetry,
  status,
}) => {
  const loading = status === 'loading';
  const Placeholder = placeholders[status];
  let rows = [];
  if (loading) rows = placeholderRows;
  else if (status === 'success') rows = data;

  return (
    <Box
      skeleton={loading ? skeleton : undefined}
      aria-busy={loading || undefined}
      overflow="auto"
    >
      <DataTable
        a11yTitle="Servers"
        aria-describedby={describedBy}
        columns={loading ? loadingColumns : columns}
        data={rows}
        primaryKey="id"
        placeholder={
          Placeholder && (
            <Box pad="xlarge" align="center">
              <Placeholder onAdd={onAdd} onRetry={onRetry} />
            </Box>
          )
        }
      />
    </Box>
  );
};

ServersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  describedBy: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onRetry: PropTypes.func,
  status: PropTypes.oneOf(['loading', 'success', 'error', 'empty']).isRequired,
};
