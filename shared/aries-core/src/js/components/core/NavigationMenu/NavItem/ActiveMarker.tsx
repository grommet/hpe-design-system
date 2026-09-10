// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box } from 'grommet';

interface ActiveMarkerProps {
  active: boolean | undefined;
  hover: boolean | undefined;
}

export const ActiveMarker = ({ active, hover }: ActiveMarkerProps) => {
  return (
    <Box
      background={
        active
          ? hover
            ? 'background-primary-strong-hover'
            : 'background-primary-strong'
          : undefined
      }
      fill="vertical"
      pad={{ left: '4px' }}
      round
    />
  );
};
