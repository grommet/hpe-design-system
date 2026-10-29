// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Text } from 'grommet';

type LegendItemProps = {
  color: string;
  dash?: boolean;
  label: string;
};

// Legend entry whose swatch mirrors the stroke it describes: a solid or
// dashed line in the series color.
export const LegendItem = ({ color, dash, label }: LegendItemProps) => (
  <Box direction="row" align="center" gap="3xsmall">
    <Box
      pad={{ horizontal: 'xxsmall' }}
      border={{
        side: 'top',
        size: 'small',
        color,
        style: dash ? 'dashed' : 'solid',
      }}
      flex={false}
      aria-hidden
    />
    <Text size="small">{label}</Text>
  </Box>
);
