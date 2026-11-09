// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactNode } from 'react';
import { Box, Heading, Menu, Text } from 'grommet';
import { MoreVertical } from '@hpe-design/icons-grommet';

export type DashboardCardHeaderProps = {
  action?: ReactNode;
  title?: string;
  level?: ComponentProps<typeof Heading>['level'];
  subtitle?: ReactNode;
  menuItems?: ComponentProps<typeof Menu>['items'];
};

export const DashboardCardHeader = ({
  action,
  title,
  level,
  subtitle,
  menuItems,
}: DashboardCardHeaderProps) => (
  <Box direction="row" align="start" justify="between" fill>
    <Box>
      <Heading margin="none" level={level}>
        {title}
      </Heading>
      {subtitle &&
        (typeof subtitle === 'string' ? <Text>{subtitle}</Text> : subtitle)}
    </Box>
    {action}
    {menuItems && (
      <Menu
        icon={<MoreVertical />}
        items={menuItems}
        dropAlign={{ top: 'bottom', right: 'right' }}
      />
    )}
  </Box>
);
