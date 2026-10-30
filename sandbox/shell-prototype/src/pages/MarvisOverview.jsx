// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  DataTable,
  Diagram,
  Grid,
  Heading,
  Notification,
  ResponsiveContext,
  Stack,
  Text,
  ThemeContext,
  ToggleGroup,
} from 'grommet';
import { normalizeColor, parseMetricToNum } from 'grommet/utils';
import {
  Down,
  Expand,
  Filter,
  StatusGood,
  StatusWarning,
} from '@hpe-design/icons-grommet';
import { ShellCard, useElementWidth } from '../components/common';
import { AMBIENT_MOTION } from '../theme';
import {
  affectedFilters,
  affectedPorts,
  cableBanner,
  latestUpdates,
  marvisActions,
  topologyNodes,
  updateKinds,
} from '../data/marvis';

// ---------------------------------------------------------------------------
// Topology
// ---------------------------------------------------------------------------
const CENTER_ID = 'marvis-center';
const nodeId = id => `marvis-node-${id}`;

// The action count sits in the centre with the network layers radiating
// out. Five columns when the canvas is wide enough for a tile in each,
// otherwise three; '.' leaves a grid cell empty.
const topologyLayouts = {
  five: {
    columns: ['flex', 'flex', 'flex', 'flex', 'flex'],
    areas: [
      ['switch', '.', 'center', '.', 'clients'],
      ['.', 'ap', '.', 'security', '.'],
      ['auth', '.', 'dhcp', '.', 'rf'],
    ],
  },
  three: {
    columns: ['flex', 'flex', 'flex'],
    areas: [
      ['switch', 'center', 'clients'],
      ['ap', '.', 'security'],
      ['auth', 'dhcp', 'rf'],
    ],
  },
};

const connections = topologyNodes.map(node => ({
  fromTarget: CENTER_ID,
  toTarget: nodeId(node.id),
  anchor: ['switch', 'clients'].includes(node.id) ? 'horizontal' : 'vertical',
  type: 'curved',
  color: 'white',
  thickness: 'hair',
}));

const statusIcon = {
  warning: <StatusWarning color="icon-warning" a11yTitle="Warning" />,
  ok: <StatusGood color="icon-ok" a11yTitle="OK" />,
};

const TopologyNode = ({ node, gridArea }) => {
  const Icon = node.icon;
  return (
    // The wrapper centres the tile within its grid cell.
    <Box gridArea={gridArea} align="center" justify="center">
      <Box
        id={nodeId(node.id)}
        background="shell-page"
        round="small"
        elevation="small"
        pad="small"
        gap="xsmall"
        width={{ min: 'xsmall' }}
      >
        <Box direction="row" gap="xsmall" align="center">
          <Icon size="small" color="icon-weak" aria-hidden="true" />
          <Text size="small">{node.label}</Text>
        </Box>
        <Box direction="row" gap="xsmall" align="center">
          <Text size="large" weight={500} color="text-strong">
            {node.value}
          </Text>
          {node.status && statusIcon[node.status]}
        </Box>
      </Box>
    </Box>
  );
};

TopologyNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    status: PropTypes.string,
    icon: PropTypes.elementType,
  }).isRequired,
  gridArea: PropTypes.string,
};

// Grommet treats the strong background as a dark context, so text-strong
// resolves to the readable (light) variant here. round="full" would give
// 100% (an ellipse on a wide box); the theme's full radius keeps a stadium.
const ActionCount = ({ gridArea }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box gridArea={gridArea} align="center" justify="center">
      <Box
        id={CENTER_ID}
        background="background-primary-xstrong"
        round={theme.global.radius.full}
        pad={{ horizontal: 'large', vertical: 'xsmall' }}
        direction="row"
        align="baseline"
        gap="xsmall"
        a11yTitle={`${marvisActions} Marvis actions`}
      >
        <Text size="xxlarge" weight={500} color="text-strong">
          {marvisActions}
        </Text>
        <Text size="small" color="text-strong">
          actions
        </Text>
      </Box>
    </Box>
  );
};

ActionCount.propTypes = {
  gridArea: PropTypes.string,
};

