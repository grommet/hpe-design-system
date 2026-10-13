// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, DataChart, Text } from 'grommet';
import { StatusWarning } from '@hpe-design/icons-grommet';
import { LegendItem, MetricValue, SummaryCard } from '../../components';
import { carbon, energy, formatNumber, surfaceBackground } from './data';

const current = { label: 'Last 7 days', color: 'dataVis-categorical-10' };
const prior = { label: 'Prior 7 days', color: 'dataVis-categorical-20' };
const line = { type: 'line', thickness: '5xsmall', round: true };

const chartTitle =
  'Daily carbon emissions for the last 7 days compared with the prior 7 days';
const method =
  `${formatNumber(energy.total, 1)} MWh × ${carbon.intensity} kgCO₂e/kWh ` +
  '(EPA eGRID, WECC). Daily values in tCO₂e. Target set in Sustainability ' +
  'settings.';

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
            { property: 'current', label: current.label, suffix: ' t' },
            { property: 'prior', label: prior.label, suffix: ' t' },
          ]}
          chart={[
            { property: 'prior', color: prior.color, dash: true, ...line },
            { property: 'current', color: current.color, ...line },
          ]}
          axis={{
            x: { property: 'day', granularity: 'medium' },
            y: { property: 'current', granularity: 'medium' },
          }}
          guide={{ y: { granularity: 'medium' } }}
          size={{ width: 'fill', height: 'xsmall' }}
        />
        <Box direction="row" gap="small" wrap>
          <LegendItem color={current.color} label={current.label} />
          <LegendItem color={prior.color} label={prior.label} dash />
        </Box>
      </Box>
    }
    footer={method}
  >
    <Box gap="xxsmall">
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
