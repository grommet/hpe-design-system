// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
//
// THROWAWAY PROTOTYPE — not for merge.
import { useContext } from 'react';
import { ThemeContext } from 'grommet';
import { NEW_TOKENS } from './tokenProposal';

export const useTheme = (): any => useContext(ThemeContext) as any;

// Un-swapped {light, dark} for a swapped on-colour, for passing straight to
// the Stepper (which resolves colours without smart pairing).
const rawPair = (theme: any, token: string) => {
  const value = theme?.global?.colors?.[token];
  if (value && typeof value === 'object') {
    return { light: value.dark, dark: value.light };
  }
  return value;
};

// grommet-theme-hpe 8.x passes the swapped `icon-onStrong` name to the
// currentError glyph, which renders inverted. This mirrors the fix proposed
// for misc.js: hand the Stepper the authored values.
export const useCurrentThemeFix = () => {
  const theme = useTheme();
  const iconOnStrong = rawPair(theme, 'icon-onStrong');
  return {
    stepper: {
      currentError: {
        indicator: { color: iconOnStrong, hover: { color: iconOnStrong } },
      },
    },
  };
};

export const optionATheme = {
  global: {
    colors: Object.fromEntries(
      Object.entries(NEW_TOKENS).map(([name, { light, dark }]) => [
        name,
        { light, dark },
      ]),
    ),
  },
  stepper: {
    error: {
      indicator: {
        hover: { border: 'icon-critical-hover', color: 'icon-critical-hover' },
      },
    },
    currentError: {
      indicator: {
        border: 'transparent',
        background: 'background-critical-strong',
        color: 'icon-onCriticalStrong',
        hover: {
          border: 'transparent',
          background: 'background-critical-strong-hover',
          color: 'icon-onCriticalStrong',
        },
      },
    },
  },
};
