import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  spinner: {
    container: {
      border: [
        { side: 'all', color: 'background-contrast', size: 'medium' },
        { side: 'right', color: 'green', size: 'medium' },
        { side: 'top', color: 'green', size: 'medium' },
        { side: 'left', color: 'green', size: 'medium' },
      ],
    },
    size: {
      small: '36px',
    },
  },

  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
});

export const { colors } = aries.global;
