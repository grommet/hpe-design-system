// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Text } from 'grommet';
import {
  StatusCritical,
  StatusGood,
  StatusWarning,
} from '@hpe-design/icons-grommet';
import { type RepositoryStatus, statusLabels } from './data';

// Status is conveyed by icon shape plus a visible label, never by color alone.
const statusIcons: Record<
  RepositoryStatus,
  { Icon: typeof StatusGood; color: string }
> = {
  ok: { Icon: StatusGood, color: 'icon-ok' },
  warning: { Icon: StatusWarning, color: 'icon-warning' },
  critical: { Icon: StatusCritical, color: 'icon-critical' },
};

export const StatusIndicator = ({ status }: { status: RepositoryStatus }) => {
  const { Icon, color } = statusIcons[status];
  return (
    <Box direction="row" align="center" gap="3xsmall">
      <Icon aria-hidden="true" color={color} />
      <Text>{statusLabels[status]}</Text>
    </Box>
  );
};
