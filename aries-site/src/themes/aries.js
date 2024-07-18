import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';
import { light, dark, desktop, mobile } from 'design-tokens';

// const global = {
//   borderSize: {
//     xsmall: desktop.border.xsmall.$value,
//     small: desktop.border.small.$value,
//     medium: desktop.border.medium.$value,
//     large: desktop.border.large.$value,
//     xlarge: desktop.border.xlarge.$value,
//   },
//   edgeSize: {
//     none: desktop.spacing.none.$value,
//     hair: desktop.spacing.hair.$value,
//     xxsmall: desktop.spacing.xxsmall.$value,
//     xsmall: desktop.spacing.xsmall.$value,
//     small: desktop.spacing.small.$value,
//     medium: desktop.spacing.medium.$value,
//     large: desktop.spacing.large.$value,
//     xlarge: desktop.spacing.xlarge.$value,
//     responsiveBreakpoint: 'small',
//   },
//   size: {
//     xxsmall: desktop.content.xxsmall.$value,
//     xsmall: desktop.content.xsmall.$value,
//     small: desktop.content.small.$value,
//     medium: desktop.content.medium.$value,
//     large: desktop.content.large.$value,
//     xlarge: desktop.content.xlarge.$value,
//     xxlarge: desktop.content.xxlarge.$value,
//     full: '100%',
//   },
//   breakpoints: {
//     xsmall: {
//       borderSize: {
//         xsmall: mobile.border.xsmall.$value,
//         small: mobile.border.small.$value,
//         medium: mobile.border.medium.$value,
//         large: mobile.border.large.$value,
//         xlarge: mobile.border.xlarge.$value,
//       },
//       edgeSize: {
//         none: mobile.spacing.none.$value,
//         hair: mobile.spacing.hair.$value,
//         xxsmall: mobile.spacing.xxsmall.$value,
//         xsmall: mobile.spacing.xsmall.$value,
//         small: mobile.spacing.small.$value,
//         medium: mobile.spacing.medium.$value,
//         large: mobile.spacing.large.$value,
//         xlarge: mobile.spacing.xlarge.$value,
//         responsiveBreakpoint: 'small',
//       },
//       size: {
//         xxsmall: mobile.content.xxsmall.$value,
//         xsmall: mobile.content.xsmall.$value,
//         small: mobile.content.small.$value,
//         medium: mobile.content.medium.$value,
//         large: mobile.content.large.$value,
//         xlarge: mobile.content.xlarge.$value,
//         xxlarge: mobile.content.xxlarge.$value,
//         full: '100%',
//       },
//     },
//     small: {
//       borderSize: {
//         xsmall: mobile.border.xsmall.$value,
//         small: mobile.border.small.$value,
//         medium: mobile.border.medium.$value,
//         large: mobile.border.large.$value,
//         xlarge: mobile.border.xlarge.$value,
//       },
//       edgeSize: {
//         none: mobile.spacing.none.$value,
//         hair: mobile.spacing.hair.$value,
//         xxsmall: mobile.spacing.xxsmall.$value,
//         xsmall: mobile.spacing.xsmall.$value,
//         small: mobile.spacing.small.$value,
//         medium: mobile.spacing.medium.$value,
//         large: mobile.spacing.large.$value,
//         xlarge: mobile.spacing.xlarge.$value,
//         responsiveBreakpoint: 'small',
//       },
//       size: {
//         xxsmall: mobile.content.xxsmall.$value,
//         xsmall: mobile.content.xsmall.$value,
//         small: mobile.content.small.$value,
//         medium: mobile.content.medium.$value,
//         large: mobile.content.large.$value,
//         xlarge: mobile.content.xlarge.$value,
//         xxlarge: mobile.content.xxlarge.$value,
//         full: '100%',
//       },
//     },
//   },
//   colors: {
//     // same in light and dark mode, how to handle? is this fine?
//     brand: dark.color.brand.$value,
//     background: {
//       dark: dark.color.background.default.$value,
//       light: light.color.background.default.$value,
//     },
//     'background-back': {
//       dark: dark.color.background.back.$value,
//       light: light.color.background.back.$value,
//     },
//     'background-front': {
//       dark: dark.color.background.front.$value,
//       light: light.color.background.front.$value,
//     },
//     'background-contrast': {
//       dark: dark.color.background.contrast.$value, // 6%
//       light: light.color.background.contrast.$value,
//     },
//     'active-background': {
//       dark: dark.color.background.active.$value,
//       light: light.color.background.active.$value,
//     },
//     text: {
//       dark: dark.color.text.default.$value,
//       light: light.color.text.default.$value,
//     },
//     'text-strong': {
//       dark: dark.color.text.strong.$value,
//       light: light.color.text.strong.$value,
//     },
//     'text-weak': {
//       dark: dark.color.text.weak.$value, // 50%
//       light: light.color.text.weak.$value,
//     },
//     'text-xweak': {
//       dark: dark.color.text.xweak.$value, // 20%
//       light: light.color.text.xweak.$value,
//     },
//     border: {
//       dark: dark.color.border.default.$value, // 36%
//       light: light.color.border.default.$value, // 36%
//     },
//     'border-strong': {
//       dark: dark.color.border.strong.$value, // 72%
//       light: light.color.border.strong.$value, // 72%
//     },
//     'border-weak': {
//       dark: dark.color.border.weak.$value, // 12%
//       light: light.color.border.weak.$value, // 12%
//     },
//     'selected-text': {
//       dark: dark.color.foreground.selected.$value,
//       light: light.color.foreground.selected.$value,
//     }, // necessary to meet color contrast on HPE green background
//     'status-critical': {
//       dark: dark.color.status.critical.$value,
//       light: light.color.status.critical.$value,
//     },
//     'status-warning': {
//       dark: dark.color.status.warning.$value,
//       light: light.color.status.warning.$value,
//     },
//     'status-ok': {
//       dark: dark.color.status.ok.$value,
//       light: light.color.status.ok.$value,
//     },
//     'status-unknown': {
//       dark: dark.color.status.unknown.$value,
//       light: light.color.status.unknown.$value,
//     },
//     'validation-critical': {
//       light: light.color.validation.critical.$value,
//       dark: dark.color.validation.critical.$value, // 30%
//     },
//     'validation-ok': {
//       light: light.color.validation.ok.$value,
//       dark: dark.color.validation.ok.$value,
//     },
//     'validation-warning': {
//       light: light.color.validation.warning.$value,
//       dark: dark.color.validation.critical.$value,
//     },
//     // TO DO do we want these as tokens?
//     'background-layer-overlay': '#00000080',
//     control: 'brand',
//     'active-text': 'text',
//     'disabled-text': 'text-weak', // deprecated, use text-weak instead
//     'selected-background': 'green!',
//     icon: 'text',
//     'graph-0': 'orange!',
//     'graph-1': 'blue!',
//     'graph-2': 'purple!',
//     'graph-3': 'yellow!',
//     'graph-4': 'teal!',
//     // deprecated, does not support light and dark. use text-weak instead
//     'status-disabled': '#CCCCCC',
//     focus: 'teal!',
//     placeholder: 'text-weak',
//     'text-primary-button': '#FFFFFF',
//     'background-cta-alternate': '#F2F2F2',
//     // blue: {
//     //   dark: '#00567A',
//     //   light: '#00C8FF',
//     // },
//     // 'blue!': '#00739D',
//     // green: {
//     //   dark: '#008567',
//     //   light: '#17EBA0',
//     // },
//     // 'green!': '#01A982',
//     // teal: {
//     //   dark: '#117B82',
//     //   light: '#82FFF2',
//     // },
//     // 'teal!': '#00E8CF',
//     // purple: {
//     //   dark: '#6633BC',
//     //   light: '#F740FF',
//     // },
//     // 'purple!': '#7630EA',
//     // red: {
//     //   dark: '#A2423D',
//     //   light: '#FC6161',
//     // },
//     // 'red!': '#C54E4B',
//     // orange: {
//     //   dark: '#9B6310',
//     //   light: '#FFBC44',
//     // },
//     // 'orange!': '#FF8300',
//     // yellow: {
//     //   dark: '#8D741C',
//     //   light: '#FFEB59',
//     // },
//     // 'yellow!': '#FEC901',
//   },
// };

export const aries = deepMerge(hpe, {
  global,
  card: {
    container: {
      elevation: 'none',
      round: 'medium',
      // extend: 'transition: all 0.3s ease-in-out;',
    },
    hover: {
      container: {
        elevation: 'medium',
      },
    },
  },
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
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
  global,
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
