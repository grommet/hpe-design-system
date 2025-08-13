import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';

const getThemeColor = (color, theme) =>
  typeof theme.global.colors[color] === 'string'
    ? theme.global.colors[color]
    : theme.global.colors[color]?.[theme.dark ? 'dark' : 'light'] || color;

/** LOCAL ADJUSTMENTS TO T-SHIRT SIZING FOR GROMMET-THEME-HPE V7 */
const tshirtSizeAdjuments = {
  accordion: {
    heading: {
      margin: { vertical: 'medium', horizontal: '3xsmall' },
    },
  },
  card: {
    container: {
      round: 'medium',
    },
    body: { pad: 'medium' },
    footer: { pad: { horizontal: 'medium', vertical: 'xsmall' } },
    header: { pad: 'medium' },
  },
  checkBoxGroup: {
    container: { gap: 'xsmall' },
  },
  dataTable: {
    groupEnd: { border: { side: 'bottom', size: '3xsmall' } },
    header: {
      pad: {
        vertical: '3xsmall',
      },
    },
    resize: {
      hover: { border: { color: 'border-strong', size: 'small' } },
    },
  },
  fileInput: {
    label: { margin: 'xsmall' },
    message: { margin: 'xsmall' },
    pad: { horizontal: '3xsmall' },
  },
  formField: {
    content: { margin: { vertical: '3xsmall' } },
    error: {
      container: { gap: '3xsmall' },
      margin: { bottom: '3xsmall', top: 'none', horizontal: 'none' },
    },
    info: {
      margin: { bottom: '3xsmall', top: 'none', horizontal: 'none' },
    },
    label: {
      margin: { bottom: 'none', top: '3xsmall', horizontal: 'none' },
    },
  },
  layer: {
    border: { radius: 'small' },
  },
  list: {
    container: {
      gap: '3xsmall',
    },
  },
  nameValueList: {
    gap: {
      column: 'xlarge',
      row: 'xsmall',
    },
    pair: {
      column: {
        gap: {
          column: 'xlarge',
          row: 'medium',
        },
      },
    },
  },
  notification: {
    container: {
      // any box props
      round: 'xsmall',
      pad: { horizontal: 'xsmall', vertical: '3xsmall' },
    },
    iconContainer: {
      pad: { right: 'xsmall' },
    },
  },
  page: {
    wide: {
      width: {
        min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
        max: '3xlarge',
      },
      xsmall: { pad: { horizontal: 'xlarge' } },
      xlarge: { pad: { horizontal: 'xlarge' } },
    },
    narrow: {
      width: {
        min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
        max: 'xlarge',
      },
      xsmall: { pad: { horizontal: 'xlarge' } },
      xlarge: { pad: { horizontal: 'xlarge' } },
    },
    full: {
      width: {
        min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
        max: '100%',
      },
      xsmall: { pad: { horizontal: 'xlarge' } },
      xlarge: { pad: { horizontal: 'xlarge' } },
    },
  },
  pageHeader: {
    pad: {
      top: 'xlarge',
      bottom: 'medium',
    },
    xsmall: {
      gap: { row: '3xsmall', column: 'medium' },
    },
    small: {
      gap: { row: '3xsmall', column: 'large' },
    },
    medium: {
      gap: { row: '3xsmall', column: 'medium' },
    },
    large: {
      gap: { row: '3xsmall', column: 'large' },
    },
    xlarge: {
      gap: { row: '3xsmall', column: 'xlarge' },
    },
  },
  pagination: {
    controls: {
      gap: '5xsmall',
    },
  },
  radioButtonGroup: {
    container: { gap: 'xsmall' },
  },
  select: {
    clear: {
      container: {
        round: 'xsmall',
      },
    },
    icons: {
      margin: {
        left: 'xsmall',
      },
    },
  },
  tabs: {
    gap: 'xsmall',
  },
  tag: {
    size: {
      medium: {
        remove: { margin: { right: '5xsmall' } },
      },
      large: {
        remove: { margin: { right: '5xsmall' } },
      },
      xlarge: {
        remove: { margin: { right: '3xsmall' } },
      },
    },
  },
  tip: {
    content: {
      margin: '5xsmall',
      pad: { vertical: 'none', horizontal: 'xsmall' },
    },
  },
  toggleGroup: {
    button: { kind: 'toolbar' },
    container: {
      border: false,
      extend: ({ theme }) => `
        gap: ${theme.global.edgeSize['5xsmall']};
        &:hover {
          background: ${getThemeColor('background-hover', theme)};
        }`,
    },
    divider: false,
  },
};

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  /** LOCAL ADJUSTMENTS TO T-SHIRT SIZING FOR GROMMET-THEME-HPE V7 */
  ...tshirtSizeAdjuments,
  /* EXISTING ARIES CODE */
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
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
  ...tshirtSizeAdjuments,
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
