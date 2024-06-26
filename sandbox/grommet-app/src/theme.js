import { hpe } from 'grommet-theme-hpe';
import {
  css,
  // keyframes
} from 'styled-components';
import { deepMerge } from 'grommet/utils';
import { dark, light, large, small, components, base } from 'design-tokens';

const dimensions = {
  borderSize: {
    xsmall: large.hpe.border.xsmall,
    small: large.hpe.border.small,
    medium: large.hpe.border.medium,
    large: large.hpe.border.large,
    xlarge: large.hpe.border.xlarge,
  },
  edgeSize: {
    none: large.hpe.spacing.none,
    hair: large.hpe.spacing.hair,
    xxsmall: large.hpe.spacing.xxsmall,
    xsmall: large.hpe.spacing.xsmall,
    small: large.hpe.spacing.small,
    medium: large.hpe.spacing.medium,
    large: large.hpe.spacing.large,
    xlarge: large.hpe.spacing.xlarge,
    responsiveBreakpoint: 'small',
  },
  size: {
    xxsmall: large.hpe.content.xxsmall,
    xsmall: large.hpe.content.xsmall,
    small: large.hpe.content.small,
    medium: large.hpe.content.medium,
    large: large.hpe.content.large,
    xlarge: large.hpe.content.xlarge,
    xxlarge: large.hpe.content.xxlarge,
    full: '100%',
  },
  breakpoints: {
    xsmall: {
      borderSize: {
        xsmall: small.hpe.border.xsmall,
        small: small.hpe.border.small,
        medium: small.hpe.border.medium,
        large: small.hpe.border.large,
        xlarge: small.hpe.border.xlarge,
      },
      edgeSize: {
        none: small.hpe.spacing.none,
        hair: small.hpe.spacing.hair,
        xxsmall: small.hpe.spacing.xxsmall,
        xsmall: small.hpe.spacing.xsmall,
        small: small.hpe.spacing.small,
        medium: small.hpe.spacing.medium,
        large: small.hpe.spacing.large,
        xlarge: small.hpe.spacing.xlarge,
        responsiveBreakpoint: 'small',
      },
      size: {
        xxsmall: small.hpe.content.xxsmall,
        xsmall: small.hpe.content.xsmall,
        small: small.hpe.content.small,
        medium: small.hpe.content.medium,
        large: small.hpe.content.large,
        xlarge: small.hpe.content.xlarge,
        xxlarge: small.hpe.content.xxlarge,
        full: '100%',
      },
    },
    small: {
      borderSize: {
        xsmall: small.hpe.border.xsmall,
        small: small.hpe.border.small,
        medium: small.hpe.border.medium,
        large: small.hpe.border.large,
        xlarge: small.hpe.border.xlarge,
      },
      edgeSize: {
        none: small.hpe.spacing.none,
        hair: small.hpe.spacing.hair,
        xxsmall: small.hpe.spacing.xxsmall,
        xsmall: small.hpe.spacing.xsmall,
        small: small.hpe.spacing.small,
        medium: small.hpe.spacing.medium,
        large: small.hpe.spacing.large,
        xlarge: small.hpe.spacing.xlarge,
        responsiveBreakpoint: 'small',
      },
      size: {
        xxsmall: small.hpe.content.xxsmall,
        xsmall: small.hpe.content.xsmall,
        small: small.hpe.content.small,
        medium: small.hpe.content.medium,
        large: small.hpe.content.large,
        xlarge: small.hpe.content.xlarge,
        xxlarge: small.hpe.content.xxlarge,
        full: '100%',
      },
    },
  },
};

// const dropKeyFrames = keyframes`
//   0% {
//     opacity: 0;
//     transform: scale(1, 0.1);
//   }
//   100% {
//     opacity: 1;
//     transform: scale(1, 1);
//   }
// `;

// const standardDrop = keyframes`
//   0% {
//     opacity: 0.5;
//     transform: scale(0.5);
//   }
//   100% {
//     opacity: 1;
//     transform: scale(1);
//   }
// `;

// const skeletonAnimation = keyframes`
// 0% {
//   transform: translateX(-100%);
// }
// 100% {
//   transform: translateX(100%);
// }
// `;

// const themeModeTransition = `background ${base.motion.duration[375]} ${base.motion.easing.simple.inOut}`;

