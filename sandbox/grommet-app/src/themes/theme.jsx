import { css } from 'styled-components';
import {
  // deepFreeze,
  deepMerge,
} from 'grommet/utils';
import {
  // primitives as localPrimitives,
  // dark as localDark,
  // light as localLight,
  // dimension as localDimension,
  // small as localSmall,
  // global as localGlobal,
  components as localComponents,
} from 'hpe-design-tokens/grommet';
// import {
//   Down,
//   Blank,
//   Close,
//   Up,
//   Hpe,
//   CircleAlert,
//   Ascending,
//   Descending,
//   Unsorted,
// } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { hpe as hpeNext } from 'grommet-theme-hpe-NEXT';

// // TO DO should these be added as tokens?
// const backgrounds = {
//   'datawave-green-1':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/AdobeStock-57301038_800_0_72_RGB+19849.jpg)',
//   'datawave-green-2':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/AdobeStock_222468625_800_0_72_RGB+19870.jpg)',
//   'datawave-multi-1':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/AdobeStock-257301038_800_0_72_RGB+19842.jpg)',
//   'datawave-multi-2':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_satin_01_800_0_72_RGB+20062.jpg)',
//   'datawave-multi-3':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_satin_02_800_0_72_RGB+20061.jpg)',
//   'datawave-multi-4':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_slice_01_800_0_72_RGB+20107.jpg)',
//   'datawave-multi-5':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_slice_02_800_0_72_RGB+20106.jpg)',
//   'datawave-multi-6':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/HPE_data_slice_03_800_0_72_RGB+20105.jpg)',
//   'datawave-white-1':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685131_800_0_72_RGB+19858.jpg)',
//   'datawave-white-2':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1278457196_800_0_72_RGB+19857.jpg)',
//   'datawave-white-3':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1304863046_800_0_72_RGB+19856.jpg)',
//   'datawave-white-4':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-978721396_800_0_72_RGB+19859.jpg)',
//   'light-shadow-1':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685107_800_0_72_RGB+19853.jpg)',
//   'light-shadow-2':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685108_800_0_72_RGB+19852.jpg)',
//   'light-shadow-3':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1135685118_800_0_72_RGB+19854.jpg)',
//   'light-shadow-4':
//     'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1190757657_800_0_72_RGB+19855.jpg)',
//   'orange-yellow': `linear-gradient(
//         45deg,
//         hsl(22deg 100% 50%) 0%,
//         hsl(34deg 100% 50%) 50%,
//         hsl(46deg 100% 50%) 100%
//       );`,
//   'purple-blue': `linear-gradient(
//         45deg,
//         hsl(281deg 100% 63%) 1%,
//         hsl(227deg 83% 58%) 50%,
//         hsl(174deg 69% 53%) 99%
//       );`,
//   'purple-blue-yellow': `linear-gradient(
//         225deg,
//         hsl(263deg 82% 55%) 0%,
//         hsl(196deg 72% 53%) 25%,
//         hsl(171deg 80% 63%) 50%,
//         hsl(138deg 93% 68%) 75%,
//         hsl(47deg 99% 50%) 100%
//       );`,
//   'purple-magenta-yellow': `linear-gradient(
//         45deg,
//         hsl(274deg 100% 50%) 0%,
//         hsl(340deg 100% 50%) 50%,
//         hsl(46deg 100% 50%) 100%
//     );`,
// };

// // const dropKeyFrames = keyframes`
// //   0% {
// //     opacity: 0;
// //     transform: scale(1, 0.1);
// //   }
// //   100% {
// //     opacity: 1;
// //     transform: scale(1, 1);
// //   }
// // `;

// // const standardDrop = keyframes`
// //   0% {
// //     opacity: 0.5;
// //     transform: scale(0.5);
// //   }
// //   100% {
// //     opacity: 1;
// //     transform: scale(1);
// //   }
// // `;

// // const skeletonAnimation = keyframes`
// // 0% {
// //   transform: translateX(-100%);
// // }
// // 100% {
// //   transform: translateX(100%);
// // }
// // `;

// // const themeModeTransition = `background ${base.motion.duration[375]} ${base.motion.easing.simple.inOut}`;

// const baseSpacing = 24;

// const flattenObject = (obj, delimiter = '.', prefix = '') =>
//   Object.keys(obj).reduce((acc, k) => {
//     const pre = prefix.length ? `${prefix}${delimiter}` : '';
//     if (
//       typeof obj[k] === 'object' &&
//       obj[k] !== null &&
//       Object.keys(obj[k]).length > 0 &&
//       !('$value' in obj[k])
//     )
//       Object.assign(
//         acc,
//         flattenObject(
//           obj[k],
//           delimiter,
//           !['hpe', 'color'].includes(k) ? pre + k : '',
//         ),
//       );
//     else acc[pre + k] = obj[k];
//     return acc;
//   }, {});

// const access = (path, object) => {
//   return path.split('.').reduce((o, i) => o[i], object);
// };

// const componentSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
// const buttonKinds = ['default', 'secondary', 'primary', 'toolbar'];
// const buttonStates = ['hover', 'active', 'disabled'];

// const textSizes = [
//   'xsmall',
//   'small',
//   'medium',
//   'large',
//   'xlarge',
//   'xxlarge',
//   '3xlarge',
//   '4xlarge',
//   '5xlarge',
//   '6xlarge',
// ];

const getThemeColor = (color, theme) =>
  theme.global.colors[color]?.[theme.dark ? 'dark' : 'light'] || color;

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

// const globalSizes = {
//   borderSize: {
//     xsmall: '1px',
//     small: '2px',
//     medium: `${baseSpacing / 6}px`, // 4
//     large: `${baseSpacing / 2}px`, // 12
//     xlarge: `${baseSpacing}px`, // 24
//     default: '1px',
//   },
//   edgeSize: {
//     none: '0px',
//     hair: '1px', // for Chart
//     xxsmall: `${baseSpacing / 8}px`, // 3
//     xsmall: `${baseSpacing / 4}px`, // 6
//     small: `${baseSpacing / 2}px`, // 12
//     medium: `${baseSpacing}px`, // 24
//     large: `${baseSpacing * 2}px`, // 48
//     xlarge: `${baseSpacing * 4}px`, // 96
//     responsiveBreakpoint: 'small',
//   },
//   // same as edgeSize for backwards compatibility
//   radius: {
//     none: '0px',
//     hair: '1px', // for Chart
//     xxsmall: `${baseSpacing / 8}px`, // 3
//     xsmall: `${baseSpacing / 4}px`, // 6
//     small: `${baseSpacing / 2}px`, // 12
//     medium: `${baseSpacing}px`, // 24
//     large: `${baseSpacing * 2}px`, // 48
//     xlarge: `${baseSpacing * 4}px`, // 96
//     responsiveBreakpoint: 'small',
//   },
//   size: {
//     xxsmall: `${baseSpacing * 2}px`, // 48
//     xsmall: `${baseSpacing * 4}px`, // 96
//     small: `${baseSpacing * 8}px`, // 192
//     medium: `${baseSpacing * 16}px`, // 384
//     large: `${baseSpacing * 32}px`, // 768
//     xlarge: `${baseSpacing * 48}px`, // 1152
//     xxlarge: `${baseSpacing * 64}px`, // 1536
//     full: '100%',
//   },
// };

// const responsiveGlobalSizes = {
//   borderSize: {
//     xsmall: '1px',
//     small: '2px',
//     medium: `${baseSpacing / 6}px`, // 4
//     large: `${baseSpacing / 4}px`, // 6
//     xlarge: `${baseSpacing / 2}px`, // 12
//     default: '1px',
//   },
//   edgeSize: {
//     none: '0px',
//     hair: '1px', // for Chart
//     xxsmall: '2px',
//     xsmall: `${baseSpacing / 8}px`, // 3
//     small: `${baseSpacing / 4}px`, // 6
//     medium: `${baseSpacing / 2}px`, // 12
//     large: `${baseSpacing}px`, // 24
//     xlarge: `${baseSpacing * 2}px`, // 48
//   },
//   // same as edgeSize for backwards compatibility
//   radius: {
//     none: '0px',
//     hair: '1px', // for Chart
//     xxsmall: '2px',
//     xsmall: `${baseSpacing / 8}px`, // 3
//     small: `${baseSpacing / 4}px`, // 6
//     medium: `${baseSpacing / 2}px`, // 12
//     large: `${baseSpacing}px`, // 24
//     xlarge: `${baseSpacing * 2}px`, // 48
//   },
//   size: {
//     xxsmall: `${baseSpacing}px`, // 24
//     xsmall: `${baseSpacing * 2}px`, // 48
//     small: `${baseSpacing * 4}px`, // 96
//     medium: `${baseSpacing * 8}px`, // 192
//     large: `${baseSpacing * 16}px`, // 384
//     xlarge: `${baseSpacing * 32}px`, // 768
//     full: '100%',
//   },
// };

// const getTextSize = size => {
//   if (size === '3xlarge') return '3xl';
//   else if (size === '4xlarge') return '4xl';
//   else if (size === '5xlarge') return '5xl';
//   else if (size === '6xlarge') return '6xl';
//   return size;
// };

// const buildTheme = (tokens, flags) => {
//   const {
//     primitives,
//     light,
//     dark,
//     small,
//     large,
//     elevationlight,
//     elevationdark,
//     global,
//     components,
//   } = tokens;

