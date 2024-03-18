import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import {
  dark,
  light,
  large,
  small,
  warmLight,
  warmDark,
  elevationLight,
  primitives,
} from 'design-tokens';

const dimensions = {
  borderSize: {
    xsmall: large.border.xsmall,
    small: large.border.small,
    medium: large.border.medium,
    large: large.border.large,
    xlarge: large.border.xlarge,
  },
  edgeSize: {
    none: large.spacing.none,
    hair: large.spacing.hair,
    xxsmall: large.spacing.xxsmall,
    xsmall: large.spacing.xsmall,
    small: large.spacing.small,
    medium: large.spacing.medium,
    large: large.spacing.large,
    xlarge: large.spacing.xlarge,
    responsiveBreakpoint: 'small',
  },
  size: {
    xxsmall: large.content.xxsmall,
    xsmall: large.content.xsmall,
    small: large.content.small,
    medium: large.content.medium,
    large: large.content.large,
    xlarge: large.content.xlarge,
    xxlarge: large.content.xxlarge,
    full: '100%',
  },
  breakpoints: {
    xsmall: {
      borderSize: {
        xsmall: small.border.xsmall,
        small: small.border.small,
        medium: small.border.medium,
        large: small.border.large,
        xlarge: small.border.xlarge,
      },
      edgeSize: {
        none: small.spacing.none,
        hair: small.spacing.hair,
        xxsmall: small.spacing.xxsmall,
        xsmall: small.spacing.xsmall,
        small: small.spacing.small,
        medium: small.spacing.medium,
        large: small.spacing.large,
        xlarge: small.spacing.xlarge,
        responsiveBreakpoint: 'small',
      },
      size: {
        xxsmall: small.content.xxsmall,
        xsmall: small.content.xsmall,
        small: small.content.small,
        medium: small.content.medium,
        large: small.content.large,
        xlarge: small.content.xlarge,
        xxlarge: small.content.xxlarge,
        full: '100%',
      },
    },
    small: {
      borderSize: {
        xsmall: small.border.xsmall,
        small: small.border.small,
        medium: small.border.medium,
        large: small.border.large,
        xlarge: small.border.xlarge,
      },
      edgeSize: {
        none: small.spacing.none,
        hair: small.spacing.hair,
        xxsmall: small.spacing.xxsmall,
        xsmall: small.spacing.xsmall,
        small: small.spacing.small,
        medium: small.spacing.medium,
        large: small.spacing.large,
        xlarge: small.spacing.xlarge,
        responsiveBreakpoint: 'small',
      },
      size: {
        xxsmall: small.content.xxsmall,
        xsmall: small.content.xsmall,
        small: small.content.small,
        medium: small.content.medium,
        large: small.content.large,
        xlarge: small.content.xlarge,
        xxlarge: small.content.xxlarge,
        full: '100%',
      },
    },
  },
};

