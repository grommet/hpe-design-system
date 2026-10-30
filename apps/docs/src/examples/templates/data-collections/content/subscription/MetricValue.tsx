// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactElement } from 'react';
import { Box, Text } from 'grommet';
import { Ascending, Descending } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

type TrendDirection = 'up' | 'down';

const trendIcons: Record<TrendDirection, ReactElement> = {
  up: <Ascending size="small" color="icon-strong" a11yTitle="up" />,
  down: <Descending size="small" color="icon-strong" a11yTitle="down" />,
};

type TrendProps = {
  direction: TrendDirection;
  value: string;
};

// Change relative to a baseline, e.g. "34%". The icon carries the direction,
// so it is named for assistive technology.
const Trend = ({ direction, value }: TrendProps) => (
  <Box direction="row" align="center" gap="6xsmall">
    {trendIcons[direction]}
    <TextEmphasis size="xsmall">{value}</TextEmphasis>
  </Box>
);

export type MetricValueProps = {
  size?: ComponentProps<typeof TextEmphasis>['size'];
  trend?: string;
  trendDirection?: TrendDirection;
  unit?: string;
  value: string | number;
};

// Large metric value with an optional unit and trend aligned to its
// baseline. Everything stays in the accessibility tree, so it reads in
// document order, e.g. "58, down 34%, t CO₂".
export const MetricValue = ({
  size = 'xxlarge',
  trend,
  trendDirection = 'up',
  unit,
  value,
}: MetricValueProps) => (
  <Box direction="row" gap="xxsmall">
    <TextEmphasis size={size}>{value}</TextEmphasis>
    {(trend || unit) && (
      <Box justify="end" pad={{ vertical: '3xsmall' }}>
        {trend && <Trend direction={trendDirection} value={trend} />}
        {unit && <Text size="xsmall">{unit}</Text>}
      </Box>
    )}
  </Box>
);
