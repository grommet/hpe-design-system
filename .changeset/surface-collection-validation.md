---
'hpe-design-tokens': minor
---

**Validation prototype — not for release.** Adds the Landmark surface token
architecture at the token level so Phase 2C (#6071) can score it through the
real pipeline:

- `color.surface.10`–`.60` reference tier in `color.light.json` / `color.dark.json`
  (hidden from publishing). Steps 10–30 are the default chain, 40–60 the `toned`
  chain; dark values match pairwise, only light values differ.
- New Surface collection: `tokens/semantic/surface.default.json` and
  `surface.toned.json` carrying `color.background.surface.{base, tone.1, tone.2,
  floating}`, each a single alias into the reference tier.
- Build emits the collection as `dist/css/surface.<mode>.css` (scoped by
  `[data-surface=<mode>]`, colour-mode agnostic), `dist/esm|cjs/surface.*`,
  `dist/grommet/surface.<mode>.*` (Grommet colour refs) and `dist/docs/surface.<mode>.js`.
- Legacy `background.back/front/floating/default` are unchanged (decisions 4a, 25).

Consumer impact if this were released: additive tokens only. The `toned`
surface mode and the 40–60 reference steps are provisional pending the
decision-log review recorded in the validation assessment.
