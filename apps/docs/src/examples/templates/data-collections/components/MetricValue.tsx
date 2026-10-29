// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import { Box, Text } from 'grommet';
import { Ascending } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

// Change relative to the previous period, e.g. "7% more". The icon carries
// the direction, so it is named for assistive technology.
type TrendProps = {
  value: string;
};

const Trend = ({ value }: TrendProps) => (
  <Box direction="row" align="center" gap="6xsmall">
    <Ascending size="small" color="icon-strong" a11yTitle="up" />
    <TextEmphasis size="xsmall">{value}</TextEmphasis>
  </Box>
);

type MetricValueProps = {
  size?: ComponentProps<typeof TextEmphasis>['size'];
  trend?: string;
  unit?: string;
  value: string | number;
};

// Large metric value with an optional unit and trend aligned to its baseline.
// Everything stays in the accessibility tree, so it reads in document order,
// e.g. "82, up 7% more, kW".
export const MetricValue = ({
  size = '3xl',
  trend,
  unit,
  value,
}: MetricValueProps) => (
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
