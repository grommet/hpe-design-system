import { Transform, TransformedToken } from 'style-dictionary/types';

/**
 * See W3C design token spec: https://tr.designtokens.org/format/#gradient
 */
type GradientStop = {
  color: number;
  position: number;
};

export const linearGradientCss: Transform = {
  name: 'linearGradient/css',
  type: `value`,
  transitive: true,
  filter: (token: TransformedToken): boolean => token?.$type === 'gradient',
  transform: (token: TransformedToken) => {
    const stops = token.$value.stops
      .map(
        (stop: GradientStop) =>
          `${stop.color}${
            stop.position ? ` ${Math.floor(stop.position * 100)}%` : ''
          }`,
      )
      .join(', ');

    return `linear-gradient(${
      token.$value.angle ? `${token.$value.angle}deg, ` : ''
    }${stops})`;
  },
};
