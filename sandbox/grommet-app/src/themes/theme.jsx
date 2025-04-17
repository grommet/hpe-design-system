// (C) Copyright 2020-2021 Hewlett Packard Enterprise Development LP
import { css } from 'styled-components';
import {
  dark as localDark,
  light as localLight,
  dimension as localDimension,
  small as localSmall,
  global as localGlobal,
  components as localComponents,
} from 'hpe-design-tokens/grommet';
import { Ascending } from 'grommet-icons/icons/Ascending';
import { Blank } from 'grommet-icons/icons/Blank';
import { CircleAlert } from 'grommet-icons/icons/CircleAlert';
import { Close } from 'grommet-icons/icons/Close';
import { Descending } from 'grommet-icons/icons/Descending';
import { Down } from 'grommet-icons/icons/Down';
import { Next } from 'grommet-icons/icons/Next';
import { Previous } from 'grommet-icons/icons/Previous';
import { Unsorted } from 'grommet-icons/icons/Unsorted';
import { Up } from 'grommet-icons/icons/Up';
import { Hpe } from 'grommet-icons/icons/Hpe';

import { backgrounds } from './backgrounds';
import { colors } from './colors';

import { deepMerge, deepFreeze } from 'grommet/utils';
import { hpe as hpeV5 } from 'grommet-theme-hpe-v5';

export const optionBefore = ({ theme }) => css`
  position: relative;
  &::before {
    display: block;
    position: absolute;
    content: '';
    width: ${localComponents.hpe.select.default.medium.option.marker.width};
    border-top-left-radius: ${localComponents.hpe.select.default.medium.option
      .marker.borderTopLeftRadius};
    border-bottom-left-radius: ${localComponents.hpe.select.default.medium
      .option.marker.borderBottomLeftRadius};
    top: 0;
    bottom: 0;
    left: 0;
    background: ${getThemeColor(
      localComponents.hpe.select.default.option.marker.rest.background,
      theme,
    )};
  }
`;

const baseSpacing = 24;

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
  '3xlarge',
  '4xlarge',
  '5xlarge',
  '6xlarge',
];

const getThemeColor = (color, theme) =>
  typeof theme.global.colors[color] === 'string'
    ? theme.global.colors[color]
    : theme.global.colors[color]?.[theme.dark ? 'dark' : 'light'] || color;

const globalSizes = {
  borderSize: {
    xsmall: '1px',
    small: '2px',
    medium: `${baseSpacing / 6}px`, // 4
    large: `${baseSpacing / 2}px`, // 12
    xlarge: `${baseSpacing}px`, // 24
    default: '1px',
  },
  edgeSize: {
    none: '0px',
    hair: '1px', // for Chart
    xxsmall: `${baseSpacing / 8}px`, // 3
    xsmall: `${baseSpacing / 4}px`, // 6
    small: `${baseSpacing / 2}px`, // 12
    medium: `${baseSpacing}px`, // 24
    large: `${baseSpacing * 2}px`, // 48
    xlarge: `${baseSpacing * 4}px`, // 96
    responsiveBreakpoint: 'small',
  },
  // same as edgeSize for backwards compatibility
  radius: {
    none: '0px',
    hair: '1px', // for Chart
    xxsmall: `${baseSpacing / 8}px`, // 3
    xsmall: `${baseSpacing / 4}px`, // 6
    small: `${baseSpacing / 2}px`, // 12
    medium: `${baseSpacing}px`, // 24
    large: `${baseSpacing * 2}px`, // 48
    xlarge: `${baseSpacing * 4}px`, // 96
    responsiveBreakpoint: 'small',
  },
  size: {
    xxsmall: `${baseSpacing * 2}px`, // 48
    xsmall: `${baseSpacing * 4}px`, // 96
    small: `${baseSpacing * 8}px`, // 192
    medium: `${baseSpacing * 16}px`, // 384
    large: `${baseSpacing * 32}px`, // 768
    xlarge: `${baseSpacing * 48}px`, // 1152
    xxlarge: `${baseSpacing * 64}px`, // 1536
    full: '100%',
  },
};

const responsiveGlobalSizes = {
  borderSize: {
    xsmall: '1px',
    small: '2px',
    medium: `${baseSpacing / 6}px`, // 4
    large: `${baseSpacing / 4}px`, // 6
    xlarge: `${baseSpacing / 2}px`, // 12
    default: '1px',
  },
  edgeSize: {
    none: '0px',
    hair: '1px', // for Chart
    xxsmall: '2px',
    xsmall: `${baseSpacing / 8}px`, // 3
    small: `${baseSpacing / 4}px`, // 6
    medium: `${baseSpacing / 2}px`, // 12
    large: `${baseSpacing}px`, // 24
    xlarge: `${baseSpacing * 2}px`, // 48
  },
  // same as edgeSize for backwards compatibility
  radius: {
    none: '0px',
    hair: '1px', // for Chart
    xxsmall: '2px',
    xsmall: `${baseSpacing / 8}px`, // 3
    small: `${baseSpacing / 4}px`, // 6
    medium: `${baseSpacing / 2}px`, // 12
    large: `${baseSpacing}px`, // 24
    xlarge: `${baseSpacing * 2}px`, // 48
  },
  size: {
    xxsmall: `${baseSpacing}px`, // 24
    xsmall: `${baseSpacing * 2}px`, // 48
    small: `${baseSpacing * 4}px`, // 96
    medium: `${baseSpacing * 8}px`, // 192
    large: `${baseSpacing * 16}px`, // 384
    xlarge: `${baseSpacing * 32}px`, // 768
    full: '100%',
  },
};

const getTextSize = size => {
  if (size === '3xlarge') return '3xl';
  if (size === '4xlarge') return '4xl';
  if (size === '5xlarge') return '5xl';
  if (size === '6xlarge') return '6xl';
  return size;
};

