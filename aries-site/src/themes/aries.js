import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  tip: {
    content: {
      margin: 'xxsmall',
      background: 'background',
      border: {
        color: 'border-weak',
      },
      elevation: 'small',
      pad: {
        vertical: 'none',
        horizontal: 'small',
      },
      round: 'xsmall',
    },
  },
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
});

export const { colors } = aries.global;
