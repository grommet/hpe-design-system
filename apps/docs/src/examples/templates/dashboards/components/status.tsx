// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ComponentType } from 'react';
import {
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';

export type DashboardStatus = 'critical' | 'warning' | 'ok' | 'unknown';
export type OperationalStatus = 'critical' | 'warning' | 'ok';
export type AttentionStatus = 'critical' | 'warning' | 'unknown';
export type SlaStatus = 'ok' | 'warning';

type StatusIconComponent = ComponentType<
  ComponentProps<typeof StatusCritical>
>;

// Quantitative fills, such as Meter values, take foreground-* tokens; icons
// take icon-* tokens. Pairing a shape with each color means status is never
// conveyed by color alone.
export const STATUS: Record<
  DashboardStatus,
  {
    background: string;
    color: string;
    fill: string;
    Icon: StatusIconComponent;
    iconColor: string;
    label: string;
    strongColor: string;
  }
> = {
  critical: {
    background: 'background-critical',
    color: 'text-onCritical',
    fill: 'foreground-critical',
    Icon: StatusCritical,
    iconColor: 'icon-critical',
    label: 'Critical',
    strongColor: 'text-onCritical-strong',
  },
  warning: {
    background: 'background-warning',
    color: 'text-onWarning',
    fill: 'foreground-warning',
    Icon: StatusWarning,
    iconColor: 'icon-warning',
    label: 'Warning',
    strongColor: 'text-onWarning-strong',
  },
  ok: {
    background: 'background-ok',
    color: 'text-onOk',
    fill: 'foreground-ok',
    Icon: StatusGood,
    iconColor: 'icon-ok',
    label: 'OK',
    strongColor: 'text-onOk-strong',
  },
  unknown: {
    background: 'background-unknown',
    color: 'text-onUnknown',
    fill: 'foreground-unknown',
    Icon: StatusUnknown,
    iconColor: 'icon-unknown',
    label: 'Unknown',
    strongColor: 'text-onUnknown-strong',
  },
};

type StatusIconProps = Omit<
  ComponentProps<typeof StatusCritical>,
  'color' | 'a11yTitle'
> & {
  status: DashboardStatus;
};

export const StatusIcon = ({
  status,
  ...rest
}: StatusIconProps) => {
  const { Icon, iconColor, label } = STATUS[status];
  return <Icon color={iconColor} a11yTitle={label} {...rest} />;
};
