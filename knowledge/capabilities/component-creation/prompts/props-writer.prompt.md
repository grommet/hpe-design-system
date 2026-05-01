---
mode: agent
description: >
  Writes a platform-agnostic props.md defining the ideal public API contract
  for an HPE Design System component. Logs any gaps found to the component's
  own gaps.md. Replace {{COMPONENT_NAME}} before running.
---

# Props Writer — {{COMPONENT_NAME}}

You are defining the platform-agnostic public props API for an HPE Design
System component.
The component is: **{{COMPONENT_NAME}}**

Do not reference any specific framework. Define what props the component
exposes — not how any framework implements them.

---

## Before you write anything

Read these files in full:

1. `knowledge/core/token-conventions.md` — naming conventions
2. `knowledge/capabilities/component-creation/spec-writing-instructions.md`
3. `knowledge/capabilities/component-creation/spec-writing-context.md`
4. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/tokens.md`
5. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/anatomy.md`
6. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/constraints.md`
7. `knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/gaps.md`
   — read the existing gaps so you do not duplicate them and number
   new gaps sequentially from where this file ends

---

## Your task

Write one document:
`knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/props.md`

Append any new gaps to:
`knowledge/capabilities/component-creation/component-specs/{{COMPONENT_NAME}}/gaps.md`

---

## props.md structure

### 1 — Overview
- What the component does
- What renders by default with no props set
- What the consumer controls vs what the component handles internally

### 2 — Props table

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|

Rules:
- Every consumer-facing anatomy part must have at least one prop
- Every externally-triggerable state must have a prop
- Prop names are camelCase
- Types: `string`, `boolean`, `number`, `function`, `node`, `enum`, or a union
- For enums, list all values in the Type column: `'low' | 'medium' | 'high'`
- Defaults must always be explicit — use `undefined` if truly absent
- Required props must be the minimum necessary

### 3 — Prop groups

Group by concern:
- **Content** — text, labels, icons, slot content
- **Behaviour** — open/close, dismiss, timing, callbacks
- **Appearance** — status/severity variants, size
- **Accessibility** — aria labels, roles, live region settings
- **Layout** — position, alignment, z-index overrides

### 4 — Callback props

For every function prop:
- When it fires
- What arguments it receives
- Whether the return value has any effect

### 5 — Enum reference

| Value | Description |
|---|---|

### 6 — Accessibility props

For every prop that affects accessibility:
- What ARIA attribute it maps to
- Required or optional
- Default behaviour if omitted

### 7 — Usage examples

Three framework-agnostic pseudocode examples:
1. **Minimal** — required props only
2. **Typical** — most common real-world usage
3. **Full** — all significant props set

### 8 — Props not provided

What the component intentionally does NOT expose as a prop, and why.

---

## Rules

- Never invent a prop without backing in anatomy.md or tokens.md
- Visual variant props (e.g. `status`, `severity`) must map to a token in tokens.md
- Callback prop names always start with `on`
- Boolean props use positive naming: `dismissible` not `notDismissible`
- Do not expose internal layout or styling as props
- No framework references anywhere
- If a prop needs a hardcoded value with no token, log a gap instead

---

## Gap logging

Append to `gaps.md` — number sequentially from where that file ends:

```markdown
### GAP-XXX — [short title]

**Discovered in:** props.md
**Step:** Props writing
**Type:** Token missing | Spec incomplete
**Description:** [What prop is needed but has no token or anatomy backing]
**Current workaround:** [What was done instead]
**Recommended fix:** [What token or spec addition is needed]
**Status:** Open
```

---

## Output checklist

- [ ] Every anatomy part represented in props
- [ ] Every externally-triggerable state has a prop
- [ ] All enum values documented
- [ ] All callback props document their arguments
- [ ] Three usage examples provided
- [ ] Props not provided section complete
- [ ] No framework references anywhere
- [ ] No props invented without token or anatomy backing
- [ ] gaps.md updated with any new gaps found
