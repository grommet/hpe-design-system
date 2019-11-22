import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  heading: {
    level: {
      1: {
        font: {
          weight: 700,
        },
      },
      2: {
        font: {
          weight: 700,
        },
      },
      3: {},
      4: {},
      5: {},
      6: {},
    },
  },
});
