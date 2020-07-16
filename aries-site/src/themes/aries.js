import { hpe } from 'grommet-theme-hpe';
import { deepMerge, normalizeColor } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // card object is for site dev purposes
  // once Cards page is implemented, card object should be added to
  // HPE theme, then removed from this file
  card: {
    container: {
      background: 'background-front',
      elevation: 'small',
      round: 'small', // base.js default
      // height: 'small',
      // width: 'medium',
    },
    body: {
      pad: { horizontal: 'medium', top: 'medium', bottom: 'large' },
    },
    footer: {
      background: 'background-contrast', // base.js default
      pad: { horizontal: 'medium', vertical: 'small' },
    },
    header: {
      pad: 'medium',
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
