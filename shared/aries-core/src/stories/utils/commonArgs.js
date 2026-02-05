import React from 'react';
import { colors, hpe } from 'grommet-theme-hpe';
import * as Icons from '@hpe-design/icons-grommet';

export const backgroundColors = Object.keys(colors)
  .filter(key => key.split('-')[0] === 'background')
  .sort();

export const borderSizes = Object.keys(hpe.global.borderSize);

export const spacingSizes = Object.keys(hpe.global.edgeSize);

export const tShirtSizes = Object.keys(hpe.button.size);

export const textSizes = Object.keys(hpe.text).filter(
  key => !['extend', 'skeleton'].includes(key),
);

export const radiusSizes = Object.keys(hpe.global.radius);

export const containerSizes = Object.keys(hpe.global.size);

export const a11yTitleArg = {
  control: { type: 'text' },
};

export const alignArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'stretch', 'baseline'],
};

export const alignContentArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
};

export const backgroundArg = {
  control: { type: 'select' },
  options: backgroundColors,
};

export const borderArg = {
  control: { type: 'boolean' },
};

export const directionArg = {
  control: { type: 'select' },
  options: ['row', 'column', 'row-responsive'],
};

export const disabledArg = {
  control: { type: 'boolean' },
  options: [true, false],
};

export const elevationArg = {
  control: { type: 'select' },
  options: tShirtSizes,
};

export const fillArg = {
  control: { type: 'select' },
  options: ['true', 'false', 'horizontal', 'vertical'],
};

export const gapArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const heightArg = {
  control: { type: 'select' },
  options: containerSizes,
};

export const justifyArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'stretch'],
};

export const justifyContentArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
};

export const labelArg = {
  control: { type: 'text' },
};

export const marginArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const overflowArg = {
  control: { type: 'select' },
  options: ['auto', 'hidden', 'scroll', 'visible'],
};

export const padArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const responsiveArg = {
  control: { type: 'select' },
  options: [true, false, 'container'],
};

export const reverseArg = {
  control: { type: 'boolean' },
  options: [true, false],
};

export const roundArg = {
  control: { type: 'select' },
  options: radiusSizes,
};

export const skeletonArg = {
  control: { type: 'boolean' },
};

export const textSizesArg = {
  control: { type: 'select' },
  options: textSizes,
};

export const widthArg = {
  control: { type: 'select' },
  options: containerSizes,
};

export const iconArg = {
  control: { type: 'select' },
  options: ['none', ...Object.keys(Icons)],
  mapping: {
    none: undefined,
    ...Object.keys(Icons).reduce((acc, iconName) => {
      const IconComponent = Icons[iconName];
      acc[iconName] = React.createElement(IconComponent);
      return acc;
    }, {}),
  },
};

export const boxArgs = {
  align: alignArg,
  alignContent: alignContentArg,
  background: backgroundArg,
  border: borderArg,
  direction: directionArg,
  elevation: elevationArg,
  fill: fillArg,
  gap: gapArg,
  height: heightArg,
  overflow: overflowArg,
  responsive: responsiveArg,
  round: roundArg,
  pad: padArg,
  skeleton: skeletonArg,
  width: widthArg,
};
