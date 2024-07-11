import {
  css,
  // keyframes
} from 'styled-components';
import { deepFreeze } from 'grommet/utils';
import { dark, light, large, small, components, base } from 'design-tokens';

const dimensions = {
  borderSize: {
    xsmall: large.hpe.border.xsmall,
    small: large.hpe.border.small,
    medium: large.hpe.border.medium,
    default: large.hpe.border.default,
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
        default: small.hpe.border.default,
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
        default: small.hpe.border.default,
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

// option button kind styles. abstracted so select.emptySearchMessage
// can reference pad value
const option = {
  color: components.hpe.select.option.enabled.textColor,
  border: {
    radius: '0px',
    width: components.hpe.select.medium.option.borderWidth,
    color: components.hpe.select.option.enabled.borderColor,
  },
  pad: {
    horizontal: components.hpe.select.medium.option.paddingX,
    vertical: components.hpe.select.medium.option.paddingY,
  },
  font: {
    weight: components.hpe.select.option.enabled.fontWeight,
  },
};

// abstracted so button and pinned list icon can reference
const mediumIconOnlyPad = '9px';

const baseSpacing = 24;

// TO DO notes:
// - felt weird not just having a straight "brand" color

const buildTheme = tokens => {
  const [light, dark] = tokens;
  return deepFreeze({
    defaultMode: 'light',
    global: {
      // backgrounds, // TO DO backgrounds
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
        'background-active': {
          dark: dark.hpe.color.background.active, // 6%
          light: light.hpe.color.background.active,
        },
        'background-hover': {
          dark: dark.hpe.color.background.hover, // 6%
          light: light.hpe.color.background.hover,
        },
        'background-floating': {
          dark: dark.hpe.color.background.floating, // 6%
          light: light.hpe.color.background.floating,
        },
        'background-selected-weak': {
          dark: dark.hpe.color.background.selected.weak, // 6%
          light: light.hpe.color.background.selected.weak,
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
        'text-onPrimary': {
          dark: dark.hpe.color.text.onPrimary,
          light: light.hpe.color.text.onPrimary,
        },
        border: {
          dark: dark.hpe.color.border.default,
          light: light.hpe.color.border.default,
        },
        'border-default': {
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
        'border-selected': {
          dark: dark.hpe.color.border.selected,
          light: light.hpe.color.border.selected,
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
        focus: components.hpe.focusRing,
        placeholder: 'text-weak',
        'text-primary-button': '#FFFFFF',
        'background-cta-alternate': '#F2F2F2',
      },
      control: {
        border: {
          radius: '6px',
        },
      },
      input: {
        font: {
          height: 'inherit',
          weight: 500,
        },
        padding: {
          horizontal: components.hpe.formField.medium.input.container.paddingX, // equivalent to 'small' when combined with 1px border
          vertical: components.hpe.formField.medium.input.container.paddingY, // equivalent to 'xsmall' when combined with 1px border
        },
        readOnly: {
          background:
            components.hpe.formField.input.container.readOnly.background,
          border: {
            color:
              components.hpe.formField.input.container.readOnly.borderColor,
          },
        },
        extend: `
          &::-webkit-formField-placeholder {
            font-weight: ${components.hpe.formField.medium.placeholderText.fontWeight};
          }
        
          &::-moz-placeholder {
            font-weight: ${components.hpe.formField.medium.placeholderText.fontWeight};
          }
        
          &:-ms-formField-placeholder {
            font-weight: ${components.hpe.formField.medium.placeholderText.fontWeight};
          }
        `,
      },
      font: {
        family: "'Metric', Arial, sans-serif",
        face: `
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff2") format('woff2'),
                 url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff") format('woff');
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff2") format('woff2'),
                 url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff") format('woff');
            font-weight: 400;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Bold.woff2") format('woff2'),
                 url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Bold.woff") format('woff');
            font-weight: 700;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Semibold.woff2") format('woff2'),
                 url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Semibold.woff") format('woff');
            font-weight: 600;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Medium.woff2") format('woff2'),
                 url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Medium.woff") format('woff');
            font-weight: 500;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Light.woff2") format('woff2'),
                 url("https://www.hpe.com/h41225/hfws-static/fonts/metric-hpe-web/MetricHPE-Web-Light.woff") format('woff');
            font-weight: 100;
          }`,
      },
      focus: {
        border: undefined,
      },
      active: {
        background: 'active-background',
        color: 'active-text',
      },
      drop: {
        background: components.hpe.drop.background,
        border: {
          // TO DO don't have global concept of radius?
          radius: components.hpe.drop.borderRadius,
        },
        margin: 'xsmall',
        intelligentMargin: true,
        shadowSize: 'medium',
        /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
         * at a z-index of 101. This adjustment brings Drop in alignment with Layer
         * which needs an elevated z-index to sit atop the Global header. */
        zIndex: components.hpe.drop.zIndex,
      },
      elevation: {
        // Elevation values were derived from this Figma file.
        // https://www.figma.com/file/eZYR3dtWdb9U90QvJ7p3T9/HPE-Color-Styles?node-id=405%3A25
        // Naming in Figma file is strong/default/weak vs. Grommet t-shirt sizing.
        // As defined here, default is currently mapping to medium.
        light: {
          small: '0px 2px 4px #0000001F;',
          medium: '0px 6px 12px #0000001F;',
          large: '0px 12px 24px #0000003D;',
        },
        dark: {
          small: '0px 2px 4px #0000003D;',
          medium: '0px 6px 12px #0000005C;',
          large: '0px 12px 24px #0000007A;',
        },
      },
      hover: {
        background: 'background-hover',
        color: 'active-text', // TO DO
      },
      selected: {
        background: 'background-selected',
        color: 'selected-text', // TO DO?
      },
    },
    accordion: {
      panel: {
        border: {
          side: 'horizontal',
          color: 'border',
        },
      },
      heading: {
        level: 3,
        margin: { vertical: 'medium', horizontal: 'xsmall' },
      },
      hover: {
        background: 'background-contrast',
        heading: {
          color: undefined,
        },
      },
      border: undefined,
      icons: {
        // collapse: Up,
        // expand: Down,
        color: 'text',
      },
    },
    anchor: {
      color: 'text-strong',
      textDecoration: 'underline', // this will have a token
      fontWeight: base.hpe.base.font.weight.medium, // Q: is it okay to use base values? ideal not to use base
      gap: 'xsmall', // Q: should this point to a token? use component specific token other wise fine to leave as t-shirt size
      hover: {
        textDecoration: 'underline',
      },
      size: {
        large: {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
        xlarge: {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
        xxlarge: {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
        '3xl': {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
        '4xl': {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
        '5xl': {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
        '6xl': {
          color: 'brand',
          fontWeight: base.hpe.base.font.weight.bold,
          textDecoration: 'none',
        },
      },
    },
    avatar: {
      size: {
        large: `${baseSpacing * 4}px`, // 96px
      },
      text: {
        size: {
          large: 'xxlarge', // 36px
        },
      },
    },
    button: {
      badge: {
        align: 'container', // TO DO this is a grommet-ism?
        container: {
          // align badge background to button label color
          background: 'text-strong',
        },
        size: {
          medium: '18px', // Q: what token should be used here? no token for this at the moments
        },
        text: {
          size: {
            medium: 'xsmall', // TO DO how to do references for typography sizes
          },
        },
      },
      // TO DO add cta-primary variant
      'cta-primary': {
        background: { color: 'brand' },
        color: 'text-primary-button',
        font: { weight: 'bold' }, // Q: missing token?
        // icon: <Hpe />,
        reverse: true,
        // extend: props => primaryBackground(props),
      },
      // TO DO add cta-alternate variant
      'cta-alternate': {
        background: 'background-cta-alternate',
        color: 'text-strong',
        font: {
          weight: 'bold', // Q: missing token?
        },
        // icon: <Hpe color="brand" />,
        reverse: true,
      },
      default: {
        color: components.hpe.button.default.enabled.textColor,
        border: {
          width: components.hpe.button.medium.default.borderWidth, // TO DO don't want pad to subtract borderWidth
          color: components.hpe.button.default.enabled.borderColor,
        },
        font: {
          weight: components.hpe.button.default.enabled.fontWeight,
        },
      },
      gap: components.hpe.button.medium.default.gapX,
      primary: {
        background: {
          color: components.hpe.button.primary.enabled.background,
        },
        color: components.hpe.button.primary.enabled.textColor,
        font: {
          weight: components.hpe.button.primary.enabled.fontWeight,
        },
        // extend: props => primaryBackground(props),
      },
      secondary: {
        border: {
          color: components.hpe.button.secondary.enabled.borderColor,
          width: components.hpe.button.medium.secondary.borderWidth,
        },
        color: components.hpe.button.secondary.enabled.textColor,
        font: {
          weight: components.hpe.button.secondary.enabled.fontWeight,
        },
      },
      toolbar: {
        border: {
          radius: components.hpe.button.medium.toolbar.borderRadius,
          width: components.hpe.button.medium.toolbar.borderWidth, // TO DO not coming through
          color: components.hpe.button.toolbar.enabled.borderColor,
        },
        color: components.hpe.button.toolbar.enabled.textColor,
        font: {
          weight: components.hpe.button.toolbar.enabled.fontWeight,
        },
      },
      option,
      active: {
        background: {
          color: components.hpe.button.default.selected.background,
        },
        color: components.hpe.button.default.selected.textColor,
        secondary: {
          border: {
            color: components.hpe.button.secondary.selected.borderColor,
          },
        },
        option: {
          background: {
            // TO DO working?
            color: components.hpe.select.option.selected.background,
          },
        },
      },
      selected: {
        option: {
          background: components.hpe.select.option.selected.background,
          color: components.hpe.select.option.selected.textColor,
          font: {
            weight: components.hpe.select.option.selected.fontWeight,
          },
        },
      },
      hover: {
        'cta-primary': {
          // extend: props => primaryHoverBackground(props),
        },
        'cta-alternate': {
          extend: ({ active, colorValue, theme }) => {
            let color;
            if (!colorValue && !active) {
              if (theme.dark) {
                color = 'rgba(0, 0, 0, 0.2)'; // TBD
              } else color = 'rgba(0, 0, 0, 0.2)'; // TBD
            }

            const style = `inset 0 0 100px 100px ${color}`;
            return `-moz-box-shadow: ${style};
              -webkit-box-shadow: ${style};
              box-shadow: ${style};`;
          },
        },
        default: {
          background: {
            color: components.hpe.button.default.hover.background,
          },
          border: {
            color: components.hpe.button.default.hover.borderColor,
          },
          color: components.hpe.button.default.hover.textColor,
        },
        option: {
          background: components.hpe.select.option.hover.background,
          color: components.hpe.select.option.hover.textColor,
        },
        primary: {
          // extend: props => primaryHoverBackground(props),
        },
        secondary: {
          border: {
            width: '3px', // TO DO
          },
        },
        toolbar: {
          background: {
            color: components.hpe.button.toolbar.hover.background,
          },
          color: components.hpe.button.toolbar.hover.textColor,
        },
      },
      color: components.hpe.button.default.enabled.textDecoration,
      size: {
        small: {
          border: {
            // Q: is this token correct? token value is 'full' but theme value is '2em'
            radius: components.hpe.button.small.default.borderRadius,
          },
          pad: {
            // Q: is this value correct? token is 4px and theme value is 5px
            vertical: components.hpe.button.small.default.paddingY,
            // Q: is this value correct? token is 16px and theme value is 12px
            horizontal: components.hpe.button.small.default.paddingX,
          },
          iconOnly: {
            pad: '7px', // Q: missing token
          },
          toolbar: {
            border: {
              radius: components.hpe.button.small.toolbar.borderRadius,
            },
          },
        },
        medium: {
          border: {
            // TO DO need way to map to global radius of full,
            // Q: is this token correct? token value is 'full' but theme value is '2em'
            radius: components.hpe.button.medium.default.borderRadius,
          },
          pad: {
            vertical: components.hpe.button.medium.default.paddingY,
            horizontal: components.hpe.button.medium.default.paddingX,
          },
          iconOnly: {
            pad: mediumIconOnlyPad, // Q: confused about this value
          },
          toolbar: {
            border: {
              radius: components.hpe.button.medium.toolbar.borderRadius,
            },
            pad: {
              vertical: components.hpe.button.medium.toolbar.paddingY,
              horizontal: components.hpe.button.medium.default.paddingX,
            },
          },
        },
        large: { // Q: missing tokens for large?
          border: {
            radius: '2em',
          },
          pad: {
            vertical: '10px',
            horizontal: '24px',
          },
          iconOnly: {
            pad: '13px',
          },
          toolbar: {
            border: {
              radius: '8px',
            },
            pad: {
              vertical: '10px',
              horizontal: '16px',
            },
          },
        },
        xlarge: { // Q: missing tokens for xlarge?
          border: {
            radius: '2em',
          },
          pad: {
            vertical: '21px',
            horizontal: '30px',
          },
          iconOnly: {
            pad: '24px',
          },
        },
      },
      extend: ({ hasIcon, hasLabel, sizeProp }) => {
        // necessary so primary label is accessible on HPE green background
        const fontSize = components.hpe.button.medium.default.fontSize;
        const lineHeight = components.hpe.button.medium.default.lineHeight;
        let style = '';
        const iconOnly = hasIcon && !hasLabel;
        if ((sizeProp === 'medium' || sizeProp === undefined) && !iconOnly) {
          style += `font-size: ${fontSize};
          line-height: ${lineHeight};`;
        }
        return style;
      },
    },
    calendar: {
      // ensure color is #FFFFFF to meet color contrast requirement on HPE green
      day: {
        extend: ({ isSelected, theme }) =>
          isSelected && `color: ${theme.global.colors['text-primary-button']};`,
      },
      icons: {
        // next: Next,
        // previous: Previous,
      },
      small: { // Q: missing tokens
        fontSize: '13.6px',
        lineHeight: 1.375,
        daySize: '27.43px',
        title: {
          size: 'medium',
          weight: 500,
          color: 'text-strong',
        },
      },
      medium: {
        fontSize: '18px',
        lineHeight: 1.45,
        daySize: '54.86px',
        title: {
          size: 'large',
          weight: 500,
          color: 'text-strong',
        },
      },
      large: {
        fontSize: '31.2px',
        lineHeight: 1.11,
        daySize: '109.71px',
        title: {
          size: 'xlarge',
          weight: 500,
          color: 'text-strong',
        },
      },
    },
    card: {
      container: {
        background: 'background-front',
        elevation: 'medium',
        extend: 'transition: all 0.3s ease-in-out;',
      },
      body: {
        pad: 'medium',
      },
      footer: {
        pad: { horizontal: 'medium', vertical: 'small' },
      },
      header: {
        pad: 'medium',
      },
      hover: {
        container: {
          elevation: 'large',
        },
      },
    },
    checkBox: {
      hover: {
        border: {
          color: 'border-strong',
        },
        background: {
          color: 'background-contrast',
        },
        // HPE Design System guidance states that pad="none" should be applied on CheckBox
        // when its used outside of a FormField. We will apply this hover treatment in
        // those instances.
        extend: ({ disabled, pad, theme, toggle }) => css`
          ${!disabled &&
          pad === 'none' &&
          !toggle &&
          `border: 2px solid ${
            theme.global.colors['border-strong'][theme.dark ? 'dark' : 'light']
          };`} 
        `,// Q: missing token
      },
      color: 'background', // Q: missing token
      border: {
        color: components.hpe.checkbox.control.enabled.borderColor,
        width: components.hpe.checkbox.medium.control.borderWidth,
      },
      check: {
        radius: '4px',
        extend: ({ theme, checked, indeterminate }) => `
        background-color: ${
          checked || indeterminate
            ? theme.global.colors['green!']
            : theme.global.colors.background[theme.dark ? 'dark' : 'light']
        };
        ${(checked || indeterminate) && 'border: none;'}
          `,
      },
      icon: {
        extend: ({ theme }) => `stroke-width: 2px;
        stroke: ${theme.global.colors['text-primary-button']}`,
      },
      gap: 'small',
      label: {
        align: 'start',
      },
      pad: {
        vertical: 'xsmall',
        horizontal: 'small',
      },
      toggle: {
        background: 'background',
        color: 'background',
        knob: {
          extend: ({ theme }) => `
             box-shadow: ${
               theme.global.elevation[theme.dark ? 'dark' : 'light'].small
             };
             border: 1px solid ${
               theme.global.colors.border[theme.dark ? 'dark' : 'light']
             }
          `,
        },
        extend: ({ checked, theme }) => `
          ${checked && `background-color: ${theme.global.colors['green!']};`}
        `,
      },
      // HPE Design System guidance states that pad="none" should be applied on CheckBox
      // when its used outside of a FormField. We will apply this hover treatment in
      // those instances.
      extend: ({ disabled, pad }) => css`
      ${
        !disabled &&
        pad === 'none' &&
        `&:hover {
        background-color: unset;
      }`
      }
      font-weight: 500;
      width: auto;
    };
    `,
    },
    checkBoxGroup: {
      container: {
        gap: 'none',
        margin: {
          vertical: 'xsmall',
        },
      },
    },
    data: {
      button: {
        kind: 'toolbar',
      },
    },
    dataTable: {
      body: {
        extend: ({ theme }) => `
          /* Margin and padding allow room for focus on table body */
          margin: ${theme.global.edgeSize.xxsmall} 0px;
          padding: 0px ${theme.global.edgeSize.xxsmall};
        `,
      },
      header: {
        border: { side: 'bottom' },
        color: 'text-strong',
        extend: ({ column, sort, sortable, theme }) =>
          `
            ${
              sort &&
              sort.property === column &&
              `
              background: ${
                theme.global.colors['background-contrast'][
                  theme.dark ? 'dark' : 'light'
                ]
              }
            `
            };
            ${
              sortable &&
              sort &&
              sort.property !== column &&
              `
                svg {
                  opacity: 0;
                }
                &:hover {
                  svg {
                    opacity: 1;
                  }
                }
              `
            };
          `,
        font: {
          weight: 500,
        },
        gap: 'none',
        hover: {
          background: {
            color: 'background-contrast',
          },
        },
        units: {
          color: 'text-weak',
        },
      },
      // icons: {
      //   ascending: () => <Ascending size="large" />,
      //   descending: () => <Descending size="large" />,
      //   contract: () => <Up height="medium" />,
      //   expand: () => <Down height="medium" />,
      //   sortable: () => <Unsorted size="large" />,
      // },
      pinned: {
        header: {
          extend: 'backdrop-filter: blur(12px);',
        },
        body: {
          extend: 'backdrop-filter: blur(12px);',
        },
        footer: {
          extend: 'backdrop-filter: blur(12px);',
        },
      },
      primary: {
        weight: 500,
        color: 'text-strong',
      },
      resize: {
        hover: {
          border: {
            color: 'border-strong',
            size: 'small',
          },
        },
      },
    },
    dateformField: {
      container: {
        round: 'xsmall',
      },
      icon: {
        size: 'small',
      },
    },
    fileformField: {
      border: {
        size: 'xsmall',
      },
      button: {
        border: {
          radius: '2em',
        },
        pad: {
          vertical: '6px',
          horizontal: '12px',
        },
        color: 'text-strong',
        font: {
          weight: 'bold',
        },
        hover: {
          background: 'background-contrast',
          color: 'text-strong',
        },
      },
      dragOver: {
        background: 'background-contrast',
        border: 'none',
      },
      hover: {
        border: {
          color: 'border',
        },
      },
      icons: {
        // remove: Close,
      },
      message: {
        color: 'placeholder',
      },
      pad: { horizontal: 'xsmall' },
      extend: 'border-radius: 4px;',
    },
    formField: {
      content: {
        margin: { vertical: 'xsmall' },
        pad: undefined,
      },
      border: {
        error: {
          color: 'border-strong',
        },
        color: 'border',
        side: 'all',
      },
      disabled: {
        background: {
          color: undefined,
        },
        border: {
          color: 'border-weak',
        },
        label: {
          color: 'text-xweak',
        },
      },
      error: {
        background: {
          color: 'validation-critical',
        },
        container: {
          gap: 'xsmall',
        },
        // icon: <CircleAlert size="small" />,
        size: 'xsmall',
        color: 'text',
        margin: {
          bottom: 'xsmall',
          top: 'none',
          horizontal: 'none',
        },
      },
      focus: {
        border: {
          color: 'border-strong',
        },
      },
      help: {
        size: 'xsmall',
        color: 'text',
        margin: 'none',
      },
      info: {
        size: 'xsmall',
        color: 'text',
        margin: {
          bottom: 'xsmall',
          top: 'none',
          horizontal: 'none',
        },
      },
      label: {
        size: 'xsmall',
        color: 'text',
        margin: {
          bottom: 'none',
          top: 'xsmall',
          horizontal: 'none',
        },
        requiredIndicator: true,
        weight: 500,
      },
      margin: {
        bottom: 'none',
      },
      round: '6px',
      survey: {
        label: {
          margin: { bottom: 'none' },
        },
      },
    },
    heading: {
      color: 'text-strong',
      weight: 500,
      level: {
        1: {
          font: {
            weight: 500,
          },
          small: {
            size: '24px',
            height: '24px',
          },
          medium: {
            size: '36px',
            height: '36px',
          },
          large: {
            size: '48px',
            height: '48px',
          },
          xlarge: {
            size: '60px',
            height: '60px',
          },
        },
        2: {
          small: {
            size: '20px',
            height: '20px',
          },
          medium: {
            size: '24px',
            height: '24px',
          },
          large: {
            size: '36px',
            height: '36px',
          },
          xlarge: {
            size: '48px',
            height: '48px',
          },
        },
        3: {
          font: {
            weight: 500,
          },
          small: {
            size: '16px',
            height: '16px',
          },
          medium: {
            size: '20px',
            height: '20px',
          },
          large: {
            size: '24px',
            height: '24px',
          },
          xlarge: {
            size: '36px',
            height: '36px',
          },
        },
        4: {
          font: {
            weight: 500,
          },
          small: {
            size: '12px',
            height: '12px',
          },
          medium: {
            size: '16px',
            height: '16px',
          },
          large: {
            size: '20px',
            height: '20px',
          },
          xlarge: {
            size: '24px',
            height: '24px',
          },
        },
        5: {
          font: {
            weight: 600,
          },
          small: {
            size: '12px',
            height: '12px',
          },
          medium: {
            size: '12px',
            height: '12px',
          },
          large: {
            size: '16px',
            height: '16px',
          },
          xlarge: {
            size: '20px',
            height: '20px',
          },
        },
        6: {
          font: {
            weight: 600,
          },
          small: {
            size: '12px',
            height: '12px',
          },
          medium: {
            size: '12px',
            height: '12px',
          },
          large: {
            size: '12px',
            height: '12px',
          },
          xlarge: {
            size: '16px',
            height: '16px',
          },
        },
      },
      // This block applies size-specific weights to headings to ensure
      // that as heading sizes get small, the weight increases and as they
      // get large, the weight decreases.
      // This block can be removed once grommet theme structure is enhanced
      // to support level and size-specific weights.
      extend: ({ level, size }) => {
        let fontWeight = '';
        if (level === 3 && size === 'small') {
          fontWeight = 'font-weight: 600;';
          // undefined necessary so an h4 without size prop explicitly defined
          // still renders as weight 600
        } else if (
          level === 4 &&
          ['small', 'medium', undefined].includes(size)
        ) {
          fontWeight = 'font-weight: 600;';
        } else if (level === 5 && size === 'xlarge') {
          fontWeight = 'font-weight: 500;';
        }
        return fontWeight;
      },
    },
    icon: {
      disableScaleDown: true,
      matchSize: true,
      size: {
        small: '16px',
        medium: '18px',
        large: '22px',
        xlarge: '24px',
        xxlarge: '36px',
      },
    },
    layer: {
      background: 'background',
      border: {
        radius: 'small',
        intelligentRounding: true,
      },
      container: {
        elevation: 'large',
      },
      overlay: {
        background: 'background-layer-overlay',
      },
      /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
       * at a z-index of 101. This adjustment allows for Layer modals and side-drawers
       * to sit atop the Global header. */
      zIndex: '110',
    },
    list: {
      item: {
        border: undefined,
        pinned: {
          icon: {
            pad: mediumIconOnlyPad,
          },
        },
      },
    },
    maskedformField: {
      container: {
        extend: ({ theme }) => `
          svg {
            fill: ${
              theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
            };
            stroke: ${
              theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
            };
          }
        `,
      },
    },
    menu: {
      drop: {
        align: {
          top: 'bottom',
          left: 'left',
        },
      },
      group: {
        // container: {
        //   pad: components.hpe.menu.medium.group.container.paddingY,
        // },
        separator: {
          color: components.hpe.menu.group.separator.background,
          pad: 'none',
        },
      },
      icons: {
        color: 'text-strong',
        // down: Down,
      },
      item: {
        pad: {
          horizontal: components.hpe.menu.medium.item.paddingX,
          vertical: components.hpe.menu.medium.item.paddingY,
        },
      },
    },
    nameValuePair: {
      name: {
        color: 'text-strong',
        weight: 500,
      },
    },
    notification: {
      close: {
        // icon: Close,
      },
      container: {
        round: 'xsmall',
      },
      direction: 'column',
      global: {
        direction: 'row',
        container: {
          round: 'none',
        },
      },
      message: {
        color: { dark: 'text-strong' },
      },
      title: {
        // any text props
        color: 'text-strong',
        weight: 500,
      },
      critical: {
        background: 'validation-critical',
        global: {
          background: 'validation-critical',
        },
        toast: {
          background: 'background-front',
        },
      },
      warning: {
        background: 'validation-warning',
        global: {
          background: 'validation-warning',
        },
        toast: {
          background: 'background-front',
        },
      },
      normal: {
        background: 'validation-ok',
        global: {
          background: 'validation-ok',
        },
        toast: {
          background: 'background-front',
        },
      },
      unknown: {
        background: 'background-contrast',
        global: {
          background: 'background-contrast',
        },
        toast: {
          background: 'background-front',
        },
      },
      info: {
        background: 'background-contrast',
        global: {
          background: 'background-contrast',
        },
        toast: {
          background: 'background-front',
        },
      },
      undefined: {
        background: 'background-contrast',
        global: {
          background: 'background-contrast',
        },
        toast: {
          background: 'background-front',
        },
      },
    },
    page: {
      wide: {
        width: {
          min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
          max: 'xxlarge',
        },
        xsmall: {
          pad: { horizontal: 'large' },
        },
        xlarge: {
          pad: { horizontal: 'large' },
        },
      },
      narrow: {
        width: {
          min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
          max: 'large',
        },
        xsmall: {
          pad: { horizontal: 'large' },
        },
        xlarge: {
          pad: { horizontal: 'large' },
        },
      },
      full: {
        width: {
          min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
          max: '100%',
        },
        xsmall: {
          pad: { horizontal: 'large' },
        },
        xlarge: {
          pad: { horizontal: 'large' },
        },
      },
    },
    pageHeader: {
      responsive: {
        breakpoints: ['xsmall', 'small'],
      },
      subtitle: {
        size: 'xlarge',
      },
      xsmall: {
        areas: [
          ['parent', 'parent'],
          ['title', 'actions'],
          ['subtitle', 'actions'],
        ],
        columns: [['small', 'flex'], 'auto'],
        rows: ['auto', 'auto', 'auto'],
        gap: { row: 'xsmall', column: 'medium' },
      },
      xlarge: {
        areas: [
          ['parent', 'parent'],
          ['title', 'actions'],
          ['subtitle', 'actions'],
        ],
        columns: [['medium', 'large'], 'auto'],
        rows: ['auto', 'auto', 'auto'],
        gap: { row: 'xsmall', column: 'large' },
      },
    },
    pagination: {
      button: {
        border: {
          radius: '2em',
        },
        font: {
          weight: 600,
        },
        active: {
          border: {
            radius: '2em',
          },
          color: 'text-strong',
          font: {
            weight: 600,
          },
        },
        disabled: {
          color: 'text-xweak',
        },
      },
    },
    paragraph: {
      xsmall: {
        size: large.hpe.text.xsmall.fontSize,
        height: large.hpe.text.xsmall.lineHeight,
        maxWidth: '25em', // TO DO
      },
      small: {
        size: large.hpe.text.small.fontSize,
        height: large.hpe.text.small.lineHeight,
        maxWidth: '25em',
      },
      medium: {
        size: large.hpe.text.medium.fontSize,
        height: large.hpe.text.medium.lineHeight,
        maxWidth: '25em',
      },
      large: {
        size: large.hpe.text.large.fontSize,
        height: large.hpe.text.large.lineHeight,
        maxWidth: '25em',
      },
      xlarge: {
        size: large.hpe.text.xlarge.fontSize,
        height: large.hpe.text.xlarge.lineHeight,
        maxWidth: '25em',
      },
      xxlarge: {
        size: large.hpe.text.xxlarge.fontSize,
        height: large.hpe.text.xxlarge.lineHeight,
        maxWidth: '25em',
      },
      // This block applies size-specific weights to paragraph to ensure
      // that as paragraph sizes get larger, the weight decreases.
      // This block can be removed once grommet theme structure is enhanced
      // to support size-specific weights.
      extend: ({ size }) => `
        ${['xxlarge'].includes(size) ? 'font-weight: 300;' : ''};
      `,
    },
    radioButton: {
      border: {
        color: 'border',
        width: 'xsmall',
      },
      check: {
        color: 'selected-background',
        background: {
          color: 'background-front',
        },
      },
      color: 'selected-background',
      container: {
        extend: ({ theme }) => `
        font-weight: 500;
        width: auto;
        padding: ${theme.global.edgeSize.xxsmall} ${theme.global.edgeSize.xsmall};
      `,
      },
      extend: ({ theme }) => `
        padding: ${theme.global.edgeSize.xxsmall} ${theme.global.edgeSize.xsmall};
      `,
      gap: 'xsmall',
      hover: {
        background: {
          color: 'background-contrast',
        },
        border: {
          color: undefined,
        },
      },
      // icons: {
      //   circle: () => (
      //     <Blank color="selected-background">
      //       <circle cx="12" cy="12" r="8" />
      //     </Blank>
      //   ),
      // },
    },
    radioButtonGroup: {
      container: {
        gap: 'none',
        margin: {
          vertical: 'xsmall',
        },
      },
    },
    rangeformField: {
      thumb: {
        color: 'brand',
      },
      track: {
        lower: {
          color: 'brand',
        },
        upper: {
          color: 'border',
        },
      },
    },
    select: {
      control: {
        extend: ({ disabled }) => css`
          ${disabled &&
          `
          opacity: 0.3;
          formField {
            cursor: default;
          }`}
        `,
      },
      emptySearchMessage: {
        container: {
          pad: option.pad,
        },
      },
      icons: {
        color: 'text',
        // down: Down,
        margin: {
          left: 'small',
          // setting right margin to 12px because on small
          // screens, Select responsive padding sizes down
          // which brings the icon too tight with edge of
          // control.
          right: '12px',
        },
        // up: Up,
      },
      options: undefined,
    },
    spinner: {
      container: {
        pad: 'none',
        color: 'brand',
        border: [
          { color: 'border-weak', side: 'all', size: 'medium' },
          { color: 'border-weak', side: 'right', size: 'medium' },
          { color: 'border-weak', side: 'top', size: 'medium' },
          { color: 'border-weak', side: 'left', size: 'medium' },
        ],
      },
    },
    starRating: {
      color: 'brand',
    },
    tab: {
      color: 'text',
      active: {
        background: undefined,
        color: 'text-strong',
        weight: 600,
      },
      hover: {
        background: 'transparent',
        color: 'text',
      },
      border: {
        side: 'bottom',
        color: 'transparent',
        size: 'medium',
        active: {
          color: 'border-selected',
        },
        disabled: {
          color: undefined,
        },
        hover: {
          color: 'border-weak',
        },
      },
      disabled: {
        color: 'text-xweak',
      },
      pad: {
        // top and bottom pad need to be defined individually, specifying
        // "vertical" only applies to top
        bottom: '9px',
        top: '9px',
        // align horizontal pad with button
        horizontal: '18px',
      },
      margin: {
        // bring the overall tabs border behind invidual tab borders
        vertical: '-1px',
        horizontal: 'none',
      },
    },
    tabs: {
      header: {
        border: {
          side: 'bottom',
          size: 'xsmall',
          color: 'border-weak',
        },
      },
      step: {
        xsmall: 1,
        xlarge: 3,
      },
    },
    table: {
      header: {
        extend: `
          > div { 
            height: 100%;
            justify-content: center;
          }
          // align onSelect checkbox to center of header cell
          label { 
            justify-content: center;
          }
        `,
      },
      body: {
        extend: ({ theme }) =>
          `
            &:hover {
              button {
                background: ${
                  theme.global.colors['background-contrast'][
                    theme.dark ? 'dark' : 'light'
                  ]
                }
              }
            }
          `,
      },
      row: {
        hover: {
          background: 'background-contrast',
        },
      },
      footer: {
        extend: `
          font-weight: 500;
        `,
      },
    },
    tag: {
      pad: {
        horizontal: 'small',
        vertical: '5px', // 5px pad + 1px border = 6px 'xsmall'
      },
      value: {
        weight: 500,
      },
    },
    text: {
      xsmall: {
        size: large.hpe.text.xsmall.fontSize,
        height: large.hpe.text.xsmall.lineHeight,
      },
      small: {
        size: large.hpe.text.small.fontSize,
        height: large.hpe.text.small.lineHeight,
      },
      medium: {
        size: large.hpe.text.medium.fontSize,
        height: large.hpe.text.medium.lineHeight,
      },
      large: {
        size: large.hpe.text.large.fontSize,
        height: large.hpe.text.large.lineHeight,
      },
      xlarge: {
        size: large.hpe.text.xlarge.fontSize,
        height: large.hpe.text.xlarge.lineHeight,
      },
      xxlarge: {
        size: large.hpe.text.xxlarge.fontSize,
        height: large.hpe.text.xxlarge.lineHeight,
      },
      '3xl': {
        size: large.hpe.text['3xl'].fontSize,
        height: large.hpe.text['3xl'].lineHeight,
      },
      '4xl': {
        size: large.hpe.text['4xl'].fontSize,
        height: large.hpe.text['4xl'].lineHeight,
      },
      '5xl': {
        size: large.hpe.text['5xl'].fontSize,
        height: large.hpe.text['5xl'].lineHeight,
      },
      '6xl': {
        size: large.hpe.text['6xl'].fontSize,
        height: large.hpe.text['6xl'].lineHeight,
      },
      // This block applies size-specific weights to text to ensure
      // that as text sizes get larger, the weight decreases.
      // This block can be removed once grommet theme structure is enhanced
      // to support size-specific weights.
      extend: ({ size }) => `
        ${
          ['xxlarge', '3xl', '4xl', '5xl', '6xl'].includes(size)
            ? 'font-weight: 300;'
            : ''
        };
      `,
    },
    textformField: {
      container: {
        extend: ({ theme }) => `
          svg {
            fill: ${
              theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
            };
            stroke: ${
              theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
            };
          }
        `,
      },
    },
    tip: {
      content: {
        background: 'background',
        border: {
          color: 'border-weak',
        },
        margin: 'xxsmall',
        elevation: 'small',
        pad: {
          vertical: 'none',
          horizontal: 'small',
        },
        round: 'xsmall',
      },
    },
    thumbsRating: {
      like: {
        color: 'brand',
      },
      dislike: {
        color: 'brand',
      },
    },
    toggleGroup: {
      button: {
        pad: {
          vertical: 'xsmall',
          horizontal: 'small',
        },
        iconOnly: {
          pad: {
            vertical: '9px',
            horizontal: '9px',
          },
        },
      },
    },
    // Theme-Designer only parameters
    name: 'HPE 1',
    rounding: 4,
    scale: 1.1,
    spacing: 24,
  });
};

export const current = buildTheme([light, dark]);
// TO DO add back "warm theme" once tokens
export const warm = buildTheme([light, dark]);
