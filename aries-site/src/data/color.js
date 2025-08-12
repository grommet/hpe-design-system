import { aries as theme } from '../themes/aries';

/*
 * The following is holding content until Content Management Solution
 * is in place.
 */

const { colors, elevation } = theme.global;
const { layer } = theme;

/* Color Palette */
const primaryColors = [
  {
    name: 'brand',
    value: 'brand',
    hex: colors.brand.light, // same hex code for light and dark
  },
];

const coreColors = [
  {
    name: 'purple!',
    value: 'purple!',
    hex: colors['purple!'].light,
  },
  {
    name: 'teal!',
    value: 'teal!',
    hex: colors['teal!'].light,
  },
  {
    name: 'blue!',
    value: 'blue!',
    hex: colors['blue!'].light,
  },
  {
    name: 'red!',
    value: 'red!',
    hex: colors['red!'].light,
  },
  {
    name: 'orange!',
    value: 'orange!',
    hex: colors['orange!'].light,
  },
  {
    name: 'yellow!',
    value: 'yellow!',
    hex: colors['yellow!'].light,
  },
];

const lightColors = [
  {
    name: 'green',
    value: colors.green.light,
    hex: colors.green.light,
  },
  {
    name: 'purple',
    value: colors.purple.light,
    hex: colors.purple.light,
  },
  {
    name: 'teal',
    value: colors.teal.light,
    hex: colors.teal.light,
  },
  {
    name: 'blue',
    value: colors.blue.light,
    hex: colors.blue.light,
  },
  {
    name: 'red',
    value: colors.red.light,
    hex: colors.red.light,
  },
  {
    name: 'orange',
    value: colors.orange.light,
    hex: colors.orange.light,
  },
  {
    name: 'yellow',
    value: colors.yellow.light,
    hex: colors.yellow.light,
  },
];

const darkColors = [
  {
    name: 'green',
    value: colors.green.dark,
    hex: colors.green.dark,
  },
  {
    name: 'purple',
    value: colors.purple.dark,
    hex: colors.purple.dark,
  },
  {
    name: 'teal',
    value: colors.teal.dark,
    hex: colors.teal.dark,
  },
  {
    name: 'blue',
    value: colors.blue.dark,
    hex: colors.blue.dark,
  },
  {
    name: 'red',
    value: colors.red.dark,
    hex: colors.red.dark,
  },
  {
    name: 'orange',
    value: colors.orange.dark,
    hex: colors.orange.dark,
  },
  {
    name: 'yellow',
    value: colors.yellow.dark,
    hex: colors.yellow.dark,
  },
];

/* Backgrounds */
const lightBackgrounds = [
  {
    name: 'background',
    value: 'background',
    hex: colors.background.light,
  },
  {
    name: 'background-back',
    value: 'background-back',
    hex: colors['background-back'].light,
  },
  {
    name: 'background-front',
    value: 'background-front',
    hex: colors['background-front'].light,
  },
];

const darkBackgrounds = [
  {
    name: 'background',
    value: 'background',
    hex: colors.background.dark,
  },
  {
    name: 'background-back',
    value: 'background-back',
    hex: colors['background-back'].dark,
  },
  {
    name: 'background-front',
    value: 'background-front',
    hex: colors['background-front'].dark,
  },
];

const contrastLight = [
  {
    name: 'background-contrast',
    value: 'background-contrast',
    hex: colors['background-contrast'].light,
  },
];

const contrastDark = [
  {
    name: 'background-contrast',
    value: 'background-contrast',
    hex: colors['background-contrast'].dark,
  },
];

/* Border Colors */

const borderLight = [
  {
    name: 'border',
    value: colors.border.light,
    hex: colors.border.light,
  },
  {
    name: 'border-strong',
    value: colors['border-strong'].light,
    hex: colors['border-strong'].light,
  },
  {
    name: 'border-weak',
    value: colors['border-weak'].light,
    hex: colors['border-weak'].light,
  },
];

const borderDark = [
  {
    name: 'border',
    value: colors.border.dark,
    hex: colors.border.dark,
  },
  {
    name: 'border-strong',
    value: colors['border-strong'].dark,
    hex: colors['border-strong'].dark,
  },
  {
    name: 'border-weak',
    value: colors['border-weak'].dark,
    hex: colors['border-weak'].dark,
  },
];

