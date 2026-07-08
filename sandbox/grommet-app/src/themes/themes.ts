import { hpe as hpeV5 } from 'grommet-theme-hpe-v5';
import { hpe as hpeV6 } from 'grommet-theme-hpe-v6';
import { hpe as hpeV8 } from 'grommet-theme-hpe-v8';
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

export const themes = {
  v0: v5,
  v1: hpeV6,
  v2: hpeV8,
};
