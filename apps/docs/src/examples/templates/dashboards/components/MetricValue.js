// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { ChartLine } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

// Change relative to the previous period, e.g. "+2%".
export const Trend = ({ value, a11yTitle = 'Trending up' }) => (
  <Box direction="row" align="center" gap="3xsmall">
    <ChartLine size="small" color="icon-strong" a11yTitle={a11yTitle} />
    <TextEmphasis size="xsmall">{value}</TextEmphasis>
  </Box>
);

Trend.propTypes = {
  a11yTitle: PropTypes.string,
  value: PropTypes.string.isRequired,
};

// Large metric value with an optional unit and trend aligned to its baseline.
export const MetricValue = ({ size = '3xl', trend, unit, value }) => (
  <Box direction="row" gap="xxsmall">
    <TextEmphasis size={size}>{value}</TextEmphasis>
    {(trend || unit) && (
      <Box justify="end" pad={{ vertical: '3xsmall' }}>
        {trend && <Trend value={trend} />}
        {unit && <Text size="xsmall">{unit}</Text>}
      </Box>
    )}
  </Box>
);

MetricValue.propTypes = {
  size: PropTypes.string,
  trend: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
