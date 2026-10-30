// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ComponentType } from 'react';
import { Box, List, Tag, Text } from 'grommet';
import { ChartCard } from '../../components';
import { MetricValue } from '../../components/MetricValue';
import { slaStats, surfaceBackground } from './data';

const TypedChartCard = ChartCard as ComponentType<
  Partial<ComponentProps<typeof ChartCard>>
>;

const SLA_STATUS: Record<
  'ok' | 'warning',
  { label: string; background: string }
> = {
  ok: { label: 'On target', background: 'background-contrast' },
  warning: { label: 'Degrading', background: 'background-warning' },
};

// Dividers between stats only; the first and last rows have none.
const dividers = slaStats.reduce<
  NonNullable<ComponentProps<typeof List>['itemProps']>
>((result, _, index) =>
  index > 0
    ? {
        ...result,
        [index]: { border: { side: 'top', color: 'border-weak' } },
      }
    : result,
{});

type SlaPerformanceProps = {
  gridArea?: ComponentProps<typeof Box>['gridArea'];
};

export const SlaPerformance = ({ ...rest }: SlaPerformanceProps) => (
  <TypedChartCard
    title="SLA performance"
    level={3}
    background={surfaceBackground}
    {...rest}
  >
    <List
      a11yTitle="SLA performance statistics"
      data={slaStats}
      border={false}
      itemProps={dividers}
      pad={{ vertical: 'xsmall', horizontal: 'none' }}
    >
      {({ name, status, unit, value }: (typeof slaStats)[number]) => (
        <Box fill="horizontal">
          <Text>{name}</Text>
          <Box
            direction="row"
            align="center"
            justify="between"
            gap="xxsmall"
            wrap
          >
            <MetricValue value={value} unit={unit} />
            <Tag
              value={SLA_STATUS[status].label}
              size="xsmall"
              background={SLA_STATUS[status].background}
              border={false}
            />
          </Box>
        </Box>
      )}
    </List>
  </TypedChartCard>
);
