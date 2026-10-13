// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Meter, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { MetricValue, SummaryCard } from '../../components';
import { energy, formatNumber, surfaceBackground } from './data';

// The largest site fills its bar; the rest are shown relative to it.
const max = energy.sites[0].kwh;

export const EnergyByLocationCard = ({ detailed }) => (
  <SummaryCard
    title="Energy by location"
    subtitle={`Last 7 days · ${energy.siteCount} sites`}
    detailed={detailed}
    background={surfaceBackground}
    detail={
      <Box gap="small">
        {energy.sites.map(({ color, kwh, name }) => (
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
    footer={`Top 5 sites use ${energy.topShare}% of the total`}
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
