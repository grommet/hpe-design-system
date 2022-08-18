import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

import { backgrounds } from './backgrounds';

const hpeElement = color =>
  `url("data:image/svg+xml,
  %3Csvg 
    xmlns='http://www.w3.org/2000/svg' 
    viewBox='0 0 48 24' 
    preserveAspectRatio='none'
  %3E
    %3Cg 
      x='0' 
      y='0' 
      fill='${encodeURIComponent(color)}' 
      fill-rule='evenodd' 
      clip-rule='evenodd' %3E
        %3Cpath 
          d='M2 6h44v12H2V6zm3 3h38v6H5V9z' /%3E
    %3C/g%3E
  %3C/svg%3E")`;

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  global: {
    backgrounds,
    control: {
      border: {
        radius: '24px',
      },
    },
    drop: {
      border: {
        radius: '12px',
      },
    },
  },
  checkBox: {
    extend: ({ disabled, theme }) => `
      ${
        !disabled &&
        `:hover {
        background-color: ${
          theme.global.colors['background-contrast'][
            theme.dark ? 'dark' : 'light'
          ]
        };
        border-radius: 1px;
      }`
      }
      font-weight: 500;
      width: auto;
      padding: ${theme.global.edgeSize.xsmall} ${theme.global.edgeSize.small};
    `,
  },
  fileInput: {
    button: {
      border: {
        radius: '24px',
      },
    },
  },
  formField: {
    round: 'large',
  },
  menu: {
    group: {
      separator: {
        color: 'border-weak',
      },
    },
  },
  radioButton: {
    container: {
      extend: ({ theme }) => `
        font-weight: 500;
        width: auto;
        border-radius: 1px;
        padding: 
        ${theme.global.edgeSize.xxsmall} ${theme.global.edgeSize.xsmall};
      `,
    },
  },
  button: {
    size: {
      small: {
        pad: {
          vertical: '4px',
          horizontal: '24px',
        },
      },
      medium: {
        pad: {
          vertical: '6px',
          horizontal: '24px',
        },
      },
      large: {
        pad: {
          vertical: '6px',
          horizontal: '24px',
        },
      },
    },
    padding: {
      vertical: '4px',
      horizontal: '22px',
    },
    'cta-primary': {
      background: {
        color: 'brand',
      },
      border: undefined,
      color: 'white', // 'text-strong',
      font: {
        weight: 700,
      },
      extend: props => {
        const color = props.disabled ? 'text-xweak' : 'text-strong';
        const dark = props.active || props.disabled ? props.theme.dark : true;
        const colorValue =
          props.theme.global.colors[color][dark ? 'dark' : 'light'];

        return `&:after {
          display: inline-block;
          width: 48px;
          height: 24px;
          padding-left: ${props.hasLabel ? '12px' : '0px'};
          vertical-align: middle;
          content: ${hpeElement(colorValue)};
        }`;
      },
    },
    'cta-alternate': {
      background: {
        color: 'background-contrast',
      },
      border: undefined,
      color: 'text-strong',
      font: {
        weight: 700,
      },
      extend: props => {
        const color = props.disabled ? 'text-xweak' : 'green!';
        const dark = props.active || props.disabled ? props.theme.dark : true;
        const colorValue = !props.disabled
          ? props.theme.global.colors[color]
          : props.theme.global.colors[color][dark ? 'dark' : 'light'];

        return `&:after {
                  display: inline-block;
                  width: 48px;
                  height: 24px;
                  padding-left: ${props.hasLabel ? '12px' : '0px'};
                  vertical-align: middle;
                  content: ${hpeElement(colorValue)};
                }`;
      },
    },
    disabled: {
      'cta-primary': {
        border: {
          color: 'border-weak',
          width: '2px',
        },
      },
      'cta-alternate': {
        border: {
          color: 'border-weak',
          width: '2px',
        },
      },
    },
    hover: {
      'cta-primary': {
        extend: ({ active, colorValue, theme }) => {
          let color;
          if (!colorValue && !active) {
            if (theme.dark) {
              color = 'rgba(0, 0, 0, 0.2)';
            } else color = 'rgba(0, 0, 0, 0.2)'; // TBD
          }

          const style = `inset 0 0 100px 100px ${color}`;
          return `
            -moz-box-shadow: ${style};
            -webkit-box-shadow: ${style};
            box-shadow: ${style};`;
        },
      },
      'cta-alternate': {
        extend: ({ active, colorValue, theme }) => {
          let color;
          if (!colorValue && !active) {
            if (theme.dark) {
              color = 'rgba(0, 0, 0, 0.2)';
            } else color = 'rgba(0, 0, 0, 0.2)'; // TBD
          }

          const style = `inset 0 0 100px 100px ${color}`;
          return `-moz-box-shadow: ${style};
            -webkit-box-shadow: ${style};
            box-shadow: ${style};`;
        },
      },
    },
  },
});

export const { colors } = aries.global;
