import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons/icons/Info';

const primaryBackground = props =>
  !props.active
    ? `background:
linear-gradient(70deg, transparent,
  ${props.theme.global.colors['green!']} 35%, transparent 70%)
  ${props.theme.global.colors['green!']};`
    : '';

const primaryHoverBackground = props =>
  !props.active ? 'background-color: rgb(16, 116, 85);' : '';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  global: {
    colors: {
      'text-strong': {
        light: '#444444',
      },
      text: {
        light: '#6f6f6f',
      },
    },
  },
  buttonGroup: {
    // any Box props
    gap: 'small',
  },
  feedback: {
    closeButton: {
      a11yTitle: `You are in a dialog containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
    container: {
      pad: 'medium',
    },
    header: {
      align: 'start',
      direction: 'row',
      justify: 'between',
      gap: 'xsmall',
    },
    heading: {
      size: 'small',
      level: 2,
      margin: {
        vertical: 'none',
      },
    },
    footer: {
      pad: {
        top: 'medium',
      },
      direction: 'row',
      justify: 'end',
      gap: 'xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 'bold',
      alignSelf: 'end',
    },
  },
  // this is producing a console warning because it's not a supported status
  // proposing that notification should be more flexible to allow other statuses
  notification: {
    learn: {
      icon: Info,
      background: {
        color: 'status-warning',
        opacity: 'weak',
      },
      color: 'text',
      // global: {},
      toast: {
        background: 'background-front',
      },
    },
  },

  // below is needed for brand refresh
  button: {
    default: {
      color: 'text-strong',
      border: {
        radius: '100px',
      },
      font: {
        weight: 700,
      },
    },
    primary: {
      border: {
        radius: '100px',
      },
      color: 'text-primary-button',
      font: { weight: 'bold' },
      extend: props => primaryBackground(props),
    },
    secondary: {
      border: {
        color: 'brand',
        width: '2px',
        radius: '100px',
      },
      color: 'text-strong',
      font: {
        weight: 700,
      },
    },
    'cta-primary': {
      extend: props => primaryBackground(props),
    },
    hover: {
      primary: {
        extend: props => primaryHoverBackground(props),
      },
      'cta-primary': {
        extend: props => primaryHoverBackground(props),
      },
    },
    disabled: {
      opacity: 0.3,
      // overriding what is currently in grommet-theme-hpe
      background: undefined,
      color: undefined,
      primary: undefined,
      secondary: undefined,
      toolbar: undefined,
      'cta-primary': undefined,
      'cta-alternate': undefined,
    },
    extend: props => {
      let style = '';
      // icon only specific padding still in progress
      if (!props.hasLabel && !props.plain && props.kind !== 'toolbar') {
        if (props.sizeProp === 'medium' || !props.sizeProp) {
          if (props.kind === 'secondary') style += 'padding: 4px;';
          else style += 'padding: 6px;';
        } else if (props.kind === 'secondary') style += 'padding: 10px;';
        else style += 'padding: 12px;';
      }
      if (props.sizeProp === 'small') {
        style += 'line-height: 24px;';
      }
      return style;
    },
    size: {
      small: {
        pad: {
          vertical: '6px',
          horizontal: '18px',
        },
        toolbar: {
          pad: {
            vertical: '4px',
            horizontal: '8px',
          },
        },
        'cta-primary': undefined,
        'cta-alternate': undefined,
      },
      medium: {
        pad: {
          vertical: '6px',
          horizontal: '18px',
        },

        toolbar: {
          border: {
            radius: '6px',
          },
          pad: {
            vertical: '6px',
            horizontal: '12px',
          },
        },
      },
      large: {
        pad: {
          vertical: '8px',
          horizontal: '24px',
        },

        toolbar: {
          pad: {
            vertical: '8px',
            horizontal: '16px',
          },
        },
      },
    },
  },
  dataTable: {
    header: {
      font: undefined,
    },
    primary: {
      weight: 400,
      color: 'text-strong',
    },
  },
  heading: {
    level: {
      1: {
        small: {
          size: '36px',
          height: '36px',
          maxWidth: '854px',
        },
        medium: {
          size: '48px',
          height: '48px',
          maxWidth: '1277px',
        },
        // large: {
        //   size: '88px',
        //   height: '94px',
        //   maxWidth: '2122px',
        // },
        // xlarge: {
        //   size: '124px',
        //   height: '130px',
        //   maxWidth: '2966px',
        // },
      },
      2: {
        small: {
          size: '24px',
          height: '24px',
          maxWidth: '749px',
        },
        medium: {
          size: '36px',
          height: '36px',
          maxWidth: '1066px',
        },
        // large: {
        //   size: '58px',
        //   height: '64px',
        //   maxWidth: '1382px',
        // },
        // xlarge: {
        //   size: '71px',
        //   height: '77px',
        //   maxWidth: '1699px',
        // },
      },
      3: {
        small: {
          size: '20px',
          height: '20px',
          maxWidth: '643px',
        },
        medium: {
          size: '24px',
          height: '24px',
          maxWidth: '854px',
        },
        // large: {
        //   size: '44px',
        //   height: '50px',
        //   maxWidth: '1066px',
        // },
        // xlarge: {
        //   size: '53px',
        //   height: '59px',
        //   maxWidth: '1277px',
        // },
      },
      4: {
        small: {
          size: '16px',
          height: '16px',
          maxWidth: '538px',
        },
        medium: {
          size: '20px',
          height: '20px',
          maxWidth: '643px',
        },
        // large: {
        //   size: '31px',
        //   height: '37px',
        //   maxWidth: '749px',
        // },
        // xlarge: {
        //   size: '36px',
        //   height: '42px',
        //   maxWidth: '854px',
        // },
      },
      5: {
        small: {
          size: '16px',
          height: '22px',
          maxWidth: '379px',
        },
        medium: {
          size: '16px',
          height: '22px',
          maxWidth: '379px',
        },
        large: {
          size: '16px',
          height: '22px',
          maxWidth: '379px',
        },
        xlarge: {
          size: '16px',
          height: '22px',
          maxWidth: '379px',
        },
      },
      6: {
        small: {
          size: '14px',
          height: '20px',
          maxWidth: '326px',
        },
        medium: {
          size: '14px',
          height: '20px',
          maxWidth: '326px',
        },
        large: {
          size: '14px',
          height: '20px',
          maxWidth: '326px',
        },
        xlarge: {
          size: '14px',
          height: '20px',
          maxWidth: '326px',
        },
      },
    },
    weight: 500,
  },
  pageHeader: {
    heading: {
      size: 'medium',
    },
  },
  paragraph: {
    xsmall: {
      size: '14px',
      height: '16px',
      maxWidth: '379px',
    },
    small: {
      size: '16px',
      height: '20px',
      maxWidth: '379px',
    },
    medium: {
      size: '18px',
      height: '24px',
      maxWidth: '432px',
    },
    large: {
      size: '24px',
      height: '32px',
      maxWidth: '538px',
    },
    xlarge: {
      size: '30px',
      height: '36px',
      maxWidth: '643px',
    },
    // discouraged for paragraph but matches text xxl
    xxlarge: {
      size: '36px',
      height: '40px',
      maxWidth: '854px',
    },
    // extend: props => `${props.size ? 'color: red;' : ''}`,
  },
  text: {
    xsmall: {
      size: '14px',
      height: '16px',
      maxWidth: '379px',
    },
    small: {
      size: '16px',
      height: '20px',
      maxWidth: '379px',
    },
    medium: {
      size: '18px',
      height: '24px',
      maxWidth: '432px',
    },
    large: {
      size: '24px',
      height: '32px',
      maxWidth: '538px',
    },
    xlarge: {
      size: '30px',
      height: '36px',
      maxWidth: '643px',
    },
    xxlarge: {
      size: '36px',
      height: '40px',
      maxWidth: '854px',
    },
    '3xl': {
      size: '42px',
      height: '46px',
    },
    '4xl': {
      size: '48px',
      height: '48px',
    },
    '5xl': {
      size: '72px',
      height: '72px',
    },
    // flatten to match 5xl
    '6xl': {
      size: '72px',
      height: '72px',
    },
  },
  tab: {
    color: 'text',
    active: {
      background: undefined,
      color: 'text-strong',
    },
    hover: {
      background: 'transparent',
      color: 'text',
    },
    border: {
      side: 'bottom',
      color: 'transparent',
      size: 'medium',
      active: {
        color: 'green!',
      },
      disabled: {
        color: undefined,
      },
      hover: {
        color: 'border-weak',
      },
    },
    disabled: {
      color: 'text-xweak',
    },
    pad: {
      // top and bottom pad need to be defined individually, specifying
      // "vertical" only applies to top
      bottom: 'small',
      top: 'small',
      horizontal: 'medium',
    },
    margin: {
      // bring the overall tabs border behind invidual tab borders
      vertical: '-2px',
      horizontal: 'none',
    },
    extend: props => `
      font-weight: ${
        props.border.color === props.theme.global.colors['green!'] ? 700 : 400
      };
      // necessary to remove default line-height of 24px
      // how will this behave if tab has an icon?
      // is that allowed?
      // grommet enhancement should be considered if so
      > span { line-height: 18px; }
    `,
  },
  tabs: {
    header: {
      border: {
        side: 'bottom',
        size: 'small',
        color: 'none',
      },
    },
  },
  layer: {
    overlay: {
      background: '#0000001F',
    },
  },
});

export const { colors } = aries.global;
