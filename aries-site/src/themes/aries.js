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
  buttonGroup: {
    // any Box props
    gap: 'small',
  },
  feedback: {
    closeButton: {
      a11yTitle: `You are in a dialog containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
  },
  global: {
    colors: {
      text: {
        dark: '#FFFFFFE6', // 90%
        light: '#6F6F6F',
      },
      'text-strong': {
        dark: '#FFFFFFF5', // 96%
        light: '#444444',
      },
      'text-weak': {
        dark: '#FFFFFF80', // 50%
        light: '#757575',
      },
      'text-xweak': {
        dark: '#FFFFFF33', // 20%
        light: '#BBBBBB',
      },
    },
  },
  accordion: {
    heading: {
      // using level as a means of styling doesn't seem like the best...
      // need to file an issue against Grommet
      level: 3,
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
  calendar: {
    // using level as a means of styling doesn't seem like the best...
    // need to file an issue against Grommet
    heading: { level: 3 },
  },
  heading: {
    color: 'text-strong',
    weight: 500,
    level: {
      font: {
        weight: 400,
      },
      1: {
        small: {
          size: '24px',
          height: '24px',
        },
        medium: {
          size: '36px',
          height: '36px',
        },
        large: {
          size: '48px',
          height: '48px',
        },
        xlarge: {
          size: '60px',
          height: '60px',
        },
      },
      2: {
        small: {
          size: '20px',
          height: '20px',
        },
        medium: {
          size: '24px',
          height: '24px',
        },
        large: {
          size: '36px',
          height: '36px',
        },
        xlarge: {
          size: '48px',
          height: '48px',
        },
      },
      3: {
        small: {
          size: '16px',
          height: '16px',
        },
        medium: {
          size: '20px',
          height: '20px',
        },
        large: {
          size: '24px',
          height: '24px',
        },
        xlarge: {
          size: '36px',
          height: '36px',
        },
      },
      4: {
        small: {
          size: '12px',
          height: '12px',
        },
        medium: {
          size: '16px',
          height: '16px',
        },
        large: {
          size: '20px',
          height: '20px',
        },
        xlarge: {
          size: '24px',
          height: '24px',
        },
      },
      5: {
        font: {
          weight: 600,
        },
        small: {
          size: '12px',
          height: '12px',
        },
        medium: {
          size: '12px',
          height: '12px',
        },
        large: {
          size: '16px',
          height: '16px',
        },
        xlarge: {
          size: '20px',
          height: '20px',
        },
      },
      6: {
        font: {
          weight: 600,
        },
        small: {
          size: '12px',
          height: '12px',
        },
        medium: {
          size: '12px',
          height: '12px',
        },
        large: {
          size: '12px',
          height: '12px',
        },
        xlarge: {
          size: '16px',
          height: '16px',
        },
      },
    },
    extend: ({ level, size }) => {
      let fontWeight = '';
      if (level === 1 && size === 'small') {
        fontWeight = 'font-weight: 500;';
      } else if (level === 2 && ['large', 'xlarge'].includes(size)) {
        fontWeight = 'font-weight: 400;';
      } else if (level === 3 && size === 'small') {
        fontWeight = 'font-weight: 600;';
      } else if (level === 4 && ['small', 'medium'].includes(size)) {
        fontWeight = 'font-weight: 600;';
      } else if (level === 5 && size === 'xlarge') {
        fontWeight = 'font-weight: 500;';
      }
      return fontWeight;
    },
  },
  pageHeader: {
    actions: {
      // aligns button height with heading font-size instead of line-height
      pad: { vertical: 'none' },
    },
    subtitle: {
      size: 'xlarge',
    },
    title: {
      size: 'medium',
    },
  },
  pagination: {
    button: {
      border: {
        radius: '100px',
      },
      font: {
        weight: 700,
      },
      active: {
        border: {
          radius: '100px',
        },
        font: {
          weight: 700,
        },
      },
      disabled: {
        color: 'text-xweak',
      },
    },
  },
  paragraph: {
    xsmall: {
      size: '14px',
      height: '16px',
    },
    small: {
      size: '16px',
      height: '18px',
    },
    medium: {
      size: '18px',
      height: '24px',
    },
    large: {
      size: '24px',
      height: '32px',
    },
    xlarge: {
      size: '30px',
      height: '36px',
    },
    xxlarge: {
      size: '36px',
      height: '40px',
    },
    extend: ({ size }) => `
      ${['xlarge', 'xxlarge'].includes(size) ? 'font-weight: 300;' : ''};
    `,
  },
  text: {
    xsmall: {
      size: '14px',
      height: '16px',
    },
    small: {
      size: '16px',
      height: '20px',
    },
    medium: {
      size: '18px',
      height: '24px',
    },
    large: {
      size: '24px',
      height: '32px',
    },
    xlarge: {
      size: '30px',
      height: '36px',
    },
    xxlarge: {
      size: '36px',
      height: '40px',
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
    '6xl': {
      size: '72px',
      height: '72px',
    },
    extend: ({ size }) => `
      ${
        ['xlarge', 'xxlarge', '3xl', '4xl', '5xl', '6xl'].includes(size)
          ? 'font-weight: 300;'
          : ''
      };
    `,
  },
});

export const ariesWeb = deepMerge(aries, {
  heading: {
    color: 'text-strong',
    weight: 400,
    level: {
      1: {
        small: {
          size: '48px',
          height: '48px',
          maxWidth: '854px',
        },
        medium: {
          size: '72px',
          height: '72px',
          maxWidth: '1277px',
        },
        large: {
          size: '96px',
          height: '96px',
          maxWidth: '2122px',
        },
        xlarge: {
          size: '120px',
          height: '120px',
          maxWidth: '2966px',
        },
      },
      2: {
        small: {
          size: '36px',
          height: '36px',
          maxWidth: '749px',
        },
        medium: {
          size: '48px',
          height: '48px',
          maxWidth: '1066px',
        },
        large: {
          size: '72px',
          height: '72px',
          maxWidth: '1382px',
        },
        xlarge: {
          size: '96px',
          height: '96px',
          maxWidth: '1699px',
        },
      },
      3: {
        small: {
          size: '24px',
          height: '24px',
          maxWidth: '643px',
        },
        medium: {
          size: '36px',
          height: '36px',
          maxWidth: '854px',
        },
        large: {
          size: '48px',
          height: '48px',
          maxWidth: '1066px',
        },
        xlarge: {
          size: '72px',
          height: '72px',
          maxWidth: '1277px',
        },
      },
      4: {
        font: {
          weight: 500,
        },
        small: {
          size: '18px',
          height: '18px',
          maxWidth: '538px',
        },
        medium: {
          size: '24px',
          height: '24px',
          maxWidth: '643px',
        },
        large: {
          size: '36px',
          height: '36px',
          maxWidth: '749px',
        },
        xlarge: {
          size: '48px',
          height: '48px',
          maxWidth: '854px',
        },
      },
      5: {
        font: {
          weight: 500,
        },
        small: {
          size: '16px',
          height: '16px',
          maxWidth: '379px',
        },
        medium: {
          size: '18px',
          height: '18px',
          maxWidth: '379px',
        },
        large: {
          size: '24px',
          height: '24px',
          maxWidth: '379px',
        },
        xlarge: {
          size: '36px',
          height: '36px',
          maxWidth: '379px',
        },
      },
      6: {
        font: {
          weight: 500,
        },
        small: {
          size: '14px',
          height: '14px',
          maxWidth: '326px',
        },
        medium: {
          size: '16px',
          height: '16px',
          maxWidth: '326px',
        },
        large: {
          size: '18px',
          height: '18px',
          maxWidth: '326px',
        },
        xlarge: {
          size: '24px',
          height: '24px',
          maxWidth: '326px',
        },
      },
    },
    extend: ({ level, size }) => {
      let fontWeight = '';
      if (level === 3 && size === 'small') {
        fontWeight = 'font-weight: 500;';
      } else if (level === 4 && ['large', 'xlarge'].includes(size)) {
        fontWeight = 'font-weight: 400;';
      } else if (level === 5 && size === 'xlarge') {
        fontWeight = 'font-weight: 400;';
      } else if (level === 6 && size === 'small') {
        fontWeight = 'font-weight: 600;';
      }
      return fontWeight;
    },
  },
  paragraph: {
    small: {
      size: '16px',
      height: '20px',
      maxWidth: '379px',
    },
    medium: {
      size: '18px',
      height: '22px',
      maxWidth: '432px',
    },
    large: {
      size: '24px',
      height: '30px',
      maxWidth: '538px',
    },
    xlarge: {
      size: '36px',
      height: '42px',
      maxWidth: '643px',
    },
    xxlarge: {
      size: '42px',
      height: '48px',
      maxWidth: '854px',
    },
    extend: ({ size }) => {
      if (['large', 'xlarge', 'xxlarge'].includes(size))
        return 'font-weight: 300;';
      return '';
    },
  },
  text: {
    xsmall: {
      // weight needs to be modified at the size level
      size: '14px',
      height: '18px',
      maxWidth: '326px',
    },
    small: {
      // weight needs to be modified at the size level
      size: '16px',
      height: '20px',
      maxWidth: '379px',
    },
    medium: {
      // weight needs to be modified at the size level
      size: '18px',
      height: '22px',
      maxWidth: '432px',
    },
    large: {
      // weight needs to be modified at the size level by bumping down to 300
      size: '24px',
      height: '30px',
      maxWidth: '538px',
    },
    xlarge: {
      // weight needs to be modified at the size level by bumping down to 300
      size: '36px',
      height: '42px',
      maxWidth: '643px',
    },
    // xxlarge is not part of Chris's type exploration
    xxlarge: {
      // weight needs to be modified at the size level by bumping down to 300
      size: '42px',
      height: '48px',
      maxWidth: '854px',
    },
    extend: ({ size }) => {
      if (
        ['large', 'xlarge', 'xxlarge', '3xl', '4xl', '5xl', '6xl'].includes(
          size,
        )
      )
        return 'font-weight: 300;';
      return '';
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
