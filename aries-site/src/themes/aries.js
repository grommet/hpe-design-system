import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  dataTable: {
    pinned: {
      header: {
        extend: ({ theme }) => `
        backdrop-filter: blur(8px);
        @-moz-document url-prefix() {
        background: ${
          theme.dark ? 'rgba(64, 75, 92, 0.95)' : 'rgba(255, 255, 255, 0.95)'
        };
        }
          `,
      },
      body: {
        extend: ({ theme }) => `
        backdrop-filter: blur(8px);
        @-moz-document url-prefix() {
        background: ${
          theme.dark ? 'rgba(64, 75, 92, 0.95)' : 'rgba(255, 255, 255, 0.95)'
        };
        }
          `,
      },
      footer: {
        extend: ({ theme }) => `
        backdrop-filter: blur(8px);
        @-moz-document url-prefix() {
        background: ${
          theme.dark ? 'rgba(64, 75, 92, 0.95)' : 'rgba(255, 255, 255, 0.95)'
        };
        }
          `,
      },
    },
  },
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
});

export const { colors } = aries.global;
