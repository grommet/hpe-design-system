// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
//
// THROWAWAY PROTOTYPE — not for merge.
import { useContext } from 'react';
import { ThemeContext } from 'grommet';
import { NEW_TOKENS } from './tokenProposal';

export const useTheme = (): any => useContext(ThemeContext) as any;

const luminance = (hex: string): number => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return 0;
  const n = parseInt(m[1], 16);
  return (
    0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)
  );
};

// Whether a `{light, dark}` on-strong colour has been swapped in colors.js.
// Some grommet-theme-hpe 8.x releases swap `icon-onStrong` (8.2.0+), others
// don't (8.1.5), so detect it from the values: an authored on-strong colour is
// the lighter one in light mode.
export const isSwappedPair = (value: unknown): boolean =>
  !!value &&
  typeof value === 'object' &&
  typeof (value as any).light === 'string' &&
  typeof (value as any).dark === 'string' &&
  luminance((value as any).light) < luminance((value as any).dark);

// Authored {light, dark} for an on-strong colour, for passing straight to the
// Stepper (which resolves colours without smart pairing).
export const authoredPair = (theme: any, token: string) => {
  const value = theme?.global?.colors?.[token];
  if (isSwappedPair(value)) {
    return { light: value.dark, dark: value.light };
  }
  return value;
};

// grommet-theme-hpe passes the `icon-onStrong` token name to the currentError
// glyph; in releases where colors.js swaps that token (8.2.0+) the glyph
// renders inverted. Hand the Stepper the authored values instead, which is the
// fix proposed for misc.js and is a no-op on releases that don't swap.
export const useCurrentThemeFix = () => {
  const theme = useTheme();
  const iconOnStrong = authoredPair(theme, 'icon-onStrong');
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
