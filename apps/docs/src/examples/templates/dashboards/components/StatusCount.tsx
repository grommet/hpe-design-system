// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import { Box, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { STATUS, StatusIcon } from './status';
import type { DashboardStatus } from './status';

type StatusCountProps = ComponentProps<typeof Box> & {
  count: number | string;
  label: string;
  status: DashboardStatus;
};

// A labeled count of items in a given status, on that status' surface.
export const StatusCount = ({
  count,
  label,
  status,
  ...rest
}: StatusCountProps) => {
  const { background, color, strongColor } = STATUS[status];
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
      <StatusIcon status={status} />
      <Box flex>
        <Text color={color}>{label}</Text>
      </Box>
      <TextEmphasis size="large" color={strongColor}>
        {count}
      </TextEmphasis>
    </Box>
  );
};
