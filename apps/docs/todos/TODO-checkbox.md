# TODO — CheckBox component refactor

Review date: 2026-03-19
Reviewer: Julia Mayer-Lauren
Branch: project-sanderson-refactor-checkbox-julia

---

## Missing visual assets

- [ ] **Anatomy diagram image** — No PNG/SVG anatomy diagram exists for CheckBox. The anatomy table is populated in the MDX but the visual above it is a placeholder comment `{/* TODO: Insert anatomy diagram image here */}`. A diagram illustrating the checkbox control (1), check indicator (1a), label (2), and description (2a) needs to be created by the design team.

---

## Missing coded examples (use case placeholders)

All four Use Cases sections currently have `{/* TODO */}` placeholders. Dedicated examples need to be created in `apps/docs/src/examples/components/checkbox/`:

- [ ] **Controlling a UI feature on or off** — A checkbox revealing or hiding additional content (e.g., a checkbox that shows/hides an advanced options section).
- [ ] **Opting in to a disclaimer or agreement** — A required checkbox inside a FormField for accepting terms and conditions, showing the validation error state on submit.
- [ ] **Selecting items within a list or table** — Checkboxes used for row selection in a list or DataTable context.
- [ ] **Configuring multiple independent settings** — Multiple independent checkboxes for notification or feature preferences.

---

## Props present in Grommet but not documented in YAML

- `pad` — internal padding; theme-controlled
- `gap` — spacing between control and label; theme-controlled
- `fill` — allows checkbox to fill container width; low-level layout prop
- `children` — renders a custom indicator element; advanced escape hatch
- `tabIndex` — focus order control; implementation detail

---

## Behaviors not fully captured

- **Indeterminate state** — Documented in Application States prose but no live coded example exists demonstrating a parent CheckBox with a subset of children checked. A `CheckBoxIndeterminateExample.js` would strengthen this.
- **CheckBoxGroup relationship** — CheckBox is frequently used via CheckBoxGroup for grouped selection. The refactor intentionally scoped this YAML to the standalone component, but a cross-reference note pointing consumers to the CheckBoxGroup page should be added once that component is refactored.
