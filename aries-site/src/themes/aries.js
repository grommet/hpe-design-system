import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const baseSpacing = 24;

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  notification: {
    actions: {
      color: { dark: 'text-strong' },
    },
    direction: 'row',
    container: {
      round: 'xsmall',
    },
    global: {
      container: {
        round: 'none',
      },
    },
    critical: {
      background: 'validation-critical',
      toast: {
        background: 'background-front',
      },
    },
    message: {
      color: { dark: 'text-strong' },
    },
    warning: {
      background: 'validation-warning',
      toast: {
        background: 'background-front',
      },
    },
    normal: {
      background: 'validation-ok',
      toast: {
        background: 'background-front',
      },
    },
    unknown: {
      background: 'background-contrast',
      toast: {
        background: 'background-front',
      },
    },
    info: {
      background: 'background-contrast',
      toast: {
        background: 'background-front',
      },
    },
    undefined: {
      background: 'background-contrast',
      toast: {
        background: 'background-front',
      },
    },
  },
  global: {
    breakpoints: {
      xsmall: {
        value: baseSpacing * 24, // 576
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: `${baseSpacing / 6}px`, // 4
          large: `${baseSpacing / 4}px`, // 6
          xlarge: `${baseSpacing / 2}px`, // 12
        },
        edgeSize: {
          none: '0px',
          hair: '1px', // for Chart
          xxsmall: '2px',
          xsmall: `${baseSpacing / 8}px`, // 3
          small: `${baseSpacing / 4}px`, // 6
          medium: `${baseSpacing / 2}px`, // 12
          large: `${baseSpacing}px`, // 24
          xlarge: `${baseSpacing * 2}px`, // 48
        },
        size: {
          xxsmall: `${baseSpacing}px`, // 24
          xsmall: `${baseSpacing * 2}px`, // 48
          small: `${baseSpacing * 4}px`, // 96
          medium: `${baseSpacing * 8}px`, // 192
          large: `${baseSpacing * 16}px`, // 384
          xlarge: `${baseSpacing * 32}px`, // 768
          full: '100%',
        },
      },
      small: {
        value: baseSpacing * 32, // 768
      },
      medium: {
        value: baseSpacing * 45, // 1080
      },
      large: {
        value: baseSpacing * 60, // 1440
      },
      xlarge: {}, // anything larger than 1440,
    },
  },
  page: {
    wide: {
      width: {
        min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
        max: 'xxlarge',
      },
      xsmall: {
        pad: { horizontal: 'large' },
      },
      xlarge: {
        pad: { horizontal: 'large' },
      },
    },
    narrow: {
      width: {
        min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
        max: 'large',
      },
      xsmall: {
        pad: { horizontal: 'large' },
      },
      xlarge: {
        pad: { horizontal: 'large' },
      },
    },
  },
});

export const { colors } = aries.global;
