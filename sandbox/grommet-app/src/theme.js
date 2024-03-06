import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { dark, light, desktop, mobile } from 'design-tokens';

const dimensions = {
  borderSize: {
    xsmall: desktop.border.xsmall.$value,
    small: desktop.border.small.$value,
    medium: desktop.border.medium.$value,
    large: desktop.border.large.$value,
    xlarge: desktop.border.xlarge.$value,
  },
  edgeSize: {
    none: desktop.spacing.none.$value,
    hair: desktop.spacing.hair.$value,
    xxsmall: desktop.spacing.xxsmall.$value,
    xsmall: desktop.spacing.xsmall.$value,
    small: desktop.spacing.small.$value,
    medium: desktop.spacing.medium.$value,
    large: desktop.spacing.large.$value,
    xlarge: desktop.spacing.xlarge.$value,
    responsiveBreakpoint: 'small',
  },
  size: {
    xxsmall: desktop.content.xxsmall.$value,
    xsmall: desktop.content.xsmall.$value,
    small: desktop.content.small.$value,
    medium: desktop.content.medium.$value,
    large: desktop.content.large.$value,
    xlarge: desktop.content.xlarge.$value,
    xxlarge: desktop.content.xxlarge.$value,
    full: '100%',
  },
  breakpoints: {
    xsmall: {
      borderSize: {
        xsmall: mobile.border.xsmall.$value,
        small: mobile.border.small.$value,
        medium: mobile.border.medium.$value,
        large: mobile.border.large.$value,
        xlarge: mobile.border.xlarge.$value,
      },
      edgeSize: {
        none: mobile.spacing.none.$value,
        hair: mobile.spacing.hair.$value,
        xxsmall: mobile.spacing.xxsmall.$value,
        xsmall: mobile.spacing.xsmall.$value,
        small: mobile.spacing.small.$value,
        medium: mobile.spacing.medium.$value,
        large: mobile.spacing.large.$value,
        xlarge: mobile.spacing.xlarge.$value,
        responsiveBreakpoint: 'small',
      },
      size: {
        xxsmall: mobile.content.xxsmall.$value,
        xsmall: mobile.content.xsmall.$value,
        small: mobile.content.small.$value,
        medium: mobile.content.medium.$value,
        large: mobile.content.large.$value,
        xlarge: mobile.content.xlarge.$value,
        xxlarge: mobile.content.xxlarge.$value,
        full: '100%',
      },
    },
    small: {
      borderSize: {
        xsmall: mobile.border.xsmall.$value,
        small: mobile.border.small.$value,
        medium: mobile.border.medium.$value,
        large: mobile.border.large.$value,
        xlarge: mobile.border.xlarge.$value,
      },
      edgeSize: {
        none: mobile.spacing.none.$value,
        hair: mobile.spacing.hair.$value,
        xxsmall: mobile.spacing.xxsmall.$value,
        xsmall: mobile.spacing.xsmall.$value,
        small: mobile.spacing.small.$value,
        medium: mobile.spacing.medium.$value,
        large: mobile.spacing.large.$value,
        xlarge: mobile.spacing.xlarge.$value,
        responsiveBreakpoint: 'small',
      },
      size: {
        xxsmall: mobile.content.xxsmall.$value,
        xsmall: mobile.content.xsmall.$value,
        small: mobile.content.small.$value,
        medium: mobile.content.medium.$value,
        large: mobile.content.large.$value,
        xlarge: mobile.content.xlarge.$value,
        xxlarge: mobile.content.xxlarge.$value,
        full: '100%',
      },
    },
  },
};

