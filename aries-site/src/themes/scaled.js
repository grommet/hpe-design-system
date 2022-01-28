import { base } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { aries } from './aries';

export const scaled = (theme = aries, scale = 0.5) => {
  const source = deepMerge(base, theme);
  const scaledTheme = { ...source };
  const scaleAttributes = [
    source.global.breakpoints,
    source.global.edgeSize,
    source.global.size,
  ];

  scaleAttributes.forEach(attr => {
    Object.keys(attr).forEach(key => {
      if (attr[key].value) {
        /* eslint-disable no-param-reassign */
        // eslint-disable-next-line operator-assignment
        attr[key].value = attr[key].value * scale;
      } else if (typeof attr[key] === 'string' && attr[key].includes('px')) {
        attr[key] = `${Math.ceil(parseInt(attr[key], 10) * scale)}px`;
        /* eslint-enable no-param-reassign */
      }
    });
  });

  return scaledTheme;
};
