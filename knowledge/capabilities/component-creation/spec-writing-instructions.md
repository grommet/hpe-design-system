# Spec Writing Instructions

This file defines every convention, rule, and pattern that applies when
writing HPE Design System component specs. Read this before running any
prompt in the component-creation pipeline.

---

## Document types

Every component spec consists of five documents produced in this order:

| # | Document | Platform agnostic | Produced by |
|---|---|---|---|
| 1 | `tokens.md` | Yes | spec-writer |
| 2 | `anatomy.md` | Yes | spec-writer |
| 3 | `constraints.md` | Yes | spec-writer |
| 4 | `props.md` | Yes | props-writer |
| 5 | `mappings/{{platform}}.md` | No | mapping-writer |

`gaps.md` is created by spec-writer and appended to by every subsequent step.

Documents 1–4 must contain no framework references. Framework-specific
details belong exclusively in `mappings/`.

## Reference source paths

When {{REFERENCE_COMPONENT}} is not `none`, read these two files:

| What | Path |
|---|---|
| Component source | `node_modules/{{REFERENCE_PACKAGE}}/src/js/components/{{REFERENCE_COMPONENT}}/{{REFERENCE_COMPONENT}}.js` |
| Theme entry | `node_modules/grommet-theme-hpe/src/js/themes/hpe.js` — search for `{{REFERENCE_COMPONENT}}:` (lowercase) |

These paths assume {{REFERENCE_PACKAGE}} follows the standard Grommet
folder convention. If the file is not found at this path, check:
- `node_modules/{{REFERENCE_PACKAGE}}/src/components/{{REFERENCE_COMPONENT}}/index.js`
- `node_modules/{{REFERENCE_PACKAGE}}/components/{{REFERENCE_COMPONENT}}.js`

Never hallucinate the component API — if the file cannot be found, log
a gap and derive from the grommet-theme-hpe entry alone.

---

## §1 — Token naming

See `knowledge/core/token-conventions.md` for the full camelCase reference.

The single most important rule: **verify every token name against the
installed `hpe-design-tokens` package before writing it**. Do not guess.
Do not assume kebab-case. Do not invent names.

### Verification markers

Every token in a spec document must carry a marker:

| Marker | Meaning |
|---|---|
| _(none)_ | Confirmed present in the package |
| `*` | Not yet verified — camelCase pattern applied but not confirmed |
| `⛔` | Confirmed absent from the package — must be logged as a gap |

### Token layers

| Symbol | Layer | When to use |
|---|---|---|
| `C` | Component token | First choice — specific to this component |
| `S` | Semantic token | When no component token exists |
| `F` | FormField inherited | When the token is defined in FormField spec — do not redefine |

---

## §2 — tokens.md conventions

### Structure

Group tokens by anatomy part. For each token:

```
| Property | State | Layer | Token path | CSS variable | Notes |
```

### States to always cover

For every anatomy part that has visual states, cover all that apply:

- rest
- hover
- focus
- active
- disabled
- error (invalid)
- success (valid)
- info
- selected (for options, items)
- open / closed (for triggers, drops)
- placeholder (for value display)

Do not assume a state does not exist — check `grommet-theme-hpe` to confirm.

### What tokens.md must NOT contain

- Framework references
- CSS rule blocks
- JavaScript
- Any hardcoded values

---

## §3 — anatomy.md conventions

### Required sections

1. **Overview** — what the component is and does
2. **ASCII diagram** — visual structure of the component
3. **Parts table** — every part with name, description, always/conditional
4. **States** — all interactive states and what triggers them
5. **Size variants** — all sizes and which are fully specified
6. **Layout behaviour** — width, height, stacking, overflow, responsive
7. **Out of scope** — what the component does NOT do

### ASCII diagram format

```
┌─────────────────────────────────────┐
│ Label                    [required] │
├─────────────────────────────────────┤
│ Value or Placeholder      [icon ▾]  │
└─────────────────────────────────────┘
```

### Parts table format

| Part | Description | Always present |
|---|---|---|
| Trigger | The clickable control | Yes |
| Icon | Chevron indicating open/close | Yes |
| Drop | The floating option container | No — only when open |

---

## §4 — constraints.md conventions

### Numbering

Every constraint is numbered: §1, §2, §3 ...
Numbers must be stable — do not renumber when adding constraints.
New constraints are always appended at the end (before the final hardcoded values constraint).

### Constraint structure

Each constraint must contain:
- A clear, actionable rule
- The exact CSS variable name from `tokens.md` where relevant
- A code example where the rule is non-obvious

### Mandatory constraints

Every spec must include at minimum:

