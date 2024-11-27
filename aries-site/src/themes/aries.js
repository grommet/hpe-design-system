import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';
import { Close } from 'grommet-icons/icons/Close';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  buttonGroup: {
    // any Box props
    gap: 'small',
  },
  button: {
    size: {
      xsmall: {
        border: {
          radius: '2em',
        },
        iconOnly: {
          pad: '5px',
        },
      },
    },
  },
  icon: {
    size: {
      xsmall: '14px',
    },
  },
  tag: {
    icons: {
      remove: Close,
    },
    remove: {
      kind: 'default',
    },
    size: {
      xsmall: {
        icon: {
          size: undefined,
        },
        remove: {
          size: 'xsmall',
          margin: {
            right: 'none',
            left: '-5px', // shifting for button padding
            top: '-1px', // account for border
            bottom: '-1px', // account for border
          },
        },
      },
      small: {
        icon: {
          size: undefined,
        },
        remove: {
          size: 'xsmall',
          margin: {
            right: '2px',
            left: '-5px', // shifting for button padding
          },
        },
      },
      medium: {
        icon: {
          size: undefined,
        },
        remove: {
          size: 'small',
          margin: {
            right: 'xxsmall',
            left: '-7px', // shifting for button padding
          },
        },
      },
      large: {
        icon: {
          size: undefined,
        },
        remove: {
          size: 'medium',
          margin: {
            right: '2px',
            left: '-9px', // shifting for button padding
          },
        },
      },
      xlarge: {
        icon: {
          size: undefined,
        },
        pad: {
          vertical: '21px',
          horizontal: 'medium',
        },
        remove: {
          size: 'large',
          margin: {
            right: 'xsmall',
            left: '-13px', // shifting for button padding
          },
        },
      },
    },
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
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
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
