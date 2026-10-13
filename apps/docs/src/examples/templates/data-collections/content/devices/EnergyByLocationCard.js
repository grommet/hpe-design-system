// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Meter, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { MetricValue, SummaryCard } from '../../components';
import { energy, formatNumber, surfaceBackground } from './data';

// The remaining sites are consolidated into a final, neutral bar. All bars
// share one scale so the top sites read honestly against the whole fleet.
// There is no neutral dataVis token, so decorative-neutral is used for the
// remainder, where the hue itself carries no meaning.
const bars = [
  ...energy.sites,
  { ...energy.other, color: 'decorative-neutral' },
];
const max = Math.max(...bars.map(({ kwh }) => kwh));

export const EnergyByLocationCard = ({ detailed }) => (
  <SummaryCard
    title="Energy by location"
    subtitle={`Last 7 days · ${energy.siteCount} sites`}
    detailed={detailed}
    background={surfaceBackground}
    detail={
      <Box gap="small">
        {bars.map(({ color, kwh, name }) => (
          <Box key={name} gap="3xsmall">
            <Box direction="row" justify="between" align="start" gap="small">
              <Text size="small">{name}</Text>
              <TextEmphasis size="small" textAlign="end">
                {formatNumber(kwh, 0)} kWh
              </TextEmphasis>
            </Box>
            <Meter
              a11yTitle={`${name}: ${formatNumber(kwh, 0)} kWh`}
              type="bar"
              size="full"
              thickness="3xsmall"
              round
              max={max}
              value={kwh}
              color={color}
            />
          </Box>
        ))}
      </Box>
    }
  >
    <MetricValue
      value={formatNumber(energy.total, 1)}
      unit={energy.unit}
      trend={energy.trend}
    />
  </SummaryCard>
);

EnergyByLocationCard.propTypes = {
  detailed: PropTypes.bool,
};
