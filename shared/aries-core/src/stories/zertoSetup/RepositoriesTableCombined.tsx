// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useMemo } from 'react';
import {
  Box,
  Meter,
  Text,
  type TextProps,
  ThemeContext,
  type ColumnConfig,
  type ThemeType,
} from 'grommet';
import { StarFill } from '@hpe-design/icons-grommet';
import { type Repository, formatGb } from './data';
import { EmptyValue, RepositoriesTable, SingleLine } from './RepositoriesTable';
import { StatusIndicator } from './StatusIndicator';

// Descriptive attributes move under the value they describe, so the stacked
// Status and Repository cells cover storage type and connectivity without
// their own columns. Numbers users compare down the table keep their own
// right-aligned columns. Every stacked cell has a value on every row, which
// keeps row heights even. Path is long reference data and stays in column
// settings.
const defaultView = {
  columns: [
    'status',
    'name',
    'connectionType',
    'usedGb',
    'freeGb',
    'vpgs',
    'restorePoints',
    'immutability',
  ],
};

// Second line of a stacked cell: same 16px size, hierarchy comes from colour.
const Supporting = ({ children }: { children: string }) => (
  <Text color="text-weak" truncate="tip">
    {children}
  </Text>
);

const useCombinedColumns = (): ColumnConfig<Repository>[] => {
  const theme = useContext(ThemeContext) as ThemeType;
  const primaryTextProps = theme.dataTable?.primary as TextProps | undefined;
  return useMemo(
    () => [
      {
        property: 'status',
        header: 'Status',
        pin: true,
        render: datum => (
          <Box>
            <StatusIndicator status={datum.status} />
            <Supporting>{datum.connectivity}</Supporting>
          </Box>
        ),
      },
      {
        property: 'name',
        header: 'Repository',
        primary: true,
        pin: true,
        size: 'small',
        render: datum => (
          <Box>
            <Box direction="row" align="center" gap="xsmall">
              <Text truncate="tip" {...primaryTextProps}>
                {datum.name}
              </Text>
              {datum.isDefault && <StarFill a11yTitle="Default repository" />}
            </Box>
            <Supporting>{datum.storageType}</Supporting>
          </Box>
        ),
      },
      // Still offered in column settings for sorting, even though their
      // values also appear as supporting text above.
      {
        property: 'storageType',
        header: 'Storage type',
        render: datum => <SingleLine>{datum.storageType}</SingleLine>,
      },
      {
        property: 'connectionType',
        header: 'Connection type',
        render: datum => <SingleLine>{datum.connectionType}</SingleLine>,
      },
      {
        property: 'connectivity',
        header: 'Connectivity',
        render: datum => <SingleLine>{datum.connectivity}</SingleLine>,
      },
      {
        property: 'path',
        header: 'Path',
        size: 'xsmall',
        render: datum => <Text truncate="tip">{datum.path}</Text>,
      },
      {
        property: 'usedGb',
        header: 'Usage',
        units: 'GB',
        render: datum =>
          datum.usedGb === null || datum.capacityGb === null ? (
            <EmptyValue />
          ) : (
            // The text sets the column width; the meter stretches to match it
            // underneath instead of claiming width beside it.
            <Box gap="5xsmall">
              <Text>
                {`${formatGb(datum.usedGb)}\u00A0/\u00A0${formatGb(
                  datum.capacityGb,
                )}`}
              </Text>
              <Meter
                aria-label={`${Math.round(
                  (datum.usedGb / datum.capacityGb) * 100,
                )}% used`}
                size="full"
                thickness="xxsmall"
                max={datum.capacityGb}
                values={[{ value: datum.usedGb }]}
              />
            </Box>
          ),
      },
      // Derivable from usage, but a comparable number so it keeps a column.
      {
        property: 'freeGb',
        header: 'Free',
        units: 'GB',
        align: 'end',
        render: datum =>
          datum.freeGb === null ? (
            <EmptyValue />
          ) : (
            <SingleLine>{formatGb(datum.freeGb)}</SingleLine>
          ),
      },
      { property: 'vpgs', header: 'VPGs', align: 'end' },
      { property: 'restorePoints', header: 'Restore points', align: 'end' },
      {
        property: 'immutability',
        header: 'Immutability',
        render: datum => <SingleLine>{datum.immutability}</SingleLine>,
      },
    ],
    [primaryTextProps],
  );
};

/**
 * Trades vertical for horizontal space: two-line cells combine related
 * attributes (status + connectivity, repository + storage type, usage text +
 * meter) so two fewer columns are needed for the same information. Shares the
 * toolbar, fullscreen layer and pagination with the recommended table.
 */
export const RepositoriesTableCombined = () => (
  <RepositoriesTable columns={useCombinedColumns()} defaultView={defaultView} />
);
