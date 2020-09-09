import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { CaretDown, CaretUp } from 'grommet-icons';

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
    // body: {
    //   extend: undefined,
    // },
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
    // header: {},
    icons: {
      ascending: CaretDown,
      //   contract: FormUp,
      descending: CaretUp,
      //   expand: FormDown,
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
      // pad: { horizontal: 'small', vertical: 'xsmall' },
      border: { side: 'bottom' },
      verticalAlign: 'bottom',
      background: {
        color: 'background-front',
      },
      extend: ({ theme }) => `
        color: ${
          theme.global.colors['text-strong'][theme.dark ? 'dark' : 'light']
        };
        font-weight: bold;
        :hover {
          > button {
            background: ${
              theme.global.colors['background-contrast'][
                theme.dark ? 'dark' : 'light'
              ]
            };
            padding: 6px 12px;
          }
        }
      `,
    },
    body: {
      // align: 'start',
      // pad: { horizontal: 'small', vertical: 'xsmall' },
      // background: undefined,
      // border: undefined,
      extend: ({ theme }) => {
        const { size, height } = theme.text.small;
        return `
          span {
            font-size: ${size};
            line-height: ${height};
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
      extend: ({ theme }) => {
        const { size, height } = theme.text.small;
        return `
          span {
            font-size: ${size};
            line-height: ${height};
            font-weight: bold;
          }
        `;
      },
    },
  },
});

export const { colors } = aries.global;
