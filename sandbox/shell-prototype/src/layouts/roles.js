// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Layout roles for the stress tests. A layout declares each area once, by
// what it is in the surface model, and the resolver turns that into a token
// for whichever architecture is selected in the preview bar.
//
//   { kind: 'root' }                 the page / workspace
//   { kind: 'frame' }                chrome or a desk that surrounds a root
//   { kind: 'framedRoot' }           a root inside a frame (sheet, paper)
//   { kind: 'container', depth: k }  k-th nested container from its root
//   { kind: 'floating' }             UI over the page (Layer, Drop, popover)
//   { kind: 'fixed', token }         not a surface: contrast, status, accent,
//                                    selected. Same in every architecture.
//   { kind: 'none' }                 transparent (decision 6)

const T = name => `background-surface-${name}`;
const short = token => token.replace('background-surface-', '');

const toneAt = k => (k % 2 ? T('tone-1') : T('tone-2'));

const FRAME = {
  roles: T('tone-1'),
  scale: T('tone-1'),
  frame: T('frame'),
};

const FRAMED_ROOT = {
  roles: T('base'),
  scale: T('tone-2'),
  frame: T('base'),
};

const ROOT = {
  roles: T('base'),
  scale: T('tone-2'),
  frame: T('base'),
};

// Token for a role under an architecture, plus a short display label. The
// chip beside it shows the value actually painted, so where a container
// repeats its parent's or the page's value is visible for every
// architecture alike.
export const resolveRole = (arch, role) => {
  const { kind, depth = 1, token } = role;
  if (kind === 'none') return { token: null, display: 'no surface' };
  if (kind === 'fixed')
    return {
      token,
      display: `${token.replace('background-', '')} · fixed`,
    };
  if (kind === 'floating') return { token: T('floating'), display: 'floating' };
  if (kind === 'root') return { token: ROOT[arch], display: short(ROOT[arch]) };
  if (kind === 'frame')
    return { token: FRAME[arch], display: short(FRAME[arch]) };
  if (kind === 'framedRoot')
    return { token: FRAMED_ROOT[arch], display: short(FRAMED_ROOT[arch]) };
  return { token: toneAt(depth), display: short(toneAt(depth)) };
};