/* Input Colors */

const inputLight = [
  {
    name: 'enabled inputs have a border of "border"',
    value: colors.border.light,
    hex: colors.border.light,
    type: 'border',
  },
  {
    name: 'disabled inputs have a border of "border-weak"',
    value: colors['border-weak'].light,
    hex: colors['border-weak'].light,
    type: 'border',
  },
  {
    name: 'inputs containing a value have a border of "border-strong"',
    value: colors['border-strong'].light,
    hex: colors['border-strong'].light,
    type: 'border',
  },
  {
    name: 'validation-critical',
    value: colors['validation-critical'].light,
    hex: colors['validation-critical'].light,
  },
  {
    name: 'validation-ok',
    value: colors['validation-ok'].light,
    hex: colors['validation-ok'].light,
  },
  {
    name: 'validation-warning',
    value: colors['validation-warning'].light,
    hex: colors['validation-warning'].light,
  },
];

const inputDark = [
  {
    name: 'enabled inputs have a border of "border"',
    value: colors.border.dark,
    hex: colors.border.dark,
    type: 'border',
  },
  {
    name: 'disabled inputs have a border of "border-weak"',
    value: colors['border-weak'].dark,
    hex: colors['border-weak'].dark,
    type: 'border',
  },
  {
    name: 'inputs containing a value have a border of "border-strong"',
    value: colors['border-strong'].dark,
    hex: colors['border-strong'].dark,
    type: 'border',
  },
  {
    name: 'validation-critical',
    value: colors['validation-critical'].dark,
    hex: colors['validation-critical'].dark,
  },
  {
    name: 'validation-ok',
    value: colors['validation-ok'].dark,
    hex: colors['validation-ok'].dark,
  },
  {
    name: 'validation-warning',
    value: colors['validation-warning'].dark,
    hex: colors['validation-warning'].dark,
  },
];

/* Text Colors */
const textColors = [
  {
    name: 'text',
    value: 'text',
    hex: colors.text,
  },
  {
    name: 'text-strong',
    value: 'text-strong',
    hex: colors['text-strong'],
  },
  {
    name: 'text-weak',
    value: 'text-weak',
    hex: colors['text-weak'],
  },
  {
    name: 'text-xweak',
    value: 'text-xweak',
    hex: colors['text-xweak'],
  },
];

const statusColorsLight = [
  {
    name: 'status-critical',
    value: colors['status-critical'].light,
    hex: colors['status-critical'].light,
  },
  {
    name: 'status-warning',
    value: colors['status-warning'].light,
    hex: colors['status-warning'].light,
  },
  {
    name: 'status-ok',
    value: colors['status-ok'].light,
    hex: colors['status-ok'].light,
  },
  {
    name: 'status-unknown',
    value: colors['status-unknown'].light,
    hex: colors['status-unknown'].light,
  },
];

const statusColorsDark = [
  {
    name: 'status-critical',
    value: colors['status-critical'].dark,
    hex: colors['status-critical'].dark,
  },
  {
    name: 'status-warning',
    value: colors['status-warning'].dark,
    hex: colors['status-warning'].dark,
  },
  {
    name: 'status-ok',
    value: colors['status-ok'].dark,
    hex: colors['status-ok'].dark,
  },
  {
    name: 'status-unknown',
    value: colors['status-unknown'].dark,
    hex: colors['status-unknown'].dark,
  },
];

const focusColor = [
  {
    name: 'focus',
    value: colors.focus.light, // same in light and dark mode
    hex: colors.focus.light, // same in light and dark mode
  },
];

const elevationColorsDark = [
  {
    name: 'medium',
    value: 'medium',
    hex: elevation.dark.medium,
  },
  {
    name: 'large',
    value: 'large',
    hex: elevation.dark.large,
  },
  {
    name: 'small',
    value: 'small',
    hex: elevation.dark.small,
  },
];

