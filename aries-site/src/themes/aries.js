/* eslint-disable max-len */
// import { hpePop } from 'grommet-theme-hpe';
import { deepMerge, deepFreeze } from 'grommet/utils';
import {
  Info,
  Down,
  Blank,
  Close,
  Up,
  Hpe,
  CircleAlert,
  Ascending,
  Descending,
  Unsorted,
} from 'grommet-icons';
import { css } from 'styled-components';
import {
  dark as localDark,
  light as localLight,
  large as localLarge,
  small as localSmall,
  global as localGlobal,
  components as localComponents,
} from 'hpe-design-tokens';

const MISSING = {
  color: 'red',
  weight: 700,
};

// TO DO should these be added as tokens?
const backgrounds = {
  'datawave-green-1':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/AdobeStock-57301038_800_0_72_RGB+19849.jpg)',
  'datawave-green-2':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/AdobeStock_222468625_800_0_72_RGB+19870.jpg)',
  'datawave-multi-1':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/AdobeStock-257301038_800_0_72_RGB+19842.jpg)',
  'datawave-multi-2':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_satin_01_800_0_72_RGB+20062.jpg)',
  'datawave-multi-3':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_satin_02_800_0_72_RGB+20061.jpg)',
  'datawave-multi-4':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_slice_01_800_0_72_RGB+20107.jpg)',
  'datawave-multi-5':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_slice_02_800_0_72_RGB+20106.jpg)',
  'datawave-multi-6':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_slice_03_800_0_72_RGB+20105.jpg)',
  'datawave-white-1':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685131_800_0_72_RGB+19858.jpg)',
  'datawave-white-2':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1278457196_800_0_72_RGB+19857.jpg)',
  'datawave-white-3':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1304863046_800_0_72_RGB+19856.jpg)',
  'datawave-white-4':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-978721396_800_0_72_RGB+19859.jpg)',
  'light-shadow-1':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685107_800_0_72_RGB+19853.jpg)',
  'light-shadow-2':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685108_800_0_72_RGB+19852.jpg)',
  'light-shadow-3':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685118_800_0_72_RGB+19854.jpg)',
  'light-shadow-4':
    'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1190757657_800_0_72_RGB+19855.jpg)',
  'orange-yellow': `linear-gradient(
        45deg,
        hsl(22deg 100% 50%) 0%,
        hsl(34deg 100% 50%) 50%,
        hsl(46deg 100% 50%) 100%
      );`,
  'purple-blue': `linear-gradient(
        45deg,
        hsl(281deg 100% 63%) 1%,
        hsl(227deg 83% 58%) 50%,
        hsl(174deg 69% 53%) 99%
      );`,
  'purple-blue-yellow': `linear-gradient(
        225deg,
        hsl(263deg 82% 55%) 0%,
        hsl(196deg 72% 53%) 25%,
        hsl(171deg 80% 63%) 50%,
        hsl(138deg 93% 68%) 75%,
        hsl(47deg 99% 50%) 100%
      );`,
  'purple-magenta-yellow': `linear-gradient(
        45deg,
        hsl(274deg 100% 50%) 0%,
        hsl(340deg 100% 50%) 50%,
        hsl(46deg 100% 50%) 100%
    );`,
};

const baseSpacing = 24;

const flattenObject = (obj, delimiter = '.', prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0 &&
      !('$value' in obj[k])
    )
      Object.assign(
        acc,
        flattenObject(
          obj[k],
          delimiter,
          !['hpe', 'color'].includes(k) ? pre + k : '',
        ),
      );
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

const access = (path, object) => {
  return path.split('.').reduce((o, i) => o[i], object);
};

const componentSizes = ['small', 'medium', 'large', 'xlarge'];
const buttonKinds = ['default', 'secondary', 'primary', 'toolbar'];
const buttonStates = ['active', 'hover', 'disabled'];

