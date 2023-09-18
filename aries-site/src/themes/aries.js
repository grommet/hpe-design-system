import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Close, Info } from 'grommet-icons';

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
      gap: 'xsmall',
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
      gap: 'xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 500,
      alignSelf: 'end',
    },
  },
  global: {
    colors: {
      text: {
        dark: '#FFFFFF',
        light: '#555555',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#333333',
      },
    },
  },
  button: {
    default: {
      font: {
        weight: 600,
      },
    },
    secondary: {
      font: {
        weight: 500,
      },
    },
    toolbar: {
      border: {
        radius: '6px',
        width: '1px',
        color: 'border',
      },
      font: {
        weight: 500,
      },
    },
  },
  dataTable: {
    primary: {
      weight: 500,
      color: 'text-strong',
    },
  },
  heading: {
    level: {
      1: {
        font: {
          weight: 500,
        },
      },
    },
  },
  pagination: {
    button: {
      font: {
        weight: 600,
      },
      active: {
        font: {
          weight: 600,
        },
      },
    },
  },
  paragraph: {
    large: {
      size: '22px',
      height: '28px',
      maxWidth: '25em',
    },
    xlarge: {
      size: '24px',
      height: '30px',
      maxWidth: '25em',
    },
    // This block applies size-specific weights to paragraph to ensure
    // that as paragraph sizes get larger, the weight decreases.
    // This block can be removed once grommet theme structure is enhanced
    // to support size-specific weights.
    extend: ({ size }) => `
      ${['xxlarge'].includes(size) ? 'font-weight: 400;' : ''};
    `,
  },
  tabs: {
    header: {
      alignSelf: undefined,
    },
  },
  text: {
    large: {
      size: '22px',
      height: '28px',
    },
    xlarge: {
      size: '24px',
      height: '30px',
    },
  },
  pageHeader: {
    // Needs to be removed after Grommet upgrade
    responsive: {
      breakpoints: ['xsmall', 'small'],
    },
  },
  notification: {
    direction: 'column',
    global: {
      direction: 'row',
      close: {
        icon: Close,
      },
    },
  },
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
  global: {
    colors: {
      text: {
        dark: '#FFFFFF',
        light: '#555555',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#333333',
      },
    },
  },
  anchor: {
    // rely on base anchor styling to meet color contrast on background-back
    size: {
      large: undefined,
      xlarge: undefined,
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
      toast: {
        background: 'background-front',
      },
    },
  },
});

export const { colors } = aries.global;
