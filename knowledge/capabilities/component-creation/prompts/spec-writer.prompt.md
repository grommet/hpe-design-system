---
mode: agent
description: >
  Writes a complete platform-agnostic component spec for an HPE Design System
  component. Produces tokens.md, anatomy.md, constraints.md, and an empty
  gaps.md sequentially. No framework assumptions — do not reference Radix,
  Grommet, or any other framework in the output documents.
  Replace all variables before running:
  {{COMPONENT_NAME}}, {{REFERENCE_COMPONENT}}, {{REFERENCE_THEME}},
  {{REFERENCE_PACKAGE}}
---

# Spec Writer — {{COMPONENT_NAME}}

You are writing a platform-agnostic component spec for the HPE Design System.
The component is: **{{COMPONENT_NAME}}**

---

## Variables

| Variable | Value | Purpose |
|---|---|---|
| `{{COMPONENT_NAME}}` | _(replace me)_ | Component folder name, lowercase |
| `{{REFERENCE_COMPONENT}}` | _(replace me)_ | Existing reference component — e.g. `Select`, or `none` if new |
| `{{REFERENCE_THEME}}` | _(replace me)_ | Theme with design decisions — e.g. `grommet-theme-hpe` |
| `{{REFERENCE_PACKAGE}}` | _(replace me)_ | UI library the reference lives in — e.g. `grommet` |

If `{{REFERENCE_COMPONENT}}` is `none`, skip Step B entirely.

---

## This prompt produces platform-agnostic output

Do not reference Radix, Grommet, React, or any other framework in the
output documents. Reference sources are read to understand **what to spec**
— they must not appear in the output.

---

## Before you write anything

Read in this exact order. Do not skip any step.

### Step A — Conventions (always required)

1. `knowledge/core/token-conventions.md` — camelCase rules, layer symbols,
   focus indicator pattern. Mandatory — token names will be wrong without this.
2. `knowledge/capabilities/component-creation/spec-writing-instructions.md`
   — how to write spec documents, gap format, all writing conventions.
3. `knowledge/capabilities/component-creation/spec-writing-context.md`
   — what this project is and why it exists.

### Step B — Reference sources (skip if {{REFERENCE_COMPONENT}} is `none`)

4. Read the source of `{{REFERENCE_COMPONENT}}` at:
   `node_modules/{{REFERENCE_PACKAGE}}/src/js/components/{{REFERENCE_COMPONENT}}/{{REFERENCE_COMPONENT}}.js`

   Study to understand all states, variants, anatomy parts, and interaction
   behaviours. Look for: parts rendered, states handled, keyboard behaviour,
   ARIA attributes, size variants, kinds (e.g. inline/global/toast).

   If the file is not found at this path, check:
   - `node_modules/{{REFERENCE_PACKAGE}}/src/components/{{REFERENCE_COMPONENT}}/index.js`
   - `node_modules/{{REFERENCE_PACKAGE}}/components/{{REFERENCE_COMPONENT}}.js`

   Never hallucinate the component API — if the file cannot be found, log
   a gap and derive from the theme entry alone.

5. Read the `{{REFERENCE_COMPONENT}}` theme entry at:
   `node_modules/{{REFERENCE_THEME}}/src/js/themes/hpe.js`

   Search for `{{REFERENCE_COMPONENT}}:` (lowercase) within that file.
   This is the visual source of truth.

   You MUST audit every anatomy part against this complete property checklist.
   Do not skip a property because it seems obvious or implied:

   **Per anatomy part, record every property that has a non-default value:**
   - `background` — per state AND per kind (inline/global/toast)
   - `color` — text color, icon color, per status and per state
   - `border` — width, color, radius, per state
   - `padding` — container outer padding AND internal element padding separately
   - `gap` — between every sibling element (icon→text, title→description,
     text→close button). Do not conflate these — record each gap separately.
   - `min-height` / `height`
   - `font-size`, `font-weight`, `line-height` — per text element
   - `text-align` — must be explicitly stated, never assumed
   - `box-shadow` / `elevation` — especially for floating/toast kinds
   - `z-index` — for any floating kind
   - `icon` — the exact icon component name per status, not just the color
   - `icon alignment` — whether the icon aligns to the top, center, or
     cap-height of the first line of adjacent text
   - `animation` / `transition` — duration, easing, direction
   - `opacity` — for disabled state

### Step C — Token verification (always required)

6. `hpe-design-tokens/dist/css/components.css` — ground truth for
   component token names. Cross-reference every value from Step B here.
7. `hpe-design-tokens/dist/css/color.light.css` — semantic color tokens.
8. `hpe-design-tokens/dist/css/dimension.css` — dimension and spacing tokens.

### Why this order matters

- Step B tells you **what** to spec — states, values, visual intent
- Step C tells you **what to call** the tokens
- Without Step B the spec will miss states and values
- Without Step C the token names will be wrong

---

## Your task

Write four documents in this exact order. Complete each fully before
starting the next.

Output to:
`knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/`

---

## Document 1 — tokens.md

### Purpose

Every visual design token needed to style {{COMPONENT_NAME}}.
Single source of truth for all visual values.

### Rules

- Verify every token name against `hpe-design-tokens` before writing
- camelCase for all multi-word segments — mandatory:
  - ✓ `--hpe-formField-default-medium-input-container-paddingX`
  - ✗ `--hpe-form-field-default-medium-input-container-padding-x`
