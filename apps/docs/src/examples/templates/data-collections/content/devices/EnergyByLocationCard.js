// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Meter, Text, ThemeContext } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { MetricValue, SummaryCard } from '../../components';
import { energy, formatNumber, surfaceBackground } from './data';

const totalKwh = energy.total * 1000;

// Remaining sites are consolidated into a neutral final segment so the top
// sites read as shares of the whole fleet.
const segments = [
  ...energy.sites,
  { ...energy.other, color: 'decorative-neutral' },
].map(site => ({
  ...site,
  percent: Math.round((site.kwh / totalKwh) * 100),
}));

// Meter draws in a fixed 288 unit viewBox when size is "full", which stretches
// the round caps into ellipses; a pixel size keeps the drawing 1:1.
const ShareBar = () => {
  const theme = useContext(ThemeContext);
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width)),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref} height={theme.global.edgeSize.xsmall}>
      {width > 0 && (
        <Meter
          a11yTitle="Share of weekly energy by location"
          type="bar"
          size={`${width}px`}
          thickness="xsmall"
          round
          max={totalKwh}
          values={segments.map(({ color, kwh }) => ({ color, value: kwh }))}
        />
      )}
    </Box>
  );
};

export const EnergyByLocationCard = ({ detailed }) => {
  const theme = useContext(ThemeContext);
  const swatch = theme.global.edgeSize.xsmall;

  return (
    <SummaryCard
      title="Energy by location"
      subtitle={`Last 7 days · ${energy.siteCount} sites`}
      detailed={detailed}
      background={surfaceBackground}
      detail={
        <Box gap="small">
          <ShareBar />
          <Box gap="xsmall">
            {segments.map(({ color, kwh, name, percent }) => (
              <Box
                key={name}
                direction="row"
                justify="between"
                align="center"
                gap="small"
              >
                <Box direction="row" align="center" gap="3xsmall">
                  <Box
                    background={color}
                    height={swatch}
                    width={swatch}
                    flex={false}
                    round="xxsmall"
                    aria-hidden
                  />
                  <Text size="small">{name}</Text>
                </Box>
                <TextEmphasis size="small" textAlign="end">
                  {percent}% ({formatNumber(kwh, 0)} kWh)
                </TextEmphasis>
              </Box>
            ))}
          </Box>
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
};

EnergyByLocationCard.propTypes = {
  detailed: PropTypes.bool,
};
