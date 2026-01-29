import { colors, hpe } from 'grommet-theme-hpe';

export const backgroundColors = Object.keys(colors)
  .filter(key => key.split('-')[0] === 'background')
  .sort();

export const borderSizes = Object.keys(hpe.global.borderSize);

export const spacingSizes = Object.keys(hpe.global.edgeSize);

export const tShirtSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

export const radiusSizes = Object.keys(hpe.global.radius);

export const containerSizes = Object.keys(hpe.global.size);

export const disabledArg = {
  control: { type: 'boolean' },
  options: [true, false],
};

export const fillArg = {
  control: { type: 'select' },
  options: [true, false, 'horizontal', 'vertical'],
};

export const gapArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const backgroundArg = {
  control: { type: 'select' },
  options: backgroundColors,
};

export const heightArg = {
  control: { type: 'select' },
  options: containerSizes,
};

export const padArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const labelArg = {
  control: { type: 'text' },
};

export const roundArg = {
  control: { type: 'select' },
  options: radiusSizes,
};

export const widthArg = {
  control: { type: 'select' },
  options: containerSizes,
};

export const alignArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'stretch', 'baseline'],
};

export const alignContentArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
};

export const borderArg = {
  control: { type: 'boolean' },
};

export const elevationArg = {
  control: { type: 'select' },
  options: tShirtSizes,
};

export const skeletonArg = {
  control: { type: 'boolean' },
};

export const weightArg = {
  control: { type: 'select' },
  options: ['normal', 'bold', 100, 200, 300, 400, 500, 600, 700, 800, 900],
};

export const boxArgs = {
  align: alignArg,
  alignContent: alignContentArg,
  background: backgroundArg,
  border: borderArg,
  direction: {
    control: { type: 'select' },
    options: ['row', 'column', 'row-responsive'],
  },
  elevation: elevationArg,
  fill: fillArg,
  gap: gapArg,
  height: heightArg,
  round: roundArg,
  skeleton: skeletonArg,
  width: widthArg,
};
