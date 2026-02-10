import React from 'react';
import { colors, hpe } from 'grommet-theme-hpe';
import * as Icons from '@hpe-design/icons-grommet';
import { ThemeType } from 'grommet';

export const backgroundColors: string[] = Object.keys(colors)
  .filter(key => key.split('-')[0] === 'background')
  .sort();

export const borderSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.borderSize ?? {},
);

export const spacingSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.edgeSize ?? {},
).filter(key => !['responsiveBreakpoint'].includes(key));

export const tShirtSizes: string[] = Object.keys(
  (hpe as ThemeType).button?.size ?? {},
);

export const textSizes: string[] = Object.keys(
  (hpe as ThemeType).text ?? {},
).filter(key => !['extend', 'skeleton'].includes(key));

export const radiusSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.radius ?? {},
).filter(key => !['responsiveBreakpoint'].includes(key));

export const containerSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.size ?? {},
);

interface ArgType {
  control?:
    | false
    | { type: 'text' }
    | { type: 'boolean' }
    | { type: 'number'; min?: number; max?: number; step?: number }
    | { type: 'select'; options?: any[] }
    | { type: 'object' };
  options?: any[];
  mapping?: Record<string, any>;
  type?: 'function';
  action?: string;
}

export const a11yTitleArg: ArgType = {
  control: { type: 'text' },
};

export const alignArg: ArgType = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'stretch', 'baseline'],
};

export const alignContentArg: ArgType = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
};

export const backgroundArg: ArgType = {
  control: { type: 'select' },
  options: backgroundColors,
};

export const borderArg: ArgType = {
  control: { type: 'boolean' },
};

export const directionArg: ArgType = {
  control: { type: 'select' },
  options: ['row', 'column', 'row-responsive'],
};

export const disabledArg: ArgType = {
  control: { type: 'boolean' },
};

export const elevationArg: ArgType = {
  control: { type: 'select' },
  options: tShirtSizes,
};

export const fillArg: ArgType = {
  control: { type: 'select' },
  options: ['true', 'false', 'horizontal', 'vertical'],
};

export const gapArg: ArgType = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const heightArg: ArgType = {
  control: { type: 'select' },
  options: containerSizes,
};

export const justifyArg: ArgType = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'stretch'],
};

export const justifyContentArg: ArgType = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
};

export const labelArg: ArgType = {
  control: { type: 'text' },
};

export const marginArg: ArgType = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const overflowArg: ArgType = {
  control: { type: 'select' },
  options: ['auto', 'hidden', 'scroll', 'visible'],
};

export const padArg: ArgType = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const responsiveArg: ArgType = {
  control: { type: 'select' },
  options: [true, false, 'container'],
};

export const reverseArg: ArgType = {
  control: { type: 'boolean' },
};

export const roundArg: ArgType = {
  control: { type: 'select' },
  options: radiusSizes,
};

export const skeletonArg: ArgType = {
  control: { type: 'boolean' },
};

export const textSizesArg: ArgType = {
  control: { type: 'select' },
  options: textSizes,
};

export const widthArg: ArgType = {
  control: { type: 'select' },
  options: containerSizes,
};

export const iconArg: ArgType = {
  control: { type: 'select' },
  options: ['none', ...Object.keys(Icons)],
  mapping: {
    none: undefined,
    ...Object.keys(Icons).reduce(
      (acc: Record<string, React.ReactElement>, iconName: string) => {
        const IconComponent = Icons[
          iconName as keyof typeof Icons
        ] as React.ComponentType;
        acc[iconName] = React.createElement(IconComponent);
        return acc;
      },
      {},
    ),
  },
};

export const boxArgs: Record<string, ArgType> = {
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
