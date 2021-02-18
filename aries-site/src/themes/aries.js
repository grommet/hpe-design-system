import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  button: {
    size: {
      small: {
        border: {
          radius: '4px',
        },
        pad: {
          vertical: '4px',
          horizontal: '8px',
        },
      },
      medium: {
        border: {
          radius: '4px',
        },
        pad: {
          vertical: '6px',
          horizontal: '12px',
        },
      },
      large: {
        border: {
          radius: '6px',
        },
        pad: {
          vertical: '6px',
          horizontal: '16px',
        },
      },
    },
  },
});

export const { colors } = aries.global;