//   const flatColors = flattenObject(light, '-');
//   const tokenColors = {};
//   Object.keys(flatColors).forEach(color => {
//     if (!color.includes('shadow')) {
//       const [category] = color.split('-');
//       const flatName = color.split('-').slice(1).join('-');
//       tokenColors[color] = {
//         light: access(
//           `hpe.color.${category}${flatName ? `.${flatName}` : ''}`,
//           light,
//         ),
//         dark: access(
//           `hpe.color.${category}${flatName ? `.${flatName}` : ''}`,
//           dark,
//         ),
//       };
//     }
//   });
//   const colors = {
//     // Here we're passing through all the colors from hpe-design-tokens
//     ...tokenColors,
//     // ---- DEPRECATED ---- //
//     'accent-1': undefined,
//     'accent-2': undefined,
//     'accent-3': undefined,
//     'accent-4': undefined,
//     'neutral-1': undefined,
//     'neutral-2': undefined,
//     'neutral-3': undefined,
//     'neutral-4': undefined,
//     'neutral-5': undefined,
//     'status-error': undefined,
//     // ----------- These ones we need to map manually for backwards compatibility -----------
//     // ----------- with current color namespace ---------------
//     control: 'background-primary-strong',
//     'active-text': 'text-strong',
//     'text-primary-button': components.hpe.button.primary.rest.textColor,
//     'background-cta-alternate': 'background-contrast',
//     brand: {
//       dark: dark.hpe.color.decorative.brand,
//       light: light.hpe.color.decorative.brand,
//     },
//     'background-layer-overlay': {
//       dark: dark.hpe.color.background.screenOverlay,
//       light: light.hpe.color.background.screenOverlay,
//     },
//     'active-background': {
//       dark: dark.hpe.color.background.active,
//       light: light.hpe.color.background.active,
//     },
//     background: {
//       dark: dark.hpe.color.background.default,
//       light: light.hpe.color.background.default,
//     },
//     text: {
//       dark: dark.hpe.color.text.default,
//       light: light.hpe.color.text.default,
//     },
//     border: {
//       dark: dark.hpe.color.border.default,
//       light: light.hpe.color.border.default,
//     },
//     blue: {
//       dark: dark.hpe.color.decorative.blue,
//       light: light.hpe.color.decorative.blue,
//     },
//     'blue!': primitives.hpe.base.color['blue-700'],
//     green: {
//       dark: dark.hpe.color.decorative.green,
//       light: light.hpe.color.decorative.green,
//     },
//     'green!': {
//       dark: dark.hpe.color.decorative.brand,
//       light: light.hpe.color.decorative.brand,
//     },
//     teal: {
//       dark: dark.hpe.color.decorative.teal,
//       light: light.hpe.color.decorative.teal,
//     },
//     'teal!': primitives.hpe.base.color['teal-400'],
//     purple: {
//       dark: dark.hpe.color.decorative.purple,
//       light: light.hpe.color.decorative.purple,
//     },
//     'purple!': primitives.hpe.base.color['purple-800'],
//     red: {
//       dark: dark.hpe.color.decorative.red,
//       light: light.hpe.color.decorative.red,
//     },
//     'red!': primitives.hpe.base.color['red-750'],
//     orange: {
//       dark: dark.hpe.color.decorative.orange,
//       light: light.hpe.color.decorative.orange,
//     },
//     'orange!': primitives.hpe.base.color['orange-500'],
//     yellow: {
//       dark: dark.hpe.color.decorative.yellow,
//       light: light.hpe.color.decorative.yellow,
//     },
//     'yellow!': primitives.hpe.base.color['yellow-400'],
//     'graph-0': {
//       light: light.hpe.color.dataVis['categorical-10'],
//       dark: dark.hpe.color.dataVis['categorical-10'],
//     },
//     'graph-1': {
//       light: light.hpe.color.dataVis['categorical-20'],
//       dark: dark.hpe.color.dataVis['categorical-20'],
//     },
//     'graph-2': {
//       light: light.hpe.color.dataVis['categorical-30'],
//       dark: dark.hpe.color.dataVis['categorical-30'],
//     },
//     'graph-3': {
//       light: light.hpe.color.dataVis['categorical-40'],
//       dark: dark.hpe.color.dataVis['categorical-40'],
//     },
//     'graph-4': {
//       light: light.hpe.color.dataVis['categorical-50'],
//       dark: dark.hpe.color.dataVis['categorical-50'],
//     },
//     'graph-5': {
//       light: light.hpe.color.dataVis['categorical-60'],
//       dark: dark.hpe.color.dataVis['categorical-60'],
//     },
//     'graph-6': {
//       light: light.hpe.color.dataVis['categorical-70'],
//       dark: dark.hpe.color.dataVis['categorical-70'],
//     },
//     'status-critical': {
//       dark: dark.hpe.color.icon.critical,
//       light: light.hpe.color.icon.critical,
//     },
//     'status-warning': {
//       dark: dark.hpe.color.icon.warning,
//       light: light.hpe.color.icon.warning,
//     },
//     'status-ok': {
//       dark: dark.hpe.color.icon.ok,
//       light: light.hpe.color.icon.ok,
//     },
//     'status-unknown': {
//       dark: dark.hpe.color.icon.unknown,
//       light: light.hpe.color.icon.unknown,
//     },
//     'status-disabled': '#CCCCCC', // deprecated, does not support light and dark.hpe. use text-weak instead
//     'validation-critical': {
//       light: light.hpe.color.background.critical,
//       dark: dark.hpe.color.background.critical,
//     },
//     'validation-ok': {
//       light: light.hpe.color.background.ok,
//       dark: dark.hpe.color.background.ok,
//     },
//     'validation-warning': {
//       light: light.hpe.color.background.warning,
//       dark: dark.hpe.color.background.critical,
//     },
//     icon: {
//       light: light.hpe.color.icon.default,
//       dark: dark.hpe.color.icon.default,
//     },
//     'selected-background': 'background-selected-strong-enabled',
//     'selected-text': 'text-onSelectedPrimaryStrong',
//     placeholder: {
//       light: light.hpe.color.text.placeholder,
//       dark: dark.hpe.color.text.placeholder,
//     },
//     'disabled-text': 'text-disabled', // deprecate
//   };

//   const size = breakpoint => ({
//     xxsmall: breakpoint.hpe.container.xxsmall,
//     xsmall: breakpoint.hpe.container.xsmall,
//     small: breakpoint.hpe.container.small,
//     medium: breakpoint.hpe.container.medium,
//     large: breakpoint.hpe.container.large,
//     xlarge: breakpoint.hpe.container.xlarge,
//     xxlarge: breakpoint.hpe.container.xxlarge,
//     full: '100%',
//   });

//   const dimensions = {
//     ...(flags['v6-backwards-compatibility']
//       ? globalSizes
//       : {
//           borderSize: {
//             xsmall: large.hpe.borderWidth.xsmall,
//             small: large.hpe.borderWidth.small,
//             medium: large.hpe.borderWidth.medium,
//             default: large.hpe.borderWidth.default,
//             large: large.hpe.borderWidth.large,
//             xlarge: large.hpe.borderWidth.xlarge,
//           },
//           edgeSize: {
//             none: large.hpe.spacing.none,
//             hair: large.hpe.spacing.hair,
//             '5xsmall': large.hpe.spacing['5xsmall'],
//             '4xsmall': large.hpe.spacing['4xsmall'],
//             '3xsmall': large.hpe.spacing['3xsmall'],
//             xxsmall: large.hpe.spacing.xxsmall,
//             xsmall: large.hpe.spacing.xsmall,
//             small: large.hpe.spacing.small,
//             medium: large.hpe.spacing.medium,
//             large: large.hpe.spacing.large,
//             xlarge: large.hpe.spacing.xlarge,
//             xxlarge: large.hpe.spacing.xxlarge,
//             '3xlarge': large.hpe.spacing['3xlarge'],
//             responsiveBreakpoint: 'small',
//           },
//           radius: {
//             none: large.hpe.radius.none,
//             hair: large.hpe.radius.hair,
//             xxsmall: large.hpe.radius.xxsmall,
//             xsmall: large.hpe.radius.xsmall,
//             small: large.hpe.radius.small,
//             medium: large.hpe.radius.medium,
//             large: large.hpe.radius.large,
//             xlarge: large.hpe.radius.xlarge,
//             xxlarge: large.hpe.radius.xxlarge,
//             responsiveBreakpoint: 'small',
//           },
//           size: size(large),
//         }),
//     breakpoints: {
//       xsmall: {
//         ...(flags['v6-backwards-compatibility']
//           ? responsiveGlobalSizes
//           : {
//               borderSize: {
//                 xsmall: small.hpe.borderWidth.xsmall,
//                 small: small.hpe.borderWidth.small,
//                 medium: small.hpe.borderWidth.medium,
//                 default: small.hpe.borderWidth.default,
//                 large: small.hpe.borderWidth.large,
//                 xlarge: small.hpe.borderWidth.xlarge,
//               },
//               edgeSize: {
//                 none: small.hpe.spacing.none,
//                 hair: small.hpe.spacing.hair,
//                 xxsmall: small.hpe.spacing.xxsmall,
//                 xsmall: small.hpe.spacing.xsmall,
//                 small: small.hpe.spacing.small,
//                 medium: small.hpe.spacing.medium,
//                 large: small.hpe.spacing.large,
//                 xlarge: small.hpe.spacing.xlarge,
//                 responsiveBreakpoint: 'small',
//               },
//               radius: {
//                 none: small.hpe.radius.none,
//                 hair: small.hpe.radius.hair,
//                 xxsmall: small.hpe.radius.xxsmall,
//                 xsmall: small.hpe.radius.xsmall,
//                 small: small.hpe.radius.small,
//                 medium: small.hpe.radius.medium,
//                 large: small.hpe.radius.large,
//                 xlarge: small.hpe.radius.xlarge,
//                 xxlarge: small.hpe.radius.xxlarge,
//                 responsiveBreakpoint: 'small',
//               },
//               size: size(small),
//             }),
//         value: parseInt(global.hpe.breakpoint.xsmall, 10),
//       },
//       small: {
//         ...(flags['v6-backwards-compatibility']
//           ? responsiveGlobalSizes
//           : {
//               borderSize: {
//                 xsmall: small.hpe.borderWidth.xsmall,
//                 small: small.hpe.borderWidth.small,
//                 medium: small.hpe.borderWidth.medium,
//                 default: small.hpe.borderWidth.default,
//                 large: small.hpe.borderWidth.large,
//                 xlarge: small.hpe.borderWidth.xlarge,
//               },
//               edgeSize: {
//                 none: small.hpe.spacing.none,
//                 hair: small.hpe.spacing.hair,
//                 xxsmall: small.hpe.spacing.xxsmall,
//                 xsmall: small.hpe.spacing.xsmall,
//                 small: small.hpe.spacing.small,
//                 medium: small.hpe.spacing.medium,
//                 large: small.hpe.spacing.large,
//                 xlarge: small.hpe.spacing.xlarge,
//                 responsiveBreakpoint: 'small',
//               },
//               radius: {
//                 none: small.hpe.radius.none,
//                 hair: small.hpe.radius.hair,
//                 xxsmall: small.hpe.radius.xxsmall,
//                 xsmall: small.hpe.radius.xsmall,
//                 small: small.hpe.radius.small,
//                 medium: small.hpe.radius.medium,
//                 large: small.hpe.radius.large,
//                 xlarge: small.hpe.radius.xlarge,
//                 xxlarge: small.hpe.radius.xxlarge,
//                 responsiveBreakpoint: 'small',
//               },
//               size: size(small),
//             }),
//         value: parseInt(global.hpe.breakpoint.small, 10),
//       },
//       medium: {
//         value: parseInt(global.hpe.breakpoint.medium, 10),
//       },
//       large: {
//         value: parseInt(global.hpe.breakpoint.large, 10),
//       },
//       xlarge: {},
//     },
//   };

//   // option button kind styles. abstracted so select.emptySearchMessage
//   // can reference pad value
//   const option = {
//     color: components.hpe.select.default.option.rest.textColor,
//     border: {
//       radius:
//         dimensions.edgeSize[
//           components.hpe.select.default.medium.option.borderRadius
//         ] || components.hpe.select.default.medium.option.borderRadius,
//       width:
//         dimensions.borderSize[
//           components.hpe.select.default.medium.option.borderWidth
//         ] || components.hpe.select.default.medium.option.borderWidth,
//       color: components.hpe.select.default.option.rest.borderColor,
//     },
//     pad: {
//       horizontal: components.hpe.select.default.medium.option.paddingX,
//       vertical: components.hpe.select.default.medium.option.paddingY,
//     },
//     font: {
//       weight: components.hpe.select.default.option.rest.fontWeight,
//     },
//   };

//   // abstracted so button and pinned list icon can reference
//   const mediumIconOnlyPad = {
//     vertical: components.hpe.button.default.medium.iconOnly.paddingY,
//     horizontal: components.hpe.button.default.medium.iconOnly.paddingY,
//   };

