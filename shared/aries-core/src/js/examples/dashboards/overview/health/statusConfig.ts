// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';

// Quantitative fills, such as Meter values, take foreground-* tokens; icons
// take icon-* tokens. Pairing a shape with each color means status is never
// conveyed by color alone.
export const STATUS = {
  critical: {
    label: 'Critical',
    fill: 'foreground-critical',
    color: 'icon-critical',
    Icon: StatusCritical,
  },
  warning: {
    label: 'Warning',
    fill: 'foreground-warning',
    color: 'icon-warning',
    Icon: StatusWarning,
  },
  ok: {
    label: 'OK',
    fill: 'foreground-ok',
    color: 'icon-ok',
    Icon: StatusGood,
  },
  unknown: {
    label: 'Unknown',
    fill: 'foreground-unknown',
    color: 'icon-unknown',
    Icon: StatusUnknown,
  },
};
