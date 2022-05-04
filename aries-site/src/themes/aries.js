import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  pageHeader: {
    title: {
      size: 'small',
    },
    subtitle: {
      size: 'large',
    },
    xsmall: {
      areas: [
        ['parent', 'null'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['small', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: 'xsmall', column: 'large' },
    },
    xlarge: {
      areas: [
        ['parent', 'null'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'large'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: 'xsmall', column: 'large' },
    },
  },
});

export const { colors } = aries.global;
