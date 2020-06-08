import { hpe } from 'grommet-theme-hpe';
import { deepMerge, normalizeColor } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
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
