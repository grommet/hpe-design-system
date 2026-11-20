// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext } from 'react';

// Which surface mode and colour mode the page is showing. Used to re-read
// computed styles after a toggle, and by the verification sweep.
// `detail`: show the theme value and the painted value beside each token
// (the verification view). Off by default; the token alone is the message.
export const SurfaceStateContext = createContext({
  surfaceMode: 'default',
  colorMode: 'light',
  setColorMode: () => {},
  detail: false,
});

export const TOKENS = {
  base: 'background-surface-base',
  tone1: 'background-surface-tone-1',
  tone2: 'background-surface-tone-2',
  floating: 'background-surface-floating',
};

export const shortName = token => {
  if (!token) return 'no surface';
  if (token.startsWith('#')) return `literal ${token}`;
  return token
    .replace('background-surface-', 'surface.')
    .replace('tone-', 'tone.');
};
