import { primitives, dark, light, components } from 'hpe-design-tokens/grommet';

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

const access = (path, object) => path.split('.').reduce((o, i) => o[i], object);

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
export const colors = {
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
  control: 'background-primary-strong',
  'active-text': 'text-strong',
  'text-primary-button': components.hpe.button.primary.rest.textColor,
  'background-cta-alternate': 'background-contrast',
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
  // deprecated, remove in next major version
  'text-xweak': {
    dark: dark.hpe.color.text.weak,
    light: light.hpe.color.text.weak,
  },
  border: {
    dark: dark.hpe.color.border.default,
    light: light.hpe.color.border.default,
  },
  blue: {
    dark: dark.hpe.color.decorative.blue,
    light: light.hpe.color.decorative.blue,
  },
  'blue!': primitives.hpe.base.color['blue-700'],
  green: {
    dark: dark.hpe.color.decorative.green,
    light: light.hpe.color.decorative.green,
  },
  'green!': {
    dark: dark.hpe.color.decorative.brand,
    light: light.hpe.color.decorative.brand,
  },
  teal: {
    dark: dark.hpe.color.decorative.teal,
    light: light.hpe.color.decorative.teal,
  },
  'teal!': primitives.hpe.base.color['teal-400'],
  purple: {
    dark: dark.hpe.color.decorative.purple,
    light: light.hpe.color.decorative.purple,
  },
  'purple!': '#7630EA',
  red: {
    dark: dark.hpe.color.decorative.red,
    light: light.hpe.color.decorative.red,
  },
  'red!': primitives.hpe.base.color['red-750'],
  orange: {
    dark: dark.hpe.color.decorative.orange,
    light: light.hpe.color.decorative.orange,
  },
  'orange!': '#FF8300',
  yellow: {
    dark: dark.hpe.color.decorative.yellow,
    light: light.hpe.color.decorative.yellow,
  },
  'yellow!': primitives.hpe.base.color['yellow-400'],
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
  'graph-7': {
    light: light.hpe.color.dataVis['categorical-80'],
    dark: dark.hpe.color.dataVis['categorical-80'],
  },
  'status-critical': {
    dark: dark.hpe.color.icon.critical,
    light: light.hpe.color.icon.critical,
  },
  'status-warning': {
    dark: dark.hpe.color.icon.warning,
    light: light.hpe.color.icon.warning,
  },
  'status-ok': { dark: dark.hpe.color.icon.ok, light: light.hpe.color.icon.ok },
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
    dark: dark.hpe.color.background.warning,
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