const buildTheme = tokens => {
  const [light, dark] = tokens;
  return deepMerge(hpe, {
    global: {
      ...dimensions,
      colors: {
        brand: {
          dark: dark.hpe.color.brand,
          light: light.hpe.color.brand,
        },
        primary: {
          dark: dark.hpe.color.primary,
          light: light.hpe.color.primary,
        },
        background: {
          dark: dark.hpe.color.background.default,
          light: light.hpe.color.background.default,
        },
        'background-back': {
          dark: dark.hpe.color.background.back,
          light: light.hpe.color.background.back,
        },
        'background-front': {
          dark: dark.hpe.color.background.front,
          light: light.hpe.color.background.front,
        },
        'background-contrast': {
          dark: dark.hpe.color.background.contrast, // 6%
          light: light.hpe.color.background.contrast,
        },
        'background-status-critical': {
          dark: dark.hpe.color.background.validation.critical, // 6%
          light: light.hpe.color.background.validation.critical,
        },
        'background-status-warning': {
          dark: dark.hpe.color.background.validation.warning, // 6%
          light: light.hpe.color.background.validation.warning,
        },
        'background-status-ok': {
          dark: dark.hpe.color.background.validation.ok, // 6%
          light: light.hpe.color.background.validation.ok,
        },
        'background-status-info': {
          dark: dark.hpe.color.background.validation.info, // 6%
          light: light.hpe.color.background.validation.info,
        },
        'background-primary-default': {
          dark: dark.hpe.color.background.primary.default,
          light: light.hpe.color.background.primary.default,
        },
        'active-background': {
          dark: dark.hpe.color.background.active,
          light: light.hpe.color.background.active,
        },
        text: {
          dark: dark.hpe.color.text.default,
          light: light.hpe.color.text.default,
        },
        'text-strong': {
          dark: dark.hpe.color.text.strong,
          light: light.hpe.color.text.strong,
        },
        'text-weak': {
          dark: dark.hpe.color.text.weak,
          light: light.hpe.color.text.weak,
        },
        'text-xweak': {
          dark: dark.hpe.color.text.xweak,
          light: light.hpe.color.text.xweak,
        },
        border: {
          dark: dark.hpe.color.border.default,
          light: light.hpe.color.border.default,
        },
        'border-strong': {
          dark: dark.hpe.color.border.strong,
          light: light.hpe.color.border.strong,
        },
        'border-weak': {
          dark: dark.hpe.color.border.weak,
          light: light.hpe.color.border.weak,
        },
        'selected-text': {
          dark: dark.hpe.color.text.onPrimary,
          light: light.hpe.color.text.onPrimary,
        },
        'status-critical': {
          dark: dark.hpe.color.icon.critical,
          light: light.hpe.color.icon.critical,
        },
        'status-warning': {
          dark: dark.hpe.color.icon.warning,
          light: light.hpe.color.icon.warning,
        },
        'status-ok': {
          dark: dark.hpe.color.icon.ok,
          light: light.hpe.color.icon.ok,
        },
        'status-unknown': {
          dark: dark.hpe.color.icon.unknown,
          light: light.hpe.color.icon.unknown,
        },
        'validation-critical': {
          light: light.hpe.color.background.validation.critical,
          dark: dark.hpe.color.background.validation.critical,
        },
        'validation-ok': {
          light: light.hpe.color.background.validation.ok,
          dark: dark.hpe.color.background.validation.ok,
        },
        'validation-warning': {
          light: light.hpe.color.background.validation.warning,
          dark: dark.hpe.color.background.validation.critical,
        },
        'background-brand-default': {
          light: light.hpe.color.background.primary.default,
          dark: dark.hpe.color.background.primary.default,
        },
        'background-brand-weak': {
          light: base.hpe.base.TBD,
          dark: base.hpe.base.TBD,
        },
        'foreground-brand-default': {
          light: base.hpe.base.TBD,
          dark: base.hpe.base.TBD,
        },
        'foreground-status-critical': {
          light: light.hpe.color.icon.critical,
          dark: dark.hpe.color.icon.critical,
        },
        'foreground-status-warning': {
          light: light.hpe.color.icon.warning,
          dark: dark.hpe.color.icon.warning,
        },
        'foreground-status-ok': {
          light: light.hpe.color.icon.ok,
          dark: dark.hpe.color.icon.ok,
        },
        'foreground-status-info': {
          light: light.hpe.color.icon.info,
          dark: dark.hpe.color.icon.info,
        },
        'foreground-onBrand': {
          light: base.hpe.base.TBD,
          dark: base.hpe.base.TBD,
        },
        'button-secondary-border-default': {
          light: base.hpe.base.TBD,
          dark: base.hpe.base.TBD,
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
        // deprecated, does not support light and dark.hpe. use text-weak instead
        'status-disabled': '#CCCCCC',
        focus: 'teal!',
        placeholder: 'text-weak',
        'text-primary-button': '#FFFFFF',
        'background-cta-alternate': '#F2F2F2',
      },
      // elevation: {
      //   light: {
      //     small: `${light.elevation.small.offsetX} ${light.elevation.small.offsetY} ${light.elevation.small.blur} ${light.elevation.small.color}`,
      //     medium: `${light.elevation.medium.offsetX} ${light.elevation.medium.offsetY} ${light.elevation.medium.blur} ${light.elevation.medium.color}`,
      //     large: `${light.elevation.large.offsetX} ${light.elevation.large.offsetY} ${light.elevation.large.blur} ${light.elevation.large.color}`,
      //   },
      // },
      drop: {
        // extend: ({ animate }) =>
        //   animate === 'select'
        //     ? css`
        //         animation: ${dropKeyFrames} ${base.motion.duration.short[3]}
        //           cubic-bezier(0, 0, 0.58, 1) forwards;
        //         animation-delay: 0.01s;
        //       `
        //     : css`
        //         animation: ${standardDrop} ${base.motion.duration.medium[1]}
        //           ${base.motion.easing.emphasized.decelerate} forwards;
        //         animation-delay: 0.01s;
        //       `,
      },
    },
    box: {
      // extend: css`
      //   transition: ${themeModeTransition};
      // `,
    },
    grommet: {
      // extend: css`
      //   transition: ${themeModeTransition};
      // `,
    },
    anchor: {
      // extend: css`
      //   text-decoration: underline transparent;
      //   &:hover {
      //     text-decoration: underline;
      //   }
      //   transition: text-decoration ${base.motion.duration.short[3]}
      //     ${base.motion.easing.simple.default};
      // `,
    },
    button: {
      secondary: {
        background: components.hpe.button.secondary.enabled.background,
        border: {
          color: components.hpe.button.secondary.enabled.borderColor,
        },
        color: components.hpe.button.secondary.enabled.textColor,
      },
      size: {
        medium: {
          secondary: {
            border: {
              radius: components.hpe.button.medium.secondary.borderRadius,
            },
            pad: {
              vertical: components.hpe.button.medium.secondary.paddingY,
              horizontal: components.hpe.button.medium.secondary.paddingX,
            },
          },
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
      active: {
        tab: {
          background: 'background-front',
        },
      },
      // extend: `transition: background-color ${base.motion.duration.medium[2]} ${base.motion.easing.simple.default};`,
    },
    card: {
      container: {
        // extend: css`
        //   transition: border ${base.motion.duration.short[3]}
        //       ${base.motion.easing.simple.decelerate},
        //     box-shadow ${base.motion.duration.short[3]}
        //       ${base.motion.easing.simple.default},
        //     ${themeModeTransition};

        //   svg[data-icon='dashboard'] {
        //     transform: translateX(-100%);
        //     opacity: 0;
        //     transition: opacity ${base.motion.duration[240]}
        //         ${base.motion.easing.simple.in},
        //       transform ${base.motion.duration[240]}
        //         ${base.motion.easing.simple.in};
        //   }

        //   &:hover svg[data-icon='dashboard'] {
        //     transform: translateX(0%);
        //     opacity: 1;
        //   }
        // `,
        elevation: 'small',
      },
      hover: {
        container: {
          elevation: 'medium',
        },
      },
    },
    checkBox: {
      hover: {
        extend: ({ disabled, pad, theme, toggle }) => css`
          ${!disabled &&
          pad === 'none' &&
          !toggle &&
          `border: 2px solid ${
            theme.global.colors['border-strong'][theme.dark ? 'dark' : 'light']
          };`}
        `,
      },
      toggle: {
        knob: {
          //     extend: ({ theme }) => `
          //     box-shadow: ${
          //       theme.global.elevation[theme.dark ? 'dark' : 'light'].small
          //     };
          //     border: 1px solid ${
          //       theme.global.colors.border[theme.dark ? 'dark' : 'light']
          //     };
          //     transition: all ${base.motion.duration.short[3]} ${
          //       base.motion.easing.simple.decelerate
          //     };
          //  `,
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
    skeleton: {
      // extend: css`
      //   position: relative;
      //   overflow: hidden;
      //   border-radius: 2em;
      //   background: ${props =>
      //     props.theme.dark
      //       ? dark.hpe.color?.skeleton?.background
      //       : light.hpe.color?.skeleton?.background};
      //   &::before {
      //     content: '';
      //     position: absolute;
      //     top: 0;
      //     left: 0;
      //     bottom: 0;
      //     right: 0;
      //     background-image: linear-gradient(
      //       120deg,
      //       ${props =>
      //         props.theme.dark
      //           ? dark.hpe.gradient.skeleton
      //           : light.hpe.gradient.skeleton}
      //     );
      //     transform: translateX(-100%);
      //     animation-name: ${skeletonAnimation};
      //     animation-duration: ${base.motion.duration[1750]};
      //     animation-timing-function: ${base.motion.easing.simple.default};
      //     animation-direction: normal;
      //     animation-iteration-count: infinite;
      //   }
      // `,
    },
    table: {
      // extend: css`
      //   tbody th,
      //   tbody td {
      //     transition: padding-block ${base.motion.duration.medium[2]}
      //       ${base.motion.easing.simple.decelerate};
      //   }
      //   &.compact tbody th,
      //   &.compact tbody td {
      //     padding-block: ${props => props.theme.global.edgeSize.xxsmall};
      //   }
      //   &.spacious tbody th,
      //   &.spacious tbody td {
      //     padding-block: ${props => props.theme.global.edgeSize.medium};
      //   }
      // `,
    },
    text: {
      // allow weight on large text to come through
      extend: ``,
    },
    tab: {
      // extend: `
      //   transition: border ${base.motion.duration.short[1]} ${base.motion.easing.simple.default};
      // `,
    },
  });
};

export const current = buildTheme([light, dark]);
// TO DO add back "warm theme" once tokens
export const warm = buildTheme([light, dark]);
