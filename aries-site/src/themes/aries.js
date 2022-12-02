import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { CircleAlert } from 'grommet-icons/icons/CircleAlert';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  global: {
    colors: {
      text: {
        dark: '#FFFFFFE6', // 90%
        light: '#444444',
      },
      'text-strong': {
        dark: '#FFFFFFF5', // 96%
        light: '#000000',
      },
      'text-weak': {
        dark: '#FFFFFF80', // 50%
        light: '#6F6F6F', // light: '#757575',
      },
      'text-xweak': {
        // light value may need to be revisited to allow enough differentiation
        // from 'text' / 'text-weak'
        dark: '#FFFFFF33', // 20%
        light: '#BBBBBB',
      },
    },
    input: {
      font: {
        size: '16px',
        height: '20px',
        weight: 500,
      },
    },
  },
  accordion: {
    heading: {
      // using level as a means of styling doesn't seem like the best...
      // need to file an issue against Grommet
      level: 3, // level: '4',
      margin: {
        vertical: 'medium',
        horizontal: 'xsmall',
      },
    },
  },
  button: {
    'cta-alternate': {
      color: 'text', // 'text-strong',
      font: {
        weight: 700,
      },
    },
    default: {
      color: 'text', // 'text-strong',
      border: undefined,
      font: {
        weight: 700,
      },
    },
    secondary: {
      color: 'text', // 'text-strong',
      font: {
        weight: 700,
      },
    },
    toolbar: {
      color: 'text', // 'text-strong',
      font: {
        weight: 700,
      },
    },
    option: {
      color: 'text-weak',
      font: {
        weight: 500,
      },
    },
  },
  formField: {
    disabled: {
      label: {
        // this disabled label is getting overwritten by StyledText, presumably
        // because the color is being specified in theme.text.extend.
        color: 'text-xweak',
      },
    },
    error: {
      icon: (
        <CircleAlert
          size="small"
          style={{
            marginTop: '2px', // '4px',
          }}
        />
      ),
      size: 'small', // 'xsmall',
      color: 'text',
      margin: {
        bottom: 'xsmall',
        top: 'none',
        horizontal: 'none',
      },
    },
    help: {
      size: 'small', // 'xsmall',
    },
    info: {
      size: 'small', // 'xsmall',
    },
    label: {
      // this label is getting overwritten by StyledText, presumably
      // because the color is being specified in theme.text.extend.
      color: 'text',
      size: 'small', // 'xsmall',
      weight: 500,
    },
    // Ideally this is not needed. labels are getting overwritten by StyledText, presumably
    // because the color is being specified in theme.text.extend.
    extend: ({ theme }) => `
      > label { 
        color: ${theme.global.colors.text[theme.dark ? 'dark' : 'light']};
      }
    `,
  },
  heading: {
    color: 'text',
    weight: 400,
    level: {
      1: {
        small: {
          size: '26px', // size: '48px', // size: '36px',
          height: '26px', // height: '48px', // height: '42px',
          maxWidth: '854px',
        },
        medium: {
          size: '36px', // size: '72px', // size: '53px',
          height: '36px', // height: '72px', // height: '59px',
          maxWidth: '1277px',
        },
        large: {
          size: '48px', // size: '96px', // size: '88px',
          height: '48px', // height: '96px', // height: '94px',
          maxWidth: '2122px',
        },
        xlarge: {
          size: '60px', // size: '120px', // size: '124px',
          height: '60px', // height: '120px', // height: '130px',
          maxWidth: '2966px',
        },
      },
      2: {
        small: {
          size: '18px', // size: '36px', // size: '31px',
          height: '18px', // height: '36px', // height: '37px',
          maxWidth: '749px',
        },
        medium: {
          size: '26px', // size: '48px', // size: '44px',
          height: '26px', // height: '48px', // height: '50px',
          maxWidth: '1066px',
        },
        large: {
          size: '36px', // size: '72px', // size: '58px',
          height: '36px', // height: '72px', // height: '64px',
          maxWidth: '1382px',
        },
        xlarge: {
          size: '48px', // size: '96px', // size: '71px',
          height: '48px', // height: '96px', // height: '77px',
          maxWidth: '1699px',
        },
      },
      3: {
        font: {
          weight: 500,
        },
        small: {
          size: '16px', // size: '24px', // size: '27px',
          height: '16px', // height: '24px', // height: '33px',
          maxWidth: '643px',
        },
        medium: {
          size: '18px', // size: '36px', // size: '36px',
          height: '18px', // height: '36px', // height: '42px',
          maxWidth: '854px',
        },
        large: {
          size: '26px', // size: '48px', // size: '44px',
          height: '26px', // height: '48px', // height: '50px',
          maxWidth: '1066px',
        },
        xlarge: {
          size: '36px', // size: '72px', // size: '53px',
          height: '36px', // height: '72px', // height: '59px',
          maxWidth: '1277px',
        },
      },
      4: {
        font: {
          weight: 500,
        },
        small: {
          size: '14px', // size: '18px', // size: '22px',
          height: '14px', // height: '18px', // height: '28px',
          maxWidth: '538px',
        },
        medium: {
          size: '16px', // size: '24px', // size: '27px',
          height: '16px', // height: '24px', // height: '33px',
          maxWidth: '643px',
        },
        large: {
          size: '18px', // size: '36px', // size: '31px',
          height: '18px', // height: '36px', // height: '37px',
          maxWidth: '749px',
        },
        xlarge: {
          size: '24px', // size: '48px', // size: '36px',
          height: '24px', // height: '48px', // height: '42px',
          maxWidth: '854px',
        },
      },
      5: {
        font: {
          weight: 500,
        },
        small: {
          size: '14px', // size: '16px', // size: '16px',
          height: '14px', // height: '16px', // height: '22px',
          maxWidth: '379px',
        },
        medium: {
          size: '14px', // size: '18px', // size: '16px',
          height: '14px', // height: '18px', // height: '22px',
          maxWidth: '379px',
        },
        large: {
          size: '16px', // size: '24px', // size: '16px',
          height: '16px', // height: '24px', // height: '22px',
          maxWidth: '379px',
        },
        xlarge: {
          size: '18px', // size: '36px', // size: '16px',
          height: '18px', // height: '36px', // height: '22px',
          maxWidth: '379px',
        },
      },
      6: {
        font: {
          weight: 600,
        },
        small: {
          size: '14px', // size: '14px',
          height: '14px', // height: '20px',
          maxWidth: '326px',
        },
        medium: {
          size: '14px', // size: '16px', // size: '14px',
          height: '14px', // height: '16px', // height: '20px',
          maxWidth: '326px',
        },
        large: {
          size: '14px', // size: '18px', // size: '14px',
          height: '14px', // height: '18px', // height: '20px',
          maxWidth: '326px',
        },
        xlarge: {
          size: '16px', // size: '24px', // size: '14px',
          height: '16px', // height: '24px', // height: '20px',
          maxWidth: '326px',
        },
      },
    },
    extend: ({ level, size }) => {
      let fontWeight = '';
      if ([1, 2].includes(level) && size === 'small') {
        fontWeight = 'font-weight: 500;';
      } else if ([2, 3].includes(level) && size === 'medium') {
        fontWeight = 'font-weight: 500;';
      } else if (level === 3 && size === 'xlarge') {
        fontWeight = 'font-weight: 400;';
      } else if (level === 4 && size === 'small') {
        fontWeight = 'font-weight: 600;';
      } else if (level === 5 && ['small', 'medium'].includes(size)) {
        fontWeight = 'font-weight: 600;';
      } else if (level === 6 && size === 'xlarge') {
        fontWeight = 'font-weight: 500;';
      }
      return fontWeight;
    },
  },
  grommet: {
    extend: `
      font-size: 16px;
      line-height: 20px;
    `,
  },
  pageHeader: {
    title: {
      size: 'medium', // size: 'small',
    },
  },
  paragraph: {
    small: {
      size: '14px', // '16px',
      height: '16px', // '20px',
      maxWidth: '379px',
    },
    medium: {
      size: '16px', // '18px',
      height: '20px', // '22px',
      maxWidth: '432px',
    },
    large: {
      size: '20px', // '24px',
      height: '22px', // '30px',
      maxWidth: '538px',
    },
    xlarge: {
      size: '24px', // '36px',
      height: '27px', // '42px',
      maxWidth: '643px',
    },
    // xxlarge is not part of Chris's type exploration
    xxlarge: {
      size: '36px', // '42px',
      height: '40px', // '48px',
      maxWidth: '854px',
    },
    extend: ({ theme }) => `
      color: ${theme.global.colors['text-weak'][theme.dark ? 'dark' : 'light']};
    `,
  },
  tab: {
    active: {
      color: 'text',
    },
    border: {
      active: {
        color: 'text',
      },
    },
    extend: ({ theme }) => `
      border-top-left-radius: ${theme.global.control.border.radius}; // should use radius property of border
      border-top-right-radius: ${theme.global.control.border.radius}; // should use radius property of border
      > span { 
        font-weight: 700;
      } 
    `,
  },
  text: {
    xsmall: {
      size: '12px', // '14px',
      height: '14px', // '18px',
      maxWidth: '326px',
    },
    small: {
      size: '14px', // '16px',
      height: '16px', // '20px',
      maxWidth: '379px',
    },
    medium: {
      size: '16px', // '18px',
      height: '20px', // '22px',
      maxWidth: '432px',
    },
    large: {
      size: '20px', // '24px',
      height: '22px', // '30px',
      maxWidth: '538px',
    },
    xlarge: {
      size: '24px', // '36px',
      height: '27px', // '42px',
      maxWidth: '643px',
    },
    // xxlarge is not part of Chris's type exploration
    xxlarge: {
      size: '36px', // '42px',
      height: '40px', // '48px',
      maxWidth: '854px',
    },
    extend: ({ size, theme }) => `
      color: ${theme.global.colors['text-weak'][theme.dark ? 'dark' : 'light']};
      ${
        ['xxlarge', '3xl', '4xl', '5xl', '6xl'].includes(size)
          ? 'font-weight: 300;'
          : ''
      };
    `,
  },
});

export const ariesWeb = deepMerge(aries, {
  heading: {
    color: 'text',
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
    // xxlarge is not part of Chris's type exploration
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
});

export const { colors } = aries.global;