const buildTheme = tokens => {
  const [light, dark, elevationLight] = tokens;
  return deepMerge(hpe, {
    global: {
      ...dimensions,
      colors: {
        brand: {
          dark: dark.color.brand,
          light: light.color.brand,
        },
        primary: {
          dark: dark.color.primary,
          light: light.color.primary,
        },
        background: {
          dark: dark.color.background.default,
          light: light.color.background.default,
        },
        'background-back': {
          dark: dark.color.background.back,
          light: light.color.background.back,
        },
        'background-front': {
          dark: dark.color.background.front,
          light: light.color.background.front,
        },
        'background-contrast': {
          dark: dark.color.background.contrast, // 6%
          light: light.color.background.contrast,
        },
        'background-status-critical': {
          dark: dark.color.background.status.critical, // 6%
          light: light.color.background.status.critical,
        },
        'background-status-warning': {
          dark: dark.color.background.status.warning, // 6%
          light: light.color.background.status.warning,
        },
        'background-status-ok': {
          dark: dark.color.background.status.ok, // 6%
          light: light.color.background.status.ok,
        },
        'background-status-info': {
          dark: dark.color.background.status.info, // 6%
          light: light.color.background.status.info,
        },
        'active-background': {
          dark: dark.color.background.active,
          light: light.color.background.active,
        },
        text: {
          dark: dark.color.text.default,
          light: light.color.text.default,
        },
        'text-strong': {
          dark: dark.color.text.strong,
          light: light.color.text.strong,
        },
        'text-weak': {
          dark: dark.color.text.weak,
          light: light.color.text.weak,
        },
        'text-xweak': {
          dark: dark.color.text.xweak,
          light: light.color.text.xweak,
        },
        border: {
          dark: dark.color.border.default,
          light: light.color.border.default,
        },
        'border-strong': {
          dark: dark.color.border.strong,
          light: light.color.border.strong,
        },
        'border-weak': {
          dark: dark.color.border.weak,
          light: light.color.border.weak,
        },
        'selected-text': {
          dark: dark.color.foreground.selected,
          light: light.color.foreground.selected,
        },
        'status-critical': {
          dark: dark.color.foreground.status.critical,
          light: light.color.foreground.status.critical,
        },
        'status-warning': {
          dark: dark.color.foreground.status.warning,
          light: light.color.foreground.status.warning,
        },
        'status-ok': {
          dark: dark.color.foreground.status.ok,
          light: light.color.foreground.status.ok,
        },
        'status-unknown': {
          dark: dark.color.foreground.status.unknown,
          light: light.color.foreground.status.unknown,
        },
        'validation-critical': {
          light: light.color.background.validation.critical,
          dark: dark.color.background.validation.critical,
        },
        'validation-ok': {
          light: light.color.background.validation.ok,
          dark: dark.color.background.validation.ok,
        },
        'validation-warning': {
          light: light.color.background.validation.warning,
          dark: dark.color.background.validation.critical,
        },
        'chart-qualitative-10': {
          light: light.color.chart.qualitative[10],
          dark: dark.color.chart.qualitative[10],
        },
        'chart-qualitative-10-weak': {
          light: light.color.chart.qualitative['10-secondary'],
          dark: dark.color.chart.qualitative['10-secondary'],
        },
        'chart-qualitative-20': {
          light: light.color.chart.qualitative[20],
          dark: dark.color.chart.qualitative[20],
        },
        'chart-qualitative-20-weak': {
          light: light.color.chart.qualitative['20-secondary'],
          dark: dark.color.chart.qualitative['20-secondary'],
        },
        'chart-qualitative-30': {
          light: light.color.chart.qualitative[30],
          dark: dark.color.chart.qualitative[30],
        },
        'chart-qualitative-30-weak': {
          light: light.color.chart.qualitative['30-secondary'],
          dark: dark.color.chart.qualitative['30-secondary'],
        },
        'chart-qualitative-40': {
          light: light.color.chart.qualitative[40],
          dark: dark.color.chart.qualitative[40],
        },
        'chart-qualitative-40-weak': {
          light: light.color.chart.qualitative['40-secondary'],
          dark: dark.color.chart.qualitative['40-secondary'],
        },
        'chart-qualitative-50': {
          light: light.color.chart.qualitative[50],
          dark: dark.color.chart.qualitative[50],
        },
        'chart-qualitative-50-weak': {
          light: light.color.chart.qualitative['50-secondary'],
          dark: dark.color.chart.qualitative['50-secondary'],
        },
        'chart-qualitative-60': {
          light: light.color.chart.qualitative[60],
          dark: dark.color.chart.qualitative[60],
        },
        'chart-qualitative-60-weak': {
          light: light.color.chart.qualitative['60-secondary'],
          dark: dark.color.chart.qualitative['60-secondary'],
        },
        'chart-qualitative-70': {
          light: light.color.chart.qualitative[70],
          dark: dark.color.chart.qualitative[70],
        },
        'chart-qualitative-70-weak': {
          light: light.color.chart.qualitative['70-secondary'],
          dark: dark.color.chart.qualitative['70-secondary'],
        },
        'background-brand-default': {
          light: light.color.background.brand.default,
          dark: dark.color.background.brand.default,
        },
        'background-brand-weak': {
          light: light.color.background.brand.weak,
          dark: dark.color.background.brand.weak,
        },
        'foreground-brand-default': {
          light: light.color.foreground.brand.default,
          dark: dark.color.foreground.brand.default,
        },
        'foreground-status-critical': {
          light: light.color.foreground.status.critical,
          dark: dark.color.foreground.status.critical,
        },
        'foreground-status-warning': {
          light: light.color.foreground.status.warning,
          dark: dark.color.foreground.status.warning,
        },
        'foreground-status-ok': {
          light: light.color.foreground.status.ok,
          dark: dark.color.foreground.status.ok,
        },
        'foreground-status-info': {
          light: light.color.foreground.status.info,
          dark: dark.color.foreground.status.info,
        },

        'foreground-onBrand': {
          light: light.color.foreground.onBrand,
          dark: dark.color.foreground.onBrand,
        },
        'button-secondary-border-default': {
          light: light.color.button.secondary.border.default,
          dark: dark.color.button.secondary.border.default,
        },
        // TO DO do we want these as tokens?
        'background-layer-overlay': '#00000080',
        control: 'brand',
        'active-text': 'text',
        'disabled-text': 'text-weak', // deprecated, use text-weak instead
        'selected-background': 'green!',
        icon: 'text',
        'graph-0': 'orange!',
        'graph-1': 'blue!',
        'graph-2': 'purple!',
        'graph-3': 'yellow!',
        'graph-4': 'teal!',
        // deprecated, does not support light and dark. use text-weak instead
        'status-disabled': '#CCCCCC',
        focus: 'teal!',
        placeholder: 'text-weak',
        'text-primary-button': '#FFFFFF',
        'background-cta-alternate': '#F2F2F2',
      },
      elevation: {
        light: {
          small: elevationLight.elevation.small,
          medium: elevationLight.elevation.medium,
          large: elevationLight.elevation.large,
        },
      },
    },
    button: {
      secondary: {
        border: {
          color: 'button-secondary-border-default',
        },
      },
      subtle: {
        background: 'background-contrast',
        color: 'text-strong',
        font: {
          weight: 600,
        },
      },
      fab: {
        background: 'background-brand-default',
        color: 'foreground-onBrand',
        font: {
          weight: 600,
        },
      },
      tab: {
        color: 'text-strong',
        font: {
          weight: 400,
        },
        border: {
          // TO DO token
          radius: '8px',
          width: '0px',
          color: 'none',
        },
        extend: ({ active }) =>
          // TO DO token
          `${active ? 'box-shadow: 0px 2px 4px #0000001F;' : ''}`,
      },
      active: {
        tab: {
          background: 'background-front',
        },
      },
    },
    card: {
      container: {
        extend: 'transition: border 0.2s ease-in;',
        // elevation: 'small',
      },
    },
    checkBox: {
      toggle: {
        knob: {
          extend: ({ theme }) => `
          box-shadow: ${
            theme.global.elevation[theme.dark ? 'dark' : 'light'].small
          };
          border: 1px solid ${
            theme.global.colors.border[theme.dark ? 'dark' : 'light']
          };
          transition: all ${primitives.motion.duration.short[2]} ${
            primitives.motion.easing.simple.decelerate
          };
       `,
        },
      },
    },
    collapsible: {
      minSpeed: 400,
      baseline: 300,
    },
    notification: {
      critical: {
        background: 'background-status-critical',
      },
      warning: {
        background: 'background-status-warning',
      },
      ok: {
        background: 'background-status-ok',
      },
      info: {
        background: 'background-status-info',
      },
    },
    text: {
      // allow weight on large text to come through
      extend: ``,
    },
    tab: {
      extend: `
        transition: border ${primitives.motion.duration.short[1]} ${primitives.motion.easing.simple.default};
      `,
    },
  });
};

export const current = buildTheme([light, dark, elevationLight]);
export const warm = buildTheme([warmLight, warmDark, elevationLight]);
