// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ReactNode } from 'react';
import { Anchor, Box, Text } from 'grommet';
import { StatusIcon } from '../../../components/status';
import type { DashboardStatus } from '../../../components/status';

// Verdict line that stays quiet while things are fine. The status icon is
// only rendered for warning and critical, so "good" is not repeated in every
// tile; pass icon to mark the subject instead, e.g. a shield for protection.
// When there is an exception the status is announced, and an href turns the
// verdict into the link to go and deal with it.
type QuietStatusRowProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  status: DashboardStatus;
};

export const QuietStatusRow = ({
  children,
  href,
  icon,
  status,
}: QuietStatusRowProps) => {
  const exception = status !== 'ok';
  return (
    <Box direction="row" align="center" gap="3xsmall">
      {exception ? <StatusIcon status={status} /> : icon}
      {href ? <Anchor href={href}>{children}</Anchor> : <Text>{children}</Text>}
    </Box>
  );
};