export const tokensTheme = deepMerge(hpe, {
  global: {
    ...dimensions,
    colors: {
      brand: {
        dark: dark.color.brand.$value,
        light: light.color.brand.$value,
      },
      background: {
        dark: dark.color.background.default.$value,
        light: light.color.background.default.$value,
      },
      'background-back': {
        dark: dark.color.background.back.$value,
        light: light.color.background.back.$value,
      },
      'background-front': {
        dark: dark.color.background.front.$value,
        light: light.color.background.front.$value,
      },
      'background-contrast': {
        dark: dark.color.background.contrast.$value, // 6%
        light: light.color.background.contrast.$value,
      },
      'background-status-critical': {
        dark: dark.color.background.status.critical.$value, // 6%
        light: light.color.background.status.critical.$value,
      },
      'background-status-warning': {
        dark: dark.color.background.status.warning.$value, // 6%
        light: light.color.background.status.warning.$value,
      },
      'background-status-ok': {
        dark: dark.color.background.status.ok.$value, // 6%
        light: light.color.background.status.ok.$value,
      },
      'background-status-info': {
        dark: dark.color.background.status.info.$value, // 6%
        light: light.color.background.status.info.$value,
      },
      'active-background': {
        dark: dark.color.background.active.$value,
        light: light.color.background.active.$value,
      },
      text: {
        dark: dark.color.text.default.$value,
        light: light.color.text.default.$value,
      },
      'text-strong': {
        dark: dark.color.text.strong.$value,
        light: light.color.text.strong.$value,
      },
      'text-weak': {
        dark: dark.color.text.weak.$value,
        light: light.color.text.weak.$value,
      },
      'text-xweak': {
        dark: dark.color.text.xweak.$value,
        light: light.color.text.xweak.$value,
      },
      border: {
        dark: dark.color.border.default.$value,
        light: light.color.border.default.$value,
      },
      'border-strong': {
        dark: dark.color.border.strong.$value,
        light: light.color.border.strong.$value,
      },
      'border-weak': {
        dark: dark.color.border.weak.$value,
        light: light.color.border.weak.$value,
      },
      'selected-text': {
        dark: dark.color.foreground.selected.$value,
        light: light.color.foreground.selected.$value,
      },
      'status-critical': {
        dark: dark.color.foreground.status.critical.$value,
        light: light.color.foreground.status.critical.$value,
      },
      'status-warning': {
        dark: dark.color.foreground.status.warning.$value,
        light: light.color.foreground.status.warning.$value,
      },
      'status-ok': {
        dark: dark.color.foreground.status.ok.$value,
        light: light.color.foreground.status.ok.$value,
      },
      'status-unknown': {
        dark: dark.color.foreground.status.unknown.$value,
        light: light.color.foreground.status.unknown.$value,
      },
      'validation-critical': {
        light: light.color.background.validation.critical.$value,
        dark: dark.color.background.validation.critical.$value,
      },
      'validation-ok': {
        light: light.color.background.validation.ok.$value,
        dark: dark.color.background.validation.ok.$value,
      },
      'validation-warning': {
        light: light.color.background.validation.warning.$value,
        dark: dark.color.background.validation.critical.$value,
      },
      'chart-qualitative-10': {
        light: light.color.chart.qualitative[10].$value,
        dark: dark.color.chart.qualitative[10].$value,
      },
      'chart-qualitative-10-weak': {
        light: light.color.chart.qualitative['10-secondary'].$value,
        dark: dark.color.chart.qualitative['10-secondary'].$value,
      },
      'chart-qualitative-20': {
        light: light.color.chart.qualitative[20].$value,
        dark: dark.color.chart.qualitative[20].$value,
      },
      'chart-qualitative-20-weak': {
        light: light.color.chart.qualitative['20-secondary'].$value,
        dark: dark.color.chart.qualitative['20-secondary'].$value,
      },
      'chart-qualitative-30': {
        light: light.color.chart.qualitative[30].$value,
        dark: dark.color.chart.qualitative[30].$value,
      },
      'chart-qualitative-30-weak': {
        light: light.color.chart.qualitative['30-secondary'].$value,
        dark: dark.color.chart.qualitative['30-secondary'].$value,
      },
      'chart-qualitative-40': {
        light: light.color.chart.qualitative[40].$value,
        dark: dark.color.chart.qualitative[40].$value,
      },
      'chart-qualitative-40-weak': {
        light: light.color.chart.qualitative['40-secondary'].$value,
        dark: dark.color.chart.qualitative['40-secondary'].$value,
      },
      'chart-qualitative-50': {
        light: light.color.chart.qualitative[50].$value,
        dark: dark.color.chart.qualitative[50].$value,
      },
      'chart-qualitative-50-weak': {
        light: light.color.chart.qualitative['50-secondary'].$value,
        dark: dark.color.chart.qualitative['50-secondary'].$value,
      },
      'chart-qualitative-60': {
        light: light.color.chart.qualitative[60].$value,
        dark: dark.color.chart.qualitative[60].$value,
      },
      'chart-qualitative-60-weak': {
        light: light.color.chart.qualitative['60-secondary'].$value,
        dark: dark.color.chart.qualitative['60-secondary'].$value,
      },
      'chart-qualitative-70': {
        light: light.color.chart.qualitative[70].$value,
        dark: dark.color.chart.qualitative[70].$value,
      },
      'chart-qualitative-70-weak': {
        light: light.color.chart.qualitative['70-secondary'].$value,
        dark: dark.color.chart.qualitative['70-secondary'].$value,
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
  },
  button: {
    subtle: {
      background: 'background-contrast',
      color: 'text-strong',
      font: {
        weight: 600,
      },
    },
  },
  card: {
    container: {
      extend: '',
      elevation: 'small',
    },
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
});