// Ambient gradient for the Marvis canvas. Two static gradient layers sit
// behind the content; cross-fading the top one's opacity morphs the canvas
// between blue- and green-dominant. Opacity is compositor-only, so the loop
// costs no layout or paint, and reduced-motion users get a fixed blend.
const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Canvas = styled(Box)`
  position: relative;
  overflow: hidden;
`;

const Backdrop = styled(Box)`
  position: absolute;
  inset: 0;
  background-image: ${props => props.$gradient};
  ${props =>
    props.$drift &&
    css`
      opacity: 0;
      animation: ${fade} ${AMBIENT_MOTION.duration}ms ease-in-out infinite
        alternate;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0.5;
      }
    `}
`;

const Content = styled(Box)`
  position: relative;
`;

// Marvis' view of the network: an action count with each network layer
// connected to it. Grommet's Diagram draws the connectors from element ids;
// it only re-measures on window resize, so it is keyed on the measured width
// to follow the content area as shell panels open and close.
const Topology = () => {
  const theme = useContext(ThemeContext);
  const [ref, width] = useElementWidth();

  // Column count follows the measured canvas width: each tile needs at least
  // the xsmall size token, plus the column gap between tiles.
  const tile = parseMetricToNum(theme.global.size.xsmall);
  const gap = parseMetricToNum(theme.global.edgeSize.small);
  const fits = count => width >= count * tile + (count - 1) * gap;
  const compact = width > 0 && !fits(3);
  const layout = fits(5) ? topologyLayouts.five : topologyLayouts.three;

  // Brand-colour exception for the Marvis canvas, built from theme colours
  // so it follows light and dark modes. The second gradient is the first
  // with its stops swapped, for the ambient drift to fade towards.
  const blue = normalizeColor('decorative-blue', theme);
  const green = normalizeColor('green', theme);
  const gradient = `linear-gradient(135deg, ${blue} 0%, ${green} 100%)`;
  const gradientAlt = `linear-gradient(135deg, ${green} 0%, ${blue} 100%)`;

  // Named areas only apply to the wide layouts; in the compact grid tiles
  // auto-place, so they must not carry a gridArea.
  const nodes = topologyNodes.map(node => (
    <TopologyNode
      key={node.id}
      node={node}
      gridArea={compact ? undefined : node.id}
    />
  ));

  return (
    <Canvas ref={ref} round="medium" flex={false}>
      <Backdrop $gradient={gradient} aria-hidden="true" />
      <Backdrop $gradient={gradientAlt} $drift aria-hidden="true" />
      <Content pad={{ horizontal: 'medium', vertical: 'large' }}>
        {compact ? (
          // Stacked: the action count on its own row, then as many tile
          // columns as fit (one on very narrow sheets). No connectors —
          // they only make sense when the layers radiate from the centre.
          <Box gap="medium">
            <ActionCount />
            <Grid
              columns={{ count: 'fit', size: ['xsmall', 'flex'] }}
              gap="small"
            >
              {nodes}
            </Grid>
          </Box>
        ) : (
          <Stack guidingChild="first" interactiveChild="first">
            <Grid
              columns={layout.columns}
              rows={['auto', 'auto', 'auto']}
              areas={layout.areas}
              gap={{ row: 'large', column: 'small' }}
            >
              <ActionCount gridArea="center" />
              {nodes}
            </Grid>
            <Diagram
              key={`${width}-${layout.columns.length}`}
              connections={connections}
            />
          </Stack>
        )}
      </Content>
    </Canvas>
  );
};

// ---------------------------------------------------------------------------
// Affected ports
// ---------------------------------------------------------------------------
const FilterLabel = ({ label, count }) => (
  <Box direction="row" gap="xsmall" align="center">
    <Text size="small">{label}</Text>
    <Box
      background="background-contrast"
      round="full"
      pad={{ horizontal: '3xsmall' }}
      flex={false}
    >
      <Text size="xsmall" weight={500}>
        {count}
      </Text>
    </Box>
  </Box>
);

FilterLabel.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

