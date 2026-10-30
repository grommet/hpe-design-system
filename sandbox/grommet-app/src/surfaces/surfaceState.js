// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext } from 'react';

// Which surface mode and colour mode the page is showing. Used to re-read
// computed styles after a toggle, and by the verification sweep.
export const SurfaceStateContext = createContext({
  surfaceMode: 'default',
  colorMode: 'light',
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
