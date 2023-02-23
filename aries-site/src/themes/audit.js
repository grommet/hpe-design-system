import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const { backgrounds, colors } = hpe.global;
const backgroundTokens = Object.keys(backgrounds);
const colorTokens = Object.keys(colors);

const isColorToken = value => {
  return colorTokens.includes(value);
};

const isBackgroundToken = value => {
  return backgroundTokens.includes(value) || colorTokens.includes(value);
};

const legend = {
  anchor: {
    'has icon': {
      rule: props => props.hasIcon,
      highlight: `background-color: aqua;`,
      issue: `color prop value is not a design token color`,
      resolution: '',
    },
    'label is not string': {
      rule: props => typeof props.label !== 'string',
      highlight: `background-color: aquamarine`,
    },
  },
};

const runAudit = props => {
  const result = [];
  Object.entries(legend.anchor).forEach(([key, value]) => {
    if (value.rule(props)) {
      result.push(value.highlight);
    }
  });
  return result;
};

export const audit = deepMerge(hpe, {
  anchor: {
    extend: props => runAudit(props),
  },
});
