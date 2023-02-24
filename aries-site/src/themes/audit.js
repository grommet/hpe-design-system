import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const { backgrounds, colors } = hpe.global;
const backgroundTokens = Object.keys(backgrounds);
const colorTokens = Object.keys(colors);

const isColorToken = function (value) {
  let result;
  if (typeof value === 'string') {
    result = colorTokens.includes(value);
  } else if (typeof value === 'object' && value.color) {
    result = isColorToken(value.color);
  } else if (value.dark && value.light) {
    result = isColorToken(value.dark) && isColorToken(value.light);
  }
  return result;
};

const isBackgroundToken = value => {
  return backgroundTokens.includes(value) || colorTokens.includes(value);
};

const legend = {
  anchor: {
    'color value': {
      // rule: props => props.colorProp && !isColorToken(props.colorProp),
      rule: props => props.colorProp,
      highlight: `background-color: aquamarine;`,
      // issue: `color prop value is not a design token color`,
      issue: `color value is set by prop rather than theme`,
      resolution: ``,
    },
    'size override': {
      rule: props => props.size,
      highlight: `background-color: blanchedalmond;`,
      issue: `size value is set by prop; instead size should be inherited from its parent`,
      resolution: ``,
    },
    'weight override': {
      rule: props => props.weight,
      highlight: `background-color: blue;`,
      issue: `weight value is set by prop rather than theme`,
      resolution: ``,
    },
  },
  box: {
    'border design token': {
      rule: props => props.border && isColorToken(props.border) === false,
      highlight: `border: blue 2px dotted;`,
      issue: `border value is not a design token color`,
      resolution: ``,
    },
    'background design token': {
      rule: props =>
        props.background &&
        isColorToken(props.background) === false &&
        isBackgroundToken(props.background) === false,
      highlight: `
        background-color: blue;
        border: red dotted 2px;
      `,
      issue: `background value is not a design token color or background`,
      resolution: ``,
    },
  },
  styleProp: {
    highlight: `
    background-color: yellowgreen !important;
    `,
  },
};

const runAudit = (component, props) => {
  const result = [];
  if (legend[component]) {
    Object.entries(legend[component]).forEach(([key, value]) => {
      if (value.rule(props)) {
        result.push(value.highlight);
      }
    });
  }
  if (props.style) {
    console.log('yo');
    result.push(legend.styleProp.highlight);
  }
  return result;
};

export const audit = deepMerge(hpe, {
  anchor: {
    extend: props => runAudit('anchor', props),
  },
  box: {
    extend: props => runAudit('box', props),
  },
});
