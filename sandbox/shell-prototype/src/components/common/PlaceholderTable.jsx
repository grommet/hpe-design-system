// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, DataTable, Text } from 'grommet';
import {
  StatusCritical,
  StatusGood,
  StatusWarning,
} from '@hpe-design/icons-grommet';

const statuses = [
  { label: 'OK', icon: StatusGood, color: 'status-ok' },
  { label: 'Warning', icon: StatusWarning, color: 'status-warning' },
  { label: 'OK', icon: StatusGood, color: 'status-ok' },
  { label: 'Critical', icon: StatusCritical, color: 'status-critical' },
  { label: 'OK', icon: StatusGood, color: 'status-ok' },
];

const locations = ['Houston', 'San Jose', 'Chicago', 'Toronto', 'Frankfurt'];

// Deterministic placeholder rows so every section page has believable
// content without a backend.
const placeholderRows = (seed, count = 6) =>
  Array.from({ length: count }, (_, index) => {
    const n = (seed.length + index) % statuses.length;
    const label = seed.replace(/-/g, ' ');
    return {
      id: `${seed}-${index + 1}`,
      name: `${label.charAt(0).toUpperCase()}${label.slice(1)} ${String(index + 1).padStart(2, '0')}`,
      status: statuses[n],
      location: locations[(index + seed.length) % locations.length],
      updated: `${index + 2} h ago`,
    };
  });

const StatusCell = ({ status }) => {
  const Icon = status.icon;
  return (
    <Box direction="row" gap="xsmall" align="center">
      <Icon color={status.color} size="small" aria-hidden="true" />
      <Text size="small">{status.label}</Text>
    </Box>
  );
};

StatusCell.propTypes = {
  status: PropTypes.shape({
    label: PropTypes.string,
    icon: PropTypes.elementType,
    color: PropTypes.string,
  }).isRequired,
};

export const PlaceholderTable = ({ seed, count }) => (
  <DataTable
    aria-label={`${seed} table`}
    data={placeholderRows(seed, count)}
    primaryKey="id"
    columns={[
      { property: 'name', header: 'Name', primary: true },
      {
        property: 'status',
        header: 'Status',
        render: row => <StatusCell status={row.status} />,
      },
      { property: 'location', header: 'Location' },
      { property: 'updated', header: 'Last updated', align: 'end' },
    ]}
  />
);

PlaceholderTable.propTypes = {
  seed: PropTypes.string.isRequired,
  count: PropTypes.number,
};
