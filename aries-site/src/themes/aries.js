import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  heading: {
    level: {
      5: {
        small: {
          size: '22px',
          height: '28px',
          maxWidth: '379px',
        },
        medium: {
          size: '22px',
          height: '28px',
          maxWidth: '379px',
        },
        large: {
          size: '22px',
          height: '28px',
          maxWidth: '379px',
        },
        xlarge: {
          size: '22px',
          height: '28px',
          maxWidth: '379px',
        },
      },
    },
  },
  menu: {
    group: {
      separator: {
        color: 'border-weak',
      },
    },
  },
});

export const { colors } = aries.global;
