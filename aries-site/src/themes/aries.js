import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
// import { CircleAlert } from 'grommet-icons/icons/CircleAlert';
import { Info } from 'grommet-icons/icons/Info';

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
        light: '#6F6F6F', // '#444444',
      },
      'text-strong': {
        dark: '#FFFFFFF5', // 96%
        light: '#444444', // '#000000'
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
  // accordion: {
  //   heading: {
  //     // using level as a means of styling doesn't seem like the best...
  //     // need to file an issue against Grommet
  //     level: 3, // level: '4',
  //     margin: {
  //       vertical: 'medium',
  //       horizontal: 'xsmall',
  //     },
  //   },
  // },
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
      pad: { vertical: 'none' }, // aligns button height with heading font-size instead of line-height
    },
    subtitle: {
      size: 'xlarge',
    },
    title: {
      size: 'medium',
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
      size: '22px',
      height: '26px',
    },
    xlarge: {
      size: '28px',
      height: '32px',
    },
    xxlarge: {
      size: '32px',
      height: '38px',
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
});

export const { colors } = aries.global;
