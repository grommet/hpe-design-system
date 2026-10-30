# native-web

Plain HTML/CSS/JS consumer of the built `hpe-design-tokens` custom properties.

## Surface token validation (`/surfaces.html`)

The same three pages as `sandbox/grommet-app/surfaces.html` (grommet/hpe-design-system#6071,
Phase 2C) using only the built CSS:

```sh
pnpm --filter hpe-design-tokens build
pnpm --filter native-web dev      # then open /surfaces.html
```

Theme and mode are two independent attributes on `<html>`:

| attribute                            | stylesheet                    | effect                                                                   |
| ------------------------------------ | ----------------------------- | ------------------------------------------------------------------------ |
| `data-mode="light"` / `"dark"`       | `dist/css/color.<mode>.css`   | sets `--hpe-color-surface-10…30` (the reference tier)                    |
| `data-surface="default"` / `"toned"` | `dist/css/surface.<mode>.css` | sets `--hpe-color-background-surface-*` as `var(--hpe-color-surface-NN)` |

Because the Surface collection references the reference tier rather than primitives, its CSS
is colour-mode agnostic and the four combinations need no combined selectors — **at the root**.
A scoped `data-mode` region inside a toned page inherits the surface properties already
resolved against the root's mode and paints the wrong colour; scoped regions would need the
surface declarations repeated inside each mode block.

The "toned·dark order" toggle shows the three toned·dark orders side by side as overrides,
named neutrally: `10–30 swap (tokens)` — what the tokens hold; `10–30 #6289 (tone.1 → 20)` —
the mapping that issue tried; `40–60 (option, simulated)` — the six-step option, written
against the primitives because those steps are not in the tokens. Which of the first and
third to ship is open for design review. `window.__runSurfaceMatrix(pages, alt)` sweeps and
returns painted colours.

See `sandbox/grommet-app/README.md` for the short assessment.
