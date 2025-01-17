import { css } from 'styled-components';
import {
  deepFreeze,
  // deepMerge
} from 'grommet/utils';
import {
  dark as localDark,
  light as localLight,
  medium as localMedium,
  small as localSmall,
  global as localGlobal,
  components as localComponents,
} from 'hpe-design-tokens/grommet';
import {
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
// import { hpe } from 'grommet-theme-hpe';

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

const componentSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const buttonKinds = ['default', 'secondary', 'primary', 'toolbar'];
const buttonStates = ['hover', 'active', 'disabled'];

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

  const sd4 = 'valueText' in components.hpe.formField.medium ? false : true;

  const flatColors = flattenObject(light, '-');
  const tokenColors = {};
  Object.keys(flatColors).forEach(color => {
    if (!color.includes('shadow')) {
      const [category] = color.split('-');
      const flatName = color.split('-').slice(1).join('-');
      tokenColors[color] = {
        light: access(
          `hpe.color.${category}${flatName ? `.${flatName}` : ''}`,
          light,
        ),
        dark: access(
          `hpe.color.${category}${flatName ? `.${flatName}` : ''}`,
          dark,
        ),
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

    control: 'background-primary-strong',
    'active-text': 'text-strong',
    'text-primary-button': components.hpe.button.primary.rest.textColor,
    'background-cta-alternate': 'background-contrast',

    // ----------- These ones we need to map manually for backwards compatibility -----------
    // ----------- with current color namespace ---------------
    brand: {
      dark: dark.hpe.color.decorative.brand,
      light: light.hpe.color.decorative.brand,
    },
    'background-layer-overlay': {
      dark: dark.hpe.color.background.screenOverlay,
      light: light.hpe.color.background.screenOverlay,
    },
    'active-background': {
      dark: dark.hpe.color.background.active,
      light: light.hpe.color.background.active,
    },
    background: {
      dark: dark.hpe.color.background.default,
      light: light.hpe.color.background.default,
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
      light: light.hpe.color.dataVis['categorical-10'],
      dark: dark.hpe.color.dataVis['categorical-10'],
    },
    'graph-1': {
      light: light.hpe.color.dataVis['categorical-20'],
      dark: dark.hpe.color.dataVis['categorical-20'],
    },
    'graph-2': {
      light: light.hpe.color.dataVis['categorical-30'],
      dark: dark.hpe.color.dataVis['categorical-30'],
    },
    'graph-3': {
      light: light.hpe.color.dataVis['categorical-40'],
      dark: dark.hpe.color.dataVis['categorical-40'],
    },
    'graph-4': {
      light: light.hpe.color.dataVis['categorical-50'],
      dark: dark.hpe.color.dataVis['categorical-50'],
    },
    'graph-5': {
      light: light.hpe.color.dataVis['categorical-60'],
      dark: dark.hpe.color.dataVis['categorical-60'],
    },
    'graph-6': {
      light: light.hpe.color.dataVis['categorical-70'],
      dark: dark.hpe.color.dataVis['categorical-70'],
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
    'selected-text': 'text-onSelectedPrimaryStrong',
    placeholder: {
      light: light.hpe.color.text.placeholder,
      dark: dark.hpe.color.text.placeholder,
    },
    'disabled-text': 'text-disabled', // deprecate
  };

  const containerTokens = 'container' in large.hpe.size;
  const size = breakpoint => ({
    xxsmall: containerTokens
      ? breakpoint.hpe.size.container.xxsmall
      : breakpoint.hpe.size.content.xxsmall,
    xsmall: containerTokens
      ? breakpoint.hpe.size.container.xsmall
      : breakpoint.hpe.size.content.xsmall,
    small: containerTokens
      ? breakpoint.hpe.size.container.small
      : breakpoint.hpe.size.content.small,
    medium: containerTokens
      ? breakpoint.hpe.size.container.medium
      : breakpoint.hpe.size.content.medium,
    large: containerTokens
      ? breakpoint.hpe.size.container.large
      : breakpoint.hpe.size.content.large,
    xlarge: containerTokens
      ? breakpoint.hpe.size.container.xlarge
      : breakpoint.hpe.size.content.xlarge,
    xxlarge: containerTokens
      ? breakpoint.hpe.size.container.xxlarge
      : breakpoint.hpe.size.content.xxlarge,
    full: '100%',
  });

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
    size: size(large),
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
        size: size(small),
        value: parseInt(global.hpe.breakpoint.xsmall, 10),
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
        size: size(small),
        value: parseInt(global.hpe.breakpoint.small, 10),
      },
      medium: {
        value: parseInt(global.hpe.breakpoint.medium, 10),
      },
      large: {
        value: parseInt(global.hpe.breakpoint.large, 10),
      },
      xlarge: {},
    },
  };

  // option button kind styles. abstracted so select.emptySearchMessage
  // can reference pad value
  const option = {
    color: components.hpe.select.option.rest.textColor,
    border: {
      radius:
        dimensions.edgeSize[components.hpe.select.medium.option.borderRadius] ||
        components.hpe.select.medium.option.borderRadius,
      width:
        dimensions.borderSize[
          components.hpe.select.medium.option.borderWidth
        ] || components.hpe.select.medium.option.borderWidth,
      color: components.hpe.select.option.rest.borderColor,
    },
    pad: {
      horizontal: components.hpe.select.medium.option.paddingX,
      vertical: components.hpe.select.medium.option.paddingY,
    },
    font: {
      weight: components.hpe.select.option.rest.fontWeight,
    },
  };

  // This means the theme is structure pre switch of button.size.kind --> button.kind.size
  const oldTheme =
    components.hpe.button.medium && 'default' in components.hpe.button.medium
      ? true
      : false;

  // abstracted so button and pinned list icon can reference
  const mediumIconOnlyPad = {
    vertical: oldTheme
      ? components.hpe.button.medium.default.iconOnly.paddingY
      : components.hpe.button.default.medium.iconOnly.paddingY,
    horizontal: oldTheme
      ? components.hpe.button.medium.default.iconOnly.paddingX
      : components.hpe.button.default.medium.iconOnly.paddingY,
  };

  const anchorSizeTheme = {};
  textSizes.forEach(sizeArg => {
    const size = sizeArg === '6xl' ? '5xl' : sizeArg;
    anchorSizeTheme[size] = {
      color: components.hpe.anchor.default.rest.textColor,
      textDecoration: components.hpe.anchor.default.rest.textDecoration,
      fontWeight: components.hpe.anchor.default.rest.fontWeight,
    };
  });

  const paragraphTheme = {};
  const textTheme = {};
  const fontWeights = {};
  // Keep track of the largest text size to use as a fallback
  // because grommet theme has a max size of 6xl, but design tokens
  // only supports up to 5xl.
  const fallback = {
    size: '0rem',
    height: '0rem',
    maxWidth: '0rem',
    weight: 0,
  };
  textSizes.forEach(size => {
    if (
      parseInt(large.hpe.text?.[size]?.fontSize.replace('rem', ''), 10) >
      parseInt(fallback.size.replace('rem', ''), 10)
    ) {
      fallback.size = large.hpe.text?.[size]?.fontSize;
      fallback.height = large.hpe.text?.[size]?.lineHeight;
      fallback.maxWidth = large.hpe.text?.[size]?.maxWidth;
      fallback.weight = large.hpe.text?.[size]?.fontWeight;
    }
    paragraphTheme[size] = {
      size: large.hpe.text?.[size]?.fontSize || fallback.size,
      height: large.hpe.text?.[size]?.lineHeight || fallback.height,
      maxWidth: large.hpe.text?.[size]?.maxWidth || fallback.maxWidth,
    };
    textTheme[size] = {
      size: large.hpe.text?.[size]?.fontSize || fallback.size,
      height: large.hpe.text?.[size]?.lineHeight || fallback.height,
    };
    fontWeights[size] = large.hpe.text?.[size]?.fontWeight || fallback.weight;
  });

  textTheme.extend = ({ size }) => {
    return `font-weight: ${fontWeights[size]};`;
  };

  paragraphTheme.extend = ({ size }) => {
    return `font-weight: ${fontWeights[size]};`;
  };

  const buttonKindTheme = {};
  buttonKinds.forEach(kind => {
    const borderWidth = oldTheme
      ? components.hpe.button.medium?.[kind].borderWidth
      : components.hpe.button[kind]?.medium.borderWidth;
    const borderRadius = oldTheme
      ? components.hpe.button.medium?.[kind].borderRadius
      : components.hpe.button[kind]?.medium.borderRadius;
    buttonKindTheme[kind] = {
      background: components.hpe.button?.[kind].rest.background,
      border: {
        width: dimensions.borderSize[borderWidth] || borderWidth,
        color: components.hpe.button?.[kind].rest.borderColor,
        radius: dimensions.borderSize[borderRadius] || borderRadius,
      },
      color: components.hpe.button?.[kind].rest.textColor,
      font: {
        weight: components.hpe.button?.[kind].rest.fontWeight,
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
              components.hpe.button?.[kind]?.[adjustedState].rest.background,
          },
          border: {
            // Q: this token isn't correct
            color:
              components.hpe.button?.[kind]?.[adjustedState].rest.borderColor,
          },
          color: components.hpe.button?.[kind]?.[adjustedState].rest.textColor,
          font: {
            weight:
              components.hpe.button?.[kind]?.[adjustedState].rest.fontWeight,
          },
        };
        if (!('active' in buttonStatesTheme.hover))
          buttonStatesTheme.hover.active = {};
        buttonStatesTheme.hover[state][kind] = {
          background: {
            color:
              components.hpe.button?.[kind]?.[adjustedState]?.hover?.background,
          },
          border: {
            color:
              components.hpe.button?.[kind]?.[adjustedState]?.hover
                ?.borderColor,
          },
          color:
            components.hpe.button?.[kind]?.[adjustedState]?.hover?.textColor,
          font: {
            weight:
              components.hpe.button?.[kind]?.[adjustedState]?.hover?.fontWeight,
          },
        };
      } else if (kind === 'option') {
        if (state === 'active') adjustedState = 'selected';
        buttonStatesTheme[state][kind] = {
          background: {
            color:
              components.hpe.select.option?.[adjustedState].rest.background,
          },
          border: {
            color: components.hpe.select.option?.[adjustedState].borderColor,
          },
          color: components.hpe.select.option?.[adjustedState].textColor,
        };
      } else if (state === 'disabled') {
        buttonStatesTheme[state][kind] = {
          background: {
            color:
              components.hpe.button?.[kind]?.[adjustedState].rest.background,
          },
          border: {
            width: '',
            color:
              components.hpe.button?.[kind]?.[adjustedState].rest.borderColor,
          },
          color: components.hpe.button?.[kind]?.[adjustedState].rest.textColor,
          font: {
            weight:
              components.hpe.button?.[kind]?.[adjustedState].rest.fontWeight,
          },
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
          radius: oldTheme
            ? components.hpe.button?.[size]?.[kind]?.borderRadius
            : components.hpe.button?.[kind]?.[size]?.borderRadius,
        },
        pad: {
          vertical: oldTheme
            ? components.hpe.button?.[size]?.[kind]?.paddingY
            : components.hpe.button?.[kind]?.[size]?.paddingY,
          horizontal: oldTheme
            ? components.hpe.button?.[size]?.[kind]?.paddingX
            : components.hpe.button?.[kind]?.[size]?.paddingX,
        },
      };
    });
    buttonSizesTheme[size] = {
      border: {
        radius: oldTheme
          ? components.hpe.button?.[size]?.default.borderRadius
          : components.hpe.button?.default?.[size]?.borderRadius,
      },
      pad: {
        vertical: oldTheme
          ? components.hpe.button?.[size]?.default.paddingY
          : components.hpe.button?.default?.[size]?.paddingY,
        horizontal: oldTheme
          ? components.hpe.button?.[size]?.default.paddingX
          : components.hpe.button?.default?.[size]?.paddingX,
      },
      iconOnly: {
        pad: {
          vertical: oldTheme
            ? components.hpe.button?.[size]?.default.iconOnly.paddingY
            : components.hpe.button?.default?.[size]?.iconOnly.paddingY,
          horizontal: oldTheme
            ? components.hpe.button?.[size]?.default.iconOnly.paddingX
            : components.hpe.button?.default?.[size]?.iconOnly.paddingX,
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
          color: components.hpe.formField.input.container.rest.borderColor,
        },
      },
      input: {
        font: {
          height: 'inherit',
          weight:
            components.hpe.formField.medium[!sd4 ? 'valueText' : 'value']
              .fontWeight,
        },
        padding: {
          horizontal: components.hpe.formField.medium.input.container.paddingX,
          vertical: components.hpe.formField.medium.input.container.paddingY,
        },
        readOnly: {
          background:
            components.hpe.formField.input.container.readOnly.rest.background,
          border: {
            color:
              components.hpe.formField.input.container.readOnly.rest
                .borderColor,
          },
        },
        extend: `
          &::-webkit-input-placeholder {
          font-weight: ${
            components.hpe.formField.medium[
              !sd4 ? 'placeholderText' : 'placeholder'
            ].fontWeight
          };
        }
      
        &::-moz-placeholder {
          font-weight: ${
            components.hpe.formField.medium[
              !sd4 ? 'placeholderText' : 'placeholder'
            ].fontWeight
          };
        }
      
        &:-ms-input-placeholder {
          font-weight: ${
            components.hpe.formField.medium[
              !sd4 ? 'placeholderText' : 'placeholder'
            ].fontWeight
          };
        }
        `,
      },
      font: {
        family: global.hpe.fontStack.primary,
        face: `
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff2") format('woff2'),
                 url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff") format('woff');
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff2") format('woff2'),
                 url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff") format('woff');
            font-weight: 400;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Bold.woff2") format('woff2'),
                 url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Bold.woff") format('woff');
            font-weight: 700;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Semibold.woff2") format('woff2'),
                 url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Semibold.woff") format('woff');
            font-weight: 600;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Medium.woff2") format('woff2'),
                 url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Medium.woff") format('woff');
            font-weight: 500;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Light.woff2") format('woff2'),
                 url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Light.woff") format('woff');
            font-weight: 100;
          }`,
        size: large.hpe.text.medium.fontSize,
        height: large.hpe.text.medium.lineHeight,
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
            : light.hpe.shadow.small,
          medium: elevationlight
            ? elevationlight.hpe.elevation.medium
            : light.hpe.shadow.medium,
          large: elevationlight
            ? elevationlight.hpe.elevation.large
            : light.hpe.shadow.large,
          'inset-selected': `inset 3px 0 ${light.hpe.color.border.selected}`,
        },
        dark: {
          small: elevationdark
            ? elevationdark.hpe.elevation.small
            : dark.hpe.shadow.small,
          medium: elevationdark
            ? elevationdark.hpe.elevation.medium
            : dark.hpe.shadow.medium,
          large: elevationdark
            ? elevationdark.hpe.elevation.large
            : dark.hpe.shadow.large,
          'inset-selected': `inset 3px 0 ${dark.hpe.color.border.selected}`,
        },
      },
      hover: {
        background: 'background-hover',
        color: 'text-default',
      },
      selected: {
        background: 'background-selected-primary-strong',
        color: 'text-onSelectedPrimaryStrong',
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
      color: components.hpe.anchor.default.rest.textColor,
      textDecoration: components.hpe.anchor.default.rest.textDecoration,
      fontWeight: components.hpe.anchor.default.rest.fontWeight,
      gap: components.hpe.anchor.default.medium.gapX, // TO DO not size specific
      icon: {
        color: 'icon-primary',
      },
      hover: {
        textDecoration: components.hpe.anchor.default.hover.textDecoration,
      },
      size: anchorSizeTheme,
    },
    avatar: {
      size: {
        xsmall: components.hpe.element?.xsmall.minHeight,
        small: components.hpe.element?.small.minHeight, // 24px
        medium: components.hpe.element?.medium.minHeight, // default 48px
        large: components.hpe.element?.large.minHeight, // 72px
        xlarge: components.hpe.element?.xlarge.minHeight, // 96px
        '2xl': `${baseSpacing * 5}px`, // TO DO no component size, is this a one off?
        '3xl': `${baseSpacing * 6}px`, // TO DO no component size, is this a one off?
        '4xl': `${baseSpacing * 7}px`, // TO DO no component size, is this a one off?
        '5xl': `${baseSpacing * 8}px`, // TO DO no component size, is this a one off?
      },
      text: {
        size: {
          xsmall: 'xsmall',
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
      color: components.hpe.button.default.rest.textColor,
      gap: oldTheme
        ? components.hpe.button.medium.default.gapX
        : components.hpe.button.default.medium.gapX,
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
      option,
      active: buttonStatesTheme.active,
      disabled: {
        opacity: 1,
        ...buttonStatesTheme.disabled,
      },
      selected: {
        option: {
          background: components.hpe.select.option.selected.rest.background,
          color: components.hpe.select.option.selected.textColor,
          font: {
            weight: components.hpe.select.option.selected.rest.fontWeight,
          },
          elevation: 'inset-selected',
        },
      },
      hover: {
        'cta-primary': buttonStatesTheme.hover.primary,
        'cta-alternate': {
          ...buttonStatesTheme.hover.secondary,
          extend: '', // TO DO can remove when merging, temp to override extend
        },
        ...buttonStatesTheme.hover,
        option: {
          extend: props =>
            props['aria-selected'] &&
            `
          background: ${
            props.theme.global.colors[
              components.hpe.select.option.selected.hover.background
            ][props.theme.dark ? 'dark' : 'light']
          };
          box-shadow: ${
            props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][
              'inset-selected'
            ]
          };
          &:focus:not(:focus-visible) {
           box-shadow: ${
             props.theme.global.elevation[props.theme.dark ? 'dark' : 'light'][
               'inset-selected'
             ]
           };
          }
          `,
        },
      },
      size: {
        ...buttonSizesTheme,
        medium: {
          ...buttonSizesTheme.medium,
          option: {
            pad: {
              horizontal: components.hpe.select.medium.option.paddingX,
              vertical: components.hpe.select.medium.option.paddingY,
            },
          },
        },
      },
      extend: ({ active, kind, sizeProp, theme }) => {
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
        style += `line-height: ${large.hpe.text[sizeProp]?.lineHeight};`;
        return style;
      },
    },
    calendar: {
      day: {
        hover: {
          background: 'background-hover',
          color: 'text-strong',
        },
        selected: {
          background: 'background-selected-primary-strong',
          color: 'text-onSelectedPrimaryStrong',
          hover: {
            background: 'background-selected-primary-strong-hover',
          },
          font: {
            weight: global.hpe.fontWeight.bold,
          },
        },
        inRange: {
          color: 'text-onSelectedPrimary',
          hover: {
            background: 'background-selected-primary-weak-hover',
          },
          font: {
            weight: global.hpe.fontWeight.medium,
          },
        },
        extend: '',
      },
      range: {
        background: 'background-selected-primary-weak',
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
          weight: global.hpe.fontWeight.medium,
          color: 'text-strong',
        },
      },
      medium: {
        fontSize: '18px',
        lineHeight: 1.45,
        daySize: '54.86px',
        day: {},
        range: {
          round: 'none',
          start: {
            round: 'none',
          },
          end: {
            round: 'none',
          },
        },
        title: {
          size: 'large',
          weight: global.hpe.fontWeight.medium,
          color: 'text-strong',
        },
      },
      large: {
        fontSize: '31.2px',
        lineHeight: 1.11,
        daySize: '109.71px',
        title: {
          size: 'xlarge',
          weight: global.hpe.fontWeight.medium,
          color: 'text-strong',
        },
      },
    },
    card: {
      container: {
        background: 'background-front',
        elevation: 'medium',
        extend: 'transition: all 0.3s ease-in-out;', // TO DO motion tokens
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
      color: components.hpe.switch.control.handle.rest.background,
      border: {
        color: components.hpe.checkbox.control.rest.borderColor,
        width:
          dimensions.borderSize[
            components.hpe.checkbox.medium.control.borderWidth
          ] || components.hpe.checkbox.medium.control.borderWidth,
      },
      check: {
        radius: components.hpe.checkbox.medium.control.borderRadius,
        thickness: components.hpe.checkbox.control.hover.borderWidth,
        extend: ({ theme, checked, indeterminate, disabled }) => `
        margin-block: ${
          dimensions.borderSize[
            components.hpe.checkbox.medium.control.marginY
          ] || components.hpe.checkbox.medium.control.marginY
        }px;
        background: ${
          theme.global.colors[components.hpe.checkbox.control.rest.background]
            ? theme.global.colors[
                components.hpe.checkbox.control.rest.background
              ]?.[theme.dark ? 'dark' : 'light']
            : components.hpe.checkbox.control.rest.background
        };
        background-color: ${
          checked || indeterminate
            ? theme.global.colors[
                components.hpe.checkbox.control.selected.rest.background
              ]?.[theme.dark ? 'dark' : 'light']
            : ''
        };
        &:hover {
          ${
            !disabled &&
            `
            background: ${
              theme.global.colors[
                components.hpe.checkbox.control.hover.background
              ]
                ? theme.global.colors[
                    components.hpe.checkbox.control.hover.background
                  ]?.[theme.dark ? 'dark' : 'light']
                : components.hpe.checkbox.control.hover.background
            };
          background: ${
            checked || indeterminate
              ? theme.global.colors[
                  components.hpe.checkbox.control.selected.hover.background
                ]?.[theme.dark ? 'dark' : 'light']
              : theme.global.colors[
                  components.hpe.checkbox.control.hover.background
                ]?.[theme.dark ? 'dark' : 'light']
          };
            `
          }
          
        }
        ${(checked || indeterminate) && 'border: none;'}
          `,
      },
      icon: {
        extend: ({ theme }) => `stroke-width: 2px;
        stroke: ${
          theme.global.colors[
            components.hpe.checkbox.control.selected.rest.iconColor
          ]?.[theme.dark ? 'dark' : 'light']
        }`,
      },
      gap: components.hpe.checkbox.medium.gapX,
      label: {
        align: 'start',
      },
      pad: {
        vertical: components.hpe.element?.medium.paddingY,
        horizontal: components.hpe.formField.medium.input.container.paddingX, // TO DO is this correct usage?
      },
      size: components.hpe.checkbox.medium.control.width, // TO DO should this token be called "size" instead?
      // Q is toggle and switch the same thing?
      // A: Yes, we can discuss if this name feels right or not.
      toggle: {
        background: components.hpe.switch.control.track.rest.background,
        color: components.hpe.switch.control.handle.rest.background,
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
              components.hpe.switch.control.handle.rest.borderColor
            ][theme.dark ? 'dark' : 'light']
          };
          width: ${components.hpe.switch.medium.control.handle.width};
          height: ${components.hpe.switch.medium.control.handle.height};
          // top: 1px; // TO DO token?
          // ${!checked ? 'left: 1px;' : ''} // TO DO token?
          `,
        },
        extend: ({ checked, theme }) => `
          ${
            checked &&
            `background-color: ${
              theme.global.colors[
                components.hpe.switch.control.track.selected.rest.background
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
               components.hpe.switch.control.track.rest.borderColor
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
        selected: {
          background: components.hpe.dataCell.selected?.rest?.background,
        },
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
        color: components.hpe.headerCell.rest.textColor,
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
          color: components.hpe.headerCell.units.rest.textColor, // Q: missing token
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
        weight: components.hpe.dataCell.primary.fontWeight,
        color: components.hpe.dataCell.primary.rest.textColor,
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
        color: components.hpe.formField.input.container.rest.borderColor,
        side: 'all',
        style: 'dashed',
        size: components.hpe.formField.medium.input.container.borderWidth,
      },
      button: {
        background: components.hpe.button.default.rest.background,
        border: {
          // Q: is this the correct value?
          // A: yes
          radius: oldTheme
            ? components.hpe.button.medium.default.borderRadius
            : components.hpe.button.default.medium.borderRadius,
        },
        pad: {
          vertical: oldTheme
            ? components.hpe.button.medium.default.paddingY
            : components.hpe.button.default.medium.paddingY,
          horizontal: oldTheme
            ? components.hpe.button.medium.default.paddingX
            : components.hpe.button.default.medium.paddingX,
        },
        color: components.hpe.button.default.rest.textColor,
        font: {
          weight: components.hpe.button.default.rest.fontWeight,
        },
        hover: {
          background: components.hpe.button.default.hover.background,
          color: components.hpe.button.default.hover.textColor,
        },
      },
      dragOver: {
        background: 'background-hover',
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
            components.hpe.formField.input.container.error.rest.borderColor,
        },
        color: components.hpe.formField.input.container.rest.borderColor,
        side: 'all',
      },
      // checkBox: {
      //   pad: 'large',
      // },
      disabled: {
        background:
          components.hpe.formField.input.group.container.disabled.rest
            .background,
        border: {
          color:
            components.hpe.formField.input.container.disabled.rest.borderColor,
        },
        label: {
          color:
            components.hpe.formField[!sd4 ? 'labelText' : 'label'].disabled.rest
              .textColor,
        },
      },
      error: {
        background: {
          color: components.hpe.formField.input.container.error.rest.background,
        },
        container: {
          gap: 'xsmall', // Q: missing token
        },
        icon: <CircleAlert size="small" color={light.hpe.color.icon.strong} />, // TO DO need to handle modes
        size: 'xsmall', // Q: missing token
        // Q: confused why we have both hpe.formField.errorText.rest.textColor
        // and hpe.formField.errorText.disabled.color
        // A: This is to be able to style text differently in different states
        color:
          components.hpe.formField[!sd4 ? 'errorText' : 'error'].rest.textColor,
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
        color: components.hpe.formField[!sd4 ? 'helpText' : 'help'].rest.color,
        margin: 'none', // TO DO missing token
      },
      info: {
        size: 'xsmall',
        color: components.hpe.formField[!sd4 ? 'infoText' : 'info'].rest.color,
        margin: {
          // Q: missing token
          bottom: 'xsmall',
          top: 'none',
          horizontal: 'none',
        },
      },
      label: {
        size: 'xsmall', // TO DO how to capture this as token, currently we have "fontSize", "lineHeight", "..."
        color:
          components.hpe.formField[!sd4 ? 'labelText' : 'label'].rest.color,
        margin: {
          // Q: missing token
          bottom: 'none',
          top: 'xsmall',
          horizontal: 'none',
        },
        requiredIndicator: true,
        weight:
          components.hpe.formField.medium[!sd4 ? 'labelText' : 'label']
            .fontWeight,
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
          weight: 500,
        },
      },
    },
    heading: {
      color: 'text-heading',
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
      matchSize: true,
      size: {
        xsmall: large.hpe.size.icon.xsmall,
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
        color: components.hpe.menu.item.rest.iconColor,
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
        color: 'text',
      },
      title: {
        // any text props
        color: 'text-strong',
        weight: global.hpe.fontWeight.medium,
      },
      critical: {
        background: 'background-critical',
        message: {
          color: 'text-onCritical',
        },
        title: {
          color: 'text-onCritical-strong',
        },
        global: {
          background: 'background-critical',
          message: {
            color: 'text-onCritical',
          },
          title: {
            color: 'text-onCritical-strong',
          },
        },
        toast: {
          background: 'background-front',
          message: {
            color: 'text',
          },
          title: {
            color: 'text-strong',
          },
        },
      },
      warning: {
        background: 'background-warning',
        message: {
          color: 'text-onWarning',
        },
        title: {
          color: 'text-onWarning-strong',
        },
        global: {
          background: 'background-warning',
          message: {
            color: 'text-onWarning',
          },
          title: {
            color: 'text-onWarning-strong',
          },
        },
        toast: {
          background: 'background-front',
          message: {
            color: 'text',
          },
          title: {
            color: 'text-strong',
          },
        },
      },
      normal: {
        background: 'background-ok',
        message: {
          color: 'text-onOk',
        },
        title: {
          color: 'text-onOk-strong',
        },
        global: {
          background: 'background-ok',
          message: {
            color: 'text-onOk',
          },
          title: {
            color: 'text-onOk-strong',
          },
        },
        toast: {
          background: 'background-front',
          message: {
            color: 'text',
          },
          title: {
            color: 'text-strong',
          },
        },
      },
      unknown: {
        background: 'background-unknown',
        message: {
          color: 'text-onUnknown',
        },
        title: {
          color: 'text-onUnknown-strong',
        },
        global: {
          background: 'background-unknown',
          message: {
            color: 'text-onUnknown',
          },
          title: {
            color: 'text-onUnknown-strong',
          },
        },
        toast: {
          background: 'background-front',
          message: {
            color: 'text',
          },
          title: {
            color: 'text-strong',
          },
        },
      },
      info: {
        background: 'background-info',
        message: {
          color: 'text-onInfo-default',
        },
        title: {
          color: 'text-onInfo-strong',
        },
        global: {
          background: 'background-info',
          message: {
            color: 'text-onInfo-default',
          },
          title: {
            color: 'text-onInfo-strong',
          },
        },
        toast: {
          background: 'background-front',
          message: {
            color: 'text',
          },
          title: {
            color: 'text-strong',
          },
        },
      },
      undefined: {
        background: 'background-unknown',
        message: {
          color: 'text-onUnknown',
        },
        title: {
          color: 'text-onUnknown-strong',
        },
        global: {
          background: 'background-ok',
          message: {
            color: 'text-onUnknown',
          },
          title: {
            color: 'text-onUnknown-strong',
          },
        },
        toast: {
          background: 'background-front',
          message: {
            color: 'text',
          },
          title: {
            color: 'text-strong',
          },
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
        color: components.hpe.button.default.rest.textColor,
        border: {
          radius: oldTheme
            ? components.hpe.button.medium.default.borderRadius
            : components.hpe.button.default.medium.borderRadius,
        },
        font: {
          weight: components.hpe.button.default.rest.fontWeight,
        },
        active: {
          background: components.hpe.button.default.selected.rest.background,
          border: {
            radius: oldTheme
              ? components.hpe.button.medium.default.borderRadius
              : components.hpe.button.default.medium.borderRadius,
          },
          color: components.hpe.button.default.selected.rest.textColor,
          font: {
            weight: components.hpe.button.default.selected.rest.fontWeight,
          },
        },
        hover: {
          background: components.hpe.button.default.hover.background,
          border: {
            radius: oldTheme
              ? components.hpe.button.medium.default.borderRadius
              : components.hpe.button.default.medium.borderRadius,
          },
          color: components.hpe.button.default.hover.textColor,
          font: {
            weight: components.hpe.button.default.hover.fontWeight,
          },
        },
        disabled: {
          background: components.hpe.button.default.disabled.rest.background,
          border: {
            radius: oldTheme
              ? components.hpe.button.medium.default.borderRadius
              : components.hpe.button.default.medium.borderRadius,
          },
          color: components.hpe.button.default.disabled.rest.textColor,
          font: {
            weight: components.hpe.button.default.disabled.rest.fontWeight,
          },
        },
        size: {
          small: {
            border: {
              radius: oldTheme
                ? components.hpe.button.small.default.borderRadius
                : components.hpe.button.default.small.borderRadius,
              width:
                dimensions.borderSize[
                  oldTheme
                    ? components.hpe.button.small.default.borderWidth
                    : components.hpe.button.default.small.borderWidth
                ] || oldTheme
                  ? components.hpe.button.small.default.borderWidth
                  : components.hpe.button.default.small.borderWidth,
            },
            pad: {
              vertical: '4px',
              horizontal: '4px',
            },
            font: {
              size: components.hpe.element?.small.fontSize,
              height: components.hpe.element?.small.lineHeight,
            },
            height: components.hpe.element?.small.minHeight,
            width: components.hpe.element?.small.minHeight,
          },
          medium: {
            border: {
              radius: oldTheme
                ? components.hpe.button.medium.default.borderRadius
                : components.hpe.button.default.medium.borderRadius,
              width:
                dimensions.borderSize[
                  oldTheme
                    ? components.hpe.button.medium.default.borderWidth
                    : components.hpe.button.default.medium.borderWidth
                ] || oldTheme
                  ? components.hpe.button.medium?.default.borderWidth
                  : components.hpe.button.default.medium.borderWidth,
            },
            pad: {
              vertical: '4px',
              horizontal: '4px',
            },
            font: {
              size: components.hpe.element?.medium.fontSize,
              height: components.hpe.element?.medium.lineHeight,
            },
            height: components.hpe.element?.medium.minHeight,
            width: components.hpe.element?.medium.minHeight,
          },
          large: {
            border: {
              radius: oldTheme
                ? components.hpe.button.large.default.borderRadius
                : components.hpe.button.default.large.borderRadius,
              width:
                dimensions.borderSize[
                  oldTheme
                    ? components.hpe.button.large.default.borderWidth
                    : components.hpe.button.default.large.borderWidth
                ] || oldTheme
                  ? components.hpe.button.large?.default.borderWidth
                  : components.hpe.button.default.large.borderWidth,
            },
            pad: {
              vertical: '4px',
              horizontal: '4px',
            },
            font: {
              size: components.hpe.element?.large.fontSize,
              height: components.hpe.element?.large.lineHeight,
            },
            height: components.hpe.element?.large.minHeight,
            width: components.hpe.element?.large.minHeight,
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
        color: components.hpe.radioButton.control.rest.borderColor,
        width: components.hpe.radioButton.medium.control.borderWidth, // TO DO want this narrower when not checked
      },
      color: components.hpe.radioButton.control.selected.rest.borderColor,
      container: {
        extend: () => `
        width: auto;
        padding-inline: ${components.hpe.formField.medium.input.group.item.paddingX};
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
            color={components.hpe.radioButton.control.selected.rest.iconColor}
          >
            <circle cx="12" cy="12" r="8" />
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
        color: 'background-primary-strong', // Should this instead be "control"?
      },
      track: {
        lower: {
          // TO DO is this the right token for here?
          color: 'background-primary-strong',
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
        pad: 'none',
        color: 'foreground-primary',
        // tokens?
        border: [
          { color: 'border-weak', side: 'all', size: 'medium' },
          { color: 'border-weak', side: 'right', size: 'medium' },
          { color: 'border-weak', side: 'top', size: 'medium' },
          { color: 'border-weak', side: 'left', size: 'medium' },
        ],
      },
      size: {
        xsmall: components.hpe.element?.xsmall.minHeight,
        small: components.hpe.element?.small.minHeight,
        medium: components.hpe.element?.medium.minHeight,
        large: components.hpe.element?.large.minHeight,
        xlarge: components.hpe.element?.xlarge.minHeight,
      },
    },
    starRating: {
      color: 'background-selected-primary-strong',
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
          color: 'brand',
        },
        disabled: {
          color: undefined,
        },
        hover: {
          color: 'border-weak',
        },
      },
      disabled: {
        color: 'text-disabled',
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
        pad: {
          top: components.hpe.dataCell.paddingTop,
          bottom: components.hpe.dataCell.paddingBottom,
          horizontal: components.hpe.dataCell.paddingX,
        },
        border: {
          side: 'bottom', // TO DO this causes issues on the last row with the footer border
          color: components.hpe.dataCell.rest.borderColor,
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
          font-weight: ${components.hpe.footerCell.fontWeight};
        `,
      },
    },
    // use extend for border to use box shadow
    // TO DO NOTE: Tag dimensions are off because there was a bug in Tag in 3.1.0
    tag: {
      border: {
        color: 'border',
      },
      icons: {
        remove: Close,
      },
      pad: {
        horizontal: components.hpe.element?.medium?.paddingX?.default,
        vertical: components.hpe.element?.medium.paddingY,
      },
      remove: {
        kind: 'default',
      },
      value: {
        weight: global.hpe.fontWeight.medium,
      },
      round: 'large',
      size: {
        xsmall: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.small.paddingY,
            horizontal: components.hpe.element?.small?.paddingX?.default,
          },
          remove: {
            size: 'xsmall',
            margin: {
              right: 'none',
              vertical: '-1px', // account for border
            },
          },
        },
        small: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.small.paddingY,
            horizontal: components.hpe.element?.small?.paddingX?.default,
          },
          remove: {
            size: 'xsmall',
            margin: {
              right: '2px',
            },
          },
        },
        medium: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.medium.paddingY,
            horizontal: components.hpe.element?.medium?.paddingX?.default,
          },
          remove: {
            size: 'small',
            margin: {
              right: 'xxsmall',
            },
          },
        },
        large: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.large.paddingY,
            horizontal: components.hpe.element?.large?.paddingX?.default,
          },
          remove: {
            size: 'medium',
            margin: {
              right: 'xxsmall',
            },
          },
        },
        xlarge: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.xlarge.paddingY,
            horizontal: components.hpe.element?.xlarge?.paddingX?.default,
          },
          remove: {
            size: 'large',
            margin: {
              right: 'xsmall',
            },
          },
        },
      },
    },
    text: {
      ...textTheme,
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
        color: 'background-selected-primary-strong',
      },
      dislike: {
        color: 'background-selected-primary-strong',
      },
    },
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
          color: components.hpe.button.toolbar.rest.borderColor,
          size: oldTheme
            ? components.hpe.button.medium.toolbar.borderWidth
            : components.hpe.button.toolbar.medium.borderWidth,
        },
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

export const current = buildTheme({
  light: localLight,
  dark: localDark,
  small: localSmall,
  large: localMedium,
  global: localGlobal,
  components: localComponents,
});

// need to extend hpe with new token namespace to "fill gaps" for sake of demo
// when toggling between themes
// const newColors = {
//   'background-floating': 'background-front',
//   'background-screenOverlay': 'background-layer-overlay',
//   'background-unknown': 'background-contrast',
//   'background-info': 'background-contrast',
//   'background-critical': 'validation-critical',
//   'background-warning': 'validation-warning',
//   'background-ok': 'validation-ok',
//   'background-primary-strong': 'brand',
//   'background-primary-strong-hover': 'brand',
//   'background-selected-strong-enabled': 'background-primary-strong',
//   'background-selected-strong-hover': 'background-primary-strong-hover',
//   'background-neutral-xstrong': {},
//   'border-disabled': 'text-disabled',
//   'border-selected': 'brand',
//   'border-critical': 'border',
//   'border-warning': 'border',
//   'border-ok': 'border',
//   'border-info': 'border',
//   'border-unknown': 'border',
//   'text-placeholder': 'placeholder',
//   'text-onPrimary': 'text-primary-button',
//   'text-critical': 'text',
//   'text-warning': 'text',
//   'text-ok': 'text',
//   'text-info': 'text',
//   'text-unknown': 'text',
//   'text-onSelectedPrimaryStrong': 'text-primary-button',
//   'text-onSelectedPrimary': 'text',
//   'text-heading': 'text-strong',
//   'text-onStrong': 'text-primary-button',
//   'text-onCritical': 'text',
//   'text-onCritical-strong': 'text-strong',
//   'text-onWarning': 'text',
//   'text-onWarning-strong': 'text-strong',
//   'text-onOk': 'text',
//   'text-onOk-strong': 'text-strong',
//   'text-onInfo': 'text',
//   'text-Info-strong': 'text-strong',
//   'text-onUnknown': 'text',
//   'text-onUnknown-strong': 'text-strong',
//   'text-primary': {},
//   'icon-primary': 'brand',
//   'icon-default': 'text',
//   'icon-critical': 'status-critical',
//   'icon-warning': 'status-warning',
//   'icon-ok': 'status-ok',
//   'icon-info': 'text',
//   'icon-unknown': 'status-unknown',
//   'icon-onPrimaryStrong': 'text-primary-button',
//   'icon-onSelectedPrimaryStrong': 'text-primary-button',
//   'icon-onSelectedPrimary': 'icon-default',
//   'foreground-primary': 'brand',
//   'foreground-critical': 'status-critical',
//   'foreground-warning': 'status-warning',
//   'foreground-unknown': 'status-unknown',
//   'graph-5': 'graph-0',
//   'graph-6': 'graph-1',
// };

// const v5 = deepMerge(hpe, {
//   global: {
//     colors: {
//       ...newColors,
//     },
//   },
// });

export const themes = {
  // next: current,
  current: current,
};
