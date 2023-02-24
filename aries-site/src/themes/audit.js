import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const { backgrounds, colors } = hpe.global;
const backgroundTokens = Object.keys(backgrounds);
const colorTokens = Object.keys(colors);

const isColorToken = value => {
  console.log(colorTokens.includes(value));
  return colorTokens.includes(value);
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
  styleProp: {
    highlight: `
    background-color: inherit;
    animation: pulse 2s infinite;

    @keyframes pulse {
      0% {
        background-color: red;
      }
    
      20% {
        background-color: pink;
      }
    
      50% {
        background-color: white;
      }

      70% {
        background-color: pink;
      }
    
      100% {
        background-color: red;
      }
    }
    `,
  },
};

const runAudit = props => {
  const result = [];
  Object.entries(legend.anchor).forEach(([key, value]) => {
    if (value.rule(props)) {
      result.push(value.highlight);
    }
  });
  if (props.style) {
    result.push(legend.styleProp.highlight);
  }
  return result;
};

export const audit = deepMerge(hpe, {
  anchor: {
    extend: props => runAudit(props),
  },
});
