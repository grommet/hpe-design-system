import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  button: {
    hover: {
      primary: {
        // Designs call for using text-strong for the text color.
        // Keeping the label color the same on hover to maintain readablility.
        color: hpe.global.colors['text-strong'].light,
        background: {
          dark: 'validation-ok',
          // Designs call for using a lower opacity of exisiting green!
          // instead of creating a new color name for this single usecase.
          light: {
            color: 'green!',
            opacity: 0.75,
          },
        },
        extend: ({ colorValue, primary, theme }) => `
      ${primary &&
        colorValue &&
        `:hover {
        background-color: ${
          theme.dark
            ? theme.global.colors[colorValue].dark
            : theme.global.colors[colorValue].light
        };
      }`}
    `,
      },
    },
  },
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
});

export const { colors } = aries.global;
