import { aries as theme } from '../themes/aries';

/*
 * The following is holding content until Content Management Solution
 * is in place.
 */

const { colors } = theme.global;

/* Color Palette */
const primaryColors = [
  {
    name: 'green',
    value: 'green!',
    hex: colors['green!'],
  },
];

const coreColors = [
  {
    name: 'purple',
    value: 'purple!',
    hex: colors['purple!'],
  },
  {
    name: 'teal',
    value: 'teal!',
    hex: colors['teal!'],
  },
  {
    name: 'blue',
    value: 'blue!',
    hex: colors['blue!'],
  },
  {
    name: 'red',
    value: 'red!',
    hex: colors['red!'],
  },
  {
    name: 'orange',
    value: 'orange!',
    hex: colors['orange!'],
  },
  {
    name: 'yellow',
    value: 'yellow!',
    hex: colors['yellow!'],
  },
];

const lightColors = [
  {
    name: 'green-light',
    value: colors.green.light,
    hex: colors.green.light,
  },
  {
    name: 'purple-light',
    value: colors.purple.light,
    hex: colors.purple.light,
  },
  {
    name: 'teal-light',
    value: colors.teal.light,
    hex: colors.teal.light,
  },
  {
    name: 'blue-light',
    value: colors.blue.light,
    hex: colors.blue.light,
  },
  {
    name: 'red-light',
    value: colors.red.light,
    hex: colors.red.light,
  },
  {
    name: 'orange-light',
    value: colors.orange.light,
    hex: colors.orange.light,
  },
  {
    name: 'yellow-light',
    value: colors.yellow.light,
    hex: colors.yellow.light,
  },
];

const darkColors = [
  {
    name: 'green-dark',
    value: colors.green.dark,
    hex: colors.green.dark,
  },
  {
    name: 'purple-dark',
    value: colors.purple.dark,
    hex: colors.purple.dark,
  },
  {
    name: 'teal-dark',
    value: colors.teal.dark,
    hex: colors.teal.dark,
  },
  {
    name: 'blue-dark',
    value: colors.blue.dark,
    hex: colors.blue.dark,
  },
  {
    name: 'red-dark',
    value: colors.red.dark,
    hex: colors.red.dark,
  },
  {
    name: 'orange-dark',
    value: colors.orange.dark,
    hex: colors.orange.dark,
  },
  {
    name: 'yellow-dark',
    value: colors.yellow.dark,
    hex: colors.yellow.dark,
  },
];

/* Backgrounds */
const lightBackgrounds = [
  {
    name: 'background-light',
    value: 'background',
    hex: colors.background.light,
  },
  {
    name: 'background-back-light',
    value: 'background-back',
    hex: colors['background-back'].light,
  },
  {
    name: 'background-front-light',
    value: 'background-front',
    hex: colors['background-front'].light,
  },
];

const darkBackgrounds = [
  {
    name: 'background-dark',
    value: 'background',
    hex: colors.background.dark,
  },
  {
    name: 'background-back-dark',
    value: 'background-back',
    hex: colors['background-back'].dark,
  },
  {
    name: 'background-front-dark',
    value: 'background-front',
    hex: colors['background-front'].dark,
  },
];

const contrastLight = [
  {
    name: 'background-contrast-light',
    value: 'background-contrast',
    hex: colors['background-contrast'].light,
  },
];

const contrastDark = [
  {
    name: 'background-contrast-dark',
    value: 'background-contrast',
    hex: colors['background-contrast'].dark,
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
];

const ctaColors = [
  {
    name: 'text-action-light',
    value: colors['background-back'].light,
    hex: colors['green!'],
  },
  {
    name: 'text-action-dark',
    value: colors['background-back'].dark,
    hex: colors['green!'],
  },
];

const statusColors = [
  {
    name: 'critical',
    value: colors['status-critical'].light,
    hex: colors['status-critical'].light,
  },
  {
    name: 'warning',
    value: colors['status-warning'],
    hex: colors['status-warning'],
  },
  {
    name: 'ok',
    value: colors['status-ok'],
    hex: colors['status-ok'],
  },
  {
    name: 'unknown',
    value: colors['status-unknown'].light,
    hex: colors['status-unknown'].light,
  },
  {
    name: 'disabled',
    value: colors['status-disabled'],
    hex: colors['status-disabled'],
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
  text: {
    textColors,
    ctaColors,
    statusColors,
  },
};