const textSizes = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
];
const buildTheme = tokens => {
  const {
    light,
    dark,
    small,
    large,
    elevationlight,
    elevationdark,
    global,
    components,
  } = tokens;

  const flatColors = flattenObject(light, '-');
  const tokenColors = {};
  Object.keys(flatColors).forEach(color => {
    if (!color.includes('elevation')) {
      const adjustedColor = color.split('-').join('.');
      tokenColors[color] = {
        light: access(`hpe.color.${adjustedColor}`, light),
        dark: access(`hpe.color.${adjustedColor}`, dark),
      };
    }
  });
  const colors = {
    // Here we're passing through all the colors from hpe-design-tokens
    ...tokenColors,
    // ---- DEPRECATED ---- //
    'accent-1': undefined,
    'accent-2': undefined,
    'accent-3': undefined,
    'accent-4': undefined,
    'neutral-1': undefined,
    'neutral-2': undefined,
    'neutral-3': undefined,
    'neutral-4': undefined,
    'neutral-5': undefined,
    'status-error': undefined,

    // ---- TO DO: Tokens do not exist, should they? ---- //
    brand: MISSING.color,
    control: MISSING.color,
    'active-text': MISSING.color,
    'disabled-text': MISSING.color, // deprecated, use text-weak instead

    'text-primary-button': components.hpe.button.primary.enabled.textColor,
    'background-cta-alternate': MISSING.color,

    // ----------- These ones we need to map manually for backwards compatibility -----------
    // ----------- with current color namespace ---------------
    'active-background': {
      dark: dark.hpe.color.background.active,
      light: light.hpe.color.background.active,
    },
    background: {
      dark: dark.hpe.color.background.default,
      light: light.hpe.color.background.default,
    },
    'background-layer-overlay': {
      dark: dark.hpe.color.background.overlay,
      light: light.hpe.color.background.overlay,
    },
    text: {
      dark: dark.hpe.color.text.default,
      light: light.hpe.color.text.default,
    },
    border: {
      dark: dark.hpe.color.border.default,
      light: light.hpe.color.border.default,
    },
    blue: {
      dark: dark.hpe.color.decorative.blue,
      light: light.hpe.color.decorative.blue,
    },
    'blue!': {
      dark: dark.hpe.color.decorative['blue!'],
      light: light.hpe.color.decorative['blue!'],
    },
    green: {
      dark: dark.hpe.color.decorative.green,
      light: light.hpe.color.decorative.green,
    },
    'green!': {
      dark: dark.hpe.color.decorative['green!'],
      light: light.hpe.color.decorative['green!'],
    },
    teal: {
      dark: dark.hpe.color.decorative.teal,
      light: light.hpe.color.decorative.teal,
    },
    'teal!': {
      dark: dark.hpe.color.decorative['teal!'],
      light: light.hpe.color.decorative['teal!'],
    },
    purple: {
      dark: dark.hpe.color.decorative.purple,
      light: light.hpe.color.decorative.purple,
    },
    'purple!': {
      dark: dark.hpe.color.decorative['purple!'],
      light: light.hpe.color.decorative['purple!'],
    },
    red: {
      dark: dark.hpe.color.decorative.red,
      light: light.hpe.color.decorative.red,
    },
    'red!': {
      dark: dark.hpe.color.decorative['red!'],
      light: light.hpe.color.decorative['red!'],
    },
    orange: {
      dark: dark.hpe.color.decorative.orange,
      light: light.hpe.color.decorative.orange,
    },
    'orange!': {
      dark: dark.hpe.color.decorative['orange!'],
      light: light.hpe.color.decorative['orange!'],
    },
    yellow: {
      dark: dark.hpe.color.decorative.yellow,
      light: light.hpe.color.decorative.yellow,
    },
    'yellow!': {
      dark: dark.hpe.color.decorative['yellow!'],
      light: light.hpe.color.decorative['yellow!'],
    },
    'graph-0': {
      light: light.hpe.color.dataVis.categorical[10],
      dark: dark.hpe.color.dataVis.categorical[10],
    },
    'graph-1': {
      light: light.hpe.color.dataVis.categorical[20],
      dark: dark.hpe.color.dataVis.categorical[20],
    },
    'graph-2': {
      light: light.hpe.color.dataVis.categorical[30],
      dark: dark.hpe.color.dataVis.categorical[30],
    },
    'graph-3': {
      light: light.hpe.color.dataVis.categorical[40],
      dark: dark.hpe.color.dataVis.categorical[40],
    },
    'graph-4': {
      light: light.hpe.color.dataVis.categorical[50],
      dark: dark.hpe.color.dataVis.categorical[50],
    },
    'graph-5': {
      light: light.hpe.color.dataVis.categorical[60],
      dark: dark.hpe.color.dataVis.categorical[60],
    },
    'graph-6': {
      light: light.hpe.color.dataVis.categorical[70],
      dark: dark.hpe.color.dataVis.categorical[70],
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
    'status-disabled': '#CCCCCC', // deprecated, does not support light and dark.hpe. use text-weak instead
    'validation-critical': {
      light: light.hpe.color.background.critical,
      dark: dark.hpe.color.background.critical,
    },
    'validation-ok': {
      light: light.hpe.color.background.ok,
      dark: dark.hpe.color.background.ok,
    },
    'validation-warning': {
      light: light.hpe.color.background.warning,
      dark: dark.hpe.color.background.critical,
    },
    icon: {
      light: light.hpe.color.icon.default,
      dark: dark.hpe.color.icon.default,
    },
    'selected-background': 'background-selected-strong-enabled',
    'selected-text': 'text-onSelectedStrong',
    placeholder: {
      light: light.hpe.color.text.placeholder,
      dark: dark.hpe.color.text.placeholder,
    },
  };

  const dimensions = {
    borderSize: {
      xsmall: large.hpe.borderWidth.xsmall,
      small: large.hpe.borderWidth.small,
      medium: large.hpe.borderWidth.medium,
      default: large.hpe.borderWidth.default,
      large: large.hpe.borderWidth.large,
      xlarge: large.hpe.borderWidth.xlarge,
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
      xxsmall: large.hpe.size.content.xxsmall,
      xsmall: large.hpe.size.content.xsmall,
      small: large.hpe.size.content.small,
      medium: large.hpe.size.content.medium,
      large: large.hpe.size.content.large,
      xlarge: large.hpe.size.content.xlarge,
      xxlarge: large.hpe.size.content.xxlarge,
      full: '100%',
    },
    breakpoints: {
      xsmall: {
        borderSize: {
          xsmall: small.hpe.borderWidth.xsmall,
          small: small.hpe.borderWidth.small,
          medium: small.hpe.borderWidth.medium,
          default: small.hpe.borderWidth.default,
          large: small.hpe.borderWidth.large,
          xlarge: small.hpe.borderWidth.xlarge,
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
          xxsmall: small.hpe.size.content.xxsmall,
          xsmall: small.hpe.size.content.xsmall,
          small: small.hpe.size.content.small,
          medium: small.hpe.size.content.medium,
          large: small.hpe.size.content.large,
          xlarge: small.hpe.size.content.xlarge,
          xxlarge: small.hpe.size.content.xxlarge,
          full: '100%',
        },
        value: global.hpe.breakpoint.xsmall,
      },
      small: {
        borderSize: {
          xsmall: small.hpe.borderWidth.xsmall,
          small: small.hpe.borderWidth.small,
          medium: small.hpe.borderWidth.medium,
          default: small.hpe.borderWidth.default,
          large: small.hpe.borderWidth.large,
          xlarge: small.hpe.borderWidth.xlarge,
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
          xxsmall: small.hpe.size.content.xxsmall,
          xsmall: small.hpe.size.content.xsmall,
          small: small.hpe.size.content.small,
          medium: small.hpe.size.content.medium,
          large: small.hpe.size.content.large,
          xlarge: small.hpe.size.content.xlarge,
          xxlarge: small.hpe.size.content.xxlarge,
          full: '100%',
        },
        value: global.hpe.breakpoint.small,
      },
      medium: {
        value: global.hpe.breakpoint.medium,
      },
      large: {
        value: global.hpe.breakpoint.large,
      },
      xlarge: {},
    },
  };

  // option button kind styles. abstracted so select.emptySearchMessage
  // can reference pad value
  const option = {
    color: components.hpe.select.option.enabled.textColor,
    border: {
      radius:
        dimensions.edgeSize[components.hpe.select.medium.option.borderRadius] ||
        components.hpe.select.medium.option.borderRadius,
      width:
        dimensions.borderSize[
          components.hpe.select.medium.option.borderWidth
        ] || components.hpe.select.medium.option.borderWidth,
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
  const mediumIconOnlyPad = {
    vertical: components.hpe.button.medium.default.iconOnly.paddingY,
    horizontal: components.hpe.button.medium.default.iconOnly.paddingX,
  };

  const anchorSizeTheme = {};
  textSizes.forEach(size => {
    anchorSizeTheme[size] = {
      color: components.hpe.anchor.default.enabled.textColor,
      textDecoration: components.hpe.anchor.default.enabled.textDecoration,
      fontWeight: components.hpe.anchor.default.enabled.fontWeight,
    };
  });

  const paragraphTheme = {};
  const textTheme = {};
  textSizes.forEach(size => {
    paragraphTheme[size] = {
      size: large.hpe.text?.[size]?.fontSize,
      height: large.hpe.text?.[size]?.lineHeight,
      maxWidth: large.hpe.paragraph?.[size]?.maxWidth,
    };
    textTheme[size] = {
      size: large.hpe.text?.[size].fontSize,
      height: large.hpe.text?.[size].lineHeight,
    };
  });

  const buttonKindTheme = {};
  buttonKinds.forEach(kind => {
    buttonKindTheme[kind] = {
      background: components.hpe.button?.[kind].enabled.background,
      border: {
        width:
          dimensions.borderSize[
            components.hpe.button.medium?.[kind].borderWidth
          ] || components.hpe.button.medium?.[kind].borderWidth,
        color: components.hpe.button?.[kind].enabled.borderColor,
        radius:
          dimensions.borderSize[
            components.hpe.button.medium?.[kind].borderRadius
          ] || components.hpe.button.medium?.[kind].borderRadius,
      },
      color: components.hpe.button?.[kind].enabled.textColor,
      font: {
        weight: components.hpe.button?.[kind].enabled.fontWeight,
      },
    };
  });

  const buttonStatesTheme = {};
  buttonStates.forEach(state => {
    buttonStatesTheme[state] = {};
    buttonKinds.forEach(kind => {
      let adjustedState = state;
      if (state === 'active') {
        adjustedState = 'selected';
        buttonStatesTheme[state][kind] = {
          background: {
            color:
              components.hpe.button?.[kind]?.[adjustedState].enabled.background,
          },
          border: {
            // Q: this token isn't correct
            color:
              components.hpe.button?.[kind]?.[adjustedState].enabled
                .borderColor,
          },
          color:
            components.hpe.button?.[kind]?.[adjustedState].enabled.textColor,
          font: {
            weight:
              components.hpe.button?.[kind]?.[adjustedState].enabled.fontWeight,
          },
        };
      } else if (kind === 'option') {
        if (state === 'active') adjustedState = 'selected';
        buttonStatesTheme[state][kind] = {
          background: {
            color:
              components.hpe.select.option?.[adjustedState].enabled.background,
          },
          border: {
            color: components.hpe.select.option?.[adjustedState].borderColor,
          },
          color: components.hpe.select.option?.[adjustedState].textColor,
        };
      } else {
        buttonStatesTheme[state][kind] = {
          background: {
            color: components.hpe.button?.[kind]?.[adjustedState].background,
          },
          border: {
            width: '',
            color: components.hpe.button?.[kind]?.[adjustedState].borderColor,
          },
          color: components.hpe.button?.[kind]?.[adjustedState].textColor,
          font: {
            weight: components.hpe.button?.[kind]?.[adjustedState].fontWeight,
          },
        };
      }
    });
  });

  const buttonSizesTheme = {};
  componentSizes.forEach(size => {
    const kindStyles = {};
    buttonKinds.forEach(kind => {
      kindStyles[kind] = {
        border: {
          radius: components.hpe.button?.[size]?.[kind].borderRadius,
        },
        pad: {
          vertical: components.hpe.button?.[size]?.[kind].paddingY,
          horizontal: components.hpe.button?.[size]?.[kind].paddingX,
        },
      };
    });
    buttonSizesTheme[size] = {
      border: {
        radius: components.hpe.button?.[size].default.borderRadius,
      },
      pad: {
        vertical: components.hpe.button?.[size].default.paddingY,
        horizontal: components.hpe.button?.[size].default.paddingX,
      },
      iconOnly: {
        pad: {
          vertical: components.hpe.button?.[size].default.iconOnly.paddingY,
          horizontal: components.hpe.button?.[size].default.iconOnly.paddingX,
        },
      },
      ...kindStyles,
    };
  });

  return deepFreeze({
    defaultMode: 'light',
    global: {
      backgrounds, // TO DO backgrounds
      ...dimensions,
      colors,
      control: {
        border: {
          radius: components.hpe.formField.medium.input.container.borderRadius,
          color: components.hpe.formField.input.container.enabled.borderColor,
        },
      },
      input: {
        font: {
          height: 'inherit',
          weight: components.hpe.formField.medium.valueText.fontWeight,
        },
        padding: {
          horizontal: components.hpe.formField.medium.input.container.paddingX,
          vertical: components.hpe.formField.medium.input.container.paddingY,
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
          &::-webkit-input-placeholder {
          font-weight: ${components.hpe.formField.medium.placeholderText.fontWeight};
        }
      
        &::-moz-placeholder {
          font-weight: ${components.hpe.formField.medium.placeholderText.fontWeight};
        }
      
        &:-ms-input-placeholder {
          font-weight: ${components.hpe.formField.medium.placeholderText.fontWeight};
        }
        `,
      },
      font: {
        family: global.hpe.fontStack.primary,
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
        size: large.hpe.text.medium.fontSize,
      },
      focus: {
        border: undefined,
      },
      active: {
        background: 'background-active',
        color: 'active-text',
      },
      drop: {
        background: components.hpe.drop.background,
        border: {
          radius:
            dimensions.edgeSize[components.hpe.drop.borderRadius] ||
            components.hpe.drop.borderRadius,
        },
        margin: components.hpe.drop.margin,
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
          small: elevationlight
            ? elevationlight.hpe.elevation.small
            : light.hpe.elevation.small,
          medium: elevationlight
            ? elevationlight.hpe.elevation.medium
            : light.hpe.elevation.medium,
          large: elevationlight
            ? elevationlight.hpe.elevation.large
            : light.hpe.elevation.large,
        },
        dark: {
          small: elevationdark
            ? elevationdark.hpe.elevation.small
            : dark.hpe.elevation.small,
          medium: elevationdark
            ? elevationdark.hpe.elevation.medium
            : dark.hpe.elevation.medium,
          large: elevationdark
            ? elevationdark.hpe.elevation.large
            : dark.hpe.elevation.large,
        },
      },
      hover: {
        background: 'background-hover',
        color: MISSING.color, // TO DO
      },
      selected: {
        background: 'background-selected-strong-enabled',
        color: 'text-onSelectedStrong',
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
        level: 4, // NOTE: in v3 all accordions were h4
        margin: { vertical: 'medium', horizontal: 'xsmall' },
      },
      hover: {
        background: 'background-hover',
        heading: {
          color: undefined,
        },
      },
      border: undefined,
      icons: {
        collapse: Up,
        expand: Down,
        color: 'text',
      },
    },
    anchor: {
      color: components.hpe.anchor.default.enabled.textColor,
      textDecoration: components.hpe.anchor.default.enabled.textDecoration,
      fontWeight: components.hpe.anchor.default.enabled.fontWeight,
      gap: components.hpe.anchor.medium.default.gapX, // TO DO not size specific
      hover: {
        textDecoration: components.hpe.anchor.default.hover.textDecoration,
      },
      size: anchorSizeTheme,
    },
    avatar: {
      size: {
        // At this point in time we hadn't standardized on component sizes, so the sizing is off
        // but these feel like the right tokens
        xsmall: components.hpe.component.xsmall.minHeight,
        small: components.hpe.component.small.minHeight, // 24px
        medium: components.hpe.component.medium.minHeight, // default 48px
        large: components.hpe.component.large.minHeight, // 72px
        xlarge: components.hpe.component.xlarge.minHeight, // 96px
        '2xl': `${baseSpacing * 5}px`, // TO DO no component size, is this a one off?
        '3xl': `${baseSpacing * 6}px`, // TO DO no component size, is this a one off?
        '4xl': `${baseSpacing * 7}px`, // TO DO no component size, is this a one off?
        '5xl': `${baseSpacing * 8}px`, // TO DO no component size, is this a one off?
      },
      text: {
        size: {
          xsmall: 'small', // TO DO no component size, is this a one off?
          // At this point in time we hadn't standardized on component sizes, so the sizing is off
          // TO DO this feels like it should be able to point to components.hpe.component.medium.fontSize, etc.
          small: 'small',
          medium: 'medium',
          large: 'large',
          xlarge: 'xlarge',
          '2xl': '3xl', // TO DO no component size, is this a one off?
          '3xl': '4xl', // TO DO no component size, is this a one off?
          '4xl': '5xl', // TO DO no component size, is this a one off?
          '5xl': '6xl', // TO DO no component size, is this a one off?
        },
      },
    },
    button: {
      intelligentPad: false,
      color: components.hpe.button.default.enabled.textColor,
      gap: components.hpe.button.medium.default.gapX,
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
        ...buttonKindTheme.primary,
        icon: <Hpe />,
        reverse: true,
        extend: '',
      },
      // TO DO add cta-alternate variant
      'cta-alternate': {
        ...buttonKindTheme.secondary,
        icon: <Hpe color="icon-brand" />,
        reverse: true,
      },
      ...buttonKindTheme,
      active: buttonStatesTheme.active,
      disabled: {
        opacity: 1,
        ...buttonStatesTheme.disabled,
      },
      selected: {
        option: {
          background: components.hpe.select.option.selected.enabled.background,
          color: components.hpe.select.option.selected.textColor,
          font: {
            weight: components.hpe.select.option.selected.enabled.fontWeight,
          },
        },
      },
      hover: {
        'cta-primary': buttonStatesTheme.hover.primary,
        'cta-alternate': {
          ...buttonStatesTheme.hover.secondary,
          extend: '', // TO DO can remove when merging, temp to override extend
        },
        ...buttonStatesTheme.hover,
      },
      size: buttonSizesTheme,
      extend: ({ active, kind, theme }) => {
        let style = '';
        if (active) {
          style += `&:hover {
            background: ${
              theme.global.colors[
                components.hpe.button[kind]?.selected?.hover?.background
              ]?.[theme.dark ? 'dark' : 'light'] ||
              components.hpe.button[kind]?.selected?.hover?.background
            };
            color: ${
              theme.global.colors[
                components.hpe.button[kind]?.selected?.hover?.textColor
              ]?.[theme.dark ? 'dark' : 'light'] ||
              components.hpe.button[kind]?.selected?.hover?.textColor
            };
          }`;
        }
        return style;
      },
    },
    calendar: {
      day: {
        extend: ({ isSelected, inRange, theme }) => {
          let style = '';
          style += 'border-radius: 2em;';
          if (isSelected) {
            style += `
              background: ${
                theme.global.colors['background-selected-strong-enabled']?.[
                  theme.dark ? 'dark' : 'light'
                ]
              };
              color: ${
                theme.global.colors['text-onSelectedStrong']?.[
                  theme.dark ? 'dark' : 'light'
                ]
              };
              font-weight: ${global.hpe.fontWeight.regular};
              &:hover {
                 background: ${
                   theme.global.colors['background-selected-strong-hover']?.[
                     theme.dark ? 'dark' : 'light'
                   ]
                 };
              }
              `;
          }
          if (inRange) {
            style += `
              background: ${
                theme.global.colors['background-selected-weak-enabled']?.[
                  theme.dark ? 'dark' : 'light'
                ]
              };
              color: ${
                theme.global.colors['text-onSelectedWeak']?.[
                  theme.dark ? 'dark' : 'light'
                ]
              };
              font-weight: ${global.hpe.fontWeight.regular};
              `;
          }
          return style;
        },
      },
      icons: {
        // next: Next,
        // previous: Previous,
      },
      small: {
        // Q: missing tokens
        fontSize: '13.6px',
        lineHeight: 1.375,
        daySize: '27.43px',
        title: {
          size: 'medium',
          weight: MISSING.weight,
          color: MISSING.color,
        },
      },
      medium: {
        fontSize: '18px',
        lineHeight: 1.45,
        daySize: '54.86px',
        title: {
          size: 'large',
          weight: global.hpe.fontWeight.regular,
          color: 'text-strong',
        },
      },
      large: {
        fontSize: '31.2px',
        lineHeight: 1.11,
        daySize: '109.71px',
        title: {
          size: 'xlarge',
          weight: MISSING.weight,
          color: MISSING.color,
        },
      },
    },
    card: {
      container: {
        background: 'background-front',
        elevation: 'medium', // v5
        // elevation: 'none', // Brand refresh change
        // Q should this have a token?
        // A yes, but we haven't filled in "motion" tokens yet
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
          elevation: 'large', // v5
        },
      },
    },
    checkBox: {
      hover: {
        border: {
          color: components.hpe.checkbox.control.hover.borderColor,
          width: components.hpe.checkbox.control.hover.borderWidth,
        },
        background: {
          color: 'transparent',
        },
        // HPE Design System guidance states that pad="none" should be applied on CheckBox
        // when its used outside of a FormField. We will apply this hover treatment in
        // those instances.
        extend: ({ disabled, pad, theme, toggle }) => css`
          ${!disabled &&
          pad === 'none' &&
          !toggle &&
          `border: 2px solid ${
            theme.global.colors[
              components.hpe.checkbox.control.hover.borderColor
            ][theme.dark ? 'dark' : 'light']
          };`}
        `, // Q: missing token for hover borderWidth? this falls into similar boat as secondary button
      },
      color: components.hpe.switch.control.handle.enabled.background,
      border: {
        color: components.hpe.checkbox.control.enabled.borderColor,
        width:
          dimensions.borderSize[
            components.hpe.checkbox.medium.control.borderWidth
          ] || components.hpe.checkbox.medium.control.borderWidth,
      },
      check: {
        radius: components.hpe.checkbox.medium.control.borderRadius,
        thickness: components.hpe.checkbox.control.hover.borderWidth,
        extend: ({ theme, checked, indeterminate }) => `
        margin-block: ${
          dimensions.borderSize[
            components.hpe.checkbox.medium.control.marginY
          ] || components.hpe.checkbox.medium.control.marginY
        }px;
        background: ${
          theme.global.colors[
            components.hpe.checkbox.control.enabled.background
          ]?.[theme.dark ? 'dark' : 'light']
        };
        background-color: ${
          checked || indeterminate
            ? theme.global.colors[
                components.hpe.checkbox.control.selected.enabled.background
              ]?.[theme.dark ? 'dark' : 'light']
            : ''
        };
        &:hover {
          background: ${
            checked || indeterminate
              ? theme.global.colors[
                  components.hpe.checkbox.control.selected.hover.background
                ]?.[theme.dark ? 'dark' : 'light']
              : theme.global.colors[
                  components.hpe.checkbox.control.hover.background
                ]?.[theme.dark ? 'dark' : 'light']
          };
        }
        ${(checked || indeterminate) && 'border: none;'}
          `,
      },
      icon: {
        extend: ({ theme }) => `stroke-width: 2px;
        stroke: ${
          theme.global.colors[
            components.hpe.checkbox.control.selected.enabled.iconColor
          ]?.[theme.dark ? 'dark' : 'light']
        }`,
      },
      // Q make sure this is 12px is small
      gap: components.hpe.checkbox.medium.gapX,
      // Q do we need a token here?
      // A good question, not sure if this a grommet-ism?
      label: {
        align: 'start',
      },
      pad: {
        vertical: components.hpe.component.medium.paddingY,
        horizontal: components.hpe.formField.medium.input.container.paddingX, // TO DO is this correct usage?
      },
      size: components.hpe.checkbox.medium.control.width, // TO DO should this token be called "size" instead?
      // Q is toggle and switch the same thing?
      // A: Yes, we can discuss if this name feels right or not.
      toggle: {
        background: components.hpe.switch.control.track.enabled.background,
        color: components.hpe.switch.control.handle.enabled.background,
        size: components.hpe.switch.medium.control.track.width,
        // TO DO need token for handle elevation
        knob: {
          extend: ({ theme, checked }) => `
             box-shadow: ${
               theme.global.elevation[theme.dark ? 'dark' : 'light'].small
             };
             border: ${
               dimensions.borderSize[
                 components.hpe.switch.medium.control.handle.borderWidth
               ]
             } solid ${
            theme.global.colors[
              components.hpe.switch.control.handle.enabled.borderColor
            ][theme.dark ? 'dark' : 'light']
          };
          width: ${components.hpe.switch.medium.control.handle.width};
          height: ${components.hpe.switch.medium.control.handle.height};
          top: 1px; // TO DO token?
          ${!checked ? 'left: 1px;' : ''} // TO DO token?
          `,
        },
        extend: ({ checked, theme }) => `
          ${
            checked &&
            `background-color: ${
              theme.global.colors[
                components.hpe.switch.control.track.selected.enabled.background
              ]?.[theme.dark ? 'dark' : 'light']
            };`
          }
           margin-block: ${
             dimensions.borderSize[
               components.hpe.switch.medium.control.track.marginY
             ] || components.hpe.switch.medium.control.track.marginY
           }px;
           border-color: ${
             theme.global.colors[
               components.hpe.switch.control.track.enabled.borderColor
             ]?.[theme.dark ? 'dark' : 'light']
           };
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
      font-weight: ${components.hpe.checkbox.medium.label.fontWeight};
      width: auto;
    };
    `,
    },
    checkBoxGroup: {
      container: {
        gap: 'none', // TO DO missing token
        margin: {
          vertical:
            components.hpe.formField.medium.input.group.container.paddingY,
        },
      },
    },
    data: {
      button: {
        kind: 'toolbar',
      },
    },
    dateInput: {
      container: {
        round: components.hpe.formField.medium.input.container.borderRadius,
      },
      icon: {
        size: 'small',
      },
    },
    dataTable: {
      body: {
        extend: ({ theme }) => `
          /* Margin and padding allow room for focus on table body */
          // TO DO missing tokens
          margin: ${theme.global.edgeSize.xxsmall} 0px;
          padding: 0px ${theme.global.edgeSize.xxsmall};
        `,
      },
      groupHeader: {
        // background: undefined,
        // border: undefined,
        // pad: undefined,
      },
      groupEnd: {
        border: { side: 'bottom', size: 'xsmall' },
      },
      header: {
        border: { side: 'bottom' },
        color: components.hpe.headerCell.enabled.textColor,
        extend: ({ column, sort, sortable, theme }) =>
          `
            ${
              sort &&
              sort.property === column &&
              `
              background: ${
                theme.global.colors['background-active'][
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
          weight: components.hpe.headerCell.fontWeight,
        },
        gap: 'none', // TO DO missing token
        hover: {
          background: {
            color: components.hpe.headerCell.hover.background,
          },
        },
        units: {
          color: components.hpe.headerCell.units.enabled.textColor, // Q: missing token
        },
      },
      icons: {
        ascending: () => <Ascending />,
        descending: () => <Descending />,
        contract: () => <Up height="medium" />,
        expand: () => <Down height="medium" />,
        sortable: () => <Unsorted />,
      },
      pinned: {
        header: {
          background: { opacity: 'strong' },
          extend: 'backdrop-filter: blur(12px);',
        },
        body: {
          background: { opacity: 'strong' },
          extend: 'backdrop-filter: blur(12px);',
        },
        footer: {
          background: { opacity: 'strong' },
          extend: 'backdrop-filter: blur(12px);',
        },
      },
      primary: {
        // Q: missing tokens
        weight: components.hpe.dataCell.primary.fontWeight,
        color: components.hpe.dataCell.primary.enabled.textColor,
      },
      resize: {
        // Q: missing tokens
        border: {
          color: 'border',
          side: 'end',
        },
        hover: {
          border: {
            color: 'border-strong',
            size: 'small',
          },
        },
      },
    },
    fileInput: {
      border: {
        // Q: confused on which token to use here formfield.medium.input.group.item.borderWidth?
        color: components.hpe.formField.input.container.enabled.borderColor,
        side: 'all',
        style: 'solid',
        size: components.hpe.formField.medium.input.container.borderWidth,
      },
      button: {
        // Q: should we point to button tokens here?
        // A: Yes, I think we should unless different values are required
        background: components.hpe.button.secondary.enabled.background,
        border: {
          // Q: is this the correct value?
          // A: yes
          radius: components.hpe.button.medium.secondary.borderRadius,
        },
        pad: {
          vertical: components.hpe.button.medium.secondary.paddingY,
          horizontal: components.hpe.button.medium.secondary.paddingX,
        },
        color: components.hpe.button.secondary.enabled.textColor,
        font: {
          weight: components.hpe.button.secondary.enabled.fontWeight,
        },
        hover: {
          background: components.hpe.button.secondary.hover.background,
          color: components.hpe.button.secondary.hover.textColor,
        },
      },
      dragOver: {
        background: MISSING.color,
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
      label: {
        margin: 'small',
      },
      message: {
        color: 'placeholder',
        margin: 'small',
      },
      pad: { horizontal: 'xsmall' },
      extend: `border-radius: ${components.hpe.formField.medium.input.container.borderRadius};`,
    },
    formField: {
      content: {
        // Q: missing tokens
        margin: { vertical: 'xsmall' },
        pad: 'none',
      },
      border: {
        error: {
          color:
            components.hpe.formField.input.container.status.critical
              .borderColor,
        },
        color: components.hpe.formField.input.container.enabled.borderColor,
        side: 'all',
      },
      // checkBox: {
      //   pad: 'large',
      // },
      disabled: {
        background:
          components.hpe.formField.input.group.container.disabled.background,
        border: {
          color: components.hpe.formField.input.container.disabled.borderColor,
        },
        label: {
          color: components.hpe.formField.labelText.disabled.textColor,
        },
      },
      error: {
        background: {
          color:
            components.hpe.formField.input.container.status.critical.background,
        },
        container: {
          gap: 'xsmall', // Q: missing token
        },
        icon: (
          <CircleAlert size="small" color={light.hpe.color.icon.critical} />
        ), // TO DO need to handle modes
        size: 'xsmall', // Q: missing token
        // Q: confused why we have both hpe.formField.errorText.enabled.textColor
        // and hpe.formField.errorText.disabled.color
        // A: This is to be able to style text differently in different states
        color: components.hpe.formField.errorText.enabled.textColor,
        margin: {
          // Q: missing token
          bottom: 'xsmall',
          top: 'none',
          horizontal: 'none',
        },
      },
      focus: {
        background: undefined, // TO DO missing token
        border: {
          color: 'border-strong', // Q: missing token
        },
      },
      help: {
        size: 'xsmall',
        color: components.hpe.formField.helpText.enabled.color,
        margin: 'none', // TO DO missing token
      },
      info: {
        size: 'xsmall',
        color: components.hpe.formField.infoText.enabled.color,
        margin: {
          // Q: missing token
          bottom: 'xsmall',
          top: 'none',
          horizontal: 'none',
        },
      },
      label: {
        size: 'xsmall', // TO DO how to capture this as token, currently we have "fontSize", "lineHeight", "..."
        color: components.hpe.formField.labelText.enabled.color,
        margin: {
          // Q: missing token
          bottom: 'none',
          top: 'xsmall',
          horizontal: 'none',
        },
        requiredIndicator: true,
        weight: components.hpe.formField.medium.labelText.fontWeight,
      },
      margin: {
        bottom: 'none', // TO DO missing token
      },
      round: components.hpe.formField.medium.input.container.borderRadius,
      // TO DO no tokens
      survey: {
        label: {
          margin: { bottom: 'none' },
          size: 'medium',
          weight: MISSING.weight,
        },
      },
    },
    heading: {
      color: 'heading',
      weight: large.hpe.heading.xlarge.fontWeight, // Q: not sure what token to point to here
      level: {
        1: {
          font: {
            weight: large.hpe.heading.xlarge.fontWeight,
          },
          small: {
            // Q: are these the correct tokens to use? the value is correct but the name seems off
            // TO DO this value is off because we didn't have the same typography system before
            size: large.hpe.heading.large.fontSize,
            height: large.hpe.heading.large.lineHeight,
          },
          medium: {
            size: large.hpe.heading.xlarge.fontSize,
            height: large.hpe.heading.xlarge.lineHeight,
          },
          large: {
            // Q: missing tokens
            size: '48px',
            height: '48px',
          },
          xlarge: {
            // Q: missing tokens
            size: '60px',
            height: '60px',
          },
        },
        2: {
          font: {
            // Q: not sure what token to point to here
            // A: "large" is the default size for h2, so we'll point to that
            weight: large.hpe.heading.large.fontWeight,
          },
          small: {
            size: large.hpe.heading.medium.fontSize,
            height: large.hpe.heading.medium.lineHeight,
          },
          medium: {
            size: large.hpe.heading.large.fontSize,
            height: large.hpe.heading.large.lineHeight,
          },
          large: {
            size: large.hpe.heading.xlarge.fontSize,
            height: large.hpe.heading.xlarge.lineHeight,
          },
          xlarge: {
            // Q: missing tokens
            size: '48px',
            height: '48px',
          },
        },
        3: {
          font: {
            // Q: not sure what token to point to here
            weight: large.hpe.heading.medium.fontWeight,
          },
          small: {
            size: large.hpe.heading.small.fontSize,
            height: large.hpe.heading.small.lineHeight,
          },
          medium: {
            size: large.hpe.heading.medium.fontSize,
            height: large.hpe.heading.medium.lineHeight,
          },
          large: {
            size: large.hpe.heading.large.fontSize,
            height: large.hpe.heading.large.lineHeight,
          },
          xlarge: {
            size: large.hpe.heading.xlarge.fontSize,
            height: large.hpe.heading.xlarge.lineHeight,
          },
        },
        4: {
          font: {
            // Q: not sure what token to point to here
            weight: large.hpe.heading.small.fontWeight,
          },
          small: {
            size: large.hpe.heading.xsmall.fontSize,
            height: large.hpe.heading.xsmall.lineHeight,
          },
          medium: {
            size: large.hpe.heading.small.fontSize,
            height: large.hpe.heading.small.lineHeight,
          },
          large: {
            size: large.hpe.heading.medium.fontSize,
            height: large.hpe.heading.medium.lineHeight,
          },
          xlarge: {
            size: large.hpe.heading.large.fontSize,
            height: large.hpe.heading.large.lineHeight,
          },
        },
        5: {
          font: {
            // Q: not sure what token to point to here
            weight: large.hpe.heading.xsmall.fontWeight,
          },
          small: {
            size: large.hpe.heading.xxsmall.fontSize,
            height: large.hpe.heading.xxsmall.lineHeight,
          },
          medium: {
            size: large.hpe.heading.xsmall.fontSize,
            height: large.hpe.heading.xsmall.lineHeight,
          },
          large: {
            size: large.hpe.heading.small.fontSize,
            height: large.hpe.heading.small.lineHeight,
          },
          xlarge: {
            size: large.hpe.heading.medium.fontSize,
            height: large.hpe.heading.medium.lineHeight,
          },
        },
        6: {
          font: {
            // Q: not sure what token to point to here
            weight: large.hpe.heading.xxsmall.fontWeight,
          },
          small: {
            size: large.hpe.heading.xxsmall.fontSize,
            height: large.hpe.heading.xxsmall.lineHeight,
          },
          medium: {
            size: large.hpe.heading.xxsmall.fontSize,
            height: large.hpe.heading.xxsmall.lineHeight,
          },
          large: {
            size: large.hpe.heading.small.fontSize,
            height: large.hpe.heading.small.lineHeight,
          },
          xlarge: {
            size: large.hpe.heading.medium.fontSize,
            height: large.hpe.heading.medium.lineHeight,
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
          fontWeight = `font-weight: ${large.hpe.heading.small.fontWeight};`;
          // undefined necessary so an h4 without size prop explicitly defined
          // still renders as weight 600
        } else if (
          level === 4 &&
          ['small', 'medium', undefined].includes(size)
        ) {
          fontWeight = `font-weight: ${large.hpe.heading.small.fontWeight};`;
        } else if (level === 5 && size === 'xlarge') {
          fontWeight = `font-weight: ${large.hpe.heading.small.fontWeight};`;
        }
        return fontWeight;
      },
    },
    icon: {
      disableScaleDown: true,
      matchSize: true, // NOTE: Disabled this since concept didn't exist in v3
      size: {
        small: large.hpe.size.icon.small,
        medium: large.hpe.size.icon.medium,
        large: large.hpe.size.icon.large,
        xlarge: large.hpe.size.icon.xlarge,
        xxlarge: large.hpe.size.icon.xxlarge,
      },
    },
    layer: {
      background: 'background-floating',
      border: {
        radius: 'small', // TO DO no specific semantic token
        intelligentRounding: true,
      },
      container: {
        elevation: 'large', // TO DO no specific semantic token
      },
      overlay: {
        background: 'background-layer-overlay',
      },
      /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
       * at a z-index of 101. This adjustment allows for Layer modals and side-drawers
       * to sit atop the Global header. */
      zIndex: '110', // TO DO no token
    },
    list: {
      container: {
        // any box props
        gap: 'xsmall',
        // extend: undefined,
      },
      item: {
        border: undefined,
        disabled: {
          color: 'text-disabled',
          cursor: 'default',
        },
        pinned: {
          background: 'background-active', // TO DO need a semantic token for the "light grey" selected state
          icon: {
            pad: mediumIconOnlyPad,
          },
        },
      },
    },
    maskedInput: {
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
        // Q should be tokenized?
        // A: Not sure, this sort of feels like a grommet-ism
        align: {
          top: 'bottom',
          left: 'left',
        },
      },
      group: {
        container: {
          pad: {
            vertical: components.hpe.menu.medium.group.container.paddingY,
          },
        },
        separator: {
          color: components.hpe.menu.group.separator.background,
          size: components.hpe.menu.medium.group.separator.height,
          pad: 'none', // TO DO no token
        },
      },
      icons: {
        color: components.hpe.menu.item.enabled.iconColor,
        down: Down,
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
        // TO DO would need to manually adjust, semantic tokens were too generic
        // should we have a `text-emphasis` and `weight-emphasis` ?
        color: 'text-strong',
        weight: global.hpe.fontWeight.medium,
      },
    },
    notification: {
      close: {
        icon: Close,
      },
      container: {
        round: 'xsmall',
      },
      direction: 'row',
      global: {
        direction: 'row',
        container: {
          round: 'none',
        },
      },
      message: {
        color: 'text-onStatus',
      },
      title: {
        // any text props
        color: 'text-strong',
        weight: global.hpe.fontWeight.medium,
      },
      critical: {
        background: 'background-critical',
        global: {
          background: 'background-critical',
        },
        toast: {
          background: 'background-front',
        },
      },
      warning: {
        background: 'background-warning',
        global: {
          background: 'background-warning',
        },
        toast: {
          background: 'background-front',
        },
      },
      normal: {
        background: 'background-ok',
        global: {
          background: 'background-ok',
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
        background: 'background-info',
        global: {
          background: 'background-info',
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
      // title: {
      //   size: undefined,
      // },
      subtitle: {
        size: 'large',
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
        color: components.hpe.button.default.enabled.textColor,
        border: {
          radius: components.hpe.button.medium.default.borderRadius,
        },
        font: {
          weight: components.hpe.button.default.enabled.fontWeight,
        },
        active: {
          background: components.hpe.button.default.selected.enabled.background,
          border: {
            radius: components.hpe.button.medium.default.borderRadius,
          },
          color: components.hpe.button.default.selected.enabled.textColor,
          font: {
            weight: components.hpe.button.default.selected.enabled.fontWeight,
          },
        },
        hover: {
          background: components.hpe.button.default.hover.background,
          border: {
            radius: components.hpe.button.medium.default.borderRadius,
          },
          color: components.hpe.button.default.hover.textColor,
          font: {
            weight: components.hpe.button.default.hover.fontWeight,
          },
        },
        disabled: {
          background: components.hpe.button.default.disabled.background,
          border: {
            radius: components.hpe.button.medium.default.borderRadius,
          },
          color: components.hpe.button.default.disabled.textColor,
          font: {
            weight: components.hpe.button.default.disabled.fontWeight,
          },
        },
        size: {
          small: {
            border: {
              radius: components.hpe.button.small.default.borderRadius,
              width:
                dimensions.borderSize[
                  components.hpe.button.small.default.borderWidth
                ] || components.hpe.button.small.default.borderWidth,
            },
            pad: {
              vertical: '4px',
              horizontal: '4px',
            },
            font: {
              size: components.hpe.component.small.fontSize,
              height: components.hpe.component.small.lineHeight,
            },
            height: components.hpe.component.small.minHeight,
            width: components.hpe.component.small.minHeight,
          },
          medium: {
            border: {
              radius: components.hpe.button.medium.default.borderRadius,
              width:
                dimensions.borderSize[
                  components.hpe.button.medium.default.borderWidth
                ] || components.hpe.button.medium.default.borderWidth,
            },
            pad: {
              vertical: '4px',
              horizontal: '4px',
            },
            font: {
              size: components.hpe.component.medium.fontSize,
              height: components.hpe.component.medium.lineHeight,
            },
            height: components.hpe.component.medium.minHeight,
            width: components.hpe.component.medium.minHeight,
          },
          large: {
            border: {
              radius: components.hpe.button.large.default.borderRadius,
              width:
                dimensions.borderSize[
                  components.hpe.button.large.default.borderWidth
                ] || components.hpe.button.large.default.borderWidth,
            },
            pad: {
              vertical: '4px',
              horizontal: '4px',
            },
            font: {
              size: components.hpe.component.large.fontSize,
              height: components.hpe.component.large.lineHeight,
            },
            height: components.hpe.component.large.minHeight,
            width: components.hpe.component.large.minHeight,
          },
        },
      },
    },
    paragraph: {
      // TO DO this is enabling more than xxlarge
      ...paragraphTheme,
      // This block applies size-specific weights to paragraph to ensure
      // that as paragraph sizes get larger, the weight decreases.
      // This block can be removed once grommet theme structure is enhanced
      // to support size-specific weights.
      extend: ({ size }) => `
        ${
          ['xxlarge'].includes(size)
            ? `font-weight: ${large.hpe.text[size].fontWeight};`
            : ''
        };
      `,
    },
    radioButton: {
      border: {
        color: components.hpe.radioButton.control.enabled.borderColor,
        width: components.hpe.radioButton.medium.control.borderWidth, // TO DO want this narrower when not checked
      },
      color: components.hpe.radioButton.control.selected.enabled.borderColor,
      container: {
        extend: ({ theme }) => `
        width: auto;
        padding-inline: ${
          components.hpe.formField.medium.input.group.item.paddingX
        };
        &:has(input[checked]) {
          background: ${
            // TO DO how to only do in FormField
            theme.global.colors['background-selected-weak-enabled'][
              theme.dark ? 'dark' : 'light'
            ]
          };
        }
      `,
      },
      extend: () => `
        padding-block: ${components.hpe.formField.medium.input.group.item.paddingY};
      `,
      gap: components.hpe.radioButton.medium.gapX,
      hover: {
        background: {
          color: components.hpe.formField.input.group.item.hover.background,
        },
        border: {
          color: components.hpe.radioButton.control.hover.borderColor,
        },
      },
      size: components.hpe.radioButton.medium.control.height,
      font: {
        weight: components.hpe.radioButton.medium.label.fontWeight,
      },
      icons: {
        circle: () => (
          <Blank
            color={
              components.hpe.radioButton.control.selected.enabled.iconColor
            }
          >
            <circle cx="12" cy="12" r="6" />
          </Blank>
        ),
      },
    },
    radioButtonGroup: {
      container: {
        gap: 'none', // TO DO should be token?
        margin: {
          vertical:
            components.hpe.formField.medium.input.group.container.paddingY,
        },
      },
    },
    rangeInput: {
      thumb: {
        color: 'background-primary-default', // Should this instead be "control"?
      },
      track: {
        lower: {
          // TO DO is this the right token for here?
          color: 'background-primary-default',
        },
        upper: {
          color: 'border',
        },
      },
    },
    select: {
      control: {
        // TO DO should this use input tokens?
        // or should we have a select.control tokens?
        extend: ({ disabled }) => css`
          ${disabled &&
          `
          opacity: 0.3;
          input {
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
        color: 'icon',
        down: Down,
        // this was not in token
        margin: {
          left: 'small',
          // setting right margin to 12px because on small
          // screens, Select responsive padding sizes down
          // which brings the icon too tight with edge of
          // control.
          right: '12px',
        },
        up: Up,
      },
      options: undefined,
    },
    spinner: {
      container: {
        pad: 'none', // Should we have universal token here for none?
        color: 'background-primary-default', // Is this the right token for here?
        // tokens?
        border: [
          { color: 'border-weak', side: 'all', size: 'medium' },
          { color: 'border-weak', side: 'right', size: 'medium' },
          { color: 'border-weak', side: 'top', size: 'medium' },
          { color: 'border-weak', side: 'left', size: 'medium' },
        ],
      },
      size: {
        xsmall: components.hpe.component.xsmall.minHeight,
        small: components.hpe.component.small.minHeight, // TO DO should these align? this was before we standardized on component sizes
        medium: components.hpe.component.medium.minHeight,
        large: components.hpe.component.large.minHeight,
        xlarge: components.hpe.component.xlarge.minHeight,
      },
    },
    starRating: {
      color: 'background-selected-strong-enabled',
    },
    tab: {
      color: 'text',
      active: {
        background: 'background-selected-strong-enabled',
        color: 'text-onSelectedStrong',
        weight: 500,
      },
      hover: {
        background: 'transparent',
        color: 'text',
      },
      border: {
        side: 'all',
        color: 'transparent',
        size:
          dimensions[components.hpe.component.medium.borderWidth] ||
          components.hpe.component.medium.borderWidth,
        active: {
          color: 'transparent',
        },
        disabled: {
          color: undefined,
        },
        hover: {
          color: undefined,
        },
      },
      disabled: {
        background: 'background-disabled',
        color: 'text-disabled',
      },
      pad: {
        bottom: components.hpe.component.medium.paddingY,
        top: components.hpe.component.medium.paddingY,
        horizontal: components.hpe.component.medium?.paddingX?.wide,
      },
      margin: {
        vertical: 'none',
        horizontal: 'none',
      },
      extend: () => 'border-radius: 2em;',
    },
    tabs: {
      header: {
        background: 'rgba(0, 0, 0, 0.02)', // TO DO not a color from palette
        border: undefined,
        extend: ({ theme }) => `
          border-radius: 2em; 
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08) inset;
          & button[aria-selected="true"] > div {
           box-shadow: ${
             theme.global.elevation?.[theme.dark ? 'dark' : 'light'].medium
           }; 
          }
          & button[aria-selected="true"]:hover > div {
            background: ${
              theme.global.colors['background-selected-strong-hover'][
                theme.dark ? 'dark' : 'light'
              ]
            };
            color: ${
              theme.global.colors['text-onSelectedStrong'][
                theme.dark ? 'dark' : 'light'
              ]
            };
          }
        `,
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
        pad: {
          top: components.hpe.dataCell.paddingTop,
          bottom: components.hpe.dataCell.paddingBottom,
          horizontal: components.hpe.dataCell.paddingX,
        },
        border: {
          side: 'bottom', // TO DO this causes issues on the last row with the footer border
          color: components.hpe.dataCell.enabled.borderColor,
        },
        extend: ({ theme }) =>
          `
            &:hover {
              button {
                background: ${
                  theme.global.colors['background-hover'][
                    theme.dark ? 'dark' : 'light'
                  ]
                };
              }
            }
          `,
      },
      row: {
        hover: {
          background: 'background-hover',
        },
      },
      footer: {
        extend: `
          font-weight: ${MISSING.weight};
        `,
      },
    },
    // use extend for border to use box shadow
    // TO DO NOTE: Tag dimensions are off because there was a bug in Tag in 3.1.0
    tag: {
      border: {
        color: 'border-weak',
      },
      // icons: {
      //   remove: Close,
      // },
      pad: {
        // Q: should we be using t-shirt sizes from tokens
        // A: No this is correct because this points to "small" which is already built w tokens
        // but it does highlight a gap of something we couldn't automatically update
        horizontal: 'small',
        vertical: components.hpe.component.medium.paddingY, // 5px pad + 1px border = 6px 'xsmall'
      },
      value: {
        // Q should this be a token?
        // A: Good question..similar to other areas, we might want a weight.emphasis or something
        // weight: MISSING.weight, // TO DO
        weight: global.hpe.fontWeight.medium,
      },
      round: 'xsmall',
      // size: {
      // TO DO NEED MEDIUM AS DEFAULT SIZE
      //   medium: {
      //     icon: {
      //       size: 'small',
      //     },
      //   },
      // },
    },
    text: {
      ...textTheme,
      extend: '', // TO DO can remove once merging, needed to override current extend
    },
    textInput: {
      container: {
        extend: ({ theme }) => `
          svg {
            fill: ${
              theme.global.colors['icon-strong'][theme.dark ? 'dark' : 'light']
            };
            stroke: ${
              theme.global.colors['icon-strong'][theme.dark ? 'dark' : 'light']
            };
          }
        `,
      },
    },
    tip: {
      content: {
        background: 'background-floating',
        border: {
          color: 'border-weak', // TO DO this isn't specific enough to update automatically in future
        },
        margin: 'xxsmall',
        elevation: 'small', // TO DO this isn't specific enough to update automatically in future
        pad: {
          vertical: 'none',
          horizontal: 'small',
        },
        round: components.hpe.drop.borderRadius,
      },
    },
    thumbsRating: {
      like: {
        color: 'background-selected-strong-enabled',
      },
      dislike: {
        color: 'background-selected-strong-enabled',
      },
    },
    // TO DO need way to style background color
    toggleGroup: {
      button: {
        pad: {
          // these are fine since it is built with buttons
          vertical: '6px',
          horizontal: '12px',
        },
        iconOnly: {
          // Q this will be a token?
          pad: {
            vertical: parseInt(mediumIconOnlyPad, 10),
            horizontal: parseInt(mediumIconOnlyPad, 10),
          },
        },
      },
      container: {
        border: {
          color: components.hpe.button.toolbar.enabled.borderColor,
          size: components.hpe.button.medium.toolbar.borderWidth,
        },
      },
      divider: {
        color: 'transparent',
      },
    },
    buttonGroup: {
      gap: 'small',
    },
    // Theme-Designer only parameters
    name: 'HPE 1',
    rounding: 4,
    scale: 1.1,
    spacing: 24,
  });
};

export const aries = buildTheme({
  light: localLight,
  dark: localDark,
  small: localSmall,
  large: localLarge,
  global: localGlobal,
  components: localComponents,
});

export const ariesPop = deepMerge(aries, {
  // TEMP Adding here
  heading: {
    color: 'text-strong',
    weight: 400,
    level: {
      1: {
        font: {
          weight: 400,
        },
        small: {
          size: '48px',
          height: '48px',
        },
        medium: {
          size: '72px',
          height: '72px',
        },
        large: {
          size: '96px',
          height: '96px',
        },
        xlarge: {
          size: '120px',
          height: '120px',
        },
      },
      2: {
        small: {
          size: '36px',
          height: '36px',
        },
        medium: {
          size: '48px',
          height: '48px',
        },
        large: {
          size: '72px',
          height: '72px',
        },
        xlarge: {
          size: '96px',
          height: '96px',
        },
      },
      3: {
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
          size: '72px',
          height: '72px',
        },
      },
      4: {
        font: {
          weight: 500,
        },
        small: {
          size: '18px',
          height: '18px',
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
      5: {
        font: {
          weight: 500,
        },
        small: {
          size: '16px',
          height: '16px',
        },
        medium: {
          size: '18px',
          height: '18px',
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
      6: {
        font: {
          weight: 500,
        },
        small: {
          size: '14px',
          height: '14px',
        },
        medium: {
          size: '16px',
          height: '16px',
        },
        large: {
          size: '18px',
          height: '18px',
        },
        xlarge: {
          size: '24px',
          height: '24px',
        },
      },
    },
    extend: '', // TO DO ask about marketing weights
  },
  paragraph: {
    small: {
      size: '16px',
      height: '20px',
    },
    medium: {
      size: '18px',
      height: '22px',
    },
    large: {
      size: '24px',
      height: '30px',
    },
    xlarge: {
      size: '36px',
      height: '42px',
    },
    xxlarge: {
      size: '42px',
      height: '48px',
    },
    extend: '', // TO DO ask about marketing weights
  },
  text: {
    xsmall: {
      // weight needs to be modified at the size level
      size: '14px',
      height: '18px',
    },
    small: {
      // weight needs to be modified at the size level
      size: '16px',
      height: '20px',
    },
    medium: {
      // weight needs to be modified at the size level
      size: '18px',
      height: '22px',
    },
    large: {
      // weight needs to be modified at the size level by bumping down to 300
      size: '24px',
      height: '30px',
    },
    xlarge: {
      // weight needs to be modified at the size level by bumping down to 300
      size: '36px',
      height: '42px',
    },
    // xxlarge is not part of Chris's type exploration
    xxlarge: {
      // weight needs to be modified at the size level by bumping down to 300
      size: '42px',
      height: '48px',
    },
    extend: '', // TO DO ask about marketing weights
  },
  // anchor: {
  //   // rely on base anchor styling to meet color contrast on background-back
  //   size: {
  //     large: undefined,
  //     xlarge: undefined,
  //   },
  // },
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
