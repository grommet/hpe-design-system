# Style Compass — Decision Tree Writing Guide

This guide defines how to write content for `hpe-token-decision.json`.
Follow it when adding new nodes, editing existing ones, or reviewing contributions.
It records agreed decisions so they don't need to be re-litigated each time.

---

## 1. The four content fields

Every option in the tree can have up to four content-bearing fields.
Each has a distinct job — do not blur their purposes.

| Field | Where it appears | Job |
|---|---|---|
| `label` | Bold title on the Selector card | Identify the option at a glance |
| `description` | Smaller text below the label | Clarify what the label means |
| `hint` | Paragraph below the question heading | Contextual guidance for the whole step |
| `result.description` | Text above or below the token table | Explain what the result set is for |

---

## 2. Label rules

### Keep it short and scannable
Labels are read at a glance across a list of options. Aim for **2–5 words**.
A user scanning a list of 6–10 options should be able to pick the right one
without reading every word.

### No parentheticals in labels
Parenthetical clarifications belong in `description`, not `label`.

**Wrong:**
```json
"label": "Screen overlay (dimmed backdrop behind a modal)"
"label": "Page background (the overall app canvas)"
"label": "Floating / Overlay (dropdown, popover, tooltip, layer)"
```

**Right:**
```json
"label": "Screen overlay",
"description": "The dimmed backdrop behind a modal or dialog."

"label": "Page background",
"description": "The overall app canvas. Elevation level 0."

"label": "Floating / Overlay",
"description": "Dropdowns, popovers, tooltips, layers. Elevation level 2."
```

### Casing
- **Title case** for component names and proper nouns: `Button`, `FormField`, `CheckboxGroup`
- **Sentence case** for descriptive labels: `Colors & states`, `The input container`, `Rest`
- **Lowercase** for t-shirt sizes and code values: `xsmall`, `medium`, `3xlarge`

### Slashes for equivalent alternatives
Use ` / ` (with spaces) when two terms are genuinely interchangeable:
`Anchor / Link`, `Floating / Overlay`, `Critical / Error / Danger`.
Do not use slashes to mean "or choose one of these" — that's what the next question is for.

### Anatomical labels ("The X")
When asking about a part of a component, use `"The [part]"` phrasing consistently:
- `"The checkbox control"` not `"Checkbox control"`
- `"The label text"` not `"Label"`
- `"The input container"` not `"Input container"`

This mirrors how a designer would point at a component and say "the thing I mean".

---

## 3. Description rules

### When to include a description
- **Always** include a description on component-picker options (the "Which component?" step)
  so a user who doesn't recognise the label can still identify it.
- **Always** include a description when a label's meaning is ambiguous without context.
- **Omit** descriptions on leaf size options (`xsmall`, `small`, `medium`, etc.) unless
  one size needs a call-out (e.g. "Medium is the default size.").
- **Omit** descriptions on state options (`Rest`, `Hover`, `Disabled`) — these are
  self-explanatory in context.

### What a description should say
A description answers: *"What is this, and when would I use it?"*

It should add information the label doesn't already convey. Do not repeat the label.

**Wrong** (repeats label):
```json
"label": "Screen overlay",
"description": "A screen overlay."
```

**Right** (adds meaning):
```json
"label": "Screen overlay",
"description": "The dimmed backdrop rendered behind a modal or dialog."
```

### Length
One sentence. Two at most. If you need more, the question or tree structure
may need rethinking.

### Voice
Second person is fine but not required. Active voice. No marketing language.
- OK: `"The dimmed backdrop behind a modal."`
- OK: `"Use for surfaces sitting on the page background."`
- Avoid: `"Elevates your design to the next level."`

---

## 4. Hint rules

A `hint` appears once per question node, below the question heading, before the options.
It provides context that applies to **all** options at that step — not to one specific option.

### When to include a hint
- When the user may not know the anatomy of a component well enough to choose confidently.
  Example: distinguishing "input container" from "input group" in FormField.
- When there is a strong HPE-specific convention the user should know before choosing.
  Example: "Always prefer component tokens over semantic tokens when available."
- When a string reference redirect is in use (the "Not sure / not listed" option).

### When not to use a hint
- Do not use hints to explain individual options — that's what `description` is for.
- Do not repeat information that is already in the question text.

### Length
2–3 sentences maximum. Hints should orient, not instruct at length.

---

## 5. Result description rules

A `result.description` appears alongside the token table (or alone, for guidance-only results).

### Token table results
- Include a result description when the token set needs context that token names alone
  don't convey — e.g. what `gapX` means, which token is the default, caveats about use.
- Omit it when the tokens are self-explanatory (`rest.background`, `hover.textColor`, etc.).

### Guidance-only results (empty `tokens` array)
- **Always** include a `description` — it is the entire result content.
- Explain clearly why there are no tokens and what the user should do instead.
- If a `seeAlso` reference is present, the description should prime the user for it:
  *"The Select trigger is styled by FormField input container tokens…"*

### Length
1–3 sentences. Do not pad.

---

## 6. Node ID rules

IDs are used by `findNodeById` for `seeAlso` navigation.
They are not shown to users but must be unique across the entire tree.

- Use `kebab-case`.
- Prefix with the component or category: `formfield-label`, `color-bg-status`.
- Make IDs descriptive enough to understand without context: `button-primary-state`
  not `b-p-s`.
- Never change an ID once it is referenced by a `seeAlso` in another node —
  this would silently break navigation.

---

## 7. Tree structure rules

### Depth
Keep paths to a result within **4–5 steps** from root.
If a branch is getting deeper, look for a way to merge two steps.

### Option count
Aim for **3–8 options per question**. Fewer than 3 suggests the step might be unnecessary.
More than 8 is overwhelming — consider grouping or splitting the question.

### Leaf vs navigation
An option should be a **leaf** (has `result`) when the answer uniquely identifies
a token set. It should be a **navigation option** (has `next`) when the user still
needs to make a further meaningful choice.

Do not create a navigation step just to hold one option.

### The "Not sure / Not listed" redirect
The component tree includes a `"next": "_semantic"` redirect option.
This is the only string reference in the tree. Do not add others.
If a new cross-tree reference is needed, use `seeAlso` on a result node instead.

### seeAlso
Use `seeAlso` when a result has no tokens of its own but a closely related
node in the tree does. The `seeAlso` array holds node IDs.
The `result.description` must explain why the user is being redirected.

---

## 8. Decided conventions (log)

These decisions have been made and should not be re-litigated without good reason.

| Decision | Rationale |
|---|---|
| Parenthetical clarifications move from `label` to `description` | Labels must be scannable; descriptions are the right place for clarifying content |
| T-shirt sizes as labels stay lowercase (`xsmall`, `medium`) | Matches token naming convention and avoids inconsistency |
| State labels (`Rest`, `Hover`, `Disabled`) have no descriptions | Self-explanatory in context; descriptions would add noise |
| Component anatomy uses `"The [part]"` phrasing | Reads naturally when a designer points at a component |
| No explicit `type` field on nodes | Node type is detected structurally by the renderer; adding `type` would be redundant and could go stale |
| `tokens` array always present on result nodes, empty `[]` for guidance-only | Keeps result shape consistent; renderer switches on `tokens.length > 0` |
| IDs are never changed once published | `seeAlso` references are string IDs; renaming silently breaks navigation |
