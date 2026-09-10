// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { hpe as hpeTheme } from 'grommet-theme-hpe';

const HPE_OPTION_PAD = hpeTheme?.button?.size?.medium?.option?.pad;

const DEFAULT_PAD = { horizontal: 'small', vertical: 'xsmall' };

const resolveOptionPad = (theme, override) =>
  override ||
  theme?.button?.size?.medium?.option?.pad ||
  HPE_OPTION_PAD ||
  DEFAULT_PAD;

export { resolveOptionPad };
