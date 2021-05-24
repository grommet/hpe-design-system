import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Trash } from 'grommet-icons/icons/Trash';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  fileInput: {
    message: {
      color: 'text-weak',
    },
    border: {
      size: 'xsmall',
    },
    button: {
      border: {
        radius: '4px',
      },
      pad: {
        vertical: '6px',
        horizontal: '12px',
      },
      color: 'text-strong',
      font: {
        weight: 'bold',
      },
      hover: {
        background: 'background-contrast',
      },
    },
    hover: {
      border: {
        color: 'border',
      },
    },
    dragOver: {
      background: 'background-contrast',
      border: 'none',
    },
    icons: {
      remove: Trash,
    },
    pad: { horizontal: 'xsmall' },
    extend: 'border-radius: 4px;',
  },
});

export const { colors } = aries.global;
