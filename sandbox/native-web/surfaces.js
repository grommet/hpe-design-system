// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Surface token validation (#6071) — native-web environment.
//
// Only built CSS is used: the colour collection per mode and the Surface
// collection per surface mode. The two axes are two attributes on <html>.
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/surface.default.css';
import 'hpe-design-tokens/dist/css/surface.toned.css';
import 'hpe-design-tokens/dist/css/global.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import './css/fonts.css';
import './css/surfaces.css';

const T = {
  base: 'background-surface-base',
  tone1: 'background-surface-tone-1',
  tone2: 'background-surface-tone-2',
  floating: 'background-surface-floating',
};

const shortName = token => {
  if (!token || token === 'none') return 'no surface';
  if (token.startsWith('#')) return `literal ${token}`;
  return token
    .replace('background-surface-', 'surface.')
    .replace('tone-', 'tone.');
};

const navItem = item => `<div class="nav-item">${item}</div>`;

// A labelled surface. The painted value is filled in after render.
const surface = ({ token = 'none', label, note, cls = '', children = '' }) => `
  <div class="surface ${cls}"
    data-surface-token="${token}"
    data-surface-label="${label}">
    <p class="label">${label}</p>
    <p class="meta">${shortName(token)} · <span class="painted"></span></p>
    ${note ? `<p class="meta">${note}</p>` : ''}
    ${children}
  </div>`;

const hardCoded = where =>
  surface({
    token: T.tone1,
    label: `Hard-coded tone.1 widget (${where})`,
    note: 'decision 14: fixed tone, not passed in',
    cls: 'bordered',
  }) +
  surface({
    token: '#f7f7f7',
    label: `Hard-coded #f7f7f7 widget (${where})`,
    note: 'decision 14: literal value, stranded by inversion and by dark',
    cls: 'bordered',
  });

const table = `
  <table data-surface-token="datatable" data-surface-label="Table on tone.1">
    <thead><tr><th>Name</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>edge-01</td><td>Online</td></tr>
      <tr aria-selected="true"><td>edge-02</td><td>Online</td></tr>
      <tr><td>edge-03</td><td>Offline</td></tr>
    </tbody>
  </table>`;

// Page 1 — standard page (decisions 6, 13, 23; Part 4; decision 16)
const standardPage = ({ failureModes = true } = {}) =>
  surface({
    token: T.base,
    label: 'Page',
    cls: 'square fill',
    children: `
    <div class="row flex">
      ${surface({
        token: T.tone1,
        label: 'Nav menu',
        cls: 'w-small square',
        children: `
          ${['Overview', 'Devices', 'Alerts', 'Settings'].map(navItem).join('')}
          <button class="btn-secondary">Secondary on tone.1</button>
          ${failureModes ? hardCoded('in nav') : ''}`,
      })}
      <div class="col flex">
        ${surface({
          token: 'none',
          label: 'Header',
          note: 'decision 6 / 23: no surface, reads as the page',
          children: '<button class="btn-primary">Primary action</button>',
        })}
        <div class="grid">
          ${surface({
            token: T.tone1,
            label: 'Card A',
            children: '<p class="meta">Plain card.</p>',
          })}
          ${surface({
            token: T.tone1,
            label: 'Card B',
            children: surface({
              token: T.tone2,
              label: 'Panel inside card',
              children: surface({
                token: T.tone1,
                label: 'Nested region (depth 3)',
                note: 'alternation continues',
              }),
            }),
          })}
          ${
            failureModes
              ? surface({
                  token: T.tone2,
                  label: 'tone.2 on base',
                  note: 'Part 4: white on white in light; border carries edge',
                  cls: 'bordered',
                }) +
                surface({
                  token: T.tone1,
                  label: 'Self-nest outer',
                  children: surface({
                    token: T.tone1,
                    label: 'Self-nest inner (error)',
                    note: 'Part 4: tone.1 inside tone.1',
                  }),
                }) +
                hardCoded('on page')
              : ''
          }
        </div>
      </div>
      ${surface({
        token: T.tone1,
        label: 'Contextual panel',
        cls: 'w-medium square',
        children: `
          <p class="meta">Selected row on tone.1 (decision 16)</p>
          ${table}
          <button class="btn-secondary">Secondary on tone.1</button>
          ${surface({ token: T.tone2, label: 'Card in panel' })}`,
      })}
    </div>`,
  });