//   const anchorSizeTheme = {};
//   textSizes.forEach(sizeArg => {
//     const size = sizeArg === '6xlarge' ? '5xlarge' : sizeArg;
//     const themeSize = getTextSize(size);
//     anchorSizeTheme[themeSize] = {
//       color: components.hpe.anchor.default.rest.textColor,
//       textDecoration: components.hpe.anchor.default.rest.textDecoration,
//       fontWeight: components.hpe.anchor.default.rest.fontWeight,
//       gap: components.hpe.anchor.default[size].gapX,
//     };
//   });

//   const paragraphTheme = {};
//   const textTheme = {};
//   const fontWeights = {};
//   // Keep track of the largest text size to use as a fallback
//   // because grommet theme has a max size of 6xl, but design tokens
//   // only supports up to 5xl.
//   const fallback = {
//     size: '0rem',
//     height: '0rem',
//     maxWidth: '0rem',
//     weight: 0,
//   };
//   textSizes.forEach(size => {
//     if (
//       parseInt(large.hpe.text?.[size]?.fontSize.replace('rem', ''), 10) >
//       parseInt(fallback.size.replace('rem', ''), 10)
//     ) {
//       fallback.size = large.hpe.text?.[size]?.fontSize;
//       fallback.height = large.hpe.text?.[size]?.lineHeight;
//       fallback.maxWidth = large.hpe.text?.[size]?.maxWidth;
//       fallback.weight = large.hpe.text?.[size]?.fontWeight;
//     }
//     const themeSize = getTextSize(size);
//     paragraphTheme[themeSize] = {
//       size: large.hpe.text?.[size]?.fontSize || fallback.size,
//       height: large.hpe.text?.[size]?.lineHeight || fallback.height,
//       maxWidth: large.hpe.text?.[size]?.maxWidth || fallback.maxWidth,
//     };
//     textTheme[themeSize] = {
//       size: large.hpe.text?.[size]?.fontSize || fallback.size,
//       height: large.hpe.text?.[size]?.lineHeight || fallback.height,
//     };
//     fontWeights[themeSize] =
//       large.hpe.text?.[size]?.fontWeight || fallback.weight;
//   });

//   textTheme.extend = ({ size, weight }) => {
//     return !weight ? `font-weight: ${fontWeights[size]};` : '';
//   };

//   paragraphTheme.extend = ({ size, weight }) => {
//     return !weight ? `font-weight: ${fontWeights[size]};` : '';
//   };

//   const buttonKindTheme = {};
//   buttonKinds.forEach(kind => {
//     const borderWidth = components.hpe.button[kind]?.medium.borderWidth;
//     const borderRadius = components.hpe.button[kind]?.medium.borderRadius;
//     buttonKindTheme[kind] = {
//       background: components.hpe.button?.[kind].rest.background,
//       border: {
//         width: dimensions.borderSize[borderWidth] || borderWidth,
//         color: components.hpe.button?.[kind].rest.borderColor,
//         radius: dimensions.borderSize[borderRadius] || borderRadius,
//       },
//       color: components.hpe.button?.[kind].rest.textColor,
//       font: {
//         weight: components.hpe.button?.[kind].rest.fontWeight,
//       },
//     };
//   });

//   const buttonStatesTheme = {};
//   buttonStates.forEach(state => {
//     buttonStatesTheme[state] = {};
//     buttonKinds.forEach(kind => {
//       let adjustedState = state;
//       if (state === 'active') {
//         adjustedState = 'selected';
//         buttonStatesTheme[state][kind] = {
//           background: {
//             color:
//               components.hpe.button?.[kind]?.[adjustedState].rest.background,
//           },
//           border: {
//             color:
//               components.hpe.button?.[kind]?.[adjustedState].rest.borderColor,
//           },
//           color: components.hpe.button?.[kind]?.[adjustedState].rest.textColor,
//           font: {
//             weight:
//               components.hpe.button?.[kind]?.[adjustedState].rest.fontWeight,
//           },
//         };
//         if (!('active' in buttonStatesTheme.hover))
//           buttonStatesTheme.hover.active = {};
//         buttonStatesTheme.hover[state][kind] = {
//           background: {
//             color:
//               components.hpe.button?.[kind]?.[adjustedState]?.hover?.background,
//           },
//           border: {
//             color:
//               components.hpe.button?.[kind]?.[adjustedState]?.hover
//                 ?.borderColor,
//           },
//           color:
//             components.hpe.button?.[kind]?.[adjustedState]?.hover?.textColor,
//           font: {
//             weight:
//               components.hpe.button?.[kind]?.[adjustedState]?.hover?.fontWeight,
//           },
//         };
//       } else if (kind === 'option') {
//         if (state === 'active') adjustedState = 'selected';
//         buttonStatesTheme[state][kind] = {
//           background: {
//             color:
//               components.hpe.select.default.option?.[adjustedState].rest
//                 .background,
//           },
//           border: {
//             color:
//               components.hpe.select.default.option?.[adjustedState].borderColor,
//           },
//           color:
//             components.hpe.select.default.option?.[adjustedState].textColor,
//         };
//       } else if (state === 'disabled') {
//         buttonStatesTheme[state][kind] = {
//           background: {
//             color:
//               components.hpe.button?.[kind]?.[adjustedState].rest.background,
//           },
//           border: {
//             width: '',
//             color:
//               components.hpe.button?.[kind]?.[adjustedState].rest.borderColor,
//           },
//           color: components.hpe.button?.[kind]?.[adjustedState].rest.textColor,
//           font: {
//             weight:
//               components.hpe.button?.[kind]?.[adjustedState].rest.fontWeight,
//           },
//         };
//       } else {
//         buttonStatesTheme[state][kind] = {
//           background: {
//             color: components.hpe.button?.[kind]?.[adjustedState].background,
//           },
//           border: {
//             width: '',
//             color: components.hpe.button?.[kind]?.[adjustedState].borderColor,
//           },
//           color: components.hpe.button?.[kind]?.[adjustedState].textColor,
//           font: {
//             weight: components.hpe.button?.[kind]?.[adjustedState].fontWeight,
//           },
//         };
//       }
//     });
//   });

//   const buttonSizesTheme = {};
//   componentSizes.forEach(size => {
//     const kindStyles = {};
//     buttonKinds.forEach(kind => {
//       kindStyles[kind] = {
//         border: {
//           radius: components.hpe.button?.[kind]?.[size]?.borderRadius,
//         },
//         pad: {
//           vertical: components.hpe.button?.[kind]?.[size]?.paddingY,
//           horizontal: components.hpe.button?.[kind]?.[size]?.paddingX,
//         },
//       };
//     });
//     buttonSizesTheme[size] = {
//       border: {
//         radius: components.hpe.button?.default?.[size]?.borderRadius,
//       },
//       pad: {
//         vertical: components.hpe.button?.default?.[size]?.paddingY,
//         horizontal: components.hpe.button?.default?.[size]?.paddingX,
//       },
//       iconOnly: {
//         pad: {
//           vertical: components.hpe.button?.default?.[size]?.iconOnly.paddingY,
//           horizontal: components.hpe.button?.default?.[size]?.iconOnly.paddingX,
//         },
//       },
//       ...kindStyles,
//     };
//   });

//   const focusBoxShadowParts = global.hpe.focusIndicator.boxShadow
//     .trim()
//     .split(' ');

//   return deepFreeze({
//     defaultMode: 'light',
//     global: {
//       backgrounds, // TO DO backgrounds
//       ...dimensions,
//       colors,
//       control: {
//         border: {
//           radius:
//             components.hpe.formField.default.medium.input.container
//               .borderRadius,
//           color:
//             components.hpe.formField.default.input.container.rest.borderColor,
//         },
//         disabled: {
//           opacity: 1,
//         },
//       },
//       input: {
//         font: {
//           height: 'inherit',
//           weight: components.hpe.formField.default.medium.value.fontWeight,
//         },
//         padding: {
//           horizontal:
//             components.hpe.formField.default.medium.input.container.paddingX,
//           vertical:
//             components.hpe.formField.default.medium.input.container.paddingY,
//         },
//         readOnly: {
//           background:
//             components.hpe.formField.default.input.container.readOnly.rest
//               .background,
//           border: {
//             color:
//               components.hpe.formField.default.input.container.readOnly.rest
//                 .borderColor,
//           },
//         },
//         extend: ({ theme }) => `
//           color: ${getThemeColor(
//             components.hpe.formField.default.value.rest.textColor,
//             theme,
//           )};
//           &::-webkit-input-placeholder {
//           font-weight: ${
//             components.hpe.formField.default.medium.placeholder.fontWeight
//           };
//         }

//         &::-moz-placeholder {
//           font-weight: ${
//             components.hpe.formField.default.medium.placeholder.fontWeight
//           };
//         }

