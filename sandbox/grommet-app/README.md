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
4. **GreenLake framed shell** (#6708, ported from `sandbox/shell-prototype` on the
   `prototype/shell-exploration` branch) — the real shell: rail, local nav, header, content
   sheet, contextual panel, Home page. A′ reading (chrome `tone.1`, sheet and panel `base`);
   `4b` shows the A reading (sheet = `tone.2`). Every area carries a chip with token · theme
   value · painted value.
5. **GreenLake beside shell · Overview dashboard** (#6635) — the same content with the chrome
   beside the page: page `base`, rail and nav `tone.1`, cards `tone.1`, header transparent.

The shell lives in `src/surfaces/shell/` (components, pages, data, contexts copied from the
prototype); `shell/surfaces.js` maps its roles to the four Surface tokens for the three
readings, and `shell/theme.js` holds its layout constants. It takes the page's theme, so the
surface-mode and colour-mode switches re-paint it; the moon in the rail also flips colour mode.
The `native-web` sandbox does not have these two pages (they are Grommet components).

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
- **`toned` on the three-step tier — dark is for decision.** `toned` is the #6020 value
  swap written as aliases: `base` ↔ `tone.1` exchange steps, `tone.2` and `floating` follow
  the grey step (`30`). Light inverts as specified (grey page, white containers, grey
  nested). Dark becomes a two-value reordering — page `#292d3a` (grey.1000), containers
  `#1d1f27` (grey.1300), nested `#292d3a`, Layer / Drop `#292d3a` (= page) — because only one
  step is grey in light so `base` and `tone.2` must share it. That order is **not assessed**:
  it is the two-tone dark pattern #6020 reports tested badly, floating equals the page in
  dark, and it changes dark for teams migrating from the legacy grey page. The alternative
  is three extra reference steps (`40/50/60`: dark values copied from `10/20/30`, light
  values swapped) so toned dark = default dark; it is simulated on the presentation's
  decision slide and in `native-web`, not built. Both renderings need design review before
  either is chosen.
- **The reference tier must leak** into `global.colors` and CSS: it is the join between the
  two mode axes. Guard with description and lint, not a filter.
- **Where A′ strains:** in dark the `base` sheet inside `tone.1` chrome reads as a recess,
  not raised paper; A′ and "sheet = `tone.2`" are pixel-identical in light.

## Presentation (`/presentation.html`)

A slide deck rendered *with* `grommet-theme-hpe` and the Surface themes above — every
container on a slide is a real `Box` / `Card` / `Layer` / `Drop` carrying a surface token,
annotated with the alias chain and the colour the browser painted. Covers what was added,
how it resolves on screen, `floating`, the toned swap, the two toned-dark renderings side by
side (10–30 as in the tokens; 40–60 simulated) with a cost table for decision, and the
developer-relevant findings. Same surface / colour-mode switches as the validation pages.

Full write-up: `validation-assessment.md` in the validation session (not committed).
