---
mode: agent
description: >
  Reviews the four platform-agnostic spec documents and appends findings
  to the component's gaps.md. Run after spec-writer and props-writer
  are both complete. Replace {{COMPONENT_NAME}} before running.
---

# Spec Reviewer — {{COMPONENT_NAME}}

You are reviewing the platform-agnostic spec for an HPE Design System component.
The component is: **{{COMPONENT_NAME}}**

Your output is appended directly to the component's `gaps.md`.
No narrative. No commentary. Findings only.

---

## Before you review anything

Read these files in full:

1. `knowledge/core/token-conventions.md` — mandatory naming conventions
2. `knowledge/capabilities/component-creation/spec-writing-instructions.md`
3. `hpe-design-tokens/dist/css/components.css` — ground truth for token names
4. `hpe-design-tokens/dist/css/color.light.css` — ground truth for color tokens
5. `hpe-design-tokens/dist/css/dimension.css` — ground truth for dimension tokens

Then read the component spec:

6. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/tokens.md`
7. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/anatomy.md`
8. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/constraints.md`
9. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/props.md`
10. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/gaps.md`
    — read existing gaps so you do not duplicate them; number new gaps
    sequentially from where this file ends

---

## What to check

### 1 — Token name correctness
- Does every CSS variable exist in `hpe-design-tokens`?
- Is it camelCase — not kebab-case?
- Is it correctly marked `*` (unverified) or `⛔` (confirmed missing)?
- Are any `*` tokens actually present or absent in the package?

### 2 — Anatomy coverage
- Does `tokens.md` have at least one token for every anatomy part?
- Does `props.md` have at least one prop for every consumer-facing part?
- Are all states covered by tokens?

### 3 — Constraint coverage
- Is every constraint backed by a token in `tokens.md`?
- If no token, is there a documented workaround?
- Does every constraint reference exact CSS variable names?

### 4 — Props coverage
- Is every prop backed by an anatomy part or token?
- Are all enum values documented?
- Are all callback props documented with arguments?
- Are there any framework-specific references? (There must not be)

### 5 — Cross-document consistency
- Do anatomy part names match exactly across all four documents?
- Do CSS variable names match exactly between `tokens.md` and `constraints.md`?
- Do constraint numbers (§1, §2 ...) match when cross-referenced?
- Are size variant names consistent across all documents?
- Are there any framework references in the agnostic documents?

### 6 — Focus indicator
- Does `constraints.md` document all three tokens together?
  ```
  --hpe-focusIndicator-outline
  --hpe-focusIndicator-outlineOffset
  --hpe-focusIndicator-boxShadow
  ```
- Does any document reference incorrect split focus tokens?

### 7 — Hardcoded values
- Does any document contain hardcoded values not backed by a token?
- Are all hardcoded values already logged in `gaps.md`?

### 8 — Visual completeness (hard-fail checks)

These are mandatory. If any item below is absent from the spec, log it as
a gap — do not pass the review.

- [ ] **Icon names** — does `tokens.md` or `anatomy.md` record the exact
  icon component name per status? Color alone is not sufficient.
  If absent → log as `Spec incomplete`

- [ ] **Text alignment** — does `constraints.md` explicitly state
  `text-align` for every kind (inline, global, toast)?
  Assumed or inherited alignment is not acceptable.
  If absent → log as `Spec incomplete`

- [ ] **Icon vertical alignment** — does `anatomy.md` or `constraints.md`
  state whether the icon aligns to the top, center, or cap-height of the
  first line of adjacent title text?
  If absent → log as `Spec incomplete`

- [ ] **Internal gaps** — does `tokens.md` record separate gap tokens for:
  - icon → text block
  - title → description
  - text block → close button
  Conflated or missing gaps → log as `Spec incomplete`

- [ ] **box-shadow / elevation** — for any floating or toast kind, does
  `tokens.md` include a `box-shadow` or `elevation` entry?
  Absence of shadow is not a valid default — it must be explicitly stated.
  If absent → log as `Token missing`

- [ ] **z-index** — for any floating or toast kind, is a z-index token or
  workaround documented?
  If absent → log as `Token missing`

- [ ] **Padding levels** — does `tokens.md` distinguish between:
  - container outer padding
  - internal element padding (e.g. icon padding-top for alignment)
  If conflated → log as `Spec incomplete`

- [ ] **animation / transition** — are duration and easing values recorded
  for any animated kind (e.g. toast enter/exit)?
  If absent and the reference component animates → log as `Spec incomplete`

---

## Output

Append to `gaps.md` using this format for each finding:

```markdown
### GAP-XXX — [short title]

**Discovered in:** [filename]
**Step:** Spec review
**Type:** Token missing | Spec incomplete | Constraint conflict
**Description:** [What is wrong]
**Current workaround:** [What the spec does instead, if anything]
**Recommended fix:** [What should change]
**Status:** Open
```

Then append a review summary block:

```markdown
---

## Spec Review Summary — {{COMPONENT_NAME}}

| # | Title | Type | Status |
|---|---|---|---|
| XXX | [title] | [type] | Open |

**Verdict:** Passed — no new gaps found.
OR
**Verdict:** Failed — [N] new gaps found. Resolve before running mapping-writer.
```

If no new gaps are found, append only:

```markdown
---

## Spec Review Summary — {{COMPONENT_NAME}}

**Verdict:** Passed — no new gaps found. Spec is ready for mapping-writer.
```
