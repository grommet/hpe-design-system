import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe

  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested

  card: {
    container: {
      background: 'background-front',
    },
    body: {
      pad: 'medium',
    },
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
    },
    header: {
      pad: 'medium',
    },
  },
  dataTable: {
    body: {
      extend: ({ theme }) => `
        /* Allows room for focus on table body */
        margin: ${theme.global.edgeSize.xxsmall};
      `,
    },
    // groupHeader: {
    //   background: {
    //     dark: 'dark-2',
    //     light: 'light-2',
    //   },
    //   border: { side: 'bottom', size: 'xsmall' },
    //   pad: { horizontal: 'small', vertical: 'xsmall' },
    // },
    // groupEnd: {
    //   border: { side: 'bottom', size: 'xsmall' },
    // },
    header: {
      pad: { horizontal: 'small', vertical: 'xsmall' },
      color: 'text-strong',
      font: {
        weight: 'bold',
      },
      hover: {
        background: {
          color: 'background-contrast',
        },
      },
    },
    pinned: {
      header: {
        background: {
          color: 'background-front',
          opacity: 'strong',
        },
        extend: 'backdrop-filter: blur(8px);',
      },
      body: {
        background: {
          color: 'background-front',
          opacity: 'strong',
        },
        extend: 'backdrop-filter: blur(8px);',
      },
      footer: {
        background: {
          color: 'background-front',
          opacity: 'strong',
        },
        extend: 'backdrop-filter: blur(8px);',
      },
    },
    // primary: {
    //   // weight: 'bold',
    // },
    // resize: {
    //   border: {
    //     color: 'border',
    //     side: 'end',
    //   },
    // },
  },
  table: {
    header: {
      // align: 'start',
      // space for focus indicator on sortable columns
      pad: { left: 'none', vertical: 'none', right: 'xxsmall' },
      border: { side: 'bottom' },
      // verticalAlign: 'center',
      background: {
        color: 'background-front',
      },
    },
    body: {
      // align: 'start',
      // pad: { horizontal: 'small', vertical: 'xsmall' },
      // background: undefined,
      // border: undefined,
      extend: ({ theme }) => {
        return `
          :hover {
            button {
              background: ${
                theme.global.colors['background-contrast'][
                  theme.dark ? 'dark' : 'light'
                ]
              }
            }
          }
        `;
      },
    },
    row: {
      hover: {
        background: 'background-contrast',
        // color: undefined,
      },
    },
    footer: {
      // align: 'start',
      // pad: { horizontal: 'small', vertical: 'xsmall' },
      // border: 'top',
      // verticalAlign: undefined,
      background: 'background-front',
      extend: `
          span {
            font-weight: bold;
          }
        `,
    },
  },
});

export const { colors } = aries.global;
