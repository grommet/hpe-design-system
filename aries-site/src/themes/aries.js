import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  heading: {
    extend: ({ theme }) =>
      `color: ${
        theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
      };`,
  },
});

export const { colors } = aries.global;
