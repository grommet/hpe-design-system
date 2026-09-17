// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Text } from 'grommet';

export const ScaleValue = ({ base, stops, value, ...rest }) => {
  return (
    <Box align="center" gap="xsmall" {...rest}>
      <Box
        background={
          stops.includes(value)
            ? { color: 'purple!', opacity: 'strong' }
            : { color: 'purple!', opacity: 'medium' }
        }
        border={
          value === base ? { color: 'orange!', size: 'small' } : undefined
        }
        width={`${value}px`}
        height={`${value}px`}
      />
      <Text size="small">{value}px</Text>
    </Box>
  );
};
