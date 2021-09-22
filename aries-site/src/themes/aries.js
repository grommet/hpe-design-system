import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  rangeInput: {
    thumb: {
      color: 'green',
      extend: () => `
        border: 1px solid ${undefined};
        box-shadow: ${undefined};
      `,
    },
    track: {
      lower: {
        color: 'green',
      },
      upper: {
        color: 'border',
      },
    },
  },
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
});

export const { colors } = aries.global;
