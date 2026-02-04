import { ThemeType } from 'grommet';
import { colors, hpe } from 'grommet-theme-hpe';

interface SelectControlArg {
  control: { type: 'select' };
  options: string[] | (string | boolean)[];
}

interface RadioControlArg {
  control: { type: 'radio' };
  options: string[];
}

interface BooleanControlArg {
  control: { type: 'boolean' };
}

type ControlArg = SelectControlArg | RadioControlArg | BooleanControlArg;

export const backgroundColors: string[] = Object.keys(colors)
  .filter(key => key.split('-')[0] === 'background')
  .sort();

export const borderSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.borderSize ?? {},
);

export const spacingSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.edgeSize ?? {},
);

export const tShirtSizes: string[] = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];

export const radiusSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.radius ?? {},
);

export const containerSizes: string[] = Object.keys(
  (hpe as ThemeType).global?.size ?? {},
);

export const fillArg: SelectControlArg = {
  control: { type: 'select' },
  options: [true, false, 'horizontal', 'vertical'],
};

export const gapArg: SelectControlArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const backgroundArg: SelectControlArg = {
  control: { type: 'select' },
  options: backgroundColors,
};

export const heightArg: SelectControlArg = {
  control: { type: 'select' },
  options: containerSizes,
};

export const padArg: SelectControlArg = {
  control: { type: 'select' },
  options: spacingSizes,
};

export const roundArg: SelectControlArg = {
  control: { type: 'select' },
  options: radiusSizes,
};

export const widthArg: SelectControlArg = {
  control: { type: 'select' },
  options: containerSizes,
};

export const alignArg: SelectControlArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'stretch', 'baseline'],
};

export const alignContentArg: SelectControlArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'evenly', 'stretch'],
};

export const justifyContentArg: SelectControlArg = {
  control: { type: 'select' },
  options: ['start', 'center', 'end', 'between', 'around', 'stretch'],
};

export const borderArg: BooleanControlArg = {
  control: { type: 'boolean' },
};

export const elevationArg: SelectControlArg = {
  control: { type: 'select' },
  options: tShirtSizes,
};

export const skeletonArg: BooleanControlArg = {
  control: { type: 'boolean' },
};

export const boxArgs: Record<string, ControlArg> = {
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
