---
mode: agent
description: >
  Reviews a completed platform-specific mapping document against the
  platform-agnostic spec. Appends findings to the component's gaps.md.
  Replace {{COMPONENT_NAME}} and {{PLATFORM}} before running.
---

# Mapping Reviewer — {{COMPONENT_NAME}} / {{PLATFORM}}

You are reviewing the {{PLATFORM}} mapping for an HPE Design System component.
The component is: **{{COMPONENT_NAME}}**
The platform is: **{{PLATFORM}}**

Your output is appended directly to the component's `gaps.md`.
No narrative. No commentary. Findings only.

---

## Before you review anything

Read these files in full:

1. `knowledge/core/token-conventions.md` — mandatory conventions
2. `knowledge/capabilities/component-creation/spec-writing-instructions.md`
3. `hpe-design-tokens/dist/css/components.css` — ground truth for token names
4. `hpe-design-tokens/dist/css/color.light.css` — color token ground truth
5. `hpe-design-tokens/dist/css/dimension.css` — dimension token ground truth
6. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/tokens.md`
7. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/anatomy.md`
8. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/constraints.md`
9. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/props.md`
10. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/mappings/{{PLATFORM}}.md`
11. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/gaps.md`
    — read existing gaps; number new ones sequentially from where this ends

---

## What to check

### 1 — Anatomy coverage
- Is every part from `anatomy.md` mapped to a {{PLATFORM}} primitive?
- Is every part styled in the CSS?

### 2 — Props coverage
- Is every prop from `props.md` mapped to a {{PLATFORM}} implementation?
- If a prop cannot be satisfied, is a gap logged?

### 3 — Token correctness in CSS
- Does every CSS variable exist in `tokens.md`?
- Does every CSS variable exist in `hpe-design-tokens`?
- Is every variable camelCase?
- Are any variables used that are not in `tokens.md`?

### 4 — Constraint compliance
- Is every constraint from `constraints.md` satisfied in the mapping?
- If not satisfiable, is a gap logged with a workaround?

Specifically check:
- No size/padding/border-width changes between states
- Disabled state uses opacity on root — not individual color overrides
- All three focus tokens applied together
- No hardcoded values without a logged gap

### 5 — Hardcoded values
- Does the CSS contain hardcoded pixel, color, or spacing values?
- Are they all logged in `gaps.md`?

### 6 — Cross-document consistency
- Do part names in the mapping match `anatomy.md` exactly?
- Do prop names match `props.md` exactly?
- Do constraint references (§1, §2 ...) match `constraints.md` exactly?
- Do CSS variable names match `tokens.md` exactly?

### 7 — Focus indicator
- Are all three focus tokens applied together in the CSS?
- Are any incorrect split focus tokens referenced?

---

## Output

Append to `gaps.md` for each finding:

```markdown
### GAP-XXX — [short title]

**Discovered in:** mappings/{{PLATFORM}}.md
**Step:** Mapping review ({{PLATFORM}})
**Type:** Token missing | Spec incomplete | Platform conflict | Constraint conflict
**Description:** [What is wrong]
**Current workaround:** [What the mapping does instead, if anything]
**Recommended fix:** [What should change]
**Status:** Open
```

Then append a review summary block:

```markdown
---

## Mapping Review Summary — {{COMPONENT_NAME}} / {{PLATFORM}}

| # | Title | Type | Status |
|---|---|---|---|
| XXX | [title] | [type] | Open |

**Verdict:** Passed — no new gaps found. Mapping is ready for implementation.
OR
**Verdict:** Failed — [N] new gaps found. Resolve before implementation.
```

If no new gaps are found, append only:

```markdown
---

## Mapping Review Summary — {{COMPONENT_NAME}} / {{PLATFORM}}

**Verdict:** Passed — no new gaps found. Mapping is ready for implementation.
```
