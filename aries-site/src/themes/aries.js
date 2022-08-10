import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  global: {
    control: {
      border: {
        radius: '24px',
      },
    },
    drop: {
      border: {
        radius: '6px',
      },
    },
    input: {
      padding: {
        left: '14px',
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
        border-radius: ${theme.global.edgeSize.small};
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
    round: 'medium',
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
      border-radius: ${theme.global.edgeSize.small};
      padding: ${theme.global.edgeSize.xxsmall} ${theme.global.edgeSize.xsmall};
    `,
    },
  },
});

export const { colors } = aries.global;
