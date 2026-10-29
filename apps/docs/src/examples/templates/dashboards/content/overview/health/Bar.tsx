// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps, ComponentType } from 'react';
import { ThemeContext } from 'styled-components';
import { Box, Meter } from 'grommet';
import { STATUS } from './status';
import type { HealthStatus } from './data';

type BarTheme = {
  text: { medium: { height: string } };
};

const AccessibleMeter = Meter as ComponentType<
  ComponentProps<typeof Meter> & { role?: string }
>;

// Thin horizontal meter for a share of a whole. Neutral while status is ok
// and takes the status fill otherwise, so color only appears when something
// needs attention. Pass values for a stacked bar. With alignToText the bar
// is centred in a slot one line of body text tall, so it sits level with a
// status row in a neighbouring tile and the content below starts at the
// same height.
type BarProps = {
  alignToText?: boolean;
  label: string;
  max: number;
  status?: HealthStatus;
  value?: number;
  values?: ComponentProps<typeof Meter>['values'];
};

export const Bar = ({
  alignToText = false,
  label,
  max,
  status = 'ok',
  value,
  values,
}: BarProps) => {
  const theme = useContext(ThemeContext) as BarTheme;
  const meterValues =
    values ??
    (value === undefined
      ? []
      : [{ value, color: status === 'ok' ? undefined : STATUS[status].fill }]);
  const meter = (
    <AccessibleMeter
      role="img"
      aria-label={label}
      type="bar"
      thickness="3xsmall"
      size="full"
      round
      max={max}
      values={meterValues}
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
