// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { primitives } from 'hpe-design-tokens/grommet';

const p = primitives.hpe.base.color;

const STEP_NAMES = Object.fromEntries(
  ['50', '200', '400', '700', '800', '1000', '1200', '1300'].map(step => [
    p[`grey-${step}`].toLowerCase(),
    `grey.${step}`,
  ]),
);
STEP_NAMES[p['white-100'].toLowerCase()] = 'white';

// Human name for a hex, e.g. "grey.1000"; falls back to the hex itself.
export const stepName = hex => STEP_NAMES[hex.toLowerCase()] || hex;
