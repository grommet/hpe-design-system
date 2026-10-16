// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Anchor, Box, Text } from 'grommet';
import {
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';

// Quantitative fills, such as Meter values, take foreground-* tokens; icons
// take icon-* tokens. Pairing a shape with each color means status is never
// conveyed by color alone.
export const STATUS = {
  critical: {
    label: 'Critical',
    fill: 'foreground-critical',
    color: 'icon-critical',
    Icon: StatusCritical,
  },
  warning: {
    label: 'Warning',
    fill: 'foreground-warning',
    color: 'icon-warning',
    Icon: StatusWarning,
  },
  ok: {
    label: 'OK',
    fill: 'foreground-ok',
    color: 'icon-ok',
    Icon: StatusGood,
  },
  unknown: {
    label: 'Unknown',
    fill: 'foreground-unknown',
    color: 'icon-unknown',
    Icon: StatusUnknown,
  },
};

// Decorative by default; pass announce when the icon is the only thing
// conveying status, e.g. in a tile's title row.
export const StatusIcon = ({ announce = false, status, ...rest }) => {
  const { Icon, color, label } = STATUS[status];
  const a11y = announce ? { a11yTitle: label } : { 'aria-hidden': true };
  return <Icon color={color} {...a11y} {...rest} />;
};

StatusIcon.propTypes = {
  announce: PropTypes.bool,
  status: PropTypes.oneOf(Object.keys(STATUS)).isRequired,
};

// Verdict line that stays quiet while things are fine. The status icon is
// only rendered for warning and critical, so "good" is not repeated in every
// tile; pass icon to mark the subject instead, e.g. a shield for protection.
// When there is an exception the status is announced, and an href turns the
// verdict into the link to go and deal with it.
export const QuietStatusRow = ({ children, href, icon, status }) => {
  const exception = status !== 'ok';
  return (
    <Box direction="row" align="center" gap="3xsmall">
      {exception ? <StatusIcon status={status} announce /> : icon}
      {href ? <Anchor href={href}>{children}</Anchor> : <Text>{children}</Text>}
    </Box>
  );
};

QuietStatusRow.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  icon: PropTypes.node,
  status: PropTypes.oneOf(Object.keys(STATUS)).isRequired,
};
