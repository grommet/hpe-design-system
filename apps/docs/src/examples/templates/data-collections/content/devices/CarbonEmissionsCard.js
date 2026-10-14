// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, DataChart, Text } from 'grommet';
import { StatusWarning } from '@hpe-design/icons-grommet';
import { LegendItem, MetricValue, SummaryCard } from '../../components';
import { carbon, formatNumber, surfaceBackground } from './data';

const emissions = { label: 'Emissions', color: 'dataVis-categorical-10' };
const target = { label: 'Daily target', color: 'foreground-warning' };
const tonnes = value => `${formatNumber(value, 1)} t`;

const chartTitle =
  'Daily carbon emissions for the last 7 days against the daily target';

export const CarbonEmissionsCard = ({ detailed }) => (
  <SummaryCard
    title="Carbon emissions"
    subtitle="Last 7 days"
    detailed={detailed}
    background={surfaceBackground}
    detail={
      <Box gap="small">
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
              thickness: '5xsmall',
              dash: true,
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

CarbonEmissionsCard.propTypes = {
  detailed: PropTypes.bool,
};
