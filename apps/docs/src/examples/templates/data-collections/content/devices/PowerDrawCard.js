// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, DataChart, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { MetricValue, SummaryCard } from '../../components';
import { power, surfaceBackground } from './data';

const series = 'dataVis-categorical-10';

// A single operating extreme (minimum or peak load) with the hour it
// occurred, shown as a contrast block beneath the chart.
const LoadBlock = ({ hour, kw, label }) => (
  <Box
    flex
    pad="small"
    round="small"
    background="background-contrast"
    gap="xsmall"
  >
    <Text size="small">{label}</Text>
    <Box gap="6xsmall">
      <TextEmphasis size="large">
        {kw} {power.unit}
      </TextEmphasis>
      <Text size="xsmall" color="text-weak">
        at {hour}
      </Text>
    </Box>
  </Box>
);

LoadBlock.propTypes = {
  hour: PropTypes.string.isRequired,
  kw: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export const PowerDrawCard = ({ detailed }) => (
  <SummaryCard
    title="Power draw"
    subtitle="Last 24 hours · fleet average"
    detailed={detailed}
    background={surfaceBackground}
    detail={
      <Box gap="medium">
        <DataChart
          a11yTitle="Fleet power draw over the last 24 hours"
          data={power.hours}
          series={[
            { property: 'hour' },
            { property: 'kw', label: 'Power', suffix: ` ${power.unit}` },
          ]}
          chart={[
            {
              property: 'kw',
              type: 'area',
              color: series,
              opacity: 'weak',
              thickness: '5xsmall',
            },
            {
              property: 'kw',
              type: 'line',
              color: series,
              thickness: '5xsmall',
              round: true,
            },
          ]}
          axis={{
            x: { property: 'hour', granularity: 'coarse' },
            y: { property: 'kw', granularity: 'medium' },
          }}
          guide={{ y: { granularity: 'medium' } }}
          size={{ width: 'fill', height: 'xsmall' }}
        />
        <Box direction="row" gap="small">
          <LoadBlock label="Min. load" {...power.minimum} />
          <LoadBlock label="Peak load" {...power.peak} />
        </Box>
      </Box>
    }
  >
    <MetricValue value={power.average} unit={power.unit} trend={power.trend} />
  </SummaryCard>
);

PowerDrawCard.propTypes = {
  detailed: PropTypes.bool,
};