//         &:-ms-input-placeholder {
//           font-weight: ${
//             components.hpe.formField.default.medium.placeholder.fontWeight
//           };
//         }
//         `,
//       },
//       font: {
//         family: global.hpe.fontStack.primary,
//         face: `
//           @font-face {
//             font-family: "Metric";
//             src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff2") format('woff2'),
//                  url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff") format('woff');
//           }
//           @font-face {
//             font-family: "Metric";
//             src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff2") format('woff2'),
//                  url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Regular.woff") format('woff');
//             font-weight: 400;
//           }
//           @font-face {
//             font-family: "Metric";
//             src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Bold.woff2") format('woff2'),
//                  url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Bold.woff") format('woff');
//             font-weight: 700;
//           }
//           @font-face {
//             font-family: "Metric";
//             src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Semibold.woff2") format('woff2'),
//                  url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Semibold.woff") format('woff');
//             font-weight: 600;
//           }
//           @font-face {
//             font-family: "Metric";
//             src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Medium.woff2") format('woff2'),
//                  url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Medium.woff") format('woff');
//             font-weight: 500;
//           }
//           @font-face {
//             font-family: "Metric";
//             src: url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Light.woff2") format('woff2'),
//                  url("https://www.hpe.com/content/dam/hpe/fonts/metric-hpe-web/MetricHPE-Web-Light.woff") format('woff');
//             font-weight: 100;
//           }`,
//         size: large.hpe.text.medium.fontSize,
//         height: large.hpe.text.medium.lineHeight,
//       },
//       focus: {
//         border: undefined,
//         outline: {
//           color: global.hpe.focusIndicator.outline.color,
//           size: global.hpe.focusIndicator.outline.width,
//           offset: global.hpe.focusIndicator.outlineOffset,
//         },
//         shadow: {
//           color: focusBoxShadowParts[focusBoxShadowParts.length - 1],
//           size: focusBoxShadowParts[focusBoxShadowParts.length - 2],
//         },
//         twoColor: true,
//       },
//       active: {
//         background: 'background-active',
//         color: 'active-text',
//       },
//       drop: {
//         background: components.hpe.drop.default.background,
//         border: {
//           radius:
//             dimensions.edgeSize[components.hpe.drop.default.borderRadius] ||
//             components.hpe.drop.default.borderRadius,
//         },
//         margin: components.hpe.drop.default.margin,
//         intelligentMargin: true,
//         shadowSize: 'medium',
//         /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
//          * at a z-index of 101. This adjustment brings Drop in alignment with Layer
//          * which needs an elevated z-index to sit atop the Global header. */
//         zIndex: components.hpe.drop.default.zIndex,
//       },
//       elevation: {
//         // Elevation values were derived from this Figma file.
//         // https://www.figma.com/file/eZYR3dtWdb9U90QvJ7p3T9/HPE-Color-Styles?node-id=405%3A25
//         // Naming in Figma file is strong/default/weak vs. Grommet t-shirt sizing.
//         // As defined here, default is currently mapping to medium.
//         light: {
//           small: elevationlight
//             ? elevationlight.hpe.elevation.small
//             : light.hpe.shadow.small,
//           medium: elevationlight
//             ? elevationlight.hpe.elevation.medium
//             : light.hpe.shadow.medium,
//           large: elevationlight
//             ? elevationlight.hpe.elevation.large
//             : light.hpe.shadow.large,
//         },
//         dark: {
//           small: elevationdark
//             ? elevationdark.hpe.elevation.small
//             : dark.hpe.shadow.small,
//           medium: elevationdark
//             ? elevationdark.hpe.elevation.medium
//             : dark.hpe.shadow.medium,
//           large: elevationdark
//             ? elevationdark.hpe.elevation.large
//             : dark.hpe.shadow.large,
//         },
//       },
//       hover: {
//         background: 'background-hover',
//         color: 'text-default',
//       },
//       selected: {
//         background: 'background-selected-primary-strong',
//         color: 'text-onSelectedPrimaryStrong',
//       },
//     },
//     accordion: {
//       panel: {
//         border: {
//           side: 'horizontal',
//           color: 'border',
//         },
//       },
//       heading: {
//         level: 3,
//         margin: { vertical: 'medium', horizontal: 'xsmall' },
//       },
//       hover: {
//         background: 'background-hover',
//         heading: {
//           color: undefined,
//         },
//       },
//       border: undefined,
//       icons: {
//         collapse: Up,
//         expand: Down,
//         color: 'text',
//       },
//     },
//     anchor: {
//       color: components.hpe.anchor.default.rest.textColor,
//       textDecoration: components.hpe.anchor.default.rest.textDecoration,
//       fontWeight: components.hpe.anchor.default.rest.fontWeight,
//       gap: components.hpe.anchor.default.medium.gapX, // TO DO not size specific
//       icon: {
//         color: 'icon-primary',
//       },
//       hover: {
//         textDecoration: components.hpe.anchor.default.hover.textDecoration,
//         extend: ({ theme }) =>
//           `color: ${getThemeColor(
//             components.hpe.anchor.default.hover.textColor,
//             theme,
//           )};`,
//       },
//       size: anchorSizeTheme,
//     },
//     avatar: {
//       size: {
//         xsmall: components.hpe.element?.xsmall.minHeight,
//         small: components.hpe.element?.small.minHeight, // 24px
//         medium: components.hpe.element?.medium.minHeight, // default 48px
//         large: components.hpe.element?.large.minHeight, // 72px
//         xlarge: components.hpe.element?.xlarge.minHeight, // 96px
//         '2xl': `${baseSpacing * 5}px`,
//         '3xl': `${baseSpacing * 6}px`,
//         '4xl': `${baseSpacing * 7}px`,
//         '5xl': `${baseSpacing * 8}px`,
//       },
//       text: {
//         size: {
//           xsmall: 'xsmall',
//           small: 'small',
//           medium: 'medium',
//           large: 'large',
//           xlarge: 'xlarge',
//           '2xl': '3xl',
//           '3xl': '4xl',
//           '4xl': '5xl',
//           '5xl': '6xl',
//         },
//       },
//     },
//     button: {
//       intelligentPad: false,
//       color: components.hpe.button.default.rest.textColor,
//       gap: components.hpe.button.default.medium.gapX,
//       badge: {
//         align: 'container',
//         container: {
//           background: 'background-neutral-xstrong',
//         },
//         size: {
//           medium: '18px', // Q: what token should be used here? no token for this at the moments
//         },
//         text: {
//           size: {
//             medium: 'xsmall',
//           },
//         },
//       },
//       // TO DO add cta-primary variant
//       'cta-primary': {
//         ...buttonKindTheme.primary,
//         icon: <Hpe />,
//         reverse: true,
//         extend: '',
//       },
//       // TO DO add cta-alternate variant
//       'cta-alternate': {
//         ...buttonKindTheme.secondary,
//         icon: <Hpe color="icon-brand" />,
//         reverse: true,
//       },
//       ...buttonKindTheme,
//       option,
//       active: buttonStatesTheme.active,
//       disabled: {
//         opacity: 1,
//         ...buttonStatesTheme.disabled,
//       },
//       selected: {
//         option: {
//           background:
//             components.hpe.select.default.option.selected.rest.background,
//           border: {
//             color:
//               components.hpe.select.default.option.selected.rest.borderColor,
//           },
//           color: components.hpe.select.default.option.selected.textColor,
//           font: {
//             weight:
//               components.hpe.select.default.option.selected.rest.fontWeight,
//           },
//           extend: ({ theme }) =>
//             `
//             position: relative;
//             &::before {
//               display: block;
//               position: absolute;
//               content: '';
//               width: ${
//                 components.hpe.select.default.medium.option.marker.width
//               };
//               border-top-left-radius: ${
//                 components.hpe.select.default.medium.option.marker
//                   .borderTopLeftRadius
//               };
//               border-bottom-left-radius: ${
//                 components.hpe.select.default.medium.option.marker
//                   .borderBottomLeftRadius
//               };
//               top: ${components.hpe.select.default.medium.option.marker.top};
//               bottom: ${
//                 components.hpe.select.default.medium.option.marker.bottom
//               };
//               left: ${components.hpe.select.default.medium.option.marker.left};
//               background: ${getThemeColor(
//                 components.hpe.select.default.option.marker.rest.background,
//                 theme,
//               )};
//             }
//           `,
//         },
//       },
//       hover: {
//         'cta-primary': buttonStatesTheme.hover.primary,
//         'cta-alternate': {
//           ...buttonStatesTheme.hover.secondary,
//           extend: '', // TO DO can remove when merging, temp to override extend
//         },
//         ...buttonStatesTheme.hover,
//         option: {
//           background: components.hpe.select.default.option.hover.background,
//           border: {
//             color: components.hpe.select.default.option.hover.borderColor,
//           },
//           color: components.hpe.select.default.option.hover.textColor,
//           extend: props =>
//             props['aria-selected'] &&
//             `
//            background: ${getThemeColor(
//              components.hpe.select.default.option.selected.hover.background,
//              props.theme,
//            )};
//           color: ${getThemeColor(
//             components.hpe.select.default.option.selected.hover.textColor,
//             props.theme,
//           )}
//           `,
//         },
//       },
//       size: {
//         ...buttonSizesTheme,
//         medium: {
//           ...buttonSizesTheme.medium,
//           option: {
//             pad: {
//               horizontal: components.hpe.select.default.medium.option.paddingX,
//               vertical: components.hpe.select.default.medium.option.paddingY,
//             },
//           },
//         },
//       },
//       extend: ({ sizeProp, hasIcon, hasLabel, kind, plain }) => {
//         let style = '';
//         const iconOnly = hasIcon && !hasLabel;
//         // kind and size specific icon-only padding
//         if (
//           !plain &&
//           iconOnly &&
//           components.hpe.button[kind]?.[sizeProp]?.iconOnly?.paddingY &&
//           components.hpe.button[kind]?.[sizeProp]?.iconOnly?.paddingX
//         )
//           style += `padding: ${components.hpe.button[kind][sizeProp].iconOnly.paddingY} ${components.hpe.button[kind][sizeProp].iconOnly.paddingX}`;
//         return style;
//       },
//     },
//     calendar: {
//       day: {
//         adjacent: {
//           color: 'text-weak',
//         },
//         hover: {
//           background: 'background-hover',
//           color: 'text-strong',
//         },
//         selected: {
//           background: 'background-selected-primary-strong',
//           color: 'text-onSelectedPrimaryStrong',
//           hover: {
//             background: 'background-selected-primary-strong-hover',
//           },
//           font: {
//             weight: global.hpe.fontWeight.medium,
//           },
//         },
//         inRange: {
//           color: 'text-onSelectedPrimary',
//           hover: {
//             background: 'background-selected-primary-hover',
//             color: 'text-onSelectedPrimary',
//           },
//           font: {
//             weight: global.hpe.fontWeight.medium,
//           },
//         },
//         extend: '',
//       },
//       range: {
//         background: 'background-selected-primary',
//       },
//       icons: {
//         // next: Next,
//         // previous: Previous,
//       },
//       small: {
//         fontSize: '13.6px',
//         lineHeight: 1.375,
//         daySize: '27.43px',
//         title: {
//           size: 'medium',
//           weight: global.hpe.fontWeight.normal,
//           color: 'text-strong',
//         },
//       },
//       medium: {
//         fontSize: '18px',
//         lineHeight: 1.45,
//         daySize: '54.86px',
//         day: {
//           round: 'full',
//         },
//         range: {
//           round: 'none',
//           start: {
//             round: {
//               corner: 'left',
//               size: 'full',
//             },
//           },
//           end: {
//             round: {
//               corner: 'right',
//               size: 'full',
//             },
//           },
//         },
//         title: {
//           size: 'large',
//           weight: global.hpe.fontWeight.normal,
//           color: 'text-strong',
//         },
//       },
//       large: {
//         fontSize: '31.2px',
//         lineHeight: 1.11,
//         daySize: '109.71px',
//         title: {
//           size: 'xlarge',
//           weight: global.hpe.fontWeight.normal,
//           color: 'text-strong',
//         },
//       },
//     },
//     card: {
//       container: {
//         background: 'background-front',
//         elevation: 'none',
//         extend: 'transition: box-shadow 0.3s ease-in-out;',
//       },
//       body: {
//         pad: 'medium',
//       },
//       footer: {
//         pad: { horizontal: 'medium', vertical: 'small' },
//       },
//       header: {
//         pad: 'medium',
//       },
//       hover: {
//         container: {
//           elevation: 'medium',
//         },
//       },
//     },
//     checkBox: {
//       hover: {
//         border: {
//           // applies directly to control (checkbox and toggle switch)
//           // TO DO remove from applying to switch
//           color: undefined,
//           width:
//             dimensions.borderSize[
//               components.hpe.checkbox.default.medium.control.borderWidth
//             ] || components.hpe.checkbox.default.medium.control.borderWidth,
//         },
//         // applies to container around control and label
//         background: {
//           color: undefined,
//         },
//         extend: ({ theme, toggle, checked }) => {
//           let borderColor;
//           if (toggle) {
//             borderColor = getThemeColor(
//               components.hpe.switch.default.control.track.hover.borderColor,
//               theme,
//             );
//           } else if (checked) {
//             if (toggle) {
//               borderColor = getThemeColor(
//                 components.hpe.switch.default.control.track.selected.hover
//                   .borderColor,
//                 theme,
//               );
//             } else {
//               borderColor = getThemeColor(
//                 components.hpe.checkbox.default.control.selected.hover
//                   .borderColor,
//                 theme,
//               );
//             }
//           }
//           return css`
//             ${checked ? `border-color: ${borderColor};` : ''}
//           `;
//         },
//       },
//       color: components.hpe.switch.default.control.handle.rest.background, // The stroke color for the CheckBox icon, the toggle handle background when checked, and the border when checked. Setting to handle background since this is the only place to control this.
//       border: {
//         color: components.hpe.checkbox.default.control.rest.borderColor,
//         width:
//           dimensions.borderSize[
//             components.hpe.checkbox.default.medium.control.borderWidth
//           ] || components.hpe.checkbox.default.medium.control.borderWidth,
//       },
//       check: {
//         radius: components.hpe.checkbox.default.medium.control.borderRadius,
//         thickness: '2px', // The stroke width of the checked icon.
//         extend: ({ theme, checked, indeterminate, disabled }) => {
//           let background = getThemeColor(
//             components.hpe.checkbox.default.control.rest.background,
//             theme,
//           );
//           let hoverBackground = getThemeColor(
//             components.hpe.checkbox.default.control.hover.background,
//             theme,
//           );
//           let borderColor = getThemeColor(
//             components.hpe.checkbox.default.control.rest.borderColor,
//             theme,
//           );
//           if (checked || indeterminate) {
//             background = getThemeColor(
//               components.hpe.checkbox.default.control.selected.rest.background,
//               theme,
//             );
//             borderColor = getThemeColor(
//               components.hpe.checkbox.default.control.selected.rest.borderColor,
//               theme,
//             );
//           }
//           if (checked || indeterminate) {
//             hoverBackground = getThemeColor(
//               components.hpe.checkbox.default.control.selected.hover.background,
//               theme,
//             );
//           }
//           if (disabled) {
//             background = getThemeColor(
//               components.hpe.checkbox.default.control.disabled.rest.background,
//               theme,
//             );
//             borderColor = getThemeColor(
//               components.hpe.checkbox.default.control.disabled.rest.borderColor,
//               theme,
//             );
//           }
//           return `
//             background: ${background};
//             border-color: ${borderColor};
//             &:hover {
//               ${!disabled ? `background: ${hoverBackground};` : ''}
//             }
//             ${(checked || indeterminate) && 'border: none;'}
//           `;
//         },
//       },
//       icon: {
//         extend: ({ theme }) => `stroke-width: 2px;
//         stroke: ${getThemeColor(
//           components.hpe.checkbox.default.control.selected.rest.iconColor,
//           theme,
//         )}`,
//       },
//       gap: components.hpe.checkbox.default.medium.gapX,
//       label: {
//         align: 'start',
//       },
//       pad: 'none',
//       size: components.hpe.checkbox.default.medium.control.width,
//       toggle: {
//         background: components.hpe.switch.default.control.track.rest.background,
//         color: components.hpe.switch.default.control.handle.rest.background,
//         size: components.hpe.switch.default.medium.control.track.width,
//         knob: {
//           extend: ({ theme, checked, disabled }) => {
//             const insetHandle =
//               dimensions.borderSize[
//                 components.hpe.switch.default.medium.control.handle.borderWidth
//               ] ||
//               dimensions.borderSize[
//                 components.hpe.switch.default.medium.control.handle.borderWidth
//               ];

