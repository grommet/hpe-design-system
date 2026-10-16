// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Text } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { ChartCard, StatusCount } from '../../components';
import { attentionItems, surfaceBackground } from './data';

const openItems = attentionItems.reduce((total, item) => total + item.count, 0);

export const NeedsAttention = ({ ...rest }) => (
  <ChartCard
    title="Needs attention"
    level={3}
    subtitle={<Text size="small">{openItems.toLocaleString()} open items</Text>}
    action={
      <Button
        icon={<LinkNext />}
        a11yTitle="View all items needing attention"
        tip="View all"
      />
    }
    background={surfaceBackground}
    {...rest}
  >
    <Box flex justify="between" gap="medium">
      <Box gap="xxsmall">
        {attentionItems.map(({ count, label, status }) => (
          <StatusCount
            key={label}
            status={status}
            label={label}
            count={count}
          />
        ))}
      </Box>
      <Text size="small">
        Oldest critical item open 4 days. One pool in Frankfurt-DC2 is projected
        to fill in 3 weeks.
      </Text>
    </Box>
  </ChartCard>
);
