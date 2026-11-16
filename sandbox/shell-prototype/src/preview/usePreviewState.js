// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useState } from 'react';
import { ARCHITECTURES } from '../surfaces';
import { PAGES } from './pages';

// What the preview bar controls, kept in the URL hash so a view can be
// linked: #page=shell&arch=frame&grey=1&dark=1&notes=0
const DEFAULTS = {
  arch: ARCHITECTURES[0].id,
  page: PAGES[0].id,
  grey: false,
  dark: false,
  notes: true,
};

const KEYS = Object.keys(DEFAULTS);

const oneOf = (value, list, fallback) =>
  list.some(item => item.id === value) ? value : fallback;

// Null for a hash that is not preview state, such as the shell's skip link
// to #main-content, so in-page anchors leave the preview alone.
const parse = hash => {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  if (!KEYS.some(key => params.has(key))) return null;
  return {
    arch: oneOf(params.get('arch'), ARCHITECTURES, DEFAULTS.arch),
    page: oneOf(params.get('page'), PAGES, DEFAULTS.page),
    grey: params.get('grey') === '1',
    dark: params.get('dark') === '1',
    notes: params.get('notes') !== '0',
  };
};

const serialise = state => {
  const params = new URLSearchParams({ page: state.page, arch: state.arch });
  if (state.grey) params.set('grey', '1');
  if (state.dark) params.set('dark', '1');
  if (!state.notes) params.set('notes', '0');
  return `#${params.toString()}`;
};

export const usePreviewState = () => {
  const [state, setState] = useState(
    () => parse(window.location.hash) || DEFAULTS,
  );

  useEffect(() => {
    const onHashChange = () => {
      const next = parse(window.location.hash);
      if (next) setState(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const hash = serialise(state);
    if (window.location.hash !== hash)
      window.history.replaceState(null, '', hash);
  }, [state]);

  const update = useCallback(
    partial => setState(current => ({ ...current, ...partial })),
    [],
  );

  // Link to another view, keeping whatever is not overridden.
  const hrefFor = useCallback(
    partial => serialise({ ...state, ...partial }),
    [state],
  );

  return { state, update, hrefFor };
};
