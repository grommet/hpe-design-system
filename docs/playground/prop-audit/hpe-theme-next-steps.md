# HPE Theme Audit — Next Steps

This file is a handoff brief. It describes 3 scripts to build in the `grommet-theme-hpe` repo, using the existing prop audit data in this folder as a foundation.

---

## Context

The `prop-audit/` folder contains tooling and output from a scan of the Grommet component API:

- **`grommet-props.csv`** — ~500 rows × 15 columns. One row per prop, across 43 components. Columns include `component`, `componentCategory`, `prop`, `propType`, `normalizedPropType`, `propCategory`, `enumValues`, `description`, and others.
- **`config-warnings.csv`** — 15 rows. Runtime `console.warn` guards extracted from Grommet source — mutual exclusions, deprecations, conflicts, dependencies.
- **`extract-grommet-props.js`** — scrapes v2.grommet.io to produce the CSV above.
- **`extract-config-warnings.js`** — scans component source files for `console.warn` calls.
- **`README.md`** — full column definitions, script usage, known limitations.

These datasets cover the **Grommet layer only**. They have no knowledge of what `grommet-theme-hpe` does on top.

---

## Why this work belongs in grommet-theme-hpe

The goal is to extend `grommet-props.csv` with HPE-specific columns — specifically, whether the HPE theme configures, constrains, or deliberately removes each prop from the usable surface.

That analysis requires reading the HPE theme source. The compiled theme (`dist/themes/hpe.js`, ~3,100 lines) and its static JSON snapshot (`dist/grommet-theme-hpe.json`) are the primary inputs. This work should live alongside those files.

---

## Architecture reminder

```
hpe-design-tokens  ──→  grommet-theme-hpe  ──→  hpe-design-system (docs site)
(token values)          (theme structure)         (consumes as npm package)
```

`grommet-theme-hpe` is where theme decisions are made. The docs site consumes the published output — it is the wrong place to perform this analysis.

---

## The 3 steps

### Step 1 — `extract-theme-coverage.js`

**What:** Parse `dist/grommet-theme-hpe.json` (already exists — static snapshot of the resolved theme), walk all its keys, and map them back to rows in `grommet-props.csv`.

**Output:** Augmented CSV (or separate join file) with 3 new columns:

| Column | Values | Meaning |
|---|---|---|
| `hpeThemed` | `yes` / `no` | Does the HPE theme define a value for this prop's theme key? |
| `hpeNulled` | `true` / blank | HPE explicitly sets this key to `undefined` — grommet's default is removed |
| `hpeValue` | string or blank | The scalar value HPE sets, if simple enough to capture |

**The hard part:** The mapping between a prop name (e.g. `size` on `Button`) and a theme key (e.g. `button.size`) is not always 1:1. Some props affect multiple theme keys; some theme keys affect multiple props. A best-effort lookup by component name + prop name pattern is good enough for a first pass.

**Why it matters:** This directly answers — which props are inside the HPE design surface, and which are grommet internals that HPE leaves unconfigured?

---

### Step 2 — `extract-hpe-overrides.js`

**What:** Scan `src/` theme source files for places where HPE makes an intentional divergence from a Grommet default. Three patterns to find:

1. **Nulled keys** — `keyName: undefined` (HPE is removing a grommet default)
2. **Disabled flags** — `propName: false` where grommet's default is `true` (e.g. `responsive: false`, `intelligentPad: false`)
3. **Inline comments** — the theme source already has several inline rationale comments (e.g. z-index values explained by HPE Common HFWS, focus ring replacement, color prop discouraged). Extract these.

**Output:** `prop-audit/hpe-theme-overrides.csv`

| Column | Meaning |
|---|---|
| `component` | |
| `themeKey` | e.g. `button.disabled.opacity` |
| `grommetDefault` | what grommet ships (where known) |
| `hpeValue` | what HPE sets |
| `overrideType` | `nulled` / `disabled` / `replaced` / `added` |
| `rationale` | extracted from inline comment, or blank |

**Why it matters:** This becomes the defensible, audience-ready record of where HPE intentionally diverges from Grommet — and why.

---

### Step 3 — `controlRecommendation` column

**What:** Add a derived column to `grommet-props.csv` using the combined output of Steps 1 and 2.

**Logic:**

| Condition | Recommendation |
|---|---|
| `hpeNulled = true` | `hidden` — HPE has removed this |
| `normalizedPropType = boolean`, HPE themed | `toggle` |
| `normalizedPropType = enum`, HPE themed | `select` — constrained to HPE values |
| `normalizedPropType = enum`, not HPE themed | `select` — full Grommet options |
| `normalizedPropType = string`, HPE themed | `hidden` — HPE controls this via tokens |
| `normalizedPropType = string`, not HPE themed | `text-input` |
| `normalizedPropType = number` | `number-input` |
| `normalizedPropType = object` | `json-editor` |
| `normalizedPropType = ReactNode / element` | `slot` |
| `propCategory = event` | `hidden` — event handlers are not playground controls |
| `normalizedPropType = union` | `text-input` (fallback) |

**Why it matters:** This column is the direct input to the playground control panel — which controls to show, which to hide, which to constrain to HPE values only.

---

## Suggested sequence

1. Copy this `prop-audit/` folder into the `grommet-theme-hpe` repo root.
2. Build and run `extract-theme-coverage.js` — produces the `hpeThemed`/`hpeNulled` columns.
3. Build and run `extract-hpe-overrides.js` — produces `hpe-theme-overrides.csv`.
4. Add `controlRecommendation` as a post-processing step in either script.
5. The enriched `grommet-props.csv` can then be dropped back into `hpe-design-system/docs/playground/prop-audit/` for use by the props explorer UI.
