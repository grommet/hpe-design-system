import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  layer: {
    background: 'background',
  },
});

export const { colors } = aries.global;
