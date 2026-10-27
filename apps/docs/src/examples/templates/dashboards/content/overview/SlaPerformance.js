// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, List, Tag, Text } from 'grommet';
import { ChartCard, MetricValue } from '../../components';
import { slaStats, surfaceBackground } from './data';

const SLA_STATUS = {
  ok: { label: 'On target', background: 'background-contrast' },
  warning: { label: 'Degrading', background: 'background-warning' },
};

// Dividers between stats only; the first and last rows have none.
const dividers = Object.fromEntries(
  slaStats.map((_, index) => [
    index,
    index > 0 ? { border: { side: 'top', color: 'border-weak' } } : {},
  ]),
);

export const SlaPerformance = ({ ...rest }) => (
  <ChartCard
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
      {({ name, status, unit, value }) => (
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
  </ChartCard>
);