| Constraint | Rule |
|---|---|
| Layout shift | Never change size, padding, or border-width between states |
| Disabled | Apply `opacity: 0.3` on the root — never override individual colors |
| Focus | Always apply all three `--hpe-focusIndicator-*` tokens together |
| Hardcoded values | Always the final constraint — log any exception as a gap |

### Final constraint (always last)

```
§N — No hardcoded values

All visual properties must use CSS custom properties from hpe-design-tokens.
If a token is missing, log it in gaps.md with a workaround comment.
```

---

## §5 — props.md conventions

### Prop naming

- All prop names are camelCase
- Callback props always start with `on`: `onClose`, `onDismiss`, `onChange`
- Boolean props use positive naming: `dismissible` not `notDismissible`
- Enum props use lowercase values: `'low' | 'medium' | 'high'`

### Props table format

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|

### Required sections

1. Overview
2. Props table
3. Prop groups (Content, Behaviour, Appearance, Accessibility, Layout)
4. Callback props (arguments and return value)
5. Enum reference
6. Accessibility props (ARIA mapping)
7. Usage examples (minimal, typical, full)
8. Props not provided (intentional omissions)

### Props must be backed

Every prop must have a backing anatomy part in `anatomy.md` or a backing
token in `tokens.md`. Never add a prop speculatively.

---

## §6 — mappings/{{platform}}.md conventions

### Required sections

1. How {{platform}} implements this component
2. Anatomy → platform primitive mapping table
3. Props → platform implementation table
4. State → data-attribute mapping table
5. Token import block
6. Full component structure (JSX or equivalent)
7. Full CSS
8. Implementation notes table
9. Gaps between platform and spec table

### CSS rules

- One rule block per anatomy part
- States via platform data-attributes — never `:hover` alone
- Only token names from `tokens.md` — no new names introduced
- No hardcoded values — log every exception as a gap
- Reference constraint numbers in comments: `/* see constraints §4 */`

### Always include the token import block

```js
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
```

---

## §7 — gaps.md conventions

### File lifecycle

- Created by spec-writer (step 1) — even if empty
- Appended to by every subsequent pipeline step
- Never overwritten — always appended
- Each step adds a `**Step:**` field so findings are traceable

### Gap format

```markdown
### GAP-XXX — [short title]

**Discovered in:** [filename]
**Step:** [Spec writing | Props writing | Spec review | Mapping writing (platform) | Mapping review (platform)]
**Type:** Token missing | Spec incomplete | Platform conflict | Constraint conflict
**Description:** [What is missing or conflicting — be specific]
**Current workaround:** [Exactly what was done instead — or "None"]
**Recommended fix:** [What should change in the token package, spec, or platform]
**Status:** Open
```

### Gap types

| Type | Meaning |
|---|---|
| Token missing | A token referenced in the spec does not exist in `hpe-design-tokens` |
| Spec incomplete | The spec does not cover a state or detail that needs implementing |
| Platform conflict | A platform behaviour makes a spec constraint impossible or impractical |
| Constraint conflict | Two constraints in the spec contradict each other |

### Numbering

- First gap in a component is GAP-001
- Number sequentially across all pipeline steps
- Never reuse or skip a number
- Read `gaps.md` before logging to find the next number

### Summary table

Every gap must also appear in the summary table at the bottom of `gaps.md`:

```markdown
## Summary

| # | Title | Discovered in | Step | Type | Status |
|---|---|---|---|---|---|
| 001 | Token naming mismatch | tokens.md | Spec writing | Spec incomplete | Open |
```

---

## §8 — What to do when a token is missing

1. Do not silently hardcode the value
2. Use the closest available token as a workaround
3. Add a comment in the CSS: `/* GAP-XXX: [token name] missing — using [workaround] */`
4. Log the gap in `gaps.md` with full detail
5. Mark the token in `tokens.md` with `⛔`

---

## §9 — What to do when a platform cannot satisfy a constraint

1. Log it as a `Platform conflict` gap in `gaps.md`
2. Document the workaround in the mapping document
3. Note it in the implementation notes table in `mappings/{{platform}}.md`
4. Never silently omit the constraint from the mapping

---

## §10 — Cross-document consistency rules

These must hold across all five documents:

- Anatomy part names must be identical in every document that references them
- CSS variable names must be identical between `tokens.md` and all mapping CSS
- Constraint numbers (§1, §2 ...) must match when cross-referenced
- Size variant names must be consistent: always `small`, `medium`, `large`
- Prop names must be identical between `props.md` and the mapping implementation
- No framework names must appear in the four agnostic documents
