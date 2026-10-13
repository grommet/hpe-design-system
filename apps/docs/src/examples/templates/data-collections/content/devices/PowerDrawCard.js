// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, DataChart, Heading, NameValueList, NameValuePair } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { MetricValue, SummaryCard } from '../../components';
import { power, surfaceBackground } from './data';

const series = 'dataVis-categorical-10';
const method =
  'Power is metered at the PDU where available; otherwise estimated from ' +
  'iLO telemetry.';

export const PowerDrawCard = ({ detailed }) => (
  <SummaryCard
    title="Power draw"
    subtitle="Last 24 hours · fleet average"
    detailed={detailed}
    background={surfaceBackground}
    detail={
      <>
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
        <Box gap="xxsmall">
          <Heading level={3} margin="none">
            Range over 24 hours
          </Heading>
          <NameValueList
            layout="grid"
            // Content-sized tracks so each value stays on one line, with
            // any spare width shared between the pairs.
            columns={power.range.map(() => 'auto')}
            gap="small"
            pairProps={{ direction: 'column' }}
            nameProps={{ size: 'small' }}
          >
            {power.range.map(({ name, value }) => (
              <NameValuePair key={name} name={name}>
                <TextEmphasis size="small">{value}</TextEmphasis>
              </NameValuePair>
            ))}
          </NameValueList>
        </Box>
      </>
    }
    footer={method}
  >
    <MetricValue value={power.average} unit={power.unit} trend={power.trend} />
  </SummaryCard>
);

PowerDrawCard.propTypes = {
  detailed: PropTypes.bool,
};
