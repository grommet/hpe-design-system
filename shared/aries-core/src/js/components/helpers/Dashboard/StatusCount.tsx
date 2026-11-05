// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ComponentType, ReactNode } from 'react';
import { Box, Text } from 'grommet';
import {
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';
import { TextEmphasis as JavaScriptTextEmphasis } from '../../typography/TextEmphasis';

const TextEmphasis = JavaScriptTextEmphasis as ComponentType<
  ComponentProps<typeof Text>
>;

export type DashboardStatus = 'critical' | 'warning' | 'ok' | 'unknown';

export type StatusCountProps = Omit<ComponentProps<typeof Box>, 'children'> & {
  count: string | number;
  label: string;
  status: DashboardStatus;
};

type StatusAppearance = {
  background: ComponentProps<typeof Box>['background'];
  color: ComponentProps<typeof Text>['color'];
  icon: ReactNode;
  strongColor: ComponentProps<typeof Text>['color'];
};

const STATUS_MAP = {
  critical: {
    background: 'background-critical',
    color: 'text-onCritical',
    icon: <StatusCritical color="icon-critical" a11yTitle="Critical" />,
    strongColor: 'text-onCritical-strong',
  },
  warning: {
    background: 'background-warning',
    color: 'text-onWarning',
    icon: <StatusWarning color="icon-warning" a11yTitle="Warning" />,
    strongColor: 'text-onWarning-strong',
  },
  ok: {
    background: 'background-ok',
    color: 'text-onOk',
    icon: <StatusGood color="icon-ok" a11yTitle="Okay" />,
    strongColor: 'text-onOk-strong',
  },
  unknown: {
    background: 'background-unknown',
    color: 'text-onUnknown',
    icon: <StatusUnknown color="icon-unknown" a11yTitle="Unknown" />,
    strongColor: 'text-onUnknown-strong',
  },
} satisfies Record<DashboardStatus, StatusAppearance>;

// A labeled count of items in a given status, on that status' surface.
export const StatusCount = ({
  count,
  label,
  status,
  ...rest
}: StatusCountProps) => {
  const { background, color, icon, strongColor } = STATUS_MAP[status];
  return (
    <Box
      direction="row"
      align="center"
      gap="xxsmall"
      background={background}
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      round="xsmall"
      {...rest}
    >
      {icon}
      <Box flex>
        <Text color={color}>{label}</Text>
      </Box>
      <TextEmphasis size="large" color={strongColor}>
        {count}
      </TextEmphasis>
    </Box>
  );
};
