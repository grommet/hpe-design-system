import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested

  // Remove from this file once merged into grommet-theme-hpe
  card: {
    container: {
      background: 'background-front',
    },
    body: {
      pad: 'medium',
    },
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
    },
    header: {
      pad: 'medium',
    },
  },
});

export const { colors } = aries.global;
