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
    button: {
      font: {
        weight: 'bold',
      },
      hover: {
        background: 'background-contrast',
      },
    },
    hover: {
      border: 'none',
    },
    dragOver: {
      background: 'background-contrast',
    },
    icons: {
      remove: Trash,
    },
  },
});

export const { colors } = aries.global;
