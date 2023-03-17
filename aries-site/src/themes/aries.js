import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons/icons/Info';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  buttonGroup: {
    // any Box props
    gap: 'small',
  },
  feedback: {
    container: {
      pad: 'medium',
      gap: 'small',
      width: 'medium',
    },
    footer: {
      direction: 'row-reverse',
      justify: 'end',
      gap: 'small',
      pad: {
        top: 'small',
      },
    },
    heading: {
      level: 2,
      margin: 'none',
    },
    header: {
      align: 'start',
      direction: 'row',
      justify: 'start',
      gap: 'xsmall',
    },
    closeButton: {
      a11yTitle: `You are in a dialog containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
  },
  // this is producing a console warning because it's not a supported status
  // proposing that notification should be more flexible to allow other statuses
  notification: {
    learn: {
      icon: Info,
      background: {
        color: 'status-warning',
        opacity: 'weak',
      },
      color: 'text',
      // global: {},
      toast: {
        background: 'background-front',
      },
    },
  },
  button: {
    badge: {
      align: 'container',
      container: {
        background: 'status-unknown',
      },
    },
  },
});

export const ariesWeb = deepMerge(aries, {
  ...hpePop,
});

export const { colors } = aries.global;
