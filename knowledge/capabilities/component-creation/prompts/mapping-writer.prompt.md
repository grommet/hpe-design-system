---
mode: agent
description: >
  Writes a platform-specific mapping document for an HPE Design System
  component. Produces mappings/{{platform}}.md and logs gaps to the
  component's gaps.md. One run per target platform.
  Replace {{COMPONENT_NAME}}, {{PLATFORM}}, {{PLATFORM_PRIMITIVE}}
  before running.
---

# Mapping Writer — {{COMPONENT_NAME}} / {{PLATFORM}}

You are writing the {{PLATFORM}} implementation mapping for an HPE Design
System component.
The component is: **{{COMPONENT_NAME}}**
The platform is: **{{PLATFORM}}**
The platform primitive: **{{PLATFORM_PRIMITIVE}}**

---

## Before you write anything

Read these files in full:

1. `knowledge/core/token-conventions.md` — naming conventions
2. `knowledge/capabilities/component-creation/spec-writing-instructions.md`
3. `knowledge/capabilities/component-creation/spec-writing-context.md`
4. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/tokens.md`
5. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/anatomy.md`
6. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/constraints.md`
7. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/props.md`
8. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/gaps.md`
   — read existing gaps; number new ones sequentially from where this ends

Also study the {{PLATFORM}} documentation for `{{PLATFORM_PRIMITIVE}}` to
understand available primitives, data-attributes, and built-in behaviours.

---

## Your task

Write one document:
`knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/mappings/{{PLATFORM}}.md`

Append any new gaps to:
`knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/gaps.md`

---

## mappings/{{PLATFORM}}.md structure

### 1 — How {{PLATFORM}} implements this component
- What primitives {{PLATFORM}} provides
- What behaviour {{PLATFORM}} handles automatically
- What the spec requires that {{PLATFORM}} does NOT provide natively

### 2 — Anatomy → {{PLATFORM}} primitive mapping

| Anatomy part | {{PLATFORM}} component | Notes |
|---|---|---|

### 3 — Props → {{PLATFORM}} implementation

| Spec prop | {{PLATFORM}} implementation | Notes |
|---|---|---|

### 4 — State → {{PLATFORM}} mechanism

| Anatomy state | {{PLATFORM}} mechanism | Applies to |
|---|---|---|

### 5 — Token import

```js
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
```

### 6 — Component structure

Full JSX (or equivalent) with:
- All {{PLATFORM}} primitives composed correctly
- Class names on every part
- Props from `props.md` wired to {{PLATFORM}} props
- Comments referencing constraint numbers (e.g. `// see constraints §4`)

### 7 — CSS

Full CSS using only tokens from `tokens.md`:
- One rule block per anatomy part
- All states via {{PLATFORM}} data-attributes or selectors
- Exact CSS variable names from `tokens.md` — no new names
- No hardcoded values — log a gap for any unavoidable exceptions
- Constraint number comments where relevant

### 8 — Implementation notes

| Topic | Note |
|---|---|

### 9 — Gaps between {{PLATFORM}} and the spec

| Gap | Detail | Recommendation |
|---|---|---|

---

## Rules

- Every anatomy part from `anatomy.md` must appear in section 2
- Every prop from `props.md` must appear in section 3
- Every state from `anatomy.md` must appear in section 4
- CSS must only use tokens from `tokens.md` — no new token names
- All three focus tokens must be applied together:
  ```css
  outline: var(--hpe-focusIndicator-outline);
  outline-offset: var(--hpe-focusIndicator-outlineOffset);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
  ```
- Disabled state uses opacity on root — not individual color overrides
- No hardcoded values without a logged gap
- Reference constraint numbers in CSS comments

---

## Gap logging

Append to `gaps.md` — number sequentially from where that file ends:

```markdown
### GAP-XXX — [short title]

**Discovered in:** mappings/{{PLATFORM}}.md
**Step:** Mapping writing ({{PLATFORM}})
**Type:** Token missing | Spec incomplete | Platform conflict | Constraint conflict
**Description:** [What is missing or conflicting]
**Current workaround:** [What was done instead]
**Recommended fix:** [What should change]
**Status:** Open
```

---

## Output checklist

- [ ] Every anatomy part mapped to a {{PLATFORM}} primitive
- [ ] Every prop mapped to a {{PLATFORM}} implementation
- [ ] Every state mapped to a {{PLATFORM}} mechanism
- [ ] Full component structure included
- [ ] Full CSS included — no hardcoded values
- [ ] All three focus tokens applied together
- [ ] Disabled state uses opacity on root
- [ ] No token names used that are not in tokens.md
- [ ] gaps.md updated with any new gaps
