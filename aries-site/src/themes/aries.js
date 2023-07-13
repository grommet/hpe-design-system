import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Close, Info } from 'grommet-icons';

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
      justify: 'start',
      gap: 'xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 500,
      alignSelf: 'end',
    },
  },
  notification: {
    direction: 'column',
    global: {
      direction: 'row',
      close: {
        icon: Close,
      },
    },
  },
  icon: {
    size: {
      small: '14px',
      medium: '16px',
      large: '18px',
      xlarge: '24px',
      xxlarge: '30px',
    },
  },
  heading: {
    level: {
      2: {
        medium: {
          size: '32px',
          height: '32px',
        },
      },
    },
  },
  text: {
    xsmall: {
      size: '14px',
      height: '16px',
    },
    small: {
      size: '14px', // 16px
      height: '16px', // 24px
    },
    medium: {
      size: '16px', // 18px
      height: '20px', // 24px
    },
    large: {
      size: '18px', // 24px
      height: '24px', // 32px
    },
    xlarge: {
      size: '24px', // 30px
      height: '32px', // 36px
    },
    xxlarge: {
      size: '30px', // 36px
      height: '36px', // 40px
    },
    '3xl': {
      size: '36px', // 42px
      height: '40px', // 46px
    },
    '4xl': {
      size: '42px', // 48px
      height: '46px', // 48px
    },
    '5xl': {
      size: '48px', // 72px
      height: '48px', // 72px
    },
    '6xl': {
      size: '72px',
      height: '72px',
    },
    // This block applies size-specific weights to text to ensure
    // that as text sizes get larger, the weight decreases.
    // This block can be removed once grommet theme structure is enhanced
    // to support size-specific weights.
    extend: ({ size }) => `
      ${
        ['xxlarge', '3xl', '4xl', '5xl', '6xl'].includes(size)
          ? 'font-weight: 300;'
          : ''
      };
    `,
  },
  paragraph: {
    xsmall: {
      size: '14px',
      height: '16px',
    },
    small: {
      size: '14px', // 16px
      height: '16px', // 24px
    },
    medium: {
      size: '16px', // 18px
      height: '20px', // 24px
    },
    large: {
      size: '18px', // 24px
      height: '24px', // 32px
    },
    xlarge: {
      size: '24px', // 30px
      height: '32px', // 36px
    },
    xxlarge: {
      size: '30px', // 36px
      height: '36px', // 40px
    },
    '3xl': {
      size: '36px', // 42px
      height: '40px', // 46px
    },
    '4xl': {
      size: '42px', // 48px
      height: '46px', // 48px
    },
    '5xl': {
      size: '48px', // 72px
      height: '48px', // 72px
    },
    '6xl': {
      size: '72px',
      height: '72px',
    },
    // This block applies size-specific weights to text to ensure
    // that as text sizes get larger, the weight decreases.
    // This block can be removed once grommet theme structure is enhanced
    // to support size-specific weights.
    extend: ({ size }) => `
      ${
        ['xxlarge', '3xl', '4xl', '5xl', '6xl'].includes(size)
          ? 'font-weight: 300;'
          : ''
      };
    `,
  },
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
  anchor: {
    // rely on base anchor styling to meet color contrast on background-back
    size: {
      large: undefined,
      xlarge: undefined,
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
      toast: {
        background: 'background-front',
      },
    },
  },
});

export const { colors } = aries.global;
