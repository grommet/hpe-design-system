// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import { StatusCritical } from '@hpe-design/icons-grommet';
import { STATUS } from './statusConfig';
import type { DashboardStatus } from './statusConfig';

export type {
  DashboardStatus,
  OperationalStatus,
  AttentionStatus,
  SlaStatus,
} from './statusConfig';

export type StatusIconProps = Omit<
  ComponentProps<typeof StatusCritical>,
  'color' | 'a11yTitle'
> & {
  status: DashboardStatus;
};

export const StatusIcon = ({ status, ...rest }: StatusIconProps) => {
  const { Icon, iconColor, label } = STATUS[status];
  return <Icon color={iconColor} a11yTitle={label} {...rest} />;
};