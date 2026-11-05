// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactNode } from 'react';
import { Anchor, Box, Text } from 'grommet';
import type { DashboardStatus } from '../../../../components/helpers/Dashboard/StatusCount';
import { STATUS } from './statusConfig';

export type StatusIconProps = ComponentProps<typeof STATUS.critical.Icon> & {
  announce?: boolean;
  status: DashboardStatus;
};
// Decorative by default; pass announce when the icon is the only thing
// conveying status, e.g. in a tile's title row.
export const StatusIcon = ({
  announce = false,
  status,
  ...rest
}: StatusIconProps) => {
  const { Icon, color, label } = STATUS[status];
  const a11y = announce
    ? { a11yTitle: label }
    : { 'aria-hidden': true as const };
  return <Icon color={color} {...a11y} {...rest} />;
};

export type QuietStatusRowProps = {
  children: ReactNode;
  href?: ComponentProps<typeof Anchor>['href'];
  icon?: ReactNode;
  status: DashboardStatus;
};
// Verdict line that stays quiet while things are fine. The status icon is
// only rendered for warning and critical, so "good" is not repeated in every
// tile; pass icon to mark the subject instead, e.g. a shield for protection.
// When there is an exception the status is announced, and an href turns the
// verdict into the link to go and deal with it.
export const QuietStatusRow = ({
  children,
  href,
  icon,
  status,
}: QuietStatusRowProps) => {
  const exception = status !== 'ok';
  return (
    <Box direction="row" align="center" gap="3xsmall">
      {exception ? <StatusIcon status={status} announce /> : icon}
      {href ? <Anchor href={href}>{children}</Anchor> : <Text>{children}</Text>}
    </Box>
  );
};