const AffectedPorts = () => {
  const [filter, setFilter] = useState('port');
  const [selected, setSelected] = useState(['BC-09']);
  const rows = affectedPorts[filter];
  return (
    <Box gap="small" flex={false}>
      <ToggleGroup
        a11yTitle="Affected items"
        options={affectedFilters.map(item => ({
          value: item.id,
          label: <FilterLabel label={item.label} count={item.count} />,
        }))}
        value={filter}
        onToggle={({ value }) => value && setFilter(value)}
      />
      <DataTable
        aria-label="Affected ports"
        data={rows}
        primaryKey="id"
        select={selected}
        onSelect={setSelected}
        columns={[
          { property: 'id', header: 'ID', primary: true },
          { property: 'site', header: 'Site' },
          { property: 'switch', header: 'Switch' },
          { property: 'port', header: 'Port' },
          { property: 'date', header: 'Date' },
        ]}
      />
    </Box>
  );
};

// ---------------------------------------------------------------------------
// Latest updates
// ---------------------------------------------------------------------------
const UpdateItem = ({ item }) => {
  const kind = updateKinds[item.kind];
  const Icon = kind.icon;
  return (
    <Box direction="row" gap="small" pad={{ vertical: 'xsmall' }}>
      <Box
        background={kind.background}
        round="full"
        pad="xsmall"
        flex={false}
        alignSelf="start"
      >
        <Icon size="small" color={kind.color} aria-hidden="true" />
      </Box>
      <Box gap="xsmall">
        <Box>
          <Text size="small" weight={500} color="text-strong">
            {item.title}
          </Text>
          <Text size="xsmall">{item.subtitle}</Text>
        </Box>
        <Box>
          {item.details.map(line => (
            <Text key={line} size="xsmall">
              {line}
            </Text>
          ))}
        </Box>
        <Text size="xsmall" color="text-weak">
          {item.when}
        </Text>
      </Box>
    </Box>
  );
};

UpdateItem.propTypes = {
  item: PropTypes.shape({
    kind: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.string),
    when: PropTypes.string,
  }).isRequired,
};

const LatestUpdates = () => (
  <ShellCard
    title="Latest updates"
    action={
      <Box direction="row" flex={false}>
        <Button
          icon={<Filter aria-hidden="true" />}
          a11yTitle="Filter updates"
          tip="Filter"
        />
        <Button
          icon={<Expand aria-hidden="true" />}
          a11yTitle="Open all updates"
          tip="Open"
        />
      </Box>
    }
  >
    <Box>
      {latestUpdates.map(group => (
        <Box key={group.group} flex={false}>
          <Box
            direction="row"
            gap="xsmall"
            align="center"
            pad={{ vertical: 'xsmall' }}
            border={{ side: 'bottom', color: 'border-weak' }}
          >
            <Down size="small" aria-hidden="true" />
            <Text size="xsmall" weight={500} color="text-weak">
              {group.group}
            </Text>
          </Box>
          {group.items.map(item => (
            <UpdateItem key={item.id} item={item} />
          ))}
        </Box>
      ))}
    </Box>
  </ShellCard>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
// Mist AI › Marvis™. The service owns this canvas: a topology and an
// in-page alert with the affected ports; "Latest updates" is page-level
// supporting content so it sits in a content column rather than the shell's
// contextual panel. Conversation belongs to GreenLake AI in the rail.
export const MarvisOverview = () => {
  const size = useContext(ResponsiveContext);
  const wide = ['large', 'xlarge'].includes(size);
  const [view, setView] = useState('actions');
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <Grid columns={wide ? ['flex', 'medium'] : ['flex']} gap="small">
      <Box gap="small">
        <Box direction="row" justify="between" align="center" gap="small">
          <Heading level={2} margin="none">
            {view === 'actions' ? 'Actions' : 'Sites'}
          </Heading>
          <ToggleGroup
            a11yTitle="Marvis view"
            options={[
              { label: 'Actions', value: 'actions' },
              { label: 'Sites', value: 'sites' },
            ]}
            value={view}
            onToggle={({ value }) => value && setView(value)}
          />
        </Box>
        <Topology />
        {bannerOpen && (
          <Notification
            status="info"
            title={cableBanner.title}
            message={cableBanner.message}
            actions={[{ label: 'Learn more' }]}
            onClose={() => setBannerOpen(false)}
          />
        )}
        <AffectedPorts />
      </Box>
      <LatestUpdates />
    </Grid>
  );
};
