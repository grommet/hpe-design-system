import { hpe } from 'grommet-theme-hpe';
import { deepMerge, normalizeColor } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  global: {
    colors: {
      focus: 'teal!',
      placeholder: 'text-xweak',
    },
    input: {
      weight: 500,
    },
  },
  button: {
    color: props =>
      props.primary ? '#FFFFFF' : normalizeColor('text', props.theme),
  },
  layer: {
    background: 'background',
  },
  checkBox: {
    color: 'selected-text',
    gap: 'small',
    toggle: {
      color: {
        dark: hpe.global.colors['text-strong'].dark,
        light: hpe.global.colors['text-strong'].dark,
      },
    },
    check: {
      extend: () => 'border-radius: 2px',
    },
    border: {
      width: '1px',
    },
    background: 'background-back',
    extend: ({ checked, theme }) => `
          border: none;
          ${checked && `background-color: ${normalizeColor('brand', theme)};`}
      `,
    knob: {
      extend: ({ theme }) => `
          border: 2px solid ${theme.global.colors.text.light};
          top: 0px;
        `,
    },
  },
  formField: {
    label: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        horizontal: 'none',
      },
    },
    error: {
      size: 'xsmall',
      color: 'text-xweak',
      margin: {
        start: 'none',
      },
    },
    help: {
      size: 'xsmall',
      color: 'text-xweak',
      margin: {
        start: 'none',
        bottom: 'xsmall',
      },
    },
    info: {
      size: 'xsmall',
      color: 'text-xweak',
      margin: {
        start: 'none',
      },
    },
  },
  rangeInput: {
    thumb: {
      color: {
        dark: 'text-strong',
        light: hpe.global.colors['text-strong'].dark,
      },
      extend: ({ theme }) => `
        border: 2px solid ${theme.global.colors.text.light};
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
  anchor: {
    color: 'brand',
    textDecoration: 'none',
    fontWeight: 500,
    hover: {
      textDecoration: 'underline',
    },
  },
});

export const { colors } = aries.global;
