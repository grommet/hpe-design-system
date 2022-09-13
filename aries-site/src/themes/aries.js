import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  feedback: {
    body: {
      gap: 'medium',
    },
    button: {
      a11yTitle: `You are in a layer containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
    container: {
      pad: 'medium',
    },
    header: {
      size: 'small',
      level: 2,
      margin: {
        vertical: 'none',
      },
      container: {
        align: 'start',
        direction: 'row',
        justify: 'between',
      },
    },
    footer: {
      pad: {
        vertical: 'medium',
      },
      direction: 'row',
      justify: 'end',
      gap: 'medium',
      success: {
        text: {
          color: 'text-strong',
          weight: 'bold',
          alignSelf: 'end',
        },
      },
    },
  },
});

export const { colors } = aries.global;
