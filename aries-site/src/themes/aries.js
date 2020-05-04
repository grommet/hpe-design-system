import { hpe } from 'grommet-theme-hpe';
import { deepMerge, normalizeColor } from 'grommet/utils';
import { Blank } from 'grommet-icons';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  radioButton: {
    border: {
      color: 'border',
      width: '1px',
    },
    check: {
      radius: '100%',
      color: 'selected-background',
      // extend: undefined,
      extend: ({ checked }) => {
        return checked && 'border-color: blue;';
      },
    },
    // color: 'text-strong', // I don't think radioButton.color
    // exists in base.js and should be removed from hpe theme.
    extend: ({ theme }) => `
      :not(div):hover {
        background-color: ${
          theme.global.colors['background-contrast'][
            theme.dark ? 'dark' : 'light'
          ]
        };
      }
      :not(div) {
        width: 100%;
      }
      padding: ${theme.global.edgeSize.xxsmall} ${theme.global.edgeSize.xsmall};
    `,
    gap: 'xsmall',
    hover: {
      border: {
        color: undefined,
      },
    },
    icon: {
      size: '22px',
      // extend: undefined,
    },
    icons: {
      circle: () => (
        <Blank color={aries.radioButton.check.color}>
          <circle cx="12" cy="12" r="8" />
        </Blank>
      ),
    },
    // size: undefined,
  },
  checkBox: {
    toggle: {
      extend: ({ checked, theme }) => `
          border: none;
          ${checked && `background-color: ${normalizeColor('brand', theme)};`}
      `,
      knob: {
        extend: ({ theme }) => `
          border: 2px solid ${
            theme.global.colors.text[theme.dark ? 'dark' : 'light']
          };
          top: 0px;
        `,
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