- Mark unverified tokens with `*`
- Mark confirmed-missing tokens with `⛔` and log as GAP-XXX in gaps.md
- Never invent a token name — flag a gap instead
- Group by anatomy part
- For each token: Property | State | Layer | Token path | CSS variable | Notes

### Layer symbols

| Symbol | Meaning |
|---|---|
| `C` | Component token (`components.hpe.*`) |
| `S` | Semantic token (`hpe.color.*`, `hpe.shadow.*` etc.) |
| `F` | Inherited from FormField — do not redefine |

### Mandatory camelCase pattern

See `knowledge/core/token-conventions.md` for the full list.
Key examples:

| Wrong | Correct |
|---|---|
| `--hpe-...-border-color` | `--hpe-...-borderColor` |
| `--hpe-...-font-size` | `--hpe-...-fontSize` |
| `--hpe-...-min-height` | `--hpe-...-minHeight` |
| `--hpe-...-padding-x` | `--hpe-...-paddingX` |
| `--hpe-focus-indicator-...` | `--hpe-focusIndicator-...` |
| `--hpe-form-field-...` | `--hpe-formField-...` |

### Focus indicator rule

Always document all three tokens together — never split them:

```
--hpe-focusIndicator-outline
--hpe-focusIndicator-outlineOffset
--hpe-focusIndicator-boxShadow
```

---

## Document 2 — anatomy.md

### Purpose

Every visual and structural part, state, variant, and layout behaviour.
Structural blueprint that constraints and mappings reference.

### Rules

- List every part: name, description, always present or conditional
- ASCII diagram of the visual structure
- All interactive states — cross-reference `{{REFERENCE_THEME}}` to
  ensure none are missed
- All size variants — note which are fully specified in v1
- Layout behaviour: width, height, stacking, overflow
- What the component does NOT do — scope boundaries
- Reference token names from tokens.md where relevant
- No framework references in the output

---

## Document 3 — constraints.md

### Purpose

Rules that must never be broken regardless of framework or implementation.

### Rules

- Number every constraint: §1, §2, §3 ...
- Every constraint must be actionable
- Reference exact CSS variable names from tokens.md
- Cover at minimum:
  - Layout shift prevention (no size/padding/border changes between states)
  - Disabled state (opacity on root — not individual color overrides)
  - Focus (always the three-token focus ring)
  - Mutually exclusive states (error vs success vs info vs help)
  - Accessibility (ARIA, keyboard, screen reader behaviour)
  - Hardcoded value policy
  - Text alignment — must be explicitly stated for every kind as a constraint.
    Never rely on browser or inherited defaults.
  - Icon alignment — icon must align to the cap-height of the first line of
    the adjacent title text, not to the center of the whole text block.
    State this as an explicit constraint with the CSS rule required.
  - Internal gaps — the gap between title and description must use a tighter
    spacing token than layout-level gaps. Verify the correct token against
    the reference theme. State the exact token name as a constraint.
  - Shadow — any floating or toast kind must explicitly state its box-shadow
    token as a constraint. Absence of shadow is not a valid default.
- Flag any constraint without a token backing as a gap in gaps.md
- Final constraint is always:
  > All visual properties must use CSS custom properties from hpe-design-tokens.
  > If a token is missing, log it in gaps.md with a workaround.

---

## Document 4 — gaps.md

Create `gaps.md` and populate it with any gaps discovered during
Documents 1–3. If no gaps were found, create the file with this content:

```markdown
# {{COMPONENT_NAME}} — Gaps

No gaps found during spec writing.
```

If gaps were found, use this format for each:

```markdown
# {{COMPONENT_NAME}} — Gaps

## How to read this file

All gaps discovered across all pipeline steps for {{COMPONENT_NAME}} are
logged here. Gaps from spec-writer, props-writer, spec-reviewer,
mapping-writer, and mapping-reviewer all append to this file.

---

### GAP-001 — [short title]

**Discovered in:** [filename]
**Step:** Spec writing
**Type:** Token missing | Spec incomplete | Constraint conflict
**Description:** [What is missing or conflicting]
**Current workaround:** [What was done instead]
**Recommended fix:** [What should change]
**Status:** Open
```

Number gaps from GAP-001. Subsequent pipeline steps continue numbering
sequentially from where this file left off.

---

## Output checklist

Before finishing, confirm:
- [ ] Read token-conventions.md, spec-writing-instructions.md,
      spec-writing-context.md before writing
- [ ] Read `{{REFERENCE_COMPONENT}}` in `{{REFERENCE_PACKAGE}}` (or skipped — `none`)
- [ ] Read `{{REFERENCE_COMPONENT}}` in `{{REFERENCE_THEME}}` (or skipped — `none`)
- [ ] Cross-referenced all values against `hpe-design-tokens`
- [ ] tokens.md complete — all names verified or flagged
- [ ] anatomy.md complete — all parts and states documented
- [ ] constraints.md complete — all constraints numbered and actionable
- [ ] gaps.md created — all gaps logged or file marked empty
- [ ] No kebab-case token names in any output
- [ ] No invented token names — all unknowns flagged
- [ ] No framework references in any output document
- [ ] Every anatomy part audited against the full CSS property checklist
- [ ] box-shadow / elevation recorded for every floating or toast kind
- [ ] text-align explicitly stated for every kind — never assumed
- [ ] Each gap value recorded separately (icon→text, title→description etc.)
- [ ] Exact icon component name recorded per status — not just icon color
- [ ] Icon vertical alignment behaviour stated in anatomy.md