const elevationColorsLight = [
  {
    name: 'medium',
    value: 'medium',
    hex: elevation.light.medium,
  },
  {
    name: 'large',
    value: 'large',
    hex: elevation.light.large,
  },
  {
    name: 'small',
    value: 'small',
    hex: elevation.light.small,
  },
];

const layerColor = [
  {
    name: 'layer-overlay',
    value: layer.overlay.background,
    hex: layer.overlay.background,
  },
];

const graphColorsLight = [
  {
    name: 'graph-0',
    value: colors['graph-0'].light,
    hex: colors['graph-0'].light,
  },
  {
    name: 'graph-1',
    value: colors['graph-1'].light,
    hex: colors['graph-1'].light,
  },
  {
    name: 'graph-2',
    value: colors['graph-2'].light,
    hex: colors['graph-2'].light,
  },
  {
    name: 'graph-3',
    value: colors['graph-3'].light,
    hex: colors['graph-3'].light,
  },
  {
    name: 'graph-4',
    value: colors['graph-4'].light,
    hex: colors['graph-4'].light,
  },
  {
    name: 'graph-5',
    value: colors['graph-5'].light,
    hex: colors['graph-5'].light,
  },
  {
    name: 'graph-6',
    value: colors['graph-6'].light,
    hex: colors['graph-6'].light,
  },
  {
    name: 'graph-7',
    value: colors['graph-7'].light,
    hex: colors['graph-7'].light,
  },
];

const graphColorsDark = [
  {
    name: 'graph-0',
    value: colors['graph-0'].dark,
    hex: colors['graph-0'].dark,
  },
  {
    name: 'graph-1',
    value: colors['graph-1'].dark,
    hex: colors['graph-1'].dark,
  },
  {
    name: 'graph-2',
    value: colors['graph-2'].dark,
    hex: colors['graph-2'].dark,
  },
  {
    name: 'graph-3',
    value: colors['graph-3'].dark,
    hex: colors['graph-3'].dark,
  },
  {
    name: 'graph-4',
    value: colors['graph-4'].dark,
    hex: colors['graph-4'].dark,
  },
  {
    name: 'graph-5',
    value: colors['graph-5'].dark,
    hex: colors['graph-5'].dark,
  },
  {
    name: 'graph-6',
    value: colors['graph-6'].dark,
    hex: colors['graph-6'].dark,
  },
  {
    name: 'graph-7',
    value: colors['graph-7'].dark,
    hex: colors['graph-7'].dark,
  },
];

export const colorExamples = {
  palettes: {
    primaryColors,
    coreColors,
    lightColors,
    darkColors,
  },
  backgrounds: {
    lightBackgrounds,
    darkBackgrounds,
    contrastLight,
    contrastDark,
  },
  borders: {
    borderDark,
    borderLight,
  },
  input: {
    inputDark,
    inputLight,
  },
  text: {
    textColors,
    statusColorsLight,
    statusColorsDark,
  },
  focusColor,
  layerColor,
  elevation: {
    elevationColorsDark,
    elevationColorsLight,
  },
  graph: {
    graphColorsDark,
    graphColorsLight,
  },
};

export const columns = [
  {
    property: 'name',
    label: 'Name',
    dataScope: 'row',
  },
  {
    property: 'value',
    label: 'Value',
  },
];

export const greenLight = [
  {
    id: 1,
    name: 'Contrast Ratio',
    value: '13.42:1',
  },
  {
    id: 2,
    name: 'WCAG AA',
    value: 'Pass',
  },
  {
    id: 3,
    name: 'WCAG AAA',
    value: 'Pass',
  },
];

export const greenDark = [
  {
    id: 1,
    name: 'Contrast Ratio',
    value: '4.61:1',
  },
  {
    id: 2,
    name: 'WCAG AA',
    value: 'Pass',
  },
  {
    id: 3,
    name: 'WCAG AAA',
    value: 'Fail',
  },
];

export const greenDarkLarge = [
  {
    id: 1,
    name: 'Contrast Ratio',
    value: '4.61:1',
  },
  {
    id: 2,
    name: 'WCAG AA',
    value: 'Pass',
  },
  {
    id: 3,
    name: 'WCAG AAA',
    value: 'Pass',
  },
];
