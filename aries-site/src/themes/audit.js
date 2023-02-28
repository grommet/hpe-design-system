import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const flatten = (obj, parent) => {
  const flattened = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flatten(value, key));
    } else {
      flattened[parent + key] = value;
    }
  });
  return flattened;
};

const { backgrounds, colors } = hpe.global;
const backgroundTokens = Object.keys(backgrounds);
const colorTokens = Object.keys(colors);
const colorValues = Object.values(flatten(colors))
  .reduce((previous, current) => {
    if (current && !previous.includes(current)) {
      previous.push(current);
    }
    return previous;
  }, [])
  .sort();

const isColorToken = function (value) {
  let result;
  if (typeof value === 'string') {
    result =
      colorTokens.includes(value) ||
      colorValues.includes(value) ||
      ['none', 'transparent'].includes(value);
  } else if (typeof value === 'object' && value.color) {
    result = isColorToken(value.color);
  } else if (value.dark && value.light) {
    result = isColorToken(value.dark) && isColorToken(value.light);
  }
  return result;
};

const isBackgroundToken = value => {
  return backgroundTokens.includes(value);
  // || colorTokens.includes(value)
};

const legend = {
  anchor: {
    'color value': {
      // rule: props => props.colorProp && !isColorToken(props.colorProp),
      rule: props => props.colorProp,
      highlight: `background-color: #E6B0AA;`,
      // issue: `color prop value is not a design token color`,
      issue: `color value is set by prop rather than theme`,
      resolution: ``,
    },
    'size override': {
      rule: props => props.size,
      highlight: `background-color: #CD6155;`,
      issue: `size value is set by prop; instead size should be inherited from its parent`,
      resolution: ``,
    },
    'weight override': {
      rule: props => props.weight,
      highlight: `background-color: #A93226;`,
      issue: `weight value is set by prop rather than theme`,
      resolution: ``,
    },
  },
  box: {
    'border design token': {
      rule: props => props.border && isColorToken(props.border) === false,
      highlight: `border: #C39BD3 2px dotted;`,
      issue: `border value is not a design token color`,
      resolution: ``,
    },
    'background design token': {
      rule: props => {
        return (
          props.background &&
          isColorToken(props.background) === false &&
          isBackgroundToken(props.background) === false
        );
      },
      highlight: `
        background-color: #76448A;
        border: #9B59B6 dotted 2px;
      `,
      issue: `background value is not a design token color or background`,
      resolution: ``,
    },
  },
  button: {
    'color value': {
      rule: props => props.colorValue,
      highlight: `
        border: #A9CCE3 dotted 2px;
      `,
      issue: `color value is set by prop rather than theme`,
      resolution: ``,
    },
    'custom button': {
      rule: props => (!props.hasIcon && !props.hasLabel) || props.plain,
      highlight: `
        border: #5499C7 dotted 2px;
      `,
      issue: `button is not a button supplied by the hpe theme`,
      resolution: ``,
    },
  },
  heading: {
    'color value': {
      rule: props => props.colorProp,
      highlight: `
        background-color: #A3E4D7;
    `,
      issue: `color value is set by prop rather than theme`,
      resolution: ``,
    },
    'size value': {
      rule: props => props.size && props.size !== 'medium',
      highlight: `
        background-color: #48C9B0;
    `,
      issue: `size value is set by prop rather than theme`,
      resolution: ``,
    },
    'weight value': {
      rule: props => props.weight,
      highlight: `
        background-color: #17A589;
    `,
      issue: `weight value is set by prop rather than theme`,
      resolution: ``,
    },
  },
  paragraph: {
    'color value': {
      rule: props => props.colorProp,
      highlight: `
        background-color: #F9E79F;
    `,
      issue: `color value is set by prop rather than theme`,
      resolution: ``,
    },
    'color design token': {
      rule: props => props.colorProp && !isColorToken(props.colorProp),
      highlight: `
        background-color: #F4D03F;
    `,
      issue: `color value is not a design token color`,
      resolution: ``,
    },
    'size value': {
      rule: props => props.size && props.size !== 'medium',
      highlight: `
        background-color: #D4AC0D;
    `,
      issue: `size value is set by prop rather than theme`,
      resolution: ``,
    },
    'weight value': {
      rule: props => props.weight,
      highlight: `
        background-color: #9A7D0A;
    `,
      issue: `weight value is set by prop rather than theme`,
      resolution: `remove weight prop and use default weight provided by the HPE theme.`,
    },
  },
  text: {
    'color value': {
      rule: props => props.colorProp,
      highlight: `
        background-color: #FAD7A0;
    `,
      issue: `color value is set by prop rather than theme`,
      resolution: ``,
    },
    'color design token': {
      rule: props => props.colorProp && !isColorToken(props.colorProp),
      highlight: `
        background-color: #F5B041;
    `,
      issue: `color value is not a design token color`,
      resolution: ``,
    },
    'size value': {
      rule: props => props.size && props.size !== 'medium',
      highlight: `
        background-color: #D68910;
    `,
      issue: `size value is set by prop rather than theme`,
      resolution: ``,
    },
    'weight value': {
      rule: props => props.weight,
      highlight: `
        background-color: #9C640C;
    `,
      issue: `weight value is set by prop rather than theme`,
      resolution: `remove weight prop and use default weight provided by the HPE theme.`,
    },
  },
  styleProp: {
    highlight: `
      background-color: #D4E6F1 !important;
    `,
  },
};

const runAudit = (component, props, options) => {
  const result = [];
  if (legend[component]) {
    Object.entries(legend[component]).forEach(([key, value]) => {
      if (value.rule(props)) {
        result.push(value.highlight);
        options?.rule &&
          result.push(`:after { 
          display: flex;
          content: 'Issue: ${value.issue}';
          background-color: black;
          border-radius: 0.5em;
          color: white;
          font-size: 16px;
          margin: 6px;
          padding: 6px 12px;
          max-width: 100%;
        }
        `);
      }
    });
  }
  if (
    props.style
    // && props.as !== 'a'
  ) {
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
  button: {
    extend: props => runAudit('button', props),
  },
  heading: {
    extend: props => runAudit('heading', props),
  },
  paragraph: {
    extend: props => runAudit('paragraph', props, { issue: false }),
  },
  text: {
    extend: props => runAudit('text', props, { issue: false }),
  },
});
