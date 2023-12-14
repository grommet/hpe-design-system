import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Close, Info } from 'grommet-icons';

const pxToRem = px => `${px / 16}rem`;

const global = {
  global: {
    font: {
      family: "'var(--font-metric)', Arial, sans-serif",
      size: pxToRem(16),
      height: pxToRem(24),
    },
  },
};

const text = {
  xsmall: {
    size: pxToRem(12),
    height: pxToRem(16),
  },
  small: {
    size: pxToRem(14),
    height: pxToRem(20),
  },
  medium: {
    size: pxToRem(16),
    height: pxToRem(24),
  },
  large: {
    size: pxToRem(20),
    height: pxToRem(28),
  },
  xlarge: {
    size: pxToRem(21),
    height: pxToRem(30),
  },
  xxlarge: {
    size: pxToRem(31),
    height: pxToRem(40),
  },
  '3xl': {
    size: pxToRem(37),
    height: pxToRem(46),
  },
  '4xl': {
    size: pxToRem(42),
    height: pxToRem(48),
  },
  '5xl': {
    size: pxToRem(64),
    height: pxToRem(64),
  },
  '6xl': {
    size: pxToRem(64),
    height: pxToRem(64),
  },
};

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  ...global,
  heading: {
    level: {
      1: {
        small: {
          size: pxToRem(21),
          height: pxToRem(21),
        },
        medium: {
          size: pxToRem(34),
          height: pxToRem(34),
        },
        large: {
          size: pxToRem(42),
          height: pxToRem(42),
        },
        xlarge: {
          size: pxToRem(52),
          height: pxToRem(52),
        },
      },
      2: {
        small: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
        medium: {
          size: pxToRem(21),
          height: pxToRem(21),
        },
        large: {
          size: pxToRem(31),
          height: pxToRem(31),
        },
        xlarge: {
          size: pxToRem(42),
          height: pxToRem(42),
        },
      },
      3: {
        font: {
          weight: 500,
        },
        small: {
          size: pxToRem(14),
          height: pxToRem(14),
        },
        medium: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
        large: {
          size: pxToRem(21),
          height: pxToRem(21),
        },
        xlarge: {
          size: pxToRem(31),
          height: pxToRem(31),
        },
      },
      4: {
        font: {
          weight: 500,
        },
        small: {
          size: pxToRem(12),
          height: pxToRem(12),
        },
        medium: {
          size: pxToRem(14),
          height: pxToRem(14),
        },
        large: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
        xlarge: {
          size: pxToRem(21),
          height: pxToRem(21),
        },
      },
      5: {
        font: {
          weight: 600,
        },
        small: {
          size: pxToRem(12),
          height: pxToRem(12),
        },
        medium: {
          size: pxToRem(12),
          height: pxToRem(12),
        },
        large: {
          size: pxToRem(14),
          height: pxToRem(14),
        },
        xlarge: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
      },
      6: {
        font: {
          weight: 600,
        },
        small: {
          size: pxToRem(12),
          height: pxToRem(12),
        },
        medium: {
          size: pxToRem(12),
          height: pxToRem(12),
        },
        large: {
          size: pxToRem(12),
          height: pxToRem(12),
        },
        xlarge: {
          size: pxToRem(14),
          height: pxToRem(14),
        },
      },
    },
  },
  anchor: {
    ...text,
  },
  paragraph: {
    ...text,
  },
  text: {
    ...text,
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
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
  ...global,
  heading: {
    level: {
      1: {
        small: {
          size: pxToRem(48),
          height: pxToRem(48),
        },
        medium: {
          size: pxToRem(72),
          height: pxToRem(72),
        },
        large: {
          size: pxToRem(96),
          height: pxToRem(96),
        },
        xlarge: {
          size: pxToRem(120),
          height: pxToRem(120),
        },
      },
      2: {
        small: {
          size: pxToRem(36),
          height: pxToRem(36),
        },
        medium: {
          size: pxToRem(48),
          height: pxToRem(48),
        },
        large: {
          size: pxToRem(72),
          height: pxToRem(72),
        },
        xlarge: {
          size: pxToRem(96),
          height: pxToRem(96),
        },
      },
      3: {
        small: {
          size: pxToRem(24),
          height: pxToRem(24),
        },
        medium: {
          size: pxToRem(36),
          height: pxToRem(36),
        },
        large: {
          size: pxToRem(48),
          height: pxToRem(48),
        },
        xlarge: {
          size: pxToRem(72),
          height: pxToRem(72),
        },
      },
      4: {
        font: {
          weight: 500,
        },
        small: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
        medium: {
          size: pxToRem(24),
          height: pxToRem(24),
        },
        large: {
          size: pxToRem(36),
          height: pxToRem(36),
        },
        xlarge: {
          size: pxToRem(48),
          height: pxToRem(48),
        },
      },
      5: {
        font: {
          weight: 500,
        },
        small: {
          size: pxToRem(16),
          height: pxToRem(16),
        },
        medium: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
        large: {
          size: pxToRem(24),
          height: pxToRem(24),
        },
        xlarge: {
          size: pxToRem(36),
          height: pxToRem(36),
        },
      },
      6: {
        font: {
          weight: 500,
        },
        small: {
          size: pxToRem(14),
          height: pxToRem(14),
        },
        medium: {
          size: pxToRem(16),
          height: pxToRem(16),
        },
        large: {
          size: pxToRem(18),
          height: pxToRem(18),
        },
        xlarge: {
          size: pxToRem(24),
          height: pxToRem(24),
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
      size: pxToRem(16),
      height: pxToRem(20),
    },
    medium: {
      size: pxToRem(18),
      height: pxToRem(22),
    },
    large: {
      size: pxToRem(24),
      height: pxToRem(30),
    },
    xlarge: {
      size: pxToRem(36),
      height: pxToRem(42),
    },
    xxlarge: {
      size: pxToRem(42),
      height: pxToRem(48),
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
      size: pxToRem(14),
      height: pxToRem(18),
    },
    small: {
      // weight needs to be modified at the size level
      size: pxToRem(16),
      height: pxToRem(20),
    },
    medium: {
      // weight needs to be modified at the size level
      size: pxToRem(18),
      height: pxToRem(22),
    },
    large: {
      // weight needs to be modified at the size level by bumping down to 300
      size: pxToRem(24),
      height: pxToRem(30),
    },
    xlarge: {
      // weight needs to be modified at the size level by bumping down to 300
      size: pxToRem(36),
      height: pxToRem(42),
    },
    // xxlarge is not part of Chris's type exploration
    xxlarge: {
      // weight needs to be modified at the size level by bumping down to 300
      size: pxToRem(42),
      height: pxToRem(48),
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
