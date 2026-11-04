// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableColumns,
  Grid,
  Layer,
  Meter,
  Page,
  PageContent,
  Pagination,
  Text,
  type TextProps,
  ThemeContext,
  Toolbar,
  type ColumnConfig,
  type ThemeType,
} from 'grommet';
import { Add, Contract, Expand, StarFill } from '@hpe-design/icons-grommet';
import { LayerHeader as LayerHeaderJs } from '../../js/components/layouts/Layer';
import {
  type Repository,
  formatGb,
  repositories,
  statusLabels,
} from './data';
import { type Loose } from './loose';
import { StatusIndicator } from './StatusIndicator';

const LayerHeader = LayerHeaderJs as Loose<typeof LayerHeaderJs>;

// One label per property feeds the DataTable header, the DataFilters label,
// and the DataTableColumns option so the vocabulary stays consistent.
const columnOptions = [
  { property: 'status', label: 'Status', pinned: true },
  { property: 'name', label: 'Repository', pinned: true },
  { property: 'storageType', label: 'Storage type' },
  { property: 'connectionType', label: 'Connection type' },
  { property: 'connectivity', label: 'Connectivity' },
  { property: 'path', label: 'Path' },
  { property: 'usedGb', label: 'Usage' },
  { property: 'freeGb', label: 'Free' },
  { property: 'vpgs', label: 'VPGs' },
  { property: 'restorePoints', label: 'Restore points' },
  { property: 'immutability', label: 'Immutability' },
];

const properties = {
  status: {
    label: 'Status',
    options: (['ok', 'warning', 'critical'] as const).map(value => ({
      value,
      label: statusLabels[value],
    })),
  },
  name: { label: 'Repository', filter: false },
  storageType: { label: 'Storage type' },
  connectionType: { label: 'Connection type' },
  connectivity: { label: 'Connectivity' },
  path: { label: 'Path', filter: false },
  usedGb: { label: 'Usage', filter: false },
  freeGb: { label: 'Free', filter: false },
  vpgs: { label: 'VPGs', filter: false },
  restorePoints: { label: 'Restore points', filter: false },
  immutability: { label: 'Immutability' },
};

// Secondary attributes start hidden; users reveal them from column settings.
// Path, connection type and immutability are reference data, not scan data.
const defaultView = {
  columns: [
    'status',
    'name',
    'storageType',
    'connectivity',
    'usedGb',
    'freeGb',
    'vpgs',
    'restorePoints',
  ],
};

export const EmptyValue = () => <Text a11yTitle="No value">--</Text>;

// Keep every cell on one line so row height stays at the theme's minimum;
// the table scrolls horizontally behind the pinned columns instead of wrapping.
export const SingleLine = ({ children }: { children: string }) => (
  <Text truncate>{children}</Text>
);

const useColumns = (): ColumnConfig<Repository>[] => {
  const theme = useContext(ThemeContext) as ThemeType;
  // Reuse the theme's primary-cell text styling when the cell renders custom content.
  const primaryTextProps = theme.dataTable?.primary as TextProps | undefined;
  return useMemo(
    () => [
      {
        property: 'status',
        header: 'Status',
        pin: true,
        render: datum => <StatusIndicator status={datum.status} />,
      },
      {
        property: 'name',
        header: 'Repository',
        primary: true,
        pin: true,
        size: 'small',
        render: datum => (
          <Box direction="row" align="center" gap="xsmall">
            <Text truncate="tip" {...primaryTextProps}>
              {datum.name}
            </Text>
            {datum.isDefault && <StarFill a11yTitle="Default repository" />}
          </Box>
        ),
      },
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
            // Grid (not a flex row) so the cell's intrinsic width is the sum of
            // meter + text and the column is never squeezed below its content.
            <Grid columns={['4xsmall', 'auto']} align="center" gap="xsmall">
              <Meter
                aria-label={`${Math.round(
                  (datum.usedGb / datum.capacityGb) * 100,
                )}% used`}
                size="full"
                thickness="xsmall"
                max={datum.capacityGb}
                values={[{ value: datum.usedGb }]}
              />
              {/* Non-breaking spaces keep "used / capacity" as one token. */}
              <Text>
                {`${formatGb(datum.usedGb)}\u00A0/\u00A0${formatGb(
                  datum.capacityGb,
                )}`}
              </Text>
            </Grid>
          ),
      },
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

interface RepositoriesTableProps {
  // Overrides let the "Combined cells" variant swap the column rendering
  // while sharing this toolbar, fullscreen layer and pagination.
  columns?: ColumnConfig<Repository>[];
  defaultView?: typeof defaultView;
}

/**
 * Repositories table built on the Data pattern. Keeps the theme's 16px
 * text and 48px rows; density comes from column sizing, a pinned primary
 * column, units in headers, and user-controlled column visibility.
 * An Expand control moves the same table into a fullscreen Layer.
 */
export const RepositoriesTable = ({
  columns: columnsOverride,
  defaultView: view = defaultView,
}: RepositoriesTableProps = {}) => {
  const sizedColumns = useColumns();
  const columns = columnsOverride ?? sizedColumns;
  const [expanded, setExpanded] = useState(false);
  // Grommet types Button's ref for both anchor and button renderings.
  const toggleRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const wasExpanded = useRef(false);
  const collapse = () => setExpanded(false);

  // The toggle re-mounts when the table moves between page and layer,
  // so Layer can't restore focus to it on close by itself.
  useEffect(() => {
    if (wasExpanded.current && !expanded) toggleRef.current?.focus();
    wasExpanded.current = expanded;
  }, [expanded]);

  // Rendered either inline or inside the Layer, always within the same
  // Data provider so search, filters and column choices carry over.
  const table = (
    <>
      <Toolbar justify="between" gap="medium">
        <Toolbar>
          <DataSearch responsive />
          <DataFilters layer />
          <DataTableColumns drop options={columnOptions} />
        </Toolbar>
        <Toolbar>
          <Button
            ref={toggleRef}
            kind="toolbar"
            icon={
              expanded ? (
                <Contract aria-hidden="true" />
              ) : (
                <Expand aria-hidden="true" />
              )
            }
            tip={expanded ? 'Exit full screen' : 'Full screen'}
            a11yTitle={
              expanded ? 'Exit full screen table' : 'View table full screen'
            }
            onClick={() => setExpanded(current => !current)}
          />
          <Button
            label="Add repository"
            icon={<Add aria-hidden="true" />}
            secondary
          />
        </Toolbar>
      </Toolbar>
      <DataSummary />
      {/* In the layer this region takes the remaining height and scrolls,
          keeping the toolbar and pagination in view. */}
      <Box overflow="auto" flex={expanded}>
        <DataTable
          aria-describedby={expanded ? 'layer-title' : 'repositories-heading'}
          // Opaque pinned cells so scrolled columns don't show through them;
          // matches the background-front surface the table sits on.
          background={{
            header: 'background-front',
            pinned: 'background-front',
          }}
          columns={columns}
          primaryKey="id"
          sortable
        />
      </Box>
      <Pagination summary stepOptions border="top" />
    </>
  );

  return (
    <Data data={repositories} properties={properties} defaultView={view}>
      {expanded ? (
        // Fullscreen Layer anatomy: Page > PageContent > LayerHeader > body.
        <Layer full onEsc={collapse}>
          <Page background="background-front" fill>
            <PageContent fill>
              <Box fill gap="medium" pad={{ vertical: 'medium' }}>
                <LayerHeader title="Repositories" onClose={collapse} />
                {table}
              </Box>
            </PageContent>
          </Page>
        </Layer>
      ) : (
        table
      )}
    </Data>
  );
};
