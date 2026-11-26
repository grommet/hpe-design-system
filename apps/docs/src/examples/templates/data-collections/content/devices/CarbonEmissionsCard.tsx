// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled from 'styled-components';
import { Box, DataChart, Text, type ThemeType } from 'grommet';
import { StatusWarning } from '@hpe-design/icons-grommet';
import { LegendItem, MetricValue, SummaryCard } from '../../components';
import { carbon, formatNumber, surfaceBackground } from './data';

const emissions = { label: 'Emissions', color: 'dataVis-categorical-10' };
const target = {
  label: 'Daily target',
  color: 'foreground-warning',
  thickness: '5xsmall',
};
const tonnes = (value: number) => `${formatNumber(value, 1)} t`;

type CarbonEmissionsCardProps = {
  detailed?: boolean;
};

// Round caps add one stroke width to each end of every dash, which closes the
// gaps; that width is taken off the dash and added to the gap. Only dashed
// paths carry a stroke-dasharray attribute, so bars are unaffected.
const TargetDashes = styled(Box)`
  path[stroke-dasharray] {
    stroke-dasharray: ${({ theme }) => {
        const hpeTheme = theme as ThemeType & {
          global: { edgeSize: Record<string, string> };
        };
        const dash = parseInt(hpeTheme.global.edgeSize['3xsmall'], 10);
        const cap = parseInt(hpeTheme.global.edgeSize[target.thickness], 10);
      return `${dash - cap}px ${dash + cap}px`;
    }};
  }
`;

const chartTitle =
  'Daily carbon emissions for the last 7 days against the daily target';

export const CarbonEmissionsCard = ({
  detailed,
}: CarbonEmissionsCardProps) => (
  <SummaryCard
    title="Carbon emissions"
    subtitle="Last 7 days"
    detailed={detailed}
    background={surfaceBackground}
    detail={
      <Box gap="small">
        {/* Y-axis labels are centred on the guides and overhang the chart by
            half a line, so this keeps them clear of the spacing above. */}
        <TargetDashes pad={{ top: 'xsmall' }}>
          <DataChart
            a11yTitle={chartTitle}
            data={carbon.days}
            series={[
              { property: 'day' },
              { property: 'current', label: emissions.label, suffix: ' t' },
              { property: 'target', label: target.label, suffix: ' t' },
            ]}
            chart={[
              {
                property: 'current',
                type: 'bar',
                thickness: 'xsmall',
                color: emissions.color,
              },
              // Drawn after the bars so the target reads over each day.
              {
                property: 'target',
                type: 'line',
                thickness: target.thickness,
                dash: true,
                round: true,
                color: target.color,
              },
            ]}
            axis={{
              x: { property: 'day', granularity: 'medium' },
              y: { property: 'current', granularity: 'medium' },
            }}
            guide={{ y: { granularity: 'medium' } }}
            size={{ width: 'fill', height: 'xsmall' }}
          />
        </TargetDashes>
        <LegendItem
          color={target.color}
          label={`${target.label} ${tonnes(carbon.dailyTarget)}`}
          dash
        />
      </Box>
    }
  >
    <Box gap="4xsmall">
      <MetricValue
        value={formatNumber(carbon.total, 1)}
        unit={carbon.unit}
        trend={carbon.trend}
      />
      <Box direction="row" align="center" gap="3xsmall">
        <StatusWarning color="icon-warning" aria-hidden />
        <Text>{carbon.aboveTarget}% above weekly target</Text>
      </Box>
    </Box>
  </SummaryCard>
);
