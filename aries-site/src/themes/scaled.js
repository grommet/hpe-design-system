import { generate } from 'grommet/themes/base';
import { deepMerge } from 'grommet/utils';
import { aries } from './aries';

// explicitly define theme properties which are undefined or 'inherit'
// in theme, otherwise they will not be scaled.
const undefinedThemeProperties = {
  global: {
    input: {
      font: {
        size: 'medium',
        height: 'medium',
      },
    },
  },
};

export const scaled = (scale = 1, baseSpacing = 24) => {
  // scales everything in base
  const scaledBase = generate(baseSpacing * scale);
  // merges theme, but overwrites scale for particular attributes
  const merged = deepMerge(scaledBase, aries);
  // add any undefined / inerited theme properties
  const source = deepMerge(merged, undefinedThemeProperties);
  const scaledTheme = { ...source };
  // define attributes which need to be re-scaled; essentially any
  // size which is staticly set in hpe/aries theme
  const scaleAttributes = [
    source.global.breakpoints,
    source.global.drop.border,
    source.global.input.padding,
    source.global.input.font,
    source.button.secondary.border,
    source.button.toolbar.border,
    source.button.option.border,
    source.button.disabled.primary.border,
    source.button.hover.secondary.border,
    source.button.size.small.border,
    source.button.size.small.pad,
    source.button.size.medium.border,
    source.button.size.medium.pad,
    source.button.size.large.border,
    source.button.size.large.pad,
    source.button.border,
    source.button.padding,
    source.calendar.small,
    source.calendar.medium,
    source.calendar.large,
    source.checkBox.border,
    source.checkBox.check,
    source.fileInput.button.border,
    source.fileInput.button.pad,
    source.heading.level[1].small,
    source.heading.level[1].medium,
    source.heading.level[1].large,
    source.heading.level[1].xlarge,
    source.heading.level[2].small,
    source.heading.level[2].medium,
    source.heading.level[2].large,
    source.heading.level[2].xlarge,
    source.heading.level[3].small,
    source.heading.level[3].medium,
    source.heading.level[3].large,
    source.heading.level[3].xlarge,
    source.heading.level[4].small,
    source.heading.level[4].medium,
    source.heading.level[4].large,
    source.heading.level[4].xlarge,
    source.heading.level[5].small,
    source.heading.level[5].medium,
    source.heading.level[5].large,
    source.heading.level[5].xlarge,
    source.heading.level[6].small,
    source.heading.level[6].medium,
    source.heading.level[6].large,
    source.heading.level[6].xlarge,
    source.icon.size,
    source.paragraph.small,
    source.paragraph.medium,
    source.paragraph.large,
    source.paragraph.xlarge,
    source.paragraph.xxlarge,
    source.text.xsmall,
    source.text.small,
    source.text.medium,
    source.text.large,
    source.text.xlarge,
    source.text.xxlarge,
  ];

  scaleAttributes.forEach(attr => {
    Object.keys(attr).forEach(key => {
      /* eslint-disable no-param-reassign */
      if (attr[key].value) {
        // eslint-disable-next-line operator-assignment
        attr[key].value = Math.ceil(attr[key].value * scale);
      } else if (typeof attr[key] === 'string' && attr[key].includes('px')) {
        attr[key] = `${Math.ceil(parseInt(attr[key], 10) * scale)}px`;
      }
      /* eslint-enable no-param-reassign */
    });
  });

  return scaledTheme;
};
