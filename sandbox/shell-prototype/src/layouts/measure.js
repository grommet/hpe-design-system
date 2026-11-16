// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// The colour an element is actually painted: walks up from the element
// compositing every translucent background onto the first opaque one, in
// floats, rounding once. This is what a screenshot would show, so the
// layouts' chips report rendering rather than a model of it.
const parse = value => {
  const m = /rgba?\(([^)]+)\)/.exec(value || '');
  if (!m) return null;
  const parts = m[1].split(',').map(Number);
  return {
    r: parts[0],
    g: parts[1],
    b: parts[2],
    a: parts.length > 3 ? parts[3] : 1,
  };
};

const toHex = ({ r, g, b }) =>
  `#${[r, g, b]
    .map(v =>
      Math.round(Math.max(0, Math.min(255, v)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;

export const effectiveBackground = element => {
  const stack = [];
  let el = element;
  while (el && el !== document.documentElement) {
    const c = parse(getComputedStyle(el).backgroundColor);
    if (c && c.a > 0) {
      stack.push(c);
      if (c.a >= 1) break;
    }
    el = el.parentElement;
  }
  if (!stack.length) return undefined;
  let out = { r: 255, g: 255, b: 255 };
  for (const c of stack.reverse()) {
    out = {
      r: out.r + (c.r - out.r) * c.a,
      g: out.g + (c.g - out.g) * c.a,
      b: out.b + (c.b - out.b) * c.a,
    };
  }
  return toHex(out);
};
