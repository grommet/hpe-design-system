// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { deepMerge } from 'grommet/utils';
import { light, dark } from 'hpe-design-tokens/grommet';
import { themes } from '../surfaces/theme';

/**
 * The road not taken, for the decision slide only. Three extra reference
 * steps whose dark values are copied from 10/20/30 and whose light values are
 * swapped, so that `toned` dark equals default dark. These steps are NOT in
 * the tokens; they are derived here from the built 10–30 values so the
 * comparison can be rendered with the same theme machinery.
 */
const step = (lightStep, darkStep) => ({
  light: light.hpe.color.surface[lightStep],
  dark: dark.hpe.color.surface[darkStep],
});

export const optionalSteps = {
  'surface-40': step('30', '10'), // grey.50 / grey.1300
  'surface-50': step('30', '20'), // grey.50 / grey.1200
  'surface-60': step('10', '30'), // white  / grey.1000
};

export const optionalTonedRefs = {
  'surface-base': 'surface-40',
  'surface-tone-1': 'surface-60',
  'surface-tone-2': 'surface-50',
  'surface-floating': 'surface-50',
};

export const tonedWithOptionalSteps = deepMerge(themes.toned, {
  global: {
    colors: {
      ...optionalSteps,
      ...Object.fromEntries(
        Object.entries(optionalTonedRefs).map(([name, ref]) => [
          `background-${name}`,
          ref,
        ]),
      ),
      background: optionalSteps['surface-40'],
    },
  },
});
