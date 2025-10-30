import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  buttonGroup: {
    // any Box props
    gap: 'xsmall',
  },
  feedback: {
    closeButton: {
      a11yTitle: `You are in a dialog containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
    container: {
      pad: 'medium',
    },
    header: {
      align: 'start',
      direction: 'row',
      justify: 'between',
      gap: '3xsmall',
    },
    heading: {
      level: 2,
      margin: {
        vertical: 'none',
      },
    },
    footer: {
      pad: {
        top: 'medium',
      },
      direction: 'row',
      justify: 'start',
      gap: '3xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 500,
      alignSelf: 'end',
    },
  },
});

export const ariesPop = deepMerge(aries, {
  heading: {
    ...hpePop.heading,
  },
  // this is producing a console warning because it's not a supported status
  // proposing that notification should be more flexible to allow other statuses
  notification: {
    learn: {
      icon: Info,
      background: {
        color: 'icon-warning',
      },
      color: 'text',
      toast: {
        background: 'background-front',
      },
    },
  },
});

export const { colors } = aries.global;
