// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Card,
  CardBody,
  Heading,
  Meter,
  Text,
  ThemeContext,
} from 'grommet';
import {
  Ascending,
  Descending,
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';
import { Surface, SurfaceTag } from './Surface';

// Ported from apps/docs templates/dashboards (overview dashboard) so the
// GreenLake home follows the same tile anatomy and spacing rules.

// Quantitative fills (Meter values) take foreground-* tokens; icons take
// icon-* tokens. Pairing a shape with each colour means status is never
// conveyed by colour alone.
const STATUS = {
  critical: {
    label: 'Critical',
    fill: 'foreground-critical',
    color: 'icon-critical',
    background: 'background-critical',
    text: 'text-onCritical',
    textStrong: 'text-onCritical-strong',
    Icon: StatusCritical,
  },
  warning: {
    label: 'Warning',
    fill: 'foreground-warning',
    color: 'icon-warning',
    background: 'background-warning',
    text: 'text-onWarning',
    textStrong: 'text-onWarning-strong',
    Icon: StatusWarning,
  },
  ok: {
    label: 'OK',
    fill: 'foreground-ok',
    color: 'icon-ok',
    background: 'background-ok',
    text: 'text-onOk',
    textStrong: 'text-onOk-strong',
    Icon: StatusGood,
  },
  unknown: {
    label: 'Unknown',
    fill: 'foreground-unknown',
    color: 'icon-unknown',
    background: 'background-unknown',
    text: 'text-onUnknown',
    textStrong: 'text-onUnknown-strong',
    Icon: StatusUnknown,
  },
};

const statusKeys = Object.keys(STATUS);

export const StatusIcon = ({ announce = false, status, ...rest }) => {
  const { Icon, color, label } = STATUS[status];
  const a11y = announce ? { a11yTitle: label } : { 'aria-hidden': true };
  return <Icon color={color} {...a11y} {...rest} />;
};

StatusIcon.propTypes = {
  announce: PropTypes.bool,
  status: PropTypes.oneOf(statusKeys).isRequired,
};

const Trend = ({ direction = 'up', value }) => {
  const Icon = direction === 'down' ? Descending : Ascending;
  return (
    <Box direction="row" align="center" gap="5xsmall">
      <Icon size="small" color="icon-strong" aria-hidden="true" />
      <Text size="xsmall" weight={500} color="text-strong">
        {value}
      </Text>
    </Box>
  );
};

Trend.propTypes = {
  direction: PropTypes.oneOf(['up', 'down']),
  value: PropTypes.string.isRequired,
};

// Large metric value with an optional unit and trend aligned to its
// baseline. Announced as one phrase, e.g. "99.98 %, up 0.03%".
export const MetricValue = ({
  size = '3xl',
  trend,
  trendDirection = 'up',
  unit,
  value,
}) => {
  const a11yTitle = [
    [value, unit].filter(Boolean).join(' '),
    trend && `${trendDirection} ${trend}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Box direction="row" gap="xxsmall" role="group" a11yTitle={a11yTitle}>
      <Text size={size} weight={500} color="text-strong" aria-hidden="true">
        {value}
      </Text>
      {(trend || unit) && (
        <Box justify="end" pad={{ vertical: '3xsmall' }} aria-hidden="true">
          {trend && <Trend value={trend} direction={trendDirection} />}
          {unit && <Text size="small">{unit}</Text>}
        </Box>
      )}
    </Box>
  );
};

MetricValue.propTypes = {
  size: PropTypes.string,
  trend: PropTypes.string,
  trendDirection: PropTypes.oneOf(['up', 'down']),
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

// Metric tile whose description follows the content at the tile's normal
// gap. An optional action sits under the description as the single CTA.
export const MetricTile = ({
  action,
  children,
  description,
  level = 3,
  statusIcon,
  title,
  ...rest
}) => (
  <Surface
    role="card"
    component={Card}
    elevation="none"
    round="medium"
    {...rest}
  >
    <CardBody gap="small">
      <Box direction="row" align="center" justify="between" gap="small">
        <Heading level={level} margin="none">
          {title}
        </Heading>
        {statusIcon}
      </Box>
      <SurfaceTag role="card" />
      <Box gap="xsmall" flex>
        {children}
        {action ? (
          <Box gap="small" align="start">
            {description && <Text>{description}</Text>}
            {action}
          </Box>
        ) : (
          description && <Text>{description}</Text>
        )}
      </Box>
    </CardBody>
  </Surface>
);

MetricTile.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  description: PropTypes.node,
  level: PropTypes.number,
  statusIcon: PropTypes.node,
  title: PropTypes.string.isRequired,
};

// Verdict line that stays quiet while things are fine: the status icon is
// only rendered for exceptions. An onClick turns the verdict into the link
// to go and deal with it.
export const QuietStatusRow = ({ children, icon, onClick, status }) => {
  const exception = status !== 'ok';
  return (
    <Box direction="row" align="center" gap="3xsmall">
      {exception ? <StatusIcon status={status} announce /> : icon}
      {onClick ? (
        <Anchor onClick={onClick}>{children}</Anchor>
      ) : (
        <Text>{children}</Text>
      )}
    </Box>
  );
};

QuietStatusRow.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  status: PropTypes.oneOf(statusKeys).isRequired,
};

// Thin horizontal meter for a share of a whole. Neutral while ok, status
// fill otherwise. With alignToText it is centred in a slot one line of body
// text tall so it lines up with a status row in a neighbouring tile.
export const StatusBar = ({
  alignToText = false,
  label,
  max,
  status = 'ok',
  value,
}) => {
  const theme = useContext(ThemeContext);
  const meter = (
    <Meter
      role="img"
      aria-label={label}
      type="bar"
      thickness="3xsmall"
      size="full"
      round
      max={max}
      values={[
        { value, color: status === 'ok' ? undefined : STATUS[status].fill },
      ]}
    />
  );
  return alignToText ? (
    <Box height={theme.text.medium.height} justify="center">
      {meter}
    </Box>
  ) : (
    meter
  );
};

StatusBar.propTypes = {
  alignToText: PropTypes.bool,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  status: PropTypes.oneOf(statusKeys),
  value: PropTypes.number.isRequired,
};

// A labelled count of items in a given status, on that status' surface.
export const StatusCount = ({ count, label, status, ...rest }) => {
  const {
    background,
    text,
    textStrong,
    Icon,
    color,
    label: name,
  } = STATUS[status];
  return (
    <Box
      direction="row"
      align="center"
      gap="xxsmall"
      background={background}
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      round="xsmall"
      {...rest}
    >
      <Icon color={color} a11yTitle={name} />
      <Box flex>
        <Text color={text}>{label}</Text>
      </Box>
      <Text size="large" weight={500} color={textStrong}>
        {count.toLocaleString('en-US')}
      </Text>
    </Box>
  );
};

StatusCount.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(statusKeys).isRequired,
};
