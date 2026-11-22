// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, List, Text } from 'grommet';
import {
  AlignedMetricTile,
  ChartCard,
  MetricValue,
} from '../../dashboards/components';
import { Bar } from '../../dashboards/content/overview/health/Bar';
import {
  QuietStatusRow,
  StatusIcon,
} from '../../dashboards/content/overview/health/status';
import { surfaceBackground } from './RhythmPage';

export { Bar, MetricValue, QuietStatusRow, StatusIcon };

// Content cards used by the rhythm comparison designs. Card interiors are
// fixed so only the gaps between cards and sections change with the rhythm.

// A metric with an optional verdict line and bar.
export const MetricTile = ({
  bar,
  description,
  status,
  statusLabel,
  title,
  unit,
  value,
  ...rest
}) => (
  <AlignedMetricTile
    background={surfaceBackground}
    anchor={false}
    title={title}
    description={description}
    {...rest}
  >
    <MetricValue value={value} unit={unit} />
    {bar && (
      <Bar
        label={bar.label}
        max={bar.max}
        value={bar.value}
        status={bar.status}
      />
    )}
    {status && <QuietStatusRow status={status}>{statusLabel}</QuietStatusRow>}
  </AlignedMetricTile>
);

MetricTile.propTypes = {
  bar: PropTypes.shape({
    label: PropTypes.string,
    max: PropTypes.number,
    status: PropTypes.string,
    value: PropTypes.number,
  }),
  description: PropTypes.node,
  status: PropTypes.string,
  statusLabel: PropTypes.string,
  title: PropTypes.string.isRequired,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// A titled card on the content surface.
export const Panel = ({ children, title, ...rest }) => (
  <ChartCard title={title} level={3} background={surfaceBackground} {...rest}>
    {children}
  </ChartCard>
);

Panel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

// Dated entries with a status icon, for feeds and event logs.
export const EventList = ({ a11yTitle, items }) => (
  <List
    a11yTitle={a11yTitle}
    data={items}
    border={false}
    pad={{ vertical: 'xsmall', horizontal: 'none' }}
  >
    {({ status, text, time }) => (
      <Box direction="row" align="start" gap="xsmall">
        <StatusIcon status={status} announce />
        <Box flex>
          <Text>{text}</Text>
          <Text size="small">{time}</Text>
        </Box>
      </Box>
    )}
  </List>
);

EventList.propTypes = {
  a11yTitle: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      text: PropTypes.string,
      time: PropTypes.string,
    }),
  ).isRequired,
};