const buildTheme = (tokens, flags) => {
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

  const size = breakpoint => ({
    '5xsmall': breakpoint.hpe.container['5xsmall'],
    '4xsmall': breakpoint.hpe.container['4xsmall'],
    '3xsmall': breakpoint.hpe.container['3xsmall'],
    xxsmall: breakpoint.hpe.container.xxsmall,
    xsmall: breakpoint.hpe.container.xsmall,
    small: breakpoint.hpe.container.small,
    medium: breakpoint.hpe.container.medium,
    large: breakpoint.hpe.container.large,
    xlarge: breakpoint.hpe.container.xlarge,
    xxlarge: breakpoint.hpe.container.xxlarge,
    '3xlarge': breakpoint.hpe.container['3xlarge'],
    full: '100%',
  });

  const dimensions = {
    ...(flags['v6-backwards-compatibility']
      ? globalSizes
      : {
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
            '5xsmall': large.hpe.spacing.hair,
            '4xsmall': large.hpe.spacing['5xsmall'],
            '3xsmall': large.hpe.spacing['4xsmall'],
            xxsmall: large.hpe.spacing['3xsmall'],
            xsmall: large.hpe.spacing.xxsmall,
            small: large.hpe.spacing.xsmall,
            medium: large.hpe.spacing.small,
            large: large.hpe.spacing.medium,
            xlarge: large.hpe.spacing.large,
            xxlarge: large.hpe.spacing.xlarge,
            '3xlarge': large.hpe.spacing.xxlarge,
            responsiveBreakpoint: 'small',
          },
          radius: {
            none: large.hpe.radius.none,
            hair: large.hpe.radius.hair,
            xxsmall: large.hpe.radius.hair,
            xsmall: large.hpe.radius.xxsmall,
            small: large.hpe.radius.xsmall,
            medium: large.hpe.radius.small,
            large: large.hpe.radius.medium,
            xlarge: large.hpe.radius.large,
            xxlarge: large.hpe.radius.xlarge,
            responsiveBreakpoint: 'small',
          },
          size: size(large),
        }),
    breakpoints: {
      xsmall: {
        ...(flags['v6-backwards-compatibility']
          ? responsiveGlobalSizes
          : {
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
              radius: {
                none: small.hpe.radius.none,
                hair: small.hpe.radius.hair,
                xxsmall: small.hpe.radius.xxsmall,
                xsmall: small.hpe.radius.xsmall,
                small: small.hpe.radius.small,
                medium: small.hpe.radius.medium,
                large: small.hpe.radius.large,
                xlarge: small.hpe.radius.xlarge,
                xxlarge: small.hpe.radius.xxlarge,
                responsiveBreakpoint: 'small',
              },
              size: size(small),
            }),
        value: parseInt(global.hpe.breakpoint.xsmall, 10),
      },
      small: {
        ...(flags['v6-backwards-compatibility']
          ? responsiveGlobalSizes
          : {
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
              radius: {
                none: small.hpe.radius.none,
                hair: small.hpe.radius.hair,
                xxsmall: small.hpe.radius.xxsmall,
                xsmall: small.hpe.radius.xsmall,
                small: small.hpe.radius.small,
                medium: small.hpe.radius.medium,
                large: small.hpe.radius.large,
                xlarge: small.hpe.radius.xlarge,
                xxlarge: small.hpe.radius.xxlarge,
                responsiveBreakpoint: 'small',
              },
              size: size(small),
            }),
        value: parseInt(global.hpe.breakpoint.small, 10),
      },
      medium: { value: parseInt(global.hpe.breakpoint.medium, 10) },
      large: { value: parseInt(global.hpe.breakpoint.large, 10) },
      xlarge: {},
    },
  };

  // option button kind styles. abstracted so select.emptySearchMessage
  // can reference pad value
  const option = {
    color: components.hpe.select.default.option.rest.textColor,
    border: {
      radius:
        dimensions.edgeSize[
          components.hpe.select.default.medium.option.borderRadius
        ] || components.hpe.select.default.medium.option.borderRadius,
      width:
        dimensions.borderSize[
          components.hpe.select.default.medium.option.borderWidth
        ] || components.hpe.select.default.medium.option.borderWidth,
      color: components.hpe.select.default.option.rest.borderColor,
    },
    pad: {
      horizontal: components.hpe.select.default.medium.option.paddingX,
      vertical: components.hpe.select.default.medium.option.paddingY,
    },
    font: { weight: components.hpe.select.default.option.rest.fontWeight },
  };

  // abstracted so button and pinned list icon can reference
  const mediumIconOnlyPad = {
    vertical: components.hpe.button.default.medium.iconOnly.paddingY,
    horizontal: components.hpe.button.default.medium.iconOnly.paddingY,
  };

  const anchorSizeTheme = {};
  textSizes.forEach(sizeArg => {
    const textSize = sizeArg === '6xlarge' ? '5xlarge' : sizeArg;
    const themeSize = getTextSize(textSize);
    anchorSizeTheme[themeSize] = {
      color: components.hpe.anchor.default.rest.textColor,
      textDecoration: components.hpe.anchor.default.rest.textDecoration,
      fontWeight: components.hpe.anchor.default.rest.fontWeight,
      gap: components.hpe.anchor.default[textSize].gapX,
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
  textSizes.forEach(textSize => {
    if (
      parseInt(large.hpe.text?.[textSize]?.fontSize.replace('rem', ''), 10) >
      parseInt(fallback.size.replace('rem', ''), 10)
    ) {
      fallback.size = large.hpe.text?.[textSize]?.fontSize;
      fallback.height = large.hpe.text?.[textSize]?.lineHeight;
      fallback.maxWidth = large.hpe.text?.[textSize]?.maxWidth;
      fallback.weight = large.hpe.text?.[textSize]?.fontWeight;
    }
    const themeSize = getTextSize(textSize);
    paragraphTheme[themeSize] = {
      size: large.hpe.text?.[textSize]?.fontSize || fallback.size,
      height: large.hpe.text?.[textSize]?.lineHeight || fallback.height,
      maxWidth: large.hpe.text?.[textSize]?.maxWidth || fallback.maxWidth,
    };
    textTheme[themeSize] = {
      size: large.hpe.text?.[textSize]?.fontSize || fallback.size,
      height: large.hpe.text?.[textSize]?.lineHeight || fallback.height,
    };
    fontWeights[themeSize] =
      large.hpe.text?.[textSize]?.fontWeight || fallback.weight;
  });

  textTheme.extend = ({ size: textSize, weight }) =>
    !weight ? `font-weight: ${fontWeights[textSize]};` : '';

  paragraphTheme.extend = ({ size: textSize, weight }) =>
    !weight ? `font-weight: ${fontWeights[textSize]};` : '';

  const buttonKindTheme = {};
  buttonKinds.forEach(kind => {
    const borderWidth = components.hpe.button[kind]?.medium.borderWidth;
    const borderRadius = components.hpe.button[kind]?.medium.borderRadius;
    buttonKindTheme[kind] = {
      background: components.hpe.button?.[kind].rest.background,
      border: {
        width: dimensions.borderSize[borderWidth] || borderWidth,
        color: components.hpe.button?.[kind].rest.borderColor,
        radius: dimensions.borderSize[borderRadius] || borderRadius,
      },
      color: components.hpe.button?.[kind].rest.textColor,
      font: { weight: components.hpe.button?.[kind].rest.fontWeight },
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
  componentSizes.forEach(buttonSize => {
    const kindStyles = {};
    buttonKinds.forEach(kind => {
      kindStyles[kind] = {
        border: {
          radius: components.hpe.button?.[kind]?.[buttonSize]?.borderRadius,
        },
        pad: {
          vertical: components.hpe.button?.[kind]?.[buttonSize]?.paddingY,
          horizontal: components.hpe.button?.[kind]?.[buttonSize]?.paddingX,
        },
      };
    });
    buttonSizesTheme[buttonSize] = {
      border: {
        radius: components.hpe.button?.default?.[buttonSize]?.borderRadius,
      },
      pad: {
        vertical: components.hpe.button?.default?.[buttonSize]?.paddingY,
        horizontal: components.hpe.button?.default?.[buttonSize]?.paddingX,
      },
      iconOnly: {
        pad: {
          vertical:
            components.hpe.button?.default?.[buttonSize]?.iconOnly.paddingY,
          horizontal:
            components.hpe.button?.default?.[buttonSize]?.iconOnly.paddingX,
        },
      },
      ...kindStyles,
    };
  });

  const focusBoxShadowParts = global.hpe.focusIndicator.boxShadow
    .trim()
    .split(' ');

  return deepFreeze({
    defaultMode: 'light',
    global: {
      backgrounds,
      ...dimensions,
      colors,
      control: {
        border: {
          radius:
            components.hpe.formField.default.medium.input.container
              .borderRadius,
          color:
            components.hpe.formField.default.input.container.rest.borderColor,
        },
        disabled: { opacity: 0.3 },
      },
      input: {
        font: {
          height: 'inherit',
          weight: components.hpe.formField.default.medium.value.fontWeight,
        },
        padding: {
          horizontal:
            components.hpe.formField.default.medium.input.container.paddingX,
          vertical:
            components.hpe.formField.default.medium.input.container.paddingY,
        },
        readOnly: {
          background:
            components.hpe.formField.default.input.container.readOnly.rest
              .background,
          border: {
            color:
              components.hpe.formField.default.input.container.readOnly.rest
                .borderColor,
          },
        },
        extend: ({ theme }) => `
          color: ${getThemeColor(
            components.hpe.formField.default.value.rest.textColor,
            theme,
          )};
          &::-webkit-input-placeholder {
          font-weight: ${
            components.hpe.formField.default.medium.placeholder.fontWeight
          };
        }
      
        &::-moz-placeholder {
          font-weight: ${
            components.hpe.formField.default.medium.placeholder.fontWeight
          };
        }
      
        &:-ms-input-placeholder {
          font-weight: ${
            components.hpe.formField.default.medium.placeholder.fontWeight
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
        outline: {
          color: global.hpe.focusIndicator.outline.color,
          size: global.hpe.focusIndicator.outline.width,
          offset: global.hpe.focusIndicator.outlineOffset,
        },
        shadow: {
          color: focusBoxShadowParts[focusBoxShadowParts.length - 1],
          size: focusBoxShadowParts[focusBoxShadowParts.length - 2],
        },
        twoColor: true,
      },
      active: { background: 'background-active', color: 'active-text' },
      drop: {
        background: components.hpe.drop.default.background,
        border: {
          radius:
            dimensions.radius[components.hpe.drop.default.borderRadius] ||
            components.hpe.drop.default.borderRadius,
        },
        margin: components.hpe.drop.default.margin,
        intelligentMargin: true,
        shadowSize: 'medium',
        /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
         * at a z-index of 101. This adjustment brings Drop in alignment with Layer
         * which needs an elevated z-index to sit atop the Global header. */
        zIndex: components.hpe.drop.default.zIndex,
        extend: () => `
          [class*=MaskedInput__ContainerBox] {
            padding-block: ${components.hpe.select.default.medium.drop.paddingY};
            padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
            gap: ${components.hpe.select.default.medium.drop.gapY};
            display: flex;
            flex-direction: column;
          }
        `,
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
        },
      },
      hover: { background: 'background-hover', color: 'text-default' },
      selected: {
        background: 'background-selected-primary-strong',
        color: 'text-onSelectedPrimaryStrong',
      },
    },
    accordion: {
      panel: { border: { side: 'horizontal', color: 'border' } },
      heading: {
        level: 3,
        margin: { vertical: 'medium', horizontal: '3xsmall' },
      },
      hover: { background: 'background-hover', heading: { color: undefined } },
      border: undefined,
      icons: { collapse: Up, expand: Down, color: 'text' },
    },
    anchor: {
      color: components.hpe.anchor.default.rest.textColor,
      textDecoration: components.hpe.anchor.default.rest.textDecoration,
      fontWeight: components.hpe.anchor.default.rest.fontWeight,
      gap: components.hpe.anchor.default.medium.gapX,
      icon: { color: 'icon-primary' },
      hover: {
        textDecoration: components.hpe.anchor.default.hover.textDecoration,
        extend: ({ theme }) =>
          `color: ${getThemeColor(
            components.hpe.anchor.default.hover.textColor,
            theme,
          )};`,
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
        '2xl': `${baseSpacing * 5}px`,
        '3xl': `${baseSpacing * 6}px`,
        '4xl': `${baseSpacing * 7}px`,
        '5xl': `${baseSpacing * 8}px`,
      },
      text: {
        size: {
          xsmall: 'xsmall',
          small: 'small',
          medium: 'medium',
          large: 'large',
          xlarge: 'xlarge',
          '2xl': '3xl',
          '3xl': '4xl',
          '4xl': '5xl',
          '5xl': '6xl',
        },
      },
    },
    button: {
      intelligentPad: false,
      color: components.hpe.button.default.rest.textColor,
      gap: components.hpe.button.default.medium.gapX,
      badge: {
        align: 'container',
        container: { background: 'background-neutral-xstrong' },
        size: { medium: '18px' },
        text: { size: { medium: 'xsmall' } },
      },
      'cta-primary': {
        ...buttonKindTheme.primary,
        icon: <Hpe />,
        reverse: true,
      },
      'cta-alternate': {
        ...buttonKindTheme.secondary,
        icon: <Hpe color="brand" />,
        reverse: true,
      },
      ...buttonKindTheme,
      option,
      active: {
        ...buttonStatesTheme.active,
        'cta-primary': buttonStatesTheme.active.primary,
        'cta-alternate': buttonStatesTheme.active.secondary,
        // applies when option is in focus
        extend: ({ kind, theme }) =>
          kind === 'option' &&
          `
          &[aria-selected="true"] { background: ${getThemeColor(
            components.hpe.select.default.option.selected.rest.background,
            theme,
          )}; }`,
      },
      disabled: {
        opacity: 1,
        ...buttonStatesTheme.disabled,
        option: {
          background:
            components.hpe.select.default.option.disabled.rest.background,
          border: {
            color:
              components.hpe.select.default.option.disabled.rest.borderColor,
          },
          color: components.hpe.select.default.option.disabled.rest.textColor,
          font: {
            weight:
              components.hpe.select.default.option.disabled.rest.fontWeight,
          },
        },
        'cta-primary': buttonStatesTheme.disabled.primary,
        'cta-alternate': buttonStatesTheme.disabled.secondary,
      },
      selected: {
        option: {
          background:
            components.hpe.select.default.option.selected.rest.background,
          border: {
            color:
              components.hpe.select.default.option.selected.rest.borderColor,
          },
          color: components.hpe.select.default.option.selected.rest.textColor,
          font: {
            weight:
              components.hpe.select.default.option.selected.rest.fontWeight,
          },
          extend: ({ theme, disabled }) =>
            `
            position: relative;
            &::before {
              display: block;
              position: absolute;
              content: '';
              width: ${
                components.hpe.select.default.medium.option.marker.width
              };
              border-top-left-radius: ${
                components.hpe.select.default.medium.option.marker
                  .borderTopLeftRadius
              };
              border-bottom-left-radius: ${
                components.hpe.select.default.medium.option.marker
                  .borderBottomLeftRadius
              };
              top: ${components.hpe.select.default.medium.option.marker.top};
              bottom: ${
                components.hpe.select.default.medium.option.marker.bottom
              };
              left: ${components.hpe.select.default.medium.option.marker.left};
              background: ${getThemeColor(
                !disabled
                  ? components.hpe.select.default.option.marker.rest.background
                  : 'border-disabled',
                theme,
              )};
            }
          `,
        },
      },
      hover: {
        'cta-primary': buttonStatesTheme.hover.primary,
        'cta-alternate': buttonStatesTheme.hover.secondary,
        ...buttonStatesTheme.hover,
        active: {
          ...buttonStatesTheme.hover.active,
          'cta-primary': buttonStatesTheme.hover.active.primary,
          'cta-alternate': buttonStatesTheme.hover.active.secondary,
        },
        option: {
          background: components.hpe.select.default.option.hover.background,
          border: {
            color: components.hpe.select.default.option.hover.borderColor,
          },
          color: components.hpe.select.default.option.hover.textColor,
          extend: props =>
            props['aria-selected'] &&
            `
           background: ${getThemeColor(
             components.hpe.select.default.option.selected.hover.background,
             props.theme,
           )};
          color: ${getThemeColor(
            components.hpe.select.default.option.selected.hover.textColor,
            props.theme,
          )}
          `,
        },
      },
      size: {
        ...buttonSizesTheme,
        medium: {
          ...buttonSizesTheme.medium,
          option: {
            pad: {
              horizontal: components.hpe.select.default.medium.option.paddingX,
              vertical: components.hpe.select.default.medium.option.paddingY,
            },
          },
        },
      },
      extend: ({ colorValue, theme }) => {
        let style = '';
        if (colorValue) {
          // color prop is not recommended to be used, but providing
          // a better fallback behavior for hover styles to avoid
          // "kind" hover background from applying
          // https://github.com/grommet/grommet/issues/7504
          style += `
            &:hover { background: ${getThemeColor(colorValue, theme)}; }
          `;
        }
        return style;
      },
    },
    calendar: {
      day: {
        adjacent: { color: 'text-weak' },
        hover: { background: 'background-hover', color: 'text-strong' },
        selected: {
          background: 'background-selected-primary-strong',
          color: 'text-onSelectedPrimaryStrong',
          hover: { background: 'background-selected-primary-strong-hover' },
          font: { weight: global.hpe.fontWeight.medium },
        },
        inRange: {
          color: 'text-onSelectedPrimary',
          hover: {
            background: 'background-selected-primary-hover',
            color: 'text-onSelectedPrimary',
          },
          font: { weight: global.hpe.fontWeight.medium },
        },
        extend: '',
      },
      range: { background: 'background-selected-primary' },
      icons: { next: Next, previous: Previous },
      small: {
        fontSize: '13.6px',
        lineHeight: 1.375,
        daySize: '27.43px',
        day: { round: 'full' },
        range: {
          round: 'none',
          start: { round: { corner: 'left', size: 'full' } },
          end: { round: { corner: 'right', size: 'full' } },
        },
        title: {
          size: 'medium',
          weight: global.hpe.fontWeight.normal,
          color: 'text-strong',
        },
      },
      medium: {
        fontSize: '18px',
        lineHeight: 1.45,
        daySize: '54.86px',
        day: { round: 'full' },
        range: {
          round: 'none',
          start: { round: { corner: 'left', size: 'full' } },
          end: { round: { corner: 'right', size: 'full' } },
        },
        title: {
          size: 'large',
          weight: global.hpe.fontWeight.normal,
          color: 'text-strong',
        },
      },
      large: {
        fontSize: '31.2px',
        lineHeight: 1.11,
        daySize: '109.71px',
        day: { round: 'full' },
        range: {
          round: 'none',
          start: { round: { corner: 'left', size: 'full' } },
          end: { round: { corner: 'right', size: 'full' } },
        },
        title: {
          size: 'xlarge',
          weight: global.hpe.fontWeight.normal,
          color: 'text-strong',
        },
      },
    },
    card: {
      container: {
        background: 'background-front',
        elevation: 'none',
        round: 'medium',
        extend: 'transition: box-shadow 0.3s ease-in-out;',
      },
      body: { pad: 'medium' },
      footer: { pad: { horizontal: 'medium', vertical: 'xsmall' } },
      header: { pad: 'medium' },
      hover: { container: { elevation: 'medium' } },
    },
    carousel: {
      disabled: {
        icons: {
          color: 'icon-disabled',
        },
      },
    },
    checkBox: {
      hover: {
        border: {
          color: undefined,
          width:
            dimensions.borderSize[
              components.hpe.checkbox.default.medium.control.borderWidth
            ] || components.hpe.checkbox.default.medium.control.borderWidth,
        },
        // applies to container around control and label
        background: { color: undefined },
        extend: ({ theme, toggle, checked }) => {
          let borderColor;
          if (toggle) {
            borderColor = getThemeColor(
              components.hpe.switch.default.control.track.hover.borderColor,
              theme,
            );
          } else if (checked) {
            if (toggle) {
              borderColor = getThemeColor(
                'transparent',
                // incorrect token value to be updated in next minor hpe-design-tokens release
                // components.hpe.switch.default.control.track.selected.hover
                //   .borderColor,
                theme,
              );
            } else {
              borderColor = getThemeColor(
                'transparent',
                // incorrect token value to be updated in next minor hpe-design-tokens release
                // components.hpe.checkbox.default.control.selected.hover
                //   .borderColor,
                theme,
              );
            }
          }
          return css`
            ${checked ? `border-color: ${borderColor};` : ''}
          `;
        },
      },
      color: components.hpe.switch.default.control.handle.rest.background, // The stroke color for the CheckBox icon, the toggle handle background when checked, and the border when checked. Setting to handle background since this is the only place to control this.
      border: {
        color: components.hpe.checkbox.default.control.rest.borderColor,
        width:
          dimensions.borderSize[
            components.hpe.checkbox.default.medium.control.borderWidth
          ] || components.hpe.checkbox.default.medium.control.borderWidth,
      },
      check: {
        radius: components.hpe.checkbox.default.medium.control.borderRadius,
        thickness: '2px', // The stroke width of the checked icon.
        extend: ({ theme, checked, indeterminate, disabled }) => {
          let background = getThemeColor(
            components.hpe.checkbox.default.control.rest.background,
            theme,
          );
          let hoverBackground = getThemeColor(
            components.hpe.checkbox.default.control.hover.background,
            theme,
          );
          let borderColor = getThemeColor(
            components.hpe.checkbox.default.control.rest.borderColor,
            theme,
          );
          if (checked || indeterminate) {
            background = getThemeColor(
              components.hpe.checkbox.default.control.selected.rest.background,
              theme,
            );
            borderColor = getThemeColor(
              'transparent',
              // incorrect token value to be updated in next minor hpe-design-tokens release
              // components.hpe.checkbox.default.control.selected.rest.borderColor,
              theme,
            );
          }
          if (checked || indeterminate) {
            hoverBackground = getThemeColor(
              components.hpe.checkbox.default.control.selected.hover.background,
              theme,
            );
          }
          if (disabled) {
            background = getThemeColor(
              components.hpe.checkbox.default.control.disabled.rest.background,
              theme,
            );
            borderColor = getThemeColor(
              components.hpe.checkbox.default.control.disabled.rest.borderColor,
              theme,
            );
          }
          return `
            background: ${background};
            border-color: ${borderColor};
            &:hover {
              ${!disabled ? `background: ${hoverBackground};` : ''}
            }
          `;
        },
      },
      icon: {
        extend: ({ theme, disabled }) => `stroke-width: 2px;
        stroke: ${getThemeColor(
          disabled
            ? components.hpe.checkbox.default.control.disabled.rest.iconColor
            : components.hpe.checkbox.default.control.selected.rest.iconColor,
          theme,
        )}`,
      },
      gap: components.hpe.checkbox.default.medium.gapX,
      label: { align: 'start' },
      pad: 'none',
      size: components.hpe.checkbox.default.medium.control.width,
      toggle: {
        background: components.hpe.switch.default.control.track.rest.background,
        color: components.hpe.switch.default.control.handle.rest.background,
        size: components.hpe.switch.default.medium.control.track.width,
        knob: {
          extend: ({ theme, checked, disabled }) => {
            const insetHandle =
              dimensions.borderSize[
                components.hpe.switch.default.medium.control.handle.borderWidth
              ] ||
              dimensions.borderSize[
                components.hpe.switch.default.medium.control.handle.borderWidth
              ];

            return `
          box-shadow: ${
            theme.global.elevation[theme.dark ? 'dark' : 'light'][
              components.hpe.switch.default.control.handle.rest.boxShadow
            ]
          };
          border: ${
            dimensions.borderSize[
              components.hpe.switch.default.medium.control.handle.borderWidth
            ]
          } solid ${getThemeColor(
              disabled
                ? components.hpe.switch.default.control.handle.disabled.rest
                    .borderColor
                : components.hpe.switch.default.control.handle.rest.borderColor,
              theme,
            )};
          width: ${components.hpe.switch.default.medium.control.handle.width};
          height: ${components.hpe.switch.default.medium.control.handle.height};
          top: ${insetHandle};
          left: ${!checked ? insetHandle : '25px'};
          `;
          },
        },
        // applies to track around handle
        extend: ({ checked, theme, disabled }) => {
          let background;
          let hoverBackground = getThemeColor(
            components.hpe.switch.default.control.track.hover.background,
            theme,
          );
          let borderColor = getThemeColor(
            components.hpe.switch.default.control.track.rest.borderColor,
            theme,
          );
          if (checked) {
            background = getThemeColor(
              components.hpe.switch.default.control.track.selected.rest
                .background,
              theme,
            );
            hoverBackground = getThemeColor(
              components.hpe.switch.default.control.track.selected.hover
                .background,
              theme,
            );
          }
          if (disabled) {
            background = getThemeColor(
              components.hpe.switch.default.control.track.disabled.rest
                .background,
              theme,
            );
            borderColor = getThemeColor(
              components.hpe.switch.default.control.handle.disabled.rest
                .borderColor,
              theme,
            );
          }
          return `
            border-color: ${borderColor};
            background: ${background};
            &:hover {
              ${!disabled ? `background: ${hoverBackground};` : ''}
            }
        `;
        },
      },
      extend: ({ disabled, theme }) => css`
      font-weight: ${components.hpe.checkbox.default.label.rest.fontWeight};
      width: auto;
      border: ${
        components.hpe.formField.default.medium.input.container.borderWidth
      } solid ${getThemeColor(
        components.hpe.formField.default.input.group.item.rest.borderColor,
        theme,
      )};
      & input:checked + span[class*=CheckBoxToggle] > span[class*=CheckBoxKnob] {
        left: 25px;
      }
      ${
        // override built in disabled opacity: 0.5 from grommet
        disabled &&
        `opacity: 1; 
        color: ${getThemeColor(
          components.hpe.checkbox.default.label.disabled.rest.textColor,
          theme,
        )};`
      }
    };
    `,
    },
    checkBoxGroup: {
      container: { cssGap: true, gap: 'xsmall', margin: 'none' },
    },
    data: { button: { kind: 'toolbar' } },
    dateInput: {
      container: {
        round:
          components.hpe.formField.default.medium.input.container.borderRadius,
      },
      icon: { size: 'small' },
    },
    dataTable: {
      body: {
        extend: ({ theme }) => `
          /* Margin and padding allow room for focus on table body */
          margin: ${theme.global.edgeSize['5xsmall']} 0px;
          padding: 0px ${theme.global.edgeSize['5xsmall']};
        `,
        selected: {
          background:
            components.hpe.dataCell.default.selected?.rest?.background,
        },
        row: {
          extend: `&:last-child td {
              border-color: transparent;
            }
            &:last-child th {
              border-color: transparent;
            }`,
        },
      },
      groupHeader: {
        // background: undefined,
        // border: undefined,
        // pad: undefined,
      },
      groupEnd: { border: { side: 'bottom', size: '3xsmall' } },
      header: {
        border: { side: 'bottom' },
        color: components.hpe.headerCell.default.rest.textColor,
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
        font: { weight: components.hpe.headerCell.default.medium.fontWeight },
        gap: components.hpe.headerCell.default.medium.gapX,
        pad: {
          horizontal: components.hpe.headerCell.default.medium.paddingX,
          vertical: '3xsmall', // TO DO
        },
        hover: {
          background: {
            color: components.hpe.headerCell.default.hover.background,
          },
        },
        units: {
          color: components.hpe.headerCell.default.units.rest.textColor,
        },
      },
      icons: {
        ascending: () => <Descending size="large" />,
        descending: () => <Ascending size="large" />,
        contract: () => <Up height="medium" />,
        expand: () => <Down height="medium" />,
        sortable: () => <Unsorted size="large" />,
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
        weight: components.hpe.dataCell.primary.medium.fontWeight,
        color: components.hpe.dataCell.primary.rest.textColor,
      },
      resize: {
        border: { color: 'border', side: 'end' },
        hover: { border: { color: 'border-strong', size: 'small' } },
      },
    },
    fileInput: {
      border: {
        color:
          components.hpe.formField.default.input.container.rest.borderColor,
        side: 'all',
        style: 'solid',
        size: components.hpe.formField.default.medium.input.container
          .borderWidth,
      },
      button: {
        background: components.hpe.button.secondary.rest.background,
        border: { radius: components.hpe.button.default.medium.borderRadius },
        pad: {
          vertical: components.hpe.button.default.medium.paddingY,
          horizontal: components.hpe.button.default.medium.paddingX,
        },
        color: components.hpe.button.secondary.rest.textColor,
        font: { weight: components.hpe.button.secondary.rest.fontWeight },
        hover: {
          background: components.hpe.button.secondary.hover.background,
          color: components.hpe.button.secondary.hover.textColor,
        },
      },
      dragOver: { background: 'background-hover', border: 'none' },
      hover: { border: { color: 'border' } },
      icons: { remove: Close },
      label: { margin: 'xsmall' },
      message: { color: 'placeholder', margin: 'xsmall' },
      pad: { horizontal: '3xsmall' },
      extend: `border-radius: ${components.hpe.formField.default.medium.input.container.borderRadius};`,
    },
    formField: {
      extend: ({ theme }) =>
        `
          [class*="ContentBox"] {
            label {
              padding-block: ${
                components.hpe.formField.default.medium.input.group.item
                  .paddingY
              };
              padding-inline: ${
                components.hpe.formField.default.medium.input.group.item
                  .paddingX
              };
              &:hover:not([disabled]) {
                background: ${getThemeColor(
                  components.hpe.formField.default.input.container.hover
                    .background,
                  theme,
                )};
              }
            }
            [role="group"], [role="radiogroup"] {
              gap: 0;
              padding-block: ${
                components.hpe.formField.default.medium.input.group.container
                  .paddingY
              };
              padding-inline: ${
                components.hpe.formField.default.medium.input.group.container
                  .paddingX
              };
              label {
                border: ${
                  dimensions.borderSize[
                    components.hpe.formField.default.medium.input.group.item
                      .borderWidth
                  ] ||
                  components.hpe.formField.default.medium.input.group.item
                    .borderWidth
                } solid ${getThemeColor(
          components.hpe.formField.default.input.group.item.rest.borderColor,
          theme,
        )};
                padding-block: ${
                  components.hpe.formField.default.medium.input.group.item
                    .paddingY
                };
                padding-inline: ${
                  components.hpe.formField.default.medium.input.group.item
                    .paddingX
                };
                border-radius: ${
                  dimensions.edgeSize[
                    components.hpe.formField.default.medium.input.group.item
                      .borderRadius
                  ]
                };
                &:hover:not([disabled]) {
                  background: ${getThemeColor(
                    components.hpe.formField.default.input.group.item.hover
                      .background,
                    theme,
                  )};
                }
              }
            }
          }
      `,
      content: { margin: { vertical: '3xsmall' }, pad: 'none' },
      border: {
        error: {
          color:
            components.hpe.formField.default.input.container.error.rest
              .borderColor,
        },
        color:
          components.hpe.formField.default.input.container.rest.borderColor,
        side: 'all',
      },
      checkBox: {
        pad: {
          horizontal:
            components.hpe.formField.default.medium.input.group.item.paddingX,
          vertical:
            components.hpe.formField.default.medium.input.group.item.paddingY,
        },
        container: {
          extend: ({ error }) =>
            `border-color: ${
              error
                ? components.hpe.formField.default.input.group.container.error
                    .rest.borderColor
                : components.hpe.formField.default.input.group.container.rest
                    .borderColor
            }; `,
        },
      },
      checkBoxGroup: {
        container: {
          extend: ({ error }) =>
            `border-color: ${
              error
                ? components.hpe.formField.default.input.group.container.error
                    .rest.borderColor
                : components.hpe.formField.default.input.group.container.rest
                    .borderColor
            }; `,
        },
      },
      radioButtonGroup: {
        container: {
          extend: ({ error }) =>
            `border-color: ${
              error
                ? components.hpe.formField.default.input.group.container.error
                    .rest.borderColor
                : components.hpe.formField.default.input.group.container.rest
                    .borderColor
            }; `,
        },
      },
      thumbsRating: {
        container: {
          extend: ({ error }) =>
            `border-color: ${
              error
                ? components.hpe.formField.default.input.group.container.error
                    .rest.borderColor
                : components.hpe.formField.default.input.group.container.rest
                    .borderColor
            }; `,
        },
      },
      starRating: {
        container: {
          extend: ({ error }) =>
            `border-color: ${
              error
                ? components.hpe.formField.default.input.group.container.error
                    .rest.borderColor
                : components.hpe.formField.default.input.group.container.rest
                    .borderColor
            }; `,
        },
      },
      disabled: {
        background:
          components.hpe.formField.default.input.group.container.disabled.rest
            .background,
        border: {
          color:
            components.hpe.formField.default.input.container.disabled.rest
              .borderColor,
        },
        label: {
          color: components.hpe.formField.default.label.disabled.rest.textColor,
        },
        help: {
          color: components.hpe.formField.default.help.disabled.rest.textColor,
        },
        info: {
          color: components.hpe.formField.default.info.disabled.rest.textColor,
        },
      },
      error: {
        background: {
          color:
            components.hpe.formField.default.input.container.error.rest
              .background,
        },
        container: { gap: '3xsmall' },
        icon: (
          <CircleAlert size="small" color={light.hpe.color.icon.critical} />
        ),
        size: 'xsmall',
        color: components.hpe.formField.default.error.rest.textColor,
        margin: { bottom: '3xsmall', top: 'none', horizontal: 'none' },
      },
      focus: {
        containerFocus: false,
        background: undefined, // Intentionally not carrying this style through to tokens to rely on global focus indicator
        border: {
          color: undefined, // Intentionally not carrying this style through to tokens to rely on global focus indicator
        },
      },
      help: {
        size: 'xsmall',
        color: components.hpe.formField.default.help.rest.color,
        margin: 'none',
      },
      info: {
        size: 'xsmall',
        color: components.hpe.formField.default.info.rest.color,
        margin: { bottom: '3xsmall', top: 'none', horizontal: 'none' },
      },
      label: {
        size: 'xsmall',
        color: components.hpe.formField.default.label.rest.textColor,
        margin: { bottom: 'none', top: '3xsmall', horizontal: 'none' },
        requiredIndicator: true,
        weight: components.hpe.formField.default.medium.label.fontWeight,
      },
      margin: { bottom: 'none' },
      round:
        components.hpe.formField.default.medium.input.container.borderRadius,
      survey: {
        label: { margin: { bottom: 'none' }, size: 'medium', weight: 500 },
      },
    },
    heading: {
      color: 'text-heading',
      weight: large.hpe.heading.xlarge.fontWeight,
      level: {
        1: {
          font: { weight: large.hpe.heading.xlarge.fontWeight },
          small: {
            size: large.hpe.heading.large.fontSize,
            height: large.hpe.heading.large.lineHeight,
          },
          medium: {
            size: large.hpe.heading.xlarge.fontSize,
            height: large.hpe.heading.xlarge.lineHeight,
          },
          large: {
            size: '3rem', // 48px size prop not recommended but values supported for backwards compatibility
            height: '3rem', // 48px size prop not recommended but values supported for backwards compatibility
          },
          xlarge: {
            size: '3.75rem', // 60px size prop not recommended but values supported for backwards compatibility
            height: '3.75rem', // 60px size prop not recommended but values supported for backwards compatibility
          },
        },
        2: {
          font: { weight: large.hpe.heading.large.fontWeight },
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
          xlarge: { size: '3rem', height: '3rem' },
        },
        3: {
          font: { weight: large.hpe.heading.medium.fontWeight },
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
          font: { weight: large.hpe.heading.small.fontWeight },
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
          font: { weight: large.hpe.heading.xsmall.fontWeight },
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
          font: { weight: large.hpe.heading.xxsmall.fontWeight },
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
      extend: () => '',
    },
    icon: {
      disableScaleDown: true,
      matchSize: true,
      size: {
        xsmall: large.hpe.icon.xsmall.size,
        small: large.hpe.icon.small.size,
        medium: large.hpe.icon.medium.size,
        large: large.hpe.icon.large.size,
        xlarge: large.hpe.icon.xlarge.size,
        xxlarge: large.hpe.icon.xxlarge.size,
      },
    },
    layer: {
      background: 'background-floating',
      border: { radius: 'small', intelligentRounding: true },
      container: { elevation: 'large' },
      overlay: { background: 'background-screenOverlay' },
      /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
       * at a z-index of 101. This adjustment allows for Layer modals and side-drawers
       * to sit atop the Global header. */
      zIndex: '110',
    },
    list: {
      container: {
        // any box props
        gap: '3xsmall',
        // extend: undefined,
      },
      item: {
        border: undefined,
        disabled: { color: 'text-disabled', cursor: 'default' },
        pinned: {
          background: 'background-active',
          icon: { pad: mediumIconOnlyPad },
        },
        pad: { horizontal: 'medium', vertical: 'xsmall' },
      },
      primaryKey: { weight: global.hpe.fontWeight.medium },
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
      drop: { align: { top: 'bottom', left: 'left' } },
      container: {
        pad: {
          vertical: components.hpe.menu.default.medium.group.container.paddingY,
          horizontal:
            components.hpe.menu.default.medium.group.container.paddingX,
        },
        gap: components.hpe.menu.default.medium.group.container.gapY,
      },
      group: {
        drop: {},
        container: {
          pad: {
            horizontal:
              components.hpe.menu.default.medium.group.container.paddingX,
            vertical:
              components.hpe.menu.default.medium.group.container.paddingY,
          },
          gap: components.hpe.menu.default.medium.group.container.gapY,
        },
        separator: {
          color: components.hpe.menu.default.group.separator.background,
          size: components.hpe.menu.default.medium.group.separator.height,
          pad: 'none',
        },
      },
      icons: {
        color: components.hpe.menu.default.item.rest.iconColor,
        down: Down,
      },
      item: {
        pad: {
          horizontal: components.hpe.menu.default.medium.item.paddingX,
          vertical: components.hpe.menu.default.medium.item.paddingY,
        },
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
    nameValuePair: {
      name: { color: 'text-strong', weight: global.hpe.fontWeight.medium },
    },
    notification: {
      close: { icon: Close },
      container: {
        // any box props
        round: 'xsmall',
        pad: { horizontal: 'xsmall', vertical: '3xsmall' },
      },
      direction: 'column',
      global: { direction: 'row', container: { round: 'none' } },
      message: { color: 'text', fill: true },
      title: {
        // any text props
        color: 'text-strong',
        weight: global.hpe.fontWeight.medium,
      },
      iconContainer: {
        // any box props
        pad: { right: 'xsmall' },
        flex: false,
      },
      critical: {
        background: 'background-critical',
        color: 'icon-critical',
        message: { color: 'text-onCritical' },
        title: { color: 'text-onCritical-strong' },
        global: {
          background: 'background-critical',
          message: { color: 'text-onCritical' },
          title: { color: 'text-onCritical-strong' },
        },
        toast: {
          background: 'background-front',
          message: { color: 'text' },
          title: { color: 'text-strong' },
        },
      },
      warning: {
        background: 'background-warning',
        color: 'icon-warning',
        message: { color: 'text-onWarning' },
        title: { color: 'text-onWarning-strong' },
        global: {
          background: 'background-warning',
          message: { color: 'text-onWarning' },
          title: { color: 'text-onWarning-strong' },
        },
        toast: {
          background: 'background-front',
          message: { color: 'text' },
          title: { color: 'text-strong' },
        },
      },
      normal: {
        background: 'background-ok',
        color: 'icon-ok',
        message: { color: 'text-onOk' },
        title: { color: 'text-onOk-strong' },
        global: {
          background: 'background-ok',
          message: { color: 'text-onOk' },
          title: { color: 'text-onOk-strong' },
        },
        toast: {
          background: 'background-front',
          message: { color: 'text' },
          title: { color: 'text-strong' },
        },
      },
      unknown: {
        background: 'background-unknown',
        color: 'icon-unknown',
        message: { color: 'text-onUnknown' },
        title: { color: 'text-onUnknown-strong' },
        global: {
          background: 'background-unknown',
          message: { color: 'text-onUnknown' },
          title: { color: 'text-onUnknown-strong' },
        },
        toast: {
          background: 'background-front',
          message: { color: 'text' },
          title: { color: 'text-strong' },
        },
      },
      info: {
        background: 'background-info',
        color: 'icon-info',
        message: { color: 'text-onInfo' },
        title: { color: 'text-onInfo-strong' },
        global: {
          background: 'background-info',
          message: { color: 'text-onInfo' },
          title: { color: 'text-onInfo-strong' },
        },
        toast: {
          background: 'background-front',
          message: { color: 'text' },
          title: { color: 'text-strong' },
        },
      },
      undefined: {
        background: 'background-unknown',
        message: { color: 'text-onUnknown' },
        title: { color: 'text-onUnknown-strong' },
        global: {
          background: 'background-ok',
          message: { color: 'text-onUnknown' },
          title: { color: 'text-onUnknown-strong' },
        },
        toast: {
          background: 'background-front',
          message: { color: 'text' },
          title: { color: 'text-strong' },
        },
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
      responsive: { breakpoints: ['xsmall', 'small'] },
      // title: {
      //   size: undefined,
      // },
      subtitle: { size: 'large' },
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
        gap: { row: '3xsmall', column: 'large' },
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
        gap: { row: '3xsmall', column: 'large' },
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
    pagination: {
      button: {
        color: components.hpe.button.default.rest.textColor,
        border: { radius: components.hpe.button.default.medium.borderRadius },
        font: { weight: components.hpe.button.default.rest.fontWeight },
        active: {
          background: components.hpe.button.default.selected.rest.background,
          border: { radius: components.hpe.button.default.medium.borderRadius },
          color: components.hpe.button.default.selected.rest.textColor,
          font: {
            weight: components.hpe.button.default.selected.rest.fontWeight,
          },
        },
        hover: {
          background: components.hpe.button.default.hover.background,
          border: { radius: components.hpe.button.default.medium.borderRadius },
          color: components.hpe.button.default.hover.textColor,
          font: { weight: components.hpe.button.default.hover.fontWeight },
          active: {
            background: components.hpe.button.default.selected.hover.background,
            color: components.hpe.button.default.selected.hover.textColor,
            font: {
              weight: components.hpe.button.default.selected.hover.fontWeight,
            },
          },
        },
        disabled: {
          background: components.hpe.button.default.disabled.rest.background,
          border: { radius: components.hpe.button.default.medium.borderRadius },
          color: components.hpe.button.default.disabled.rest.textColor,
          font: {
            weight: components.hpe.button.default.disabled.rest.fontWeight,
          },
        },
        size: {
          small: {
            border: {
              radius: components.hpe.button.default.small.borderRadius,
              width:
                dimensions.borderSize[
                  components.hpe.button.default.small.borderWidth
                ] || components.hpe.button.default.small.borderWidth,
            },
            pad: { vertical: '4px', horizontal: '4px' },
            font: {
              size: components.hpe.element?.small.fontSize,
              height: components.hpe.element?.small.lineHeight,
            },
            height: components.hpe.element?.small.minHeight,
            width: components.hpe.element?.small.minHeight,
          },
          medium: {
            border: {
              radius: components.hpe.button.default.medium.borderRadius,
              width:
                dimensions.borderSize[
                  components.hpe.button.default.medium.borderWidth
                ] || components.hpe.button.default.medium.borderWidth,
            },
            pad: { vertical: '4px', horizontal: '4px' },
            font: {
              size: components.hpe.element?.medium.fontSize,
              height: components.hpe.element?.medium.lineHeight,
            },
            height: components.hpe.element?.medium.minHeight,
            width: components.hpe.element?.medium.minHeight,
          },
          large: {
            border: {
              radius: components.hpe.button.default.large.borderRadius,
              width:
                dimensions.borderSize[
                  components.hpe.button.default.large.borderWidth
                ] || components.hpe.button.default.large.borderWidth,
            },
            pad: { vertical: '4px', horizontal: '4px' },
            font: {
              size: components.hpe.element?.large.fontSize,
              height: components.hpe.element?.large.lineHeight,
            },
            height: components.hpe.element?.large.minHeight,
            width: components.hpe.element?.large.minHeight,
          },
        },
      },
      controls: {
        align: 'center',
        direction: 'row',
        gap: '5xsmall',
        margin: 'none',
        pad: 'none',
      },
    },
    paragraph: { ...paragraphTheme },
    radioButton: {
      border: {
        color: components.hpe.radioButton.default.control.rest.borderColor,
        width: components.hpe.radioButton.default.medium.control.borderWidth,
      },
      check: {
        background: {
          color:
            components.hpe.radioButton.default.control.selected.rest.background,
        },
      },
      color:
        components.hpe.radioButton.default.control.selected.rest.borderColor,
      container: {
        extend: ({ theme }) => `
          width: auto;
          &:has(input[checked]) {
            & div:has(> svg[aria-hidden="true"]) {
              background: ${getThemeColor(
                components.hpe.radioButton.default.control.selected.rest
                  .background,
                theme,
              )};
              border-color: ${getThemeColor(
                components.hpe.radioButton.default.control.selected.rest
                  .borderColor,
                theme,
              )};
            }
          }
          &:has(input[checked]):hover:not([disabled]) {
              & div:has(> svg[aria-hidden="true"]) {
                background: ${getThemeColor(
                  components.hpe.radioButton.default.control.selected.hover
                    .background,
                  theme,
                )};
                border-color: ${getThemeColor(
                  components.hpe.radioButton.default.control.selected.hover
                    .borderColor,
                  theme,
                )};
              }
          }
          `,
      },
      gap: components.hpe.radioButton.default.medium.gapX,
      hover: {
        background: { color: 'transparent' },
        border: {
          color: components.hpe.radioButton.default.control.hover.borderColor,
        },
      },
      size: components.hpe.radioButton.default.medium.control.height,
      font: {
        weight: components.hpe.radioButton.default.label.rest.fontWeight,
      },
      icons: {
        circle: () => (
          <Blank
            color={
              components.hpe.radioButton.default.control.selected.rest.iconColor
            }
          >
            <circle cx="12" cy="12" r="8" />
          </Blank>
        ),
      },
    },
    radioButtonGroup: {
      container: { cssGap: true, gap: 'xsmall', margin: 'none' },
    },
    rangeInput: {
      thumb: { color: 'background-primary-strong' },
      track: {
        lower: { color: 'background-primary-strong' },
        upper: {
          // hard-coding opaque version of 'border-weak' due to unresolved grommet bug
          // https://github.com/grommet/grommet/issues/6739
          color: { light: '#e0e0e0', dark: '#616161' },
        },
        extend: () => `border-radius: ${large.hpe.radius.full};`,
      },
      disabled: {
        opacity: 1,
        track: { color: 'background-disabled' },
        thumb: {
          // opaque version of background-front + background-disabled
          // to avoid stacking transparencies
          color: { light: 'rgb(245, 245, 245)', dark: 'rgb(44, 44, 44)' },
        },
      },
    },
    select: {
      clear: {
        container: {
          background: undefined,
          pad: { horizontal: '12px', vertical: '6px' },
          hover: { background: 'background-hover' },
          round: 'xsmall',
        },
        text: {
          color: components.hpe.button.default.rest.textColor,
          weight: components.hpe.button.default.rest.fontWeight,
        },
      },
      container: {
        // Applying spacing on Select "Clear selection" button, then placing focus styles on the inner container div
        extend: ({ theme }) =>
          `
          div:has(input[type="search"]) {
            padding-bottom: 0;
          }
          button[aria-label*="Or, press"] {
            padding-block: ${
              components.hpe.select.default.medium.drop.paddingY
            };
            padding-inline: ${
              components.hpe.select.default.medium.drop.paddingX
            };
            &:focus {
              background: transparent;
              > div {
                background: ${getThemeColor(
                  components.hpe.button.default.hover.background,
                  theme,
                )};
              }
            }
          }
        `,
      },
      control: {
        extend: ({ disabled }) => css`
          ${disabled &&
          `
          opacity: 0.3;
          input {
            cursor: default;
          }`}

          &[class*="SelectMultiple"] [role="listbox"] {
            padding-block: ${components.hpe.select.default.medium.drop
              .paddingY};
            padding-inline: ${components.hpe.select.default.medium.drop
              .paddingX};
            & [role='option'] {
              border-radius: ${dimensions.edgeSize[
                components.hpe.select.default.medium.option.borderRadius
              ] || components.hpe.select.default.medium.option.borderRadius};
            }
          }
        `,
      },
      emptySearchMessage: { container: { pad: option.pad } },
      icons: {
        color: 'icon',
        down: Down,
        margin: {
          left: 'xsmall',
          // setting right margin to 12px because on small
          // screens, Select responsive padding sizes down
          // which brings the icon too tight with edge of
          // control.
          right: '12px',
        },
        up: Up,
      },
      options: undefined,
      listbox: {
        // only apply paddingY to paddingTop because gap caused by Infinite Scroll
        // adds an addition 6px on the bottom
        extend: () => `
          padding-top: ${components.hpe.select.default.medium.drop.paddingY};
          padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
          display: flex;
          flex-direction: column;
          gap: ${components.hpe.select.default.medium.drop.gapY};
          [role="option"] {
            border-radius: ${components.hpe.select.default.medium.option.borderRadius};
          }
        `,
      },
    },
    selectMultiple: {
      listbox: {
        extend: () => `
          padding-block: ${components.hpe.select.default.medium.drop.paddingY};
          padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
          display: flex;
          flex-direction: column;
          [role="option"] {
              border-radius: ${
                dimensions.edgeSize[
                  components.hpe.select.default.medium.option.borderRadius
                ] || components.hpe.select.default.medium.option.borderRadius
              };
            }
          }
        `,
      },
    },
    spinner: {
      container: {
        pad: 'none',
        color: 'foreground-primary',
        border: [
          { color: 'transparent', side: 'all', size: 'medium' },
          { color: 'transparent', side: 'right', size: 'medium' },
          { color: 'transparent', side: 'top', size: 'medium' },
          { color: 'transparent', side: 'left', size: 'medium' },
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
    starRating: { color: 'background-selected-primary-strong' },
    tab: {
      color: 'text',
      active: {
        background: 'background-selected-primary-strong',
        color: 'text-onSelectedPrimaryStrong',
        weight: 500,
      },
      hover: { background: 'background-hover', color: 'text' },
      border: {
        side: 'all',
        color: 'transparent',
        size:
          dimensions[components.hpe.element?.medium.borderWidth] ||
          components.hpe.element?.medium.borderWidth,
        active: { color: 'transparent' },
        disabled: { color: undefined },
        hover: { color: undefined },
      },
      disabled: { background: 'background-disabled', color: 'text-disabled' },
      pad: {
        bottom: components.hpe.element?.medium.paddingY,
        top: components.hpe.element?.medium.paddingY,
        horizontal: components.hpe.element?.medium?.paddingX?.default,
      },
      margin: { vertical: 'none', horizontal: 'none' },
      extend: () => `border-radius: 6px;`,
    },
    tabs: {
      gap: '3xsmall',
      header: {
        border: undefined,
        extend: ({ theme }) => `
          border-radius: 6px; 
          & button[aria-selected="true"]:hover:not([disabled]) > div {
            background: ${getThemeColor(
              'background-selected-primary-strong-hover',
              theme,
            )};
            color: ${getThemeColor('text-onSelectedPrimaryStrong', theme)};
          }
        `,
      },
      step: { xsmall: 1, xlarge: 3 },
    },
    table: {
      header: {
        // pad: {
        //   top: components.hpe.dataCell.default.medium.paddingTop,
        //   bottom: components.hpe.dataCell.default.medium.paddingBottom,
        //   horizontal: components.hpe.dataCell.default.medium.paddingX,
        // },
        gap: components.hpe.headerCell.default.medium.gapX,
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
          top: components.hpe.dataCell.default.medium.paddingTop,
          bottom: components.hpe.dataCell.default.medium.paddingBottom,
          horizontal: components.hpe.dataCell.default.medium.paddingX,
        },
        border: {
          side: 'bottom',
          color: components.hpe.dataCell.default.rest.borderColor,
        },
      },
      row: { hover: { background: 'background-hover' } },
      footer: {
        extend: `
          font-weight: ${components.hpe.footerCell.default.fontWeight};
        `,
      },
      extend: () => `& tbody tr:last-child td {
        border-color: transparent;
      }
      & tbody tr:last-child th {
        border-color: transparent;
      }`,
    },
    tag: {
      border: { color: 'border-weak' },
      icons: { remove: Close },
      pad: {
        horizontal: components.hpe.element?.medium?.paddingX?.default,
        vertical: components.hpe.element?.medium.paddingY,
      },
      remove: { kind: 'default' },
      value: { weight: global.hpe.fontWeight.medium },
      round: 'xsmall',
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
          remove: { size: 'xsmall', margin: { right: '2px' } },
        },
        medium: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.medium.paddingY,
            horizontal: components.hpe.element?.medium?.paddingX?.default,
          },
          remove: { size: 'xsmall', margin: { right: '5xsmall' } },
        },
        large: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.large.paddingY,
            horizontal: components.hpe.element?.large?.paddingX?.default,
          },
          remove: { size: 'medium', margin: { right: '5xsmall' } },
        },
        xlarge: {
          icon: undefined,
          pad: {
            vertical: components.hpe.element?.xlarge.paddingY,
            horizontal: components.hpe.element?.xlarge?.paddingX?.default,
          },
          remove: { size: 'large', margin: { right: '3xsmall' } },
        },
      },
    },
    text: { ...textTheme },
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
      suggestions: {
        extend: ({ theme }) => `
          padding-block: ${components.hpe.select.default.medium.drop.paddingY};
          padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
          gap: ${components.hpe.select.default.medium.drop.gapY};
          display: flex;
          flex-direction: column;
          [role="option"]:hover {
            background: ${getThemeColor(
              components.hpe.select.default.option.hover.background,
              theme,
            )};
          }
        `,
      },
    },
    tip: {
      content: {
        background: 'background-floating',
        border: { color: 'border-weak' },
        margin: '5xsmall',
        elevation: 'small',
        pad: { vertical: 'none', horizontal: 'xsmall' },
        round: components.hpe.drop.default.borderRadius,
      },
    },
    thumbsRating: {
      like: { color: 'background-selected-primary-strong' },
      dislike: { color: 'background-selected-primary-strong' },
    },
    toggleGroup: {
      button: { kind: 'toolbar' },
      container: {
        border: false,
        extend: ({ theme }) => `
        gap: ${
          dimensions.edgeSize[large.hpe.spacing['5xsmall']] ||
          large.hpe.spacing['5xsmall']
        };
        &:hover {
          background: ${getThemeColor('background-hover', theme)};
        }`,
      },
      divider: false,
    },
    // Theme-Designer only parameters
    name: 'HPE 1',
    rounding: 4,
    scale: 1.1,
    spacing: 24,
  });
};

const current = buildTheme(
  {
    light: localLight,
    dark: localDark,
    small: localSmall,
    large: localDimension,
    global: localGlobal,
    components: localComponents,
  },
  {
    // For grommet-theme-hpe v6.0.0, maintain backwards compatibility
    // with old t-shirt sizes
    'v6-backwards-compatibility': false,
  },
);

// need to extend hpe with new token namespace to "fill gaps" for sake of demo
// when toggling between themes
const newColors = {
  'background-floating': 'background-front',
  'background-screenOverlay': 'background-layer-overlay',
  'background-unknown': 'background-contrast',
  'background-info': 'background-contrast',
  'background-critical': 'validation-critical',
  'background-warning': 'validation-warning',
  'background-ok': 'validation-ok',
  'background-primary-strong': 'brand',
  'background-primary-strong-hover': 'brand',
  'background-selected-strong-enabled': 'background-primary-strong',
  'background-selected-strong-hover': 'background-primary-strong-hover',
  'background-neutral-xstrong': {},
  'border-disabled': 'text-disabled',
  'border-selected': 'brand',
  'border-critical': 'border',
  'border-warning': 'border',
  'border-ok': 'border',
  'border-info': 'border',
  'border-unknown': 'border',
  'text-placeholder': 'placeholder',
  'text-onPrimary': 'text-primary-button',
  'text-critical': 'text',
  'text-warning': 'text',
  'text-ok': 'text',
  'text-info': 'text',
  'text-unknown': 'text',
  'text-onSelectedPrimaryStrong': 'text-primary-button',
  'text-onSelectedPrimary': 'text',
  'text-heading': 'text-strong',
  'text-onStrong': 'text-primary-button',
  'text-onCritical': 'text',
  'text-onCritical-strong': 'text-strong',
  'text-onWarning': 'text',
  'text-onWarning-strong': 'text-strong',
  'text-onOk': 'text',
  'text-onOk-strong': 'text-strong',
  'text-onInfo': 'text',
  'text-Info-strong': 'text-strong',
  'text-onUnknown': 'text',
  'text-onUnknown-strong': 'text-strong',
  'text-primary': {},
  'icon-primary': 'brand',
  'icon-default': 'text',
  'icon-critical': 'status-critical',
  'icon-warning': 'status-warning',
  'icon-ok': 'status-ok',
  'icon-info': 'text',
  'icon-unknown': 'status-unknown',
  'icon-onPrimaryStrong': 'text-primary-button',
  'icon-onSelectedPrimaryStrong': 'text-primary-button',
  'icon-onSelectedPrimary': 'icon-default',
  'foreground-primary': 'brand',
  'foreground-critical': 'status-critical',
  'foreground-warning': 'status-warning',
  'foreground-unknown': 'status-unknown',
  'graph-5': 'graph-0',
  'graph-6': 'graph-1',
};

const v5 = deepMerge(hpeV5, {
  global: {
    colors: {
      ...newColors,
    },
  },
});

export const themes = {
  v1: current,
  v0: v5,
};
