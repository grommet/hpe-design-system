import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  global: {
    colors: {
      'background-selected-weak': {
        light: '#CBFAEB',
        dark: '#093A2F',
      },
      'background-selected-weak-hover': {
        light: '#AEF6DF',
        dark: '#074B3B',
      },
    },
  },
  buttonGroup: {
    // any Box props
    gap: 'small',
  },
  button: {
    selected: {
      option: {
        background: 'background-selected-weak',
        color: 'text-strong',
        font: {
          weight: 500,
        },
      },
    },
    extend: ({ kind, theme, selected }) => {
      let style = '';
      if (kind === 'option' && selected) {
        style += `box-shadow: inset 2px 0 ${
          theme.global.colors['green!']
        }; &:hover, &:focus:not(:focus-visible) {
          background: ${
            theme.global.colors['background-selected-weak-hover'][
              theme.dark ? 'dark' : 'light'
            ]
          };
          box-shadow: inset 2px 0 ${theme.global.colors['green!']};
          color: ${
            theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
          };
        }`;
      }
      return style;
    },
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