//             return `
//           box-shadow: ${
//             theme.global.elevation[theme.dark ? 'dark' : 'light'][
//               components.hpe.switch.default.control.handle.rest.boxShadow
//             ]
//           };
//           border: ${
//             dimensions.borderSize[
//               components.hpe.switch.default.medium.control.handle.borderWidth
//             ]
//           } solid ${getThemeColor(
//               disabled
//                 ? components.hpe.switch.default.control.handle.disabled.rest
//                     .borderColor
//                 : components.hpe.switch.default.control.handle.rest.borderColor,
//               theme,
//             )};
//           width: ${components.hpe.switch.default.medium.control.handle.width};
//           height: ${components.hpe.switch.default.medium.control.handle.height};
//           top: ${insetHandle};
//           left: ${!checked ? insetHandle : '25px'};
//           `;
//           },
//         },
//         // applies to track around handle
//         extend: ({ checked, theme, disabled }) => {
//           let background;
//           let hoverBackground = getThemeColor(
//             components.hpe.switch.default.control.track.hover.background,
//             theme,
//           );
//           let borderColor = getThemeColor(
//             components.hpe.switch.default.control.track.rest.borderColor,
//             theme,
//           );
//           if (checked) {
//             background = getThemeColor(
//               components.hpe.switch.default.control.track.selected.rest
//                 .background,
//               theme,
//             );
//             hoverBackground = getThemeColor(
//               components.hpe.switch.default.control.track.selected.hover
//                 .background,
//               theme,
//             );
//           }
//           if (disabled) {
//             background = getThemeColor(
//               components.hpe.switch.default.control.track.disabled.rest
//                 .background,
//               theme,
//             );
//             borderColor = getThemeColor(
//               components.hpe.switch.default.control.handle.disabled.rest
//                 .borderColor,
//               theme,
//             );
//           }
//           return `
//             border-color: ${borderColor};
//             background: ${background};
//             &:hover {
//               ${!disabled ? `background: ${hoverBackground};` : ''}
//             }
//         `;
//         },
//       },
//       // HPE Design System guidance states that pad="none" should be applied on CheckBox
//       // when its used outside of a FormField. We will apply this hover treatment in
//       // those instances.
//       extend: ({ disabled, theme }) => css`
//       font-weight: ${components.hpe.checkbox.default.label.rest.fontWeight};
//       width: auto;
//       border: ${
//         components.hpe.formField.default.medium.input.container.borderWidth
//       } solid ${getThemeColor(
//         components.hpe.formField.default.input.group.item.rest.borderColor,
//         theme,
//       )};
//       & input:checked + span[class*=CheckBoxToggle] > span[class*=CheckBoxKnob] {
//         left: 25px;
//       }
//       ${
//         // override built in disabled opacity: 0.5 from grommet
//         disabled &&
//         `opacity: 1;
//         color: ${getThemeColor(
//           components.hpe.checkbox.default.label.disabled.rest.textColor,
//           theme,
//         )};`
//       }
//     };
//     `,
//     },
//     checkBoxGroup: {
//       container: {
//         cssGap: true,
//         gap: 'small', // TO DO missing token
//         margin: 'none',
//       },
//     },
//     data: {
//       button: {
//         kind: 'toolbar',
//       },
//     },
//     dateInput: {
//       container: {
//         round:
//           components.hpe.formField.default.medium.input.container.borderRadius,
//       },
//       icon: {
//         size: 'small',
//       },
//     },
//     dataTable: {
//       body: {
//         extend: ({ theme }) => `
//           /* Margin and padding allow room for focus on table body */
//           margin: ${theme.global.edgeSize.xxsmall} 0px;
//           padding: 0px ${theme.global.edgeSize.xxsmall};
//         `,
//         selected: {
//           background:
//             components.hpe.dataCell.default.selected?.rest?.background,
//         },
//         row: {
//           extend: `&:last-child td {
//               border-color: transparent;
//             }
//             &:last-child th {
//               border-color: transparent;
//             }`,
//         },
//       },
//       groupHeader: {
//         // background: undefined,
//         // border: undefined,
//         // pad: undefined,
//       },
//       groupEnd: {
//         border: { side: 'bottom', size: 'xsmall' },
//       },
//       header: {
//         border: { side: 'bottom' },
//         color: components.hpe.headerCell.default.rest.textColor,
//         extend: ({ column, sort, sortable, theme }) =>
//           `
//             ${
//               sort &&
//               sort.property === column &&
//               `
//               background: ${
//                 theme.global.colors['background-active'][
//                   theme.dark ? 'dark' : 'light'
//                 ]
//               }
//             `
//             };
//             ${
//               sortable &&
//               sort &&
//               sort.property !== column &&
//               `
//                 svg {
//                   opacity: 0;
//                 }
//                 &:hover {
//                   svg {
//                     opacity: 1;
//                   }
//                 }
//               `
//             };
//           `,
//         font: {
//           weight: components.hpe.headerCell.default.medium.fontWeight,
//         },
//         gap: components.hpe.headerCell.default.medium.gapX,
//         hover: {
//           background: {
//             color: components.hpe.headerCell.default.hover.background,
//           },
//         },
//         units: {
//           color: components.hpe.headerCell.default.units.rest.textColor,
//         },
//       },
//       icons: {
//         ascending: () => <Descending size="large" />,
//         descending: () => <Ascending size="large" />,
//         contract: () => <Up height="medium" />,
//         expand: () => <Down height="medium" />,
//         sortable: () => <Unsorted size="large" />,
//       },
//       pinned: {
//         header: {
//           background: {
//             opacity: 'strong',
//           },
//           extend: 'backdrop-filter: blur(12px);',
//         },
//         body: {
//           background: {
//             opacity: 'strong',
//           },
//           extend: 'backdrop-filter: blur(12px);',
//         },
//         footer: {
//           background: {
//             opacity: 'strong',
//           },
//           extend: 'backdrop-filter: blur(12px);',
//         },
//       },
//       primary: {
//         weight: components.hpe.dataCell.primary.medium.fontWeight,
//         color: components.hpe.dataCell.primary.rest.textColor,
//       },
//       resize: {
//         // Q: missing tokens
//         border: {
//           color: 'border',
//           side: 'end',
//         },
//         hover: {
//           border: {
//             color: 'border-strong',
//             size: 'small',
//           },
//         },
//       },
//     },
//     fileInput: {
//       border: {
//         color:
//           components.hpe.formField.default.input.container.rest.borderColor,
//         side: 'all',
//         style: 'solid',
//         size: components.hpe.formField.default.medium.input.container
//           .borderWidth,
//       },
//       button: {
//         background: components.hpe.button.secondary.rest.background,
//         border: {
//           radius: components.hpe.button.default.medium.borderRadius,
//         },
//         pad: {
//           vertical: components.hpe.button.default.medium.paddingY,
//           horizontal: components.hpe.button.default.medium.paddingX,
//         },
//         color: components.hpe.button.secondary.rest.textColor,
//         font: {
//           weight: components.hpe.button.secondary.rest.fontWeight,
//         },
//         hover: {
//           background: components.hpe.button.secondary.hover.background,
//           color: components.hpe.button.secondary.hover.textColor,
//         },
//       },
//       dragOver: {
//         background: 'background-hover',
//         border: 'none',
//       },
//       hover: {
//         border: {
//           color: 'border',
//         },
//       },
//       icons: {
//         // remove: Close,
//       },
//       label: {
//         margin: 'small',
//       },
//       message: {
//         color: 'placeholder',
//         margin: 'small',
//       },
//       pad: { horizontal: 'xsmall' },
//       extend: `border-radius: ${components.hpe.formField.default.medium.input.container.borderRadius};`,
//     },
//     formField: {
//       extend: ({ theme }) =>
//         `
//           input:disabled {
//             color: ${getThemeColor(
//               components.hpe.formField.default.value.disabled.rest.textColor,
//               theme,
//             )};
//           }
//           [class*="ContentBox"] {
//             label {
//               padding-block: ${
//                 components.hpe.formField.default.medium.input.group.item
//                   .paddingY
//               };
//               padding-inline: ${
//                 components.hpe.formField.default.medium.input.group.item
//                   .paddingX
//               };
//               &:hover {
//                 background: ${getThemeColor(
//                   components.hpe.formField.default.input.container.hover
//                     .background,
//                   theme,
//                 )};
//               }
//             }
//             [role="group"], [role="radiogroup"] {
//               gap: 0;
//               padding-block: ${
//                 components.hpe.formField.default.medium.input.group.container
//                   .paddingY
//               };
//               padding-inline: ${
//                 components.hpe.formField.default.medium.input.group.container
//                   .paddingX
//               };
//               label {
//                 border: ${
//                   dimensions.borderSize[
//                     components.hpe.formField.default.medium.input.group.item
//                       .borderWidth
//                   ] ||
//                   components.hpe.formField.default.medium.input.group.item
//                     .borderWidth
//                 } solid ${getThemeColor(
//           components.hpe.formField.default.input.group.item.rest.borderColor,
//           theme,
//         )};
//                 padding-block: ${
//                   components.hpe.formField.default.medium.input.group.item
//                     .paddingY
//                 };
//                 padding-inline: ${
//                   components.hpe.formField.default.medium.input.group.item
//                     .paddingX
//                 };
//                 border-radius: ${
//                   dimensions.edgeSize[
//                     components.hpe.formField.default.medium.input.group.item
//                       .borderRadius
//                   ]
//                 };
//                 &:hover {
//                   background: ${getThemeColor(
//                     components.hpe.formField.default.input.group.item.hover
//                       .background,
//                     theme,
//                   )};
//                 }
//               }
//             }
//           }
//       `,
//       content: {
//         // Q: missing tokens
//         margin: { vertical: 'xsmall' },
//         pad: 'none',
//       },
//       border: {
//         error: {
//           color:
//             components.hpe.formField.default.input.container.error.rest
//               .borderColor,
//         },
//         color:
//           components.hpe.formField.default.input.container.rest.borderColor,
//         side: 'all',
//       },
//       checkBox: {
//         pad: {
//           horizontal:
//             components.hpe.formField.default.medium.input.group.item.paddingX,
//           vertical:
//             components.hpe.formField.default.medium.input.group.item.paddingY,
//         },
//         container: {
//           extend: ({ error }) =>
//             `border-color: ${
//               error
//                 ? components.hpe.formField.default.input.group.container.error
//                     .rest.borderColor
//                 : components.hpe.formField.default.input.group.container.rest
//                     .borderColor
//             }; `,
//         },
//       },
//       checkBoxGroup: {
//         container: {
//           extend: ({ error }) =>
//             `border-color: ${
//               error
//                 ? components.hpe.formField.default.input.group.container.error
//                     .rest.borderColor
//                 : components.hpe.formField.default.input.group.container.rest
//                     .borderColor
//             }; `,
//         },
//       },
//       radioButtonGroup: {
//         container: {
//           extend: ({ error }) =>
//             `border-color: ${
//               error
//                 ? components.hpe.formField.default.input.group.container.error
//                     .rest.borderColor
//                 : components.hpe.formField.default.input.group.container.rest
//                     .borderColor
//             }; `,
//         },
//       },
//       disabled: {
//         background:
//           components.hpe.formField.default.input.group.container.disabled.rest
//             .background,
//         border: {
//           color:
//             components.hpe.formField.default.input.container.disabled.rest
//               .borderColor,
//         },
//         label: {
//           color: components.hpe.formField.default.label.disabled.rest.textColor,
//         },
//         help: {
//           color: components.hpe.formField.default.help.disabled.rest.textColor,
//         },
//         info: {
//           color: components.hpe.formField.default.info.disabled.rest.textColor,
//         },
//       },
//       error: {
//         background: {
//           color:
//             components.hpe.formField.default.input.container.error.rest
//               .background,
//         },
//         container: {
//           gap: 'xsmall', // Q: missing token
//         },
//         icon: (
//           <CircleAlert size="small" color={light.hpe.color.icon.critical} />
//         ),
//         size: 'xsmall',
//         color: components.hpe.formField.default.error.rest.textColor,
//         margin: {
//           // Q: missing token
//           bottom: 'xsmall',
//           top: 'none',
//           horizontal: 'none',
//         },
//       },
//       focus: {
//         containerFocus: false,
//         background: undefined, // Intentionally not carrying this style through to tokens to rely on global focus indicator
//         border: {
//           color: undefined, // Intentionally not carrying this style through to tokens to rely on global focus indicator
//         },
//       },
//       help: {
//         size: 'xsmall',
//         color: components.hpe.formField.default.help.rest.color,
//         margin: 'none', // TO DO missing token
//       },
//       info: {
//         size: 'xsmall',
//         color: components.hpe.formField.default.info.rest.color,
//         margin: {
//           // Q: missing token
//           bottom: 'xsmall',
//           top: 'none',
//           horizontal: 'none',
//         },
//       },
//       label: {
//         size: 'xsmall',
//         color: components.hpe.formField.default.label.rest.textColor,
//         margin: {
//           // Q: missing token
//           bottom: 'none',
//           top: 'xsmall',
//           horizontal: 'none',
//         },
//         requiredIndicator: true,
//         weight: components.hpe.formField.default.medium.label.fontWeight,
//       },
//       margin: {
//         bottom: 'none', // TO DO missing token
//       },
//       round:
//         components.hpe.formField.default.medium.input.container.borderRadius,
//       // TO DO no tokens
//       survey: {
//         label: {
//           margin: { bottom: 'none' },
//           size: 'medium',
//           weight: 500,
//         },
//       },
//     },
//     heading: {
//       color: 'text-heading',
//       weight: large.hpe.heading.xlarge.fontWeight,
//       level: {
//         1: {
//           font: {
//             weight: large.hpe.heading.xlarge.fontWeight,
//           },
//           small: {
//             // this value is off because we didn't have the same typography system before
//             // TO DO could hard code with v6 backwards compatibility flag
//             size: large.hpe.heading.large.fontSize,
//             height: large.hpe.heading.large.lineHeight,
//           },
//           medium: {
//             size: large.hpe.heading.xlarge.fontSize,
//             height: large.hpe.heading.xlarge.lineHeight,
//           },
//           large: {
//             // Q: missing tokens
//             size: '48px',
//             height: '48px',
//           },
//           xlarge: {
//             // Q: missing tokens
//             size: '60px',
//             height: '60px',
//           },
//         },
//         2: {
//           font: {
//             weight: large.hpe.heading.large.fontWeight,
//           },
//           small: {
//             size: large.hpe.heading.medium.fontSize,
//             height: large.hpe.heading.medium.lineHeight,
//           },
//           medium: {
//             size: large.hpe.heading.large.fontSize,
//             height: large.hpe.heading.large.lineHeight,
//           },
//           large: {
//             size: large.hpe.heading.xlarge.fontSize,
//             height: large.hpe.heading.xlarge.lineHeight,
//           },
//           xlarge: {
//             // Q: missing tokens
//             size: '48px',
//             height: '48px',
//           },
//         },
//         3: {
//           font: {
//             weight: large.hpe.heading.medium.fontWeight,
//           },
//           small: {
//             size: large.hpe.heading.small.fontSize,
//             height: large.hpe.heading.small.lineHeight,
//           },
//           medium: {
//             size: large.hpe.heading.medium.fontSize,
//             height: large.hpe.heading.medium.lineHeight,
//           },
//           large: {
//             size: large.hpe.heading.large.fontSize,
//             height: large.hpe.heading.large.lineHeight,
//           },
//           xlarge: {
//             size: large.hpe.heading.xlarge.fontSize,
//             height: large.hpe.heading.xlarge.lineHeight,
//           },
//         },
//         4: {
//           font: {
//             weight: large.hpe.heading.small.fontWeight,
//           },
//           small: {
//             size: large.hpe.heading.xsmall.fontSize,
//             height: large.hpe.heading.xsmall.lineHeight,
//           },
//           medium: {
//             size: large.hpe.heading.small.fontSize,
//             height: large.hpe.heading.small.lineHeight,
//           },
//           large: {
//             size: large.hpe.heading.medium.fontSize,
//             height: large.hpe.heading.medium.lineHeight,
//           },
//           xlarge: {
//             size: large.hpe.heading.large.fontSize,
//             height: large.hpe.heading.large.lineHeight,
//           },
//         },
//         5: {
//           font: {
//             weight: large.hpe.heading.xsmall.fontWeight,
//           },
//           small: {
//             size: large.hpe.heading.xxsmall.fontSize,
//             height: large.hpe.heading.xxsmall.lineHeight,
//           },
//           medium: {
//             size: large.hpe.heading.xsmall.fontSize,
//             height: large.hpe.heading.xsmall.lineHeight,
//           },
//           large: {
//             size: large.hpe.heading.small.fontSize,
//             height: large.hpe.heading.small.lineHeight,
//           },
//           xlarge: {
//             size: large.hpe.heading.medium.fontSize,
//             height: large.hpe.heading.medium.lineHeight,
//           },
//         },
//         6: {
//           font: {
//             weight: large.hpe.heading.xxsmall.fontWeight,
//           },
//           small: {
//             size: large.hpe.heading.xxsmall.fontSize,
//             height: large.hpe.heading.xxsmall.lineHeight,
//           },
//           medium: {
//             size: large.hpe.heading.xxsmall.fontSize,
//             height: large.hpe.heading.xxsmall.lineHeight,
//           },
//           large: {
//             size: large.hpe.heading.small.fontSize,
//             height: large.hpe.heading.small.lineHeight,
//           },
//           xlarge: {
//             size: large.hpe.heading.medium.fontSize,
//             height: large.hpe.heading.medium.lineHeight,
//           },
//         },
//       },
//       extend: () => '',
//     },
//     icon: {
//       disableScaleDown: true,
//       matchSize: true,
//       size: {
//         xsmall: large.hpe.icon.xsmall.size,
//         small: large.hpe.icon.small.size,
//         medium: large.hpe.icon.medium.size,
//         large: large.hpe.icon.large.size,
//         xlarge: large.hpe.icon.xlarge.size,
//         xxlarge: large.hpe.icon.xxlarge.size,
//       },
//     },
//     layer: {
//       background: 'background-floating',
//       border: {
//         radius: 'small',
//         intelligentRounding: true,
//       },
//       container: {
//         elevation: 'large',
//       },
//       overlay: {
//         background: 'background-screenOverlay',
//       },
//       /* HPE Global Header/Footer Service a.k.a. HPE Common HFWS sets the header
//        * at a z-index of 101. This adjustment allows for Layer modals and side-drawers
//        * to sit atop the Global header. */
//       zIndex: '110',
//     },
//     list: {
//       container: {
//         // any box props
//         gap: 'xsmall',
//         // extend: undefined,
//       },
//       item: {
//         border: undefined,
//         disabled: {
//           color: 'text-disabled',
//           cursor: 'default',
//         },
//         pinned: {
//           background: 'background-active',
//           icon: {
//             pad: mediumIconOnlyPad,
//           },
//         },
//       },
//     },
//     maskedInput: {
//       container: {
//         extend: ({ theme }) => `
//           svg {
//             fill: ${
//               theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
//             };
//             stroke: ${
//               theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
//             };
//           }
//         `,
//       },
//     },
//     menu: {
//       drop: {
//         align: {
//           top: 'bottom',
//           left: 'left',
//         },
//       },
//       container: {
//         pad: {
//           vertical: components.hpe.menu.default.medium.group.container.paddingY,
//           horizontal:
//             components.hpe.menu.default.medium.group.container.paddingX,
//         },
//         gap: components.hpe.menu.default.medium.group.container.gapY,
//       },
//       group: {
//         drop: {},
//         container: {
//           pad: {
//             horizontal:
//               components.hpe.menu.default.medium.group.container.paddingX,
//             vertical:
//               components.hpe.menu.default.medium.group.container.paddingY,
//           },
//           gap: components.hpe.menu.default.medium.group.container.gapY,
//         },
//         separator: {
//           color: components.hpe.menu.default.group.separator.background,
//           size: components.hpe.menu.default.medium.group.separator.height,
//           pad: 'none', // TO DO no token
//         },
//       },
//       icons: {
//         color: components.hpe.menu.default.item.rest.iconColor,
//         down: Down,
//       },
//       item: {
//         pad: {
//           horizontal: components.hpe.menu.default.medium.item.paddingX,
//           vertical: components.hpe.menu.default.medium.item.paddingY,
//         },
//       },
//     },
//     nameValuePair: {
//       name: {
//         color: 'text-strong',
//         weight: global.hpe.fontWeight.medium,
//       },
//     },
//     notification: {
//       close: {
//         icon: Close,
//       },
//       container: {
//         round: 'xsmall',
//       },
//       direction: 'column',
//       global: {
//         direction: 'row',
//         container: {
//           round: 'none',
//         },
//       },
//       message: {
//         color: 'text',
//       },
//       title: {
//         // any text props
//         color: 'text-strong',
//         weight: global.hpe.fontWeight.medium,
//       },
//       critical: {
//         background: 'background-critical',
//         color: 'icon-critical',
//         message: {
//           color: 'text-onCritical',
//         },
//         title: {
//           color: 'text-onCritical-strong',
//         },
//         global: {
//           background: 'background-critical',
//           message: {
//             color: 'text-onCritical',
//           },
//           title: {
//             color: 'text-onCritical-strong',
//           },
//         },
//         toast: {
//           background: 'background-front',
//           message: {
//             color: 'text',
//           },
//           title: {
//             color: 'text-strong',
//           },
//         },
//       },
//       warning: {
//         background: 'background-warning',
//         color: 'icon-warning',
//         message: {
//           color: 'text-onWarning',
//         },
//         title: {
//           color: 'text-onWarning-strong',
//         },
//         global: {
//           background: 'background-warning',
//           message: {
//             color: 'text-onWarning',
//           },
//           title: {
//             color: 'text-onWarning-strong',
//           },
//         },
//         toast: {
//           background: 'background-front',
//           message: {
//             color: 'text',
//           },
//           title: {
//             color: 'text-strong',
//           },
//         },
//       },
//       normal: {
//         background: 'background-ok',
//         color: 'icon-ok',
//         message: {
//           color: 'text-onOk',
//         },
//         title: {
//           color: 'text-onOk-strong',
//         },
//         global: {
//           background: 'background-ok',
//           message: {
//             color: 'text-onOk',
//           },
//           title: {
//             color: 'text-onOk-strong',
//           },
//         },
//         toast: {
//           background: 'background-front',
//           message: {
//             color: 'text',
//           },
//           title: {
//             color: 'text-strong',
//           },
//         },
//       },
//       unknown: {
//         background: 'background-unknown',
//         color: 'icon-unknown',
//         message: {
//           color: 'text-onUnknown',
//         },
//         title: {
//           color: 'text-onUnknown-strong',
//         },
//         global: {
//           background: 'background-unknown',
//           message: {
//             color: 'text-onUnknown',
//           },
//           title: {
//             color: 'text-onUnknown-strong',
//           },
//         },
//         toast: {
//           background: 'background-front',
//           message: {
//             color: 'text',
//           },
//           title: {
//             color: 'text-strong',
//           },
//         },
//       },
//       info: {
//         background: 'background-info',
//         color: 'icon-info',
//         message: {
//           color: 'text-onInfo',
//         },
//         title: {
//           color: 'text-onInfo-strong',
//         },
//         global: {
//           background: 'background-info',
//           message: {
//             color: 'text-onInfo',
//           },
//           title: {
//             color: 'text-onInfo-strong',
//           },
//         },
//         toast: {
//           background: 'background-front',
//           message: {
//             color: 'text',
//           },
//           title: {
//             color: 'text-strong',
//           },
//         },
//       },
//       undefined: {
//         background: 'background-unknown',
//         message: {
//           color: 'text-onUnknown',
//         },
//         title: {
//           color: 'text-onUnknown-strong',
//         },
//         global: {
//           background: 'background-ok',
//           message: {
//             color: 'text-onUnknown',
//           },
//           title: {
//             color: 'text-onUnknown-strong',
//           },
//         },
//         toast: {
//           background: 'background-front',
//           message: {
//             color: 'text',
//           },
//           title: {
//             color: 'text-strong',
//           },
//         },
//       },
//     },
//     page: {
//       wide: {
//         width: {
//           min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
//           max: 'xxlarge',
//         },
//         xsmall: {
//           pad: { horizontal: 'large' },
//         },
//         xlarge: {
//           pad: { horizontal: 'large' },
//         },
//       },
//       narrow: {
//         width: {
//           min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
//           max: 'large',
//         },
//         xsmall: {
//           pad: { horizontal: 'large' },
//         },
//         xlarge: {
//           pad: { horizontal: 'large' },
//         },
//       },
//       full: {
//         width: {
//           min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
//           max: '100%',
//         },
//         xsmall: {
//           pad: { horizontal: 'large' },
//         },
//         xlarge: {
//           pad: { horizontal: 'large' },
//         },
//       },
//     },
//     pageHeader: {
//       responsive: {
//         breakpoints: ['xsmall', 'small'],
//       },
//       // title: {
//       //   size: undefined,
//       // },
//       subtitle: {
//         size: 'large',
//       },
//       xsmall: {
//         areas: [
//           ['parent', 'parent'],
//           ['title', 'actions'],
//           ['subtitle', 'actions'],
//         ],
//         columns: [['small', 'flex'], 'auto'],
//         rows: ['auto', 'auto', 'auto'],
//         gap: { row: 'xsmall', column: 'medium' },
//       },
//       xlarge: {
//         areas: [
//           ['parent', 'parent'],
//           ['title', 'actions'],
//           ['subtitle', 'actions'],
//         ],
//         columns: [['medium', 'large'], 'auto'],
//         rows: ['auto', 'auto', 'auto'],
//         gap: { row: 'xsmall', column: 'large' },
//       },
//     },
//     pagination: {
//       button: {
//         color: components.hpe.button.default.rest.textColor,
//         border: {
//           radius: components.hpe.button.default.medium.borderRadius,
//         },
//         font: {
//           weight: components.hpe.button.default.rest.fontWeight,
//         },
//         active: {
//           background: components.hpe.button.default.selected.rest.background,
//           border: {
//             radius: components.hpe.button.default.medium.borderRadius,
//           },
//           color: components.hpe.button.default.selected.rest.textColor,
//           font: {
//             weight: components.hpe.button.default.selected.rest.fontWeight,
//           },
//         },
//         hover: {
//           background: components.hpe.button.default.hover.background,
//           border: {
//             radius: components.hpe.button.default.medium.borderRadius,
//           },
//           color: components.hpe.button.default.hover.textColor,
//           font: {
//             weight: components.hpe.button.default.hover.fontWeight,
//           },
//         },
//         disabled: {
//           background: components.hpe.button.default.disabled.rest.background,
//           border: {
//             radius: components.hpe.button.default.medium.borderRadius,
//           },
//           color: components.hpe.button.default.disabled.rest.textColor,
//           font: {
//             weight: components.hpe.button.default.disabled.rest.fontWeight,
//           },
//         },
//         size: {
//           small: {
//             border: {
//               radius: components.hpe.button.default.small.borderRadius,
//               width:
//                 dimensions.borderSize[
//                   components.hpe.button.default.small.borderWidth
//                 ] || components.hpe.button.default.small.borderWidth,
//             },
//             pad: {
//               vertical: '4px',
//               horizontal: '4px',
//             },
//             font: {
//               size: components.hpe.element?.small.fontSize,
//               height: components.hpe.element?.small.lineHeight,
//             },
//             height: components.hpe.element?.small.minHeight,
//             width: components.hpe.element?.small.minHeight,
//           },
//           medium: {
//             border: {
//               radius: components.hpe.button.default.medium.borderRadius,
//               width:
//                 dimensions.borderSize[
//                   components.hpe.button.default.medium.borderWidth
//                 ] || components.hpe.button.default.medium.borderWidth,
//             },
//             pad: {
//               vertical: '4px',
//               horizontal: '4px',
//             },
//             font: {
//               size: components.hpe.element?.medium.fontSize,
//               height: components.hpe.element?.medium.lineHeight,
//             },
//             height: components.hpe.element?.medium.minHeight,
//             width: components.hpe.element?.medium.minHeight,
//           },
//           large: {
//             border: {
//               radius: components.hpe.button.default.large.borderRadius,
//               width:
//                 dimensions.borderSize[
//                   components.hpe.button.default.large.borderWidth
//                 ] || components.hpe.button.default.large.borderWidth,
//             },
//             pad: {
//               vertical: '4px',
//               horizontal: '4px',
//             },
//             font: {
//               size: components.hpe.element?.large.fontSize,
//               height: components.hpe.element?.large.lineHeight,
//             },
//             height: components.hpe.element?.large.minHeight,
//             width: components.hpe.element?.large.minHeight,
//           },
//         },
//       },
//     },
//     paragraph: {
//       // TO DO this is enabling more than xxlarge
//       ...paragraphTheme,
//     },
//     radioButton: {
//       border: {
//         color: components.hpe.radioButton.default.control.rest.borderColor,
//         width: components.hpe.radioButton.default.medium.control.borderWidth,
//       },
//       check: {
//         background: {
//           color:
//             components.hpe.radioButton.default.control.selected.rest.background,
//         },
//       },
//       color:
//         components.hpe.radioButton.default.control.selected.rest.borderColor,
//       container: {
//         extend: ({ theme }) => `
//           width: auto;
//           &:has(input[checked]) {
//             & div:has(> svg[aria-hidden="true"]) {
//               background: ${getThemeColor(
//                 components.hpe.radioButton.default.control.selected.rest
//                   .background,
//                 theme,
//               )};
//               border-color: ${getThemeColor(
//                 components.hpe.radioButton.default.control.selected.rest
//                   .borderColor,
//                 theme,
//               )};
//             }
//           }
//           &:has(input[checked]):hover {
//               & div:has(> svg[aria-hidden="true"]) {
//                 background: ${getThemeColor(
//                   components.hpe.radioButton.default.control.selected.hover
//                     .background,
//                   theme,
//                 )};
//                 border-color: ${getThemeColor(
//                   components.hpe.radioButton.default.control.selected.hover
//                     .borderColor,
//                   theme,
//                 )};
//               }
//           }
//           `,
//       },
//       gap: components.hpe.radioButton.default.medium.gapX,
//       hover: {
//         background: {
//           color: 'transparent',
//         },
//         border: {
//           color: components.hpe.radioButton.default.control.hover.borderColor,
//         },
//       },
//       size: components.hpe.radioButton.default.medium.control.height,
//       font: {
//         weight: components.hpe.radioButton.default.label.rest.fontWeight,
//       },
//       icons: {
//         circle: () => (
//           <Blank
//             color={
//               components.hpe.radioButton.default.control.selected.rest.iconColor
//             }
//           >
//             <circle cx="12" cy="12" r="8" />
//           </Blank>
//         ),
//       },
//     },
//     radioButtonGroup: {
//       container: {
//         cssGap: true,
//         gap: 'small', // TO DO should be token?
//         margin: 'none',
//       },
//     },
//     rangeInput: {
//       thumb: {
//         color: 'background-primary-strong',
//       },
//       track: {
//         lower: {
//           color: 'background-primary-strong',
//         },
//         upper: {
//           color: primitives.hpe.base.color['grey-500'],
//         },
//         extend: () => `border-radius: ${large.hpe.radius.full};`,
//       },
//     },
//     select: {
//       clear: {
//         container: {
//           background: undefined,
//           pad: {
//             horizontal: '12px',
//             vertical: '6px',
//           },
//           margin: {
//             horizontal: components.hpe.select.default.medium.drop.paddingX,
//           },
//           hover: {
//             background: 'background-hover',
//           },
//           round: 'xsmall',
//         },
//         text: {
//           color: components.hpe.button.default.rest.textColor,
//           weight: components.hpe.button.default.rest.fontWeight,
//         },
//       },
//       control: {
//         extend: ({ disabled, theme }) => css`
//           ${disabled &&
//           `
//           opacity: 0.3;
//           input {
//             cursor: default;
//           }`}

