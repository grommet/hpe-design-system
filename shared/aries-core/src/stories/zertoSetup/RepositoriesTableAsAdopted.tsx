// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Box,
  Button,
  Data,
  DataSearch,
  DataTable,
  Text,
  Toolbar,
  type ColumnConfig,
} from 'grommet';
import { Add, Star, StarFill } from '@hpe-design/icons-grommet';
import { type Repository, formatGb, repositories } from './data';

/**
 * Approximates the adopted implementation seen in the field: twelve
 * equal-width columns, headers and values truncated to fit, status shown by a
 * coloured dot alone, a separate column for the default marker, and no units
 * in headers. Text size is the theme default (16px) in both stories; the
 * legibility problem comes from the column layout, not the type scale.
 */
const truncated = (label: string) => <Text truncate>{label}</Text>;

const columns: ColumnConfig<Repository>[] = [
  {
    property: 'status',
    header: truncated('State'),
    size: '3xsmall',
    render: datum => (
      <Box
        round="full"
        pad="3xsmall"
        alignSelf="start"
        background={`status-${datum.status}`}
      />
    ),
  },
  {
    property: 'isDefault',
    header: truncated('Default'),
    size: '3xsmall',
    render: datum =>
      datum.isDefault ? (
        <StarFill a11yTitle="Default repository" />
      ) : (
        <Star a11yTitle="Not default" color="icon-weak" />
      ),
  },
  {
    property: 'name',
    header: truncated('Repository Name'),
    size: '3xsmall',
    render: datum => <Text truncate>{datum.name}</Text>,
  },
  {
    property: 'storageType',
    header: truncated('Storage Type'),
    size: '3xsmall',
    render: datum => <Text truncate>{datum.storageType}</Text>,
  },
  {
    property: 'connectionType',
    header: truncated('Connection Type'),
    size: '3xsmall',
    render: datum => <Text truncate>{datum.connectionType}</Text>,
  },
  {
    property: 'connectivity',
    header: truncated('Connectivity'),
    size: '3xsmall',
    render: datum => <Text truncate>{datum.connectivity}</Text>,
  },
  {
    property: 'path',
    header: truncated('Path'),
    size: '3xsmall',
    render: datum => <Text truncate>{datum.path}</Text>,
  },
  {
    property: 'usedGb',
    header: truncated('Usage / Capacity (GB)'),
    size: '3xsmall',
    render: datum => (
      <Text truncate>
        {datum.usedGb === null
          ? 'N/A'
          : `${formatGb(datum.usedGb)} / ${formatGb(datum.capacityGb)}`}
      </Text>
    ),
  },
  {
    property: 'immutability',
    header: truncated('Immutability'),
    size: '3xsmall',
    render: datum => <Text truncate>{datum.immutability}</Text>,
  },
  {
    property: 'vpgs',
    header: truncated('VPGs'),
    size: '3xsmall',
  },
  {
    property: 'restorePoints',
    header: truncated('Restore Points'),
    size: '3xsmall',
  },
  {
    property: 'freeGb',
    header: truncated('Free (GB)'),
    size: '3xsmall',
    render: datum => (
      <Text truncate>
        {datum.freeGb === null ? 'N/A' : formatGb(datum.freeGb)}
      </Text>
    ),
  },
];

export const RepositoriesTableAsAdopted = () => (
  <Data data={repositories}>
    <Toolbar justify="between" gap="medium">
      <DataSearch responsive />
      <Button
        label="Add repository"
        icon={<Add aria-hidden="true" />}
        secondary
      />
    </Toolbar>
    <Box overflow="auto">
      <DataTable
        aria-describedby="repositories-heading"
        columns={columns}
        primaryKey="id"
        sortable
      />
    </Box>
  </Data>
);
