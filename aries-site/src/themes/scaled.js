import { base } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { aries } from './aries';

export const scaled = (theme = aries, scale = 0.5) => {
  const nextTheme = deepMerge(base, theme);
  const output = { ...nextTheme };
  const scaleAttributes = [
    output.global.breakpoints,
    output.global.edgeSize,
    output.global.size,
  ];

  scaleAttributes.forEach(attr => {
    Object.keys(attr).forEach(key => {
      if (attr[key].value) {
        attr[key].value = attr[key].value * scale;
      } else if (typeof attr[key] === 'string' && attr[key].includes('px')) {
        attr[key] = `${Math.ceil(parseInt(attr[key], 10) * scale)}px`;
      }
    });
  });

  return output;
};
