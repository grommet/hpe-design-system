// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Ascending, Descending } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

// Change relative to the previous period, e.g. "2%". The icon conveys the
// direction visually; the accessible name is carried by the parent group.
export const Trend = ({ direction = 'up', value }) => {
  const Icon = direction === 'down' ? Descending : Ascending;
  return (
    <Box direction="row" align="center" gap="5xsmall">
      <Icon size="small" color="icon-strong" aria-hidden />
      <TextEmphasis size="xsmall">{value}</TextEmphasis>
    </Box>
  );
};

Trend.propTypes = {
  direction: PropTypes.oneOf(['up', 'down']),
  value: PropTypes.string.isRequired,
};

// Large metric value with an optional unit and trend aligned to its baseline.
// The group is announced as one phrase, e.g. "99.98 %, up 0.03%", rather
// than as separate fragments.
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
      <TextEmphasis size={size} aria-hidden>
        {value}
      </TextEmphasis>
      {(trend || unit) && (
        <Box justify="end" pad={{ vertical: '3xsmall' }} aria-hidden>
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
