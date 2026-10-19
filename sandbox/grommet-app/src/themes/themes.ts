// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { hpe as hpeV5 } from 'grommet-theme-hpe-v5';
import { hpe as hpeV6 } from 'grommet-theme-hpe-v6';
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { tokenColors } from './tokenColors';

// need to extend hpe with new token namespace to "fill gaps" for sake of demo
// when toggling between themes.
const v5 = deepMerge(hpeV5, {
  global: {
    colors: {
      ...tokenColors,
    },
  },
});

// ===== START v3 THEME OVERRIDES (edit values below) =====
const pagePadSmall = { pad: { top: 'medium', bottom: '3xlarge' } };//12 48
const pagePadLarge = { pad: { top: 'large', bottom: '3xlarge' } }; //32 96

const pageKindPad = {
  xsmall: pagePadSmall,
  small: pagePadSmall,
  medium: pagePadLarge,
  large: pagePadLarge,
  xlarge: pagePadLarge,
};

const v3 = deepMerge(hpe, {
  page: {
    // xsmall/small: top medium (24px), bottom large (32px); medium+: top xlarge (48px), bottom 3xlarge (96px)
    wide: pageKindPad,
    narrow: pageKindPad,
    full: pageKindPad,
  },
  pageHeader: {
    pad: 'none',
    size: {
      small: { pad: 'none' },
      large: { pad: 'none' },
    },
  },
});
// ===== END v3 THEME OVERRIDES =====

export const themes = {
  v0: v5,
  v1: hpeV6,
  v2: hpe,
  v3,
};
