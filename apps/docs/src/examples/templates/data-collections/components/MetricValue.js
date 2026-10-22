// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Ascending } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

// Change relative to the previous period, e.g. "7% more". The icon carries
// the direction, so it is named for assistive technology.
const Trend = ({ value }) => (
  <Box direction="row" align="center" gap="6xsmall">
    <Ascending size="small" color="icon-strong" a11yTitle="up" />
    <TextEmphasis size="xsmall">{value}</TextEmphasis>
  </Box>
);

Trend.propTypes = {
  value: PropTypes.string.isRequired,
};

// Large metric value with an optional unit and trend aligned to its baseline.
// Everything stays in the accessibility tree, so it reads in document order,
// e.g. "82, up 7% more, kW".
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
