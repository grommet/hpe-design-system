import { colors, hpe } from 'grommet-theme-hpe';

export const backgroundColors = Object.keys(colors)
  .filter(key => key.split('-')[0] === 'background')
  .sort();

export const borderSizes = Object.keys(hpe.global.borderSize);

export const spacingSizes = Object.keys(hpe.global.edgeSize);

export const tShirtSizes = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

export const radiusSizes = Object.keys(hpe.global.radius);

export const containerSizes = Object.keys(hpe.global.size);