//           &[class*="SelectMultiple"] [role="listbox"] {
//             padding-block: ${components.hpe.select.default.medium.drop
//               .paddingY};
//             padding-inline: ${components.hpe.select.default.medium.drop
//               .paddingX};
//             & [role='option'] {
//               border-radius: ${dimensions.edgeSize[
//                 components.hpe.select.default.medium.option.borderRadius
//               ] || components.hpe.select.default.medium.option.borderRadius};
//               &:hover {
//                 background: ${getThemeColor(
//                   components.hpe.select.default.option.hover.backgroud,
//                   theme,
//                 )};
//               }
//             }
//           }
//         `,
//       },
//       emptySearchMessage: {
//         container: {
//           pad: option.pad,
//         },
//       },
//       icons: {
//         color: 'icon',
//         down: Down,
//         // this was not in token
//         margin: {
//           left: 'small',
//           // setting right margin to 12px because on small
//           // screens, Select responsive padding sizes down
//           // which brings the icon too tight with edge of
//           // control.
//           right: '12px',
//         },
//         up: Up,
//       },
//       options: undefined,
//       listbox: {
//         // only apply paddingY to paddingTop because gap caused by Infinite Scroll
//         // adds an addition 6px on the bottom
//         extend: () => `
//           padding-top: ${components.hpe.select.default.medium.drop.paddingY};
//           padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
//           display: flex;
//           flex-direction: column;
//           gap: ${components.hpe.select.default.medium.drop.gapY};
//           [role="option"] {
//             border-radius: ${components.hpe.select.default.medium.option.borderRadius};
//           }
//         `,
//       },
//     },
//     selectMultiple: {
//       listbox: {
//         extend: () => `
//           padding-block: ${components.hpe.select.default.medium.drop.paddingY};
//           padding-inline: ${components.hpe.select.default.medium.drop.paddingX};
//           display: flex;
//           flex-direction: column;
//           [role="option"] {
//               border-radius: ${
//                 dimensions.edgeSize[
//                   components.hpe.select.default.medium.option.borderRadius
//                 ] || components.hpe.select.default.medium.option.borderRadius
//               };
//             }
//           }
//         `,
//       },
//     },
//     spinner: {
//       container: {
//         pad: 'none',
//         color: 'foreground-primary',
//         border: [
//           { color: 'transparent', side: 'all', size: 'medium' },
//           { color: 'transparent', side: 'right', size: 'medium' },
//           { color: 'transparent', side: 'top', size: 'medium' },
//           { color: 'transparent', side: 'left', size: 'medium' },
//         ],
//       },
//       size: {
//         xsmall: components.hpe.element?.xsmall.minHeight,
//         small: components.hpe.element?.small.minHeight,
//         medium: components.hpe.element?.medium.minHeight,
//         large: components.hpe.element?.large.minHeight,
//         xlarge: components.hpe.element?.xlarge.minHeight,
//       },
//     },
//     starRating: {
//       color: 'background-selected-primary-strong',
//     },
//     tab: {
//       color: 'text',
//       active: {
//         background: 'background-selected-primary-strong',
//         color: 'text-onSelectedPrimaryStrong',
//         weight: 500,
//       },
//       hover: {
//         background: 'background-hover',
//         color: 'text',
//       },
//       border: {
//         side: 'all',
//         color: 'transparent',
//         size:
//           dimensions[components.hpe.element?.medium.borderWidth] ||
//           components.hpe.element?.medium.borderWidth,
//         active: {
//           color: 'transparent',
//         },
//         disabled: {
//           color: undefined,
//         },
//         hover: {
//           color: undefined,
//         },
//       },
//       disabled: {
//         background: 'background-disabled',
//         color: 'text-disabled',
//       },
//       pad: {
//         bottom: components.hpe.element?.medium.paddingY,
//         top: components.hpe.element?.medium.paddingY,
//         horizontal: components.hpe.element?.medium?.paddingX?.wide,
//       },
//       margin: {
//         vertical: 'none',
//         horizontal: 'none',
//       },
//       extend: ({ theme }) => `border-radius: ${theme.global.edgeSize.xsmall};`,
//     },
//     tabs: {
//       gap: 'xsmall',
//       header: {
//         border: undefined,
//         extend: ({ theme }) => `
//           border-radius: ${theme.global.edgeSize.xsmall};
//           & button[aria-selected="true"]:hover > div {
//             background: ${getThemeColor(
//               'background-selected-primary-strong-hover',
//               theme,
//             )};
//             color: ${getThemeColor('text-onSelectedPrimaryStrong', theme)};
//           }
//         `,
//       },
//       step: {
//         xsmall: 1,
//         xlarge: 3,
//       },
//     },
//     table: {
//       header: {
//         extend: `
//           > div {
//             height: 100%;
//             justify-content: center;
//           }
//           // align onSelect checkbox to center of header cell
//           label {
//             justify-content: center;
//           }
//         `,
//       },
//       body: {
//         pad: {
//           top: components.hpe.dataCell.default.medium.paddingTop,
//           bottom: components.hpe.dataCell.default.medium.paddingBottom,
//           horizontal: components.hpe.dataCell.default.medium.paddingX,
//         },
//         border: {
//           side: 'bottom', // TO DO this causes issues on the last row with the footer border
//           color: components.hpe.dataCell.default.rest.borderColor,
//         },
//         extend: ({ theme }) =>
//           `
//             &:hover {
//               button {
//                 background: ${
//                   theme.global.colors['background-hover'][
//                     theme.dark ? 'dark' : 'light'
//                   ]
//                 };
//               }
//             }
//           `,
//       },
//       row: {
//         hover: {
//           background: 'background-hover',
//         },
//       },
//       footer: {
//         extend: `
//           font-weight: ${components.hpe.footerCell.default.fontWeight};
//         `,
//       },
//     },
//     tag: {
//       border: {
//         color: 'border-weak',
//       },
//       icons: {
//         remove: Close,
//       },
//       pad: {
//         horizontal: components.hpe.element?.medium?.paddingX?.default,
//         vertical: components.hpe.element?.medium.paddingY,
//       },
//       remove: {
//         kind: 'default',
//       },
//       value: {
//         weight: global.hpe.fontWeight.medium,
//       },
//       round: 'xsmall',
//       size: {
//         xsmall: {
//           icon: undefined,
//           pad: {
//             vertical: components.hpe.element?.small.paddingY,
//             horizontal: components.hpe.element?.small?.paddingX?.default,
//           },
//           remove: {
//             size: 'xsmall',
//             margin: {
//               right: 'none',
//               vertical: '-1px', // account for border
//             },
//           },
//         },
//         small: {
//           icon: undefined,
//           pad: {
//             vertical: components.hpe.element?.small.paddingY,
//             horizontal: components.hpe.element?.small?.paddingX?.default,
//           },
//           remove: {
//             size: 'xsmall',
//             margin: {
//               right: '2px',
//             },
//           },
//         },
//         // TO DO tag rounding is overriding "default" rounding, do we expect this?
//         medium: {
//           icon: undefined,
//           pad: {
//             vertical: components.hpe.element?.medium.paddingY,
//             horizontal: components.hpe.element?.medium?.paddingX?.default,
//           },
//           remove: {
//             size: 'small',
//             margin: {
//               right: 'xxsmall',
//             },
//           },
//         },
//         large: {
//           icon: undefined,
//           pad: {
//             vertical: components.hpe.element?.large.paddingY,
//             horizontal: components.hpe.element?.large?.paddingX?.default,
//           },
//           remove: {
//             size: 'medium',
//             margin: {
//               right: 'xxsmall',
//             },
//           },
//         },
//         xlarge: {
//           icon: undefined,
//           pad: {
//             vertical: components.hpe.element?.xlarge.paddingY,
//             horizontal: components.hpe.element?.xlarge?.paddingX?.default,
//           },
//           remove: {
//             size: 'large',
//             margin: {
//               right: 'xsmall',
//             },
//           },
//         },
//       },
//     },
//     text: {
//       ...textTheme,
//     },
//     textInput: {
//       container: {
//         extend: ({ theme }) => `
//           svg {
//             fill: ${
//               theme.global.colors['icon-strong'][theme.dark ? 'dark' : 'light']
//             };
//             stroke: ${
//               theme.global.colors['icon-strong'][theme.dark ? 'dark' : 'light']
//             };
//           }
//         `,
//       },
//     },
//     tip: {
//       content: {
//         background: 'background-floating',
//         border: {
//           color: 'border-weak',
//         },
//         margin: 'xxsmall',
//         elevation: 'small',
//         pad: {
//           vertical: 'none',
//           horizontal: 'small',
//         },
//         round: components.hpe.drop.default.borderRadius,
//       },
//     },
//     thumbsRating: {
//       like: {
//         color: 'background-selected-primary-strong',
//       },
//       dislike: {
//         color: 'background-selected-primary-strong',
//       },
//     },
//     toggleGroup: {
//       button: {
//         kind: 'toolbar',
//       },
//       container: {
//         border: false,
//         extend: ({ theme }) => `
//         gap: ${
//           dimensions.edgeSize[large.hpe.spacing['5xsmall']] ||
//           large.hpe.spacing['5xsmall']
//         };
//         &:hover {
//           background: ${getThemeColor('background-hover', theme)};
//         }`,
//       },
//       divider: false,
//     },
//     // Theme-Designer only parameters
//     name: 'HPE 1',
//     rounding: 4,
//     scale: 1.1,
//     spacing: 24,
//   });
// };

// export const current = buildTheme(
//   {
//     primitives: localPrimitives,
//     light: localLight,
//     dark: localDark,
//     small: localSmall,
//     large: localDimension,
//     global: localGlobal,
//     components: localComponents,
//   },
//   {
//     // For grommet-theme-hpe v6.0.0, maintain backwards compatibility
//     // with old t-shirt sizes
//     'v6-backwards-compatibility': true,
//   },
// );

export const current = hpeNext;

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

const v5 = deepMerge(hpe, {
  global: {
    colors: {
      ...newColors,
    },
  },
});

export const themes = {
  next: current,
  current: v5,
};
