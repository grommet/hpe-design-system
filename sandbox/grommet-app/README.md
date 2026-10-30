# grommet-app

This is a testing application for hpe-design-tokens with Grommet.

## Surface token validation (`/surfaces.html`)

Prototype pages for the Landmark surface-token architecture (grommet/hpe-design-system#6071,
Phase 2C), rendered through the built Surface collection rather than theme overrides.

```sh
pnpm --filter hpe-design-tokens build
pnpm --filter grommet-app dev      # then open /surfaces.html
```

Three deliberately simple pages, each surface labelled with its token, the value the theme
resolves it to and the value the browser painted; switches for surface mode
(`default` / `toned`) and colour mode (`light` / `dark`):

1. **Standard page** — page = `base`; nav, contextual panel and cards = `tone.1`; inner = `tone.2`;
   header without a surface (decision 6). Also walks the Part 4 failure modes (self-nesting,
   `tone.2` on `base`, a hard-coded tone as a token and as a literal value) and decision 16
   (secondary button, selected `DataTable` row on `tone.1`).
2. **Framed shell** (#6708, A′ reading) — chrome = `tone.1` wrapping a `base` sheet and panel;
   `2b` shows the alternative reading (sheet = `tone.2`).
3. **Dialog** — `Layer`, `Drop` and `Tip` over page 1, with `tone.1` / `tone.2` inside.

`src/surfaces/theme.js` is the prototype of the grommet-theme-hpe 9.0 change: `buildTheme`
receives the Surface collection as one more input beside `light` / `dark`, its Grommet refs
(`background-surface-base → surface-10`) join `global.colors` beside the reference tier, the
root `background` points at `surface.base` (decision 25) and `card` / `layer` / `drop` / `tip`
are rewired (Part 5). A toned theme is a second `buildTheme` call with the toned token set.

`window.__runSurfaceMatrix()` sweeps every page × surface mode × colour mode and returns
the painted colours for verification.

### Short assessment

- **Works.** 16/16 combinations resolve to the specified values; identical in `native-web`.
  `theme.dark` is derived correctly from the root background in all four theme × mode combos.
- **`toned` dark = default dark.** With only `color.surface.10/20/30`, the toned mode cannot
  alias one step per token without collapsing dark to two values (and making `tone.1` share an
  alias with `floating`, so a card in a modal disappears — the mapping #6289 tried). The
  branch adds `40/50/60` (same dark values, light swapped) so `toned` keeps the tested dark
  progression; cost is three hidden reference variables.
- **The reference tier must leak** into `global.colors` and CSS: it is the join between the
  two mode axes. Guard with description and lint, not a filter.
- **Where A′ strains:** in dark the `base` sheet inside `tone.1` chrome reads as a recess,
  not raised paper; A′ and "sheet = `tone.2`" are pixel-identical in light.

Full write-up: `validation-assessment.md` in the validation session (not committed).
