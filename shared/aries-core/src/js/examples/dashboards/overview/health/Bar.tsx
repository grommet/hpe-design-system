// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps, ComponentType } from 'react';
import { ThemeContext } from 'styled-components';
import { Box, Meter } from 'grommet';
import type { DashboardStatus } from '../../../../components/helpers/Dashboard/StatusCount';
import { STATUS } from './statusConfig';

type BarTheme = { text: { medium: { height: string } } };
// Meter forwards role at runtime, but its published declarations omit it.
const AccessibleMeter = Meter as ComponentType<
  ComponentProps<typeof Meter> & { role?: string }
>;
export type BarProps = {
  alignToText?: boolean;
  label: string;
  max: number;
  status?: DashboardStatus;
} & (
  | { value: number; values?: never }
  | {
      value?: number;
      values: NonNullable<ComponentProps<typeof Meter>['values']>;
    }
);
// Thin horizontal meter for a share of a whole. Neutral while status is ok
// and takes the status fill otherwise, so color only appears when something
// needs attention. Pass values for a stacked bar. With alignToText the bar
// is centred in a slot one line of body text tall, so it sits level with a
// status row in a neighbouring tile and the content below starts at the
// same height.
export const Bar = ({
  alignToText = false,
  label,
  max,
  status = 'ok',
  value,
  values,
}: BarProps) => {
  const theme = useContext(ThemeContext) as BarTheme;
  const meter = (
    <AccessibleMeter
      role="img"
      aria-label={label}
      type="bar"
      thickness="3xsmall"
      size="full"
      round
      max={max}
      values={
        values || [
          { value, color: status === 'ok' ? undefined : STATUS[status].fill },
        ]
      }
    />
  );
  return alignToText ? (
    <Box height={theme.text.medium.height} justify="center">
      {meter}
    </Box>
  ) : (
    meter
  );
};