// Page 2 — framed shell (#6708). A′: sheet and panel = base.
const framedShell = ({ sheetToken = T.base } = {}) =>
  surface({
    token: T.base,
    label: 'Root',
    cls: 'square fill',
    children: surface({
      token: T.tone1,
      label: 'Chrome (rail + local nav + frame)',
      note: 'decision 13: a tone-1 container on the root',
      cls: 'square flex',
      children: `
      <div class="row flex">
        <div class="col w-rail" data-surface-token="none"
          data-surface-label="Rail (no surface)">
          ${['A', 'B', 'C'].map(navItem).join('')}
        </div>
        <div class="col w-small" data-surface-token="none"
          data-surface-label="Local nav (no surface)">
          <p class="label">Local nav (no surface)</p>
          ${['Overview', 'Devices', 'Alerts'].map(navItem).join('')}
        </div>
        ${surface({
          token: sheetToken,
          label: 'Content sheet',
          note:
            sheetToken === T.base
              ? 'A′: workspace is base inside chrome'
              : 'alternative: sheet as a tone-2 container',
          cls: 'rounded flex',
          children: `<div class="grid">
            ${surface({ token: T.tone1, label: 'Card A' })}
            ${surface({
              token: T.tone1,
              label: 'Card B',
              children: surface({ token: T.tone2, label: 'Inner panel' }),
            })}
            ${surface({ token: T.tone1, label: 'Card C' })}
          </div>`,
        })}
        ${surface({
          token: sheetToken,
          label: 'Contextual panel',
          cls: 'rounded w-medium',
          children: surface({
            token: T.tone1,
            label: 'Card in panel',
            children: surface({ token: T.tone2, label: 'Inner' }),
          }),
        })}
      </div>`,
    }),
  });

// Page 3 — dialog over page 1: floating root, tones restart inside it.
const dialogPage = () =>
  `${standardPage({ failureModes: false })}<div class="scrim">
    ${surface({
      token: T.floating,
      label: 'Dialog',
      note: 'floating root; tones restart from it (2f)',
      cls: 'dialog',
      children: `
        ${surface({
          token: T.tone1,
          label: 'Card in dialog',
          children: surface({
            token: T.tone2,
            label: 'Nested panel in dialog card',
          }),
        })}
        <div class="anchor">
          <button class="btn-secondary">Menu</button>
          ${surface({
            token: T.floating,
            label: 'Drop',
            cls: 'drop',
            children: surface({ token: T.tone1, label: 'Card in drop' }),
          })}
        </div>`,
    })}
  </div>`;

const PAGES = {
  standard: { label: '1 · Standard page', render: () => standardPage() },
  shell: { label: '2 · Framed shell (A′)', render: () => framedShell() },
  shellAlt: {
    label: '2b · Framed shell (sheet = tone.2)',
    render: () => framedShell({ sheetToken: T.tone2 }),
  },
  dialog: { label: '3 · Dialog', render: () => dialogPage() },
};

// Alternative toned dark orders, for comparison only (see assessment).
// Applied as overrides when html[data-surface=toned][data-mode=dark].
const TONED_DARK_ALTS = {
  built: '',
  'A (one new step)': `
    --hpe-color-background-surface-base: var(--hpe-color-surface-30);
    --hpe-color-background-surface-tone-1: var(--hpe-color-surface-10);
    --hpe-color-background-surface-tone-2: var(--hpe-color-surface-50);
    --hpe-color-background-surface-floating: var(--hpe-color-surface-50);`,
  'b (#6289, no new step)': `
    --hpe-color-background-surface-base: var(--hpe-color-surface-30);
    --hpe-color-background-surface-tone-1: var(--hpe-color-surface-20);
    --hpe-color-background-surface-tone-2: var(--hpe-color-surface-30);
    --hpe-color-background-surface-floating: var(--hpe-color-surface-20);`,
};

