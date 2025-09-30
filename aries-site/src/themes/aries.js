import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  pageHeader: {
    pad: {
      top: 'xlarge',
      bottom: 'medium',
    },
    responsive: {
      actions: {
        // any box props
        pad: {
          top: 'xsmall',
        },
      },
      breakpoints: ['xsmall', 'small'],
    },
    // title: {
    //   size: undefined,
    // },
    subtitle: { size: 'large' },
    size: {
      small: {
        pad: {
          top: 'medium',
          bottom: 'xsmall',
        },
        subtitle: {
          size: 'small',
        },
        title: {
          size: 'small',
        },
      },
      // medium: {
      //   // pad: undefined,
      //   // subtitle: {},
      //   // title: {},
      // },
      large: {
        pad: {
          top: '3xlarge',
          bottom: 'xlarge',
        },
        subtitle: {
          size: 'large',
        },
        title: {
          size: 'large',
        },
      },
    },
    xsmall: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['xsmall', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'medium' },
    },
    small: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['xsmall', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'xlarge' },
    },
    medium: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'medium' },
    },
    large: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'xlarge' },
    },
    xlarge: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'xlarge'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'xlarge' },
    },
  },
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
  ...hpePop,
  pageHeader: {
    pad: {
      top: 'xlarge',
      bottom: 'medium',
    },
    responsive: {
      actions: {
        // any box props
        pad: {
          top: 'xsmall',
        },
      },
      breakpoints: ['xsmall', 'small'],
    },
    // title: {
    //   size: undefined,
    // },
    subtitle: { size: 'large' },
    size: {
      small: {
        pad: {
          top: 'medium',
          bottom: 'xsmall',
        },
        subtitle: {
          size: 'small',
        },
        title: {
          size: 'small',
        },
      },
      // medium: {
      //   // pad: undefined,
      //   // subtitle: {},
      //   // title: {},
      // },
      large: {
        pad: {
          top: '3xlarge',
          bottom: 'xlarge',
        },
        subtitle: {
          size: 'large',
        },
        title: {
          size: 'large',
        },
      },
    },
    xsmall: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['xsmall', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'medium' },
    },
    small: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['xsmall', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'xlarge' },
    },
    medium: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'medium' },
    },
    large: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'flex'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'xlarge' },
    },
    xlarge: {
      areas: [
        ['parent', 'parent'],
        ['title', 'actions'],
        ['subtitle', 'actions'],
      ],
      columns: [['medium', 'xlarge'], 'auto'],
      rows: ['auto', 'auto', 'auto'],
      gap: { row: '3xsmall', column: 'xlarge' },
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
