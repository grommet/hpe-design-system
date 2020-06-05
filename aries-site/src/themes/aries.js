import { hpe } from 'grommet-theme-hpe';
import { deepMerge, normalizeColor } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  radioButton: {
    border: {
      color: 'border',
      width: 'xsmall',
    },
    check: {
      color: 'selected-background',
      extend: ({ theme }) => `
        background-color: ${
          theme.global.colors['background-front'][theme.dark ? 'dark' : 'light']
        };
      `,
    },
    color: 'selected-background',
    extend: ({ theme }) => `
      :not(div):hover {
        background-color: ${
          theme.global.colors['background-contrast'][
            theme.dark ? 'dark' : 'light'
          ]
        };
      }
      width: auto;
      padding: ${theme.global.edgeSize.xxsmall} ${theme.global.edgeSize.xsmall};
    `,
    gap: 'xsmall',
    hover: {
      border: {
        color: undefined,
      },
    },
  },
  rangeInput: {
    thumb: {
      color: {
        dark: 'background-front',
        light: 'background',
      },
      extend: ({ theme }) => `
        border: 2px solid ${
          theme.global.colors.text[theme.dark ? 'dark' : 'light']
        };
      `,
    },
    track: {
      extend: ({ max, theme, value }) => {
        const lowerTrack = normalizeColor('brand', theme);
        const upperTrack = normalizeColor('background-contrast', theme);
        const trackPoint = `${(value / max) * 100}%`;

        return `background: linear-gradient(
          to right, 
          ${lowerTrack}, 
          ${lowerTrack} ${trackPoint},
          ${upperTrack} ${trackPoint},
          ${upperTrack}
        );`;
      },
    },
  },
});

export const { colors } = aries.global;
