import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  tab: {
    active: {
      color: 'text-strong',
    },
    border: {
      side: 'bottom',
      size: 'medium',
      color: 'transparent',
      active: {
        color: 'border-strong',
        width: 'large',
      },
      disabled: {
        color: 'transparent',
      },
      hover: {
        color: 'transparent',
      },
    },
  },
});

export const { colors } = aries.global;
