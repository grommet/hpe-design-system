// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps, ComponentType } from 'react';
import { Box, Meter, ThemeContext } from 'grommet';
import { STATUS } from '../../../components/status';
import type { DashboardStatus } from '../../../components/status';

type BarTheme = {
  text: { medium: { height: string } };
};

const AccessibleMeter = Meter as ComponentType<
  ComponentProps<typeof Meter> & { role?: string }
>;

// Thin horizontal meter for a share of a whole. Neutral while status is ok
// and takes the status fill otherwise, so color only appears when something
// needs attention. The bar is centered in a line-height slot so it aligns
// with the adjacent status row.
type BarProps = {
  label: string;
  max: number;
  status?: DashboardStatus;
  value: number;
};

export const Bar = ({
  label,
  max,
  status = 'ok',
  value,
}: BarProps) => {
  const theme = useContext(ThemeContext) as BarTheme;
  return (
    <Box height={theme.text.medium.height} justify="center">
      <AccessibleMeter
        role="img"
        aria-label={label}
        type="bar"
        thickness="3xsmall"
        size="full"
        round
        max={max}
        values={[
          {
            value,
            color: status === 'ok' ? undefined : STATUS[status].fill,
          },
        ]}
      />
    </Box>
  );
};
