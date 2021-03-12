import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  pagination: {
    button: {
      font: {
        weight: 700,
      },
      active: {
        font: {
          weight: 700,
        },
      },
    },
  },
});

export const { colors } = aries.global;