const state = {
  page: 'standard',
  surfaceMode: 'default',
  colorMode: 'light',
  alt: 'built',
};

const html = document.documentElement;
const app = document.getElementById('app');
const altStyle = document.createElement('style');
document.head.appendChild(altStyle);

const readSurfaces = () => [
  ...Array.from(document.querySelectorAll('[data-surface-token]')).map(el => ({
    label: el.getAttribute('data-surface-label'),
    token: el.getAttribute('data-surface-token'),
    painted: getComputedStyle(el).backgroundColor,
  })),
  ...Array.from(document.querySelectorAll('tbody tr')).map((tr, index) => ({
    label: `Table row ${index + 1}${
      tr.getAttribute('aria-selected') === 'true' ? ' (selected)' : ''
    }`,
    token: 'table-row',
    painted: getComputedStyle(tr.querySelector('td')).backgroundColor,
  })),
];

const annotate = () => {
  document.querySelectorAll('.surface').forEach(el => {
    const painted = el.querySelector(':scope > .meta > .painted');
    if (painted)
      painted.textContent = `painted ${getComputedStyle(el).backgroundColor}`;
  });
};

const toggle = (name, options, key) =>
  `<span>${name}:</span>${options
    .map(
      o =>
        `<button data-key="${key}" data-value="${o}"
          aria-pressed="${state[key] === o}">${o}</button>`,
    )
    .join('')}`;

const render = () => {
  html.setAttribute('data-mode', state.colorMode);
  html.setAttribute('data-surface', state.surfaceMode);
  altStyle.textContent = TONED_DARK_ALTS[state.alt]
    ? `html[data-surface=toned][data-mode=dark] {${TONED_DARK_ALTS[state.alt]}}`
    : '';
  app.innerHTML = `
    <div class="controls" data-surface-token="controls"
      data-surface-label="Controls (background-contrast, not a surface)">
      <strong>Surface tokens · #6071 · native-web</strong>
      ${toggle('surface', ['default', 'toned'], 'surfaceMode')}
      ${toggle('mode', ['light', 'dark'], 'colorMode')}
      ${toggle('page', Object.keys(PAGES), 'page')}
      ${toggle('toned·dark order', Object.keys(TONED_DARK_ALTS), 'alt')}
    </div>
    ${PAGES[state.page].render()}`;
  annotate();
};

app.addEventListener('click', event => {
  const button = event.target.closest('button[data-key]');
  if (!button) return;
  state[button.dataset.key] = button.dataset.value;
  render();
});

const nextPaint = () =>
  new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

const COMBOS = pages =>
  pages.flatMap(page =>
    ['default', 'toned'].flatMap(surfaceMode =>
      ['light', 'dark'].map(colorMode => ({ page, surfaceMode, colorMode })),
    ),
  );

// Programmatic controls for the verification sweep (browser automation).
Object.assign(window, {
  __surfaceControls: {
    set: (key, value) => {
      state[key] = value;
      render();
    },
  },
  __surfaceReport: () => ({
    env: 'native-web',
    ...state,
    surfaces: readSurfaces(),
  }),
  __runSurfaceMatrix: (pages = Object.keys(PAGES), alt = 'built') => {
    state.alt = alt;
    return COMBOS(pages).reduce(async (previous, combo) => {
      const results = await previous;
      Object.assign(state, combo);
      render();
      await nextPaint();
      return [
        ...results,
        { env: 'native-web', ...combo, alt, surfaces: readSurfaces() },
      ];
    }, Promise.resolve([]));
  },
});

render();
