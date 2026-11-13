// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ComponentType } from 'react';
import { Box, Button, Text } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { ChartCard } from '../../components';
import { StatusCount } from '../../components/StatusCount';
import { attentionItems, surfaceBackground } from './data';
import { formatCount } from './utils';

const TypedChartCard = ChartCard as ComponentType<
  Partial<ComponentProps<typeof ChartCard>>
>;

const openItems = attentionItems.reduce((total, item) => total + item.count, 0);

type NeedsAttentionProps = {
  gridArea?: ComponentProps<typeof Box>['gridArea'];
  onOpenDevices?: () => void;
};

export const NeedsAttention = ({
  onOpenDevices,
  ...rest
}: NeedsAttentionProps) => (
  <TypedChartCard
    title="Needs attention"
    level={3}
    subtitle={<Text size="small">{formatCount(openItems)} open items</Text>}
    action={
      <Button
        icon={<LinkNext />}
        a11yTitle={
          onOpenDevices ? 'View devices' : 'View all items needing attention'
        }
        tip={onOpenDevices ? 'View devices' : 'View all'}
        onClick={onOpenDevices}
      />
    }
    background={surfaceBackground}
    {...rest}
  >
    <Box flex justify="between" gap="medium">
      <Box gap="xxsmall">
        {attentionItems.map(({ count, label, status }) =>
          onOpenDevices ? (
            <Button
              key={label}
              plain
              a11yTitle={`${label}: view devices`}
              onClick={onOpenDevices}
            >
              <StatusCount status={status} label={label} count={count} />
            </Button>
          ) : (
            <StatusCount
              key={label}
              status={status}
              label={label}
              count={count}
            />
          ),
        )}
      </Box>
      <Text size="small">
        Oldest critical item open 4 days. One pool in Frankfurt-DC2 is projected
        to fill in 3 weeks.
      </Text>
    </Box>
  </TypedChartCard>
);
